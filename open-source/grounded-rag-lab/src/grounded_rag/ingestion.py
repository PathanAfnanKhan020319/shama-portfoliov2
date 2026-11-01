"""Small, validated JSONL fixture ingestion with exact text offsets."""

import hashlib
import json
import re
from datetime import date
from pathlib import Path

from .models import Chunk, Document

_ID = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._-]{0,79}$")


def load_documents(path: Path) -> list[Document]:
    if path.is_symlink() or not path.is_file() or path.stat().st_size > 1_000_000:
        raise ValueError("Corpus must be a regular JSONL file under 1MB")
    docs, seen = [], set()
    for line_no, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        try:
            raw = json.loads(line)
            ident, version, tenant = (raw[key] for key in ("document_id", "version", "tenant"))
            if any(not isinstance(x, str) or not _ID.fullmatch(x) for x in (ident, version, tenant)):
                raise ValueError("Invalid document identity")
            groups, content = raw["groups"], raw["content"]
            if (not isinstance(groups, list) or not groups or
                any(not isinstance(g, str) or not _ID.fullmatch(g) for g in groups)):
                raise ValueError("Missing or malformed ACL")
            if not isinstance(content, str) or not content.strip() or len(content) > 16_000:
                raise ValueError("Invalid content or size")
            title, source = raw["title"], raw["source_uri"]
            if not isinstance(title, str) or not title.strip() or len(title) > 180:
                raise ValueError("Invalid title")
            if not isinstance(source, str) or not source.startswith("synthetic://"):
                raise ValueError("Only synthetic source URIs are allowed")
            valid_from = date.fromisoformat(raw.get("valid_from", "2026-01-01"))
            valid_to = date.fromisoformat(raw["valid_to"]) if raw.get("valid_to") else None
            if valid_to is not None and valid_to <= valid_from:
                raise ValueError("Invalid date interval")
            key = tenant, ident, version
            if key in seen:
                raise ValueError("Duplicate document identity/version")
            seen.add(key)
            docs.append(Document(ident, version, title, source, tenant,
                                 frozenset(groups), content, valid_from, valid_to))
            if len(docs) > 200:
                raise ValueError("Too many documents")
        except (KeyError, TypeError, ValueError, json.JSONDecodeError) as exc:
            raise ValueError(f"Invalid corpus line {line_no}: {exc}") from exc
    if not docs:
        raise ValueError("Empty corpus")
    return docs


def chunk_document(doc: Document, *, size: int = 850, overlap: int = 100) -> list[Chunk]:
    if not 120 <= size <= 4000 or not 0 <= overlap < size // 2:
        raise ValueError("Invalid chunking configuration")
    digest = hashlib.sha256((doc.tenant + "\0" + doc.document_id + "\0" +
                             doc.version + "\0" + doc.text).encode()).hexdigest()[:10]
    chunks, start = [], 0
    while start < len(doc.text):
        end = min(len(doc.text), start + size)
        if end < len(doc.text):
            window = doc.text[start + size // 2:end]
            for sep in ("\n\n", ". ", " "):
                boundary = window.rfind(sep)
                if boundary >= 0:
                    end = start + size // 2 + boundary + len(sep)
                    break
        if end <= start:
            raise ValueError("Chunker failed to advance")
        cid = f"{doc.document_id}@{doc.version}#c{len(chunks)}-{digest}"
        chunks.append(Chunk(cid, doc, doc.text[start:end], start, end))
        if end == len(doc.text):
            break
        start = max(start + 1, end - overlap)
    return chunks


def prepare_chunks(docs: list[Document]) -> list[Chunk]:
    return [chunk for doc in docs for chunk in chunk_document(doc)]
