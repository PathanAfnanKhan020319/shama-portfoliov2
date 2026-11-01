"""Immutable evidence and trusted-access contracts."""

from dataclasses import dataclass
from datetime import date


@dataclass(frozen=True)
class Principal:
    tenant: str
    groups: frozenset[str]


@dataclass(frozen=True)
class Document:
    document_id: str
    version: str
    title: str
    source_uri: str
    tenant: str
    groups: frozenset[str]
    text: str
    valid_from: date
    valid_to: date | None = None


@dataclass(frozen=True)
class Chunk:
    chunk_id: str
    document: Document
    text: str
    start: int
    end: int


@dataclass(frozen=True)
class Hit:
    chunk: Chunk
    score: float
    sparse_rank: int | None = None
    dense_rank: int | None = None


@dataclass(frozen=True)
class Citation:
    chunk_id: str
    document_id: str
    version: str
    source_uri: str
    start: int
    end: int
    quote: str


def authorized(chunk: Chunk, principal: Principal, as_of: date) -> bool:
    """Fail closed. Caller identity must be supplied by a trusted boundary."""
    doc = chunk.document
    return bool(
        principal.tenant and principal.groups and doc.groups
        and doc.tenant == principal.tenant
        and doc.groups.intersection(principal.groups)
        and doc.valid_from <= as_of
        and (doc.valid_to is None or as_of < doc.valid_to)
    )


def verify_citation(citation: Citation, chunk: Chunk, principal: Principal, as_of: date) -> None:
    """Verify authorized, exact source span. This does not prove entailment."""
    doc = chunk.document
    if not authorized(chunk, principal, as_of):
        raise ValueError("Unauthorized source")
    if (citation.chunk_id, citation.document_id, citation.version, citation.source_uri) != (
        chunk.chunk_id, doc.document_id, doc.version, doc.source_uri
    ):
        raise ValueError("Citation source/version mismatch")
    if not (chunk.start <= citation.start < citation.end <= chunk.end):
        raise ValueError("Citation offset out of range")
    if doc.text[citation.start:citation.end] != citation.quote:
        raise ValueError("Quote does not match original source")
