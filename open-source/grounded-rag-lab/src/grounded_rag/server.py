"""Loopback demo, not an internet-facing multi-user service."""

import json
from datetime import date
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

from .answer import ask
from .models import Principal
from .retrieval import HybridRetriever

WEB = Path(__file__).with_name("web")


def make_handler(retriever: HybridRetriever):
    class Handler(BaseHTTPRequestHandler):
        def respond(self, code: int, payload: bytes, kind: str = "application/json; charset=utf-8"):
            self.send_response(code)
            self.send_header("Content-Type", kind)
            self.send_header("Content-Length", str(len(payload)))
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Security-Policy",
                             "default-src 'self'; script-src 'self'; style-src 'self'; base-uri 'none'; object-src 'none'")
            self.end_headers()
            self.wfile.write(payload)

        def do_GET(self):
            route = urlsplit(self.path).path
            if route == "/health":
                return self.respond(200, b'{"ok":true}')
            assets = {"/": ("index.html", "text/html; charset=utf-8"),
                      "/app.css": ("app.css", "text/css; charset=utf-8"),
                      "/app.js": ("app.js", "text/javascript; charset=utf-8")}
            if route not in assets:
                return self.respond(404, b'{"error":"Not found"}')
            filename, mime = assets[route]
            return self.respond(200, (WEB / filename).read_bytes(), mime)

        def do_POST(self):
            if urlsplit(self.path).path != "/ask":
                return self.respond(404, b'{"error":"Not found"}')
            try:
                length = int(self.headers.get("Content-Length", "0"))
                if not 1 <= length <= 4096:
                    return self.respond(413, b'{"error":"Body limit exceeded"}')
                data = json.loads(self.rfile.read(length))
                if not isinstance(data, dict):
                    raise ValueError("Body must be an object")
                question = data.get("question")
                method = data.get("method", "hybrid")
                # SECURITY: fixed trusted public demo scope; client cannot select tenant/group.
                result = ask(retriever, question, Principal("public", frozenset({"readers"})),
                             as_of=date(2026, 11, 1), method=method)
                return self.respond(200, json.dumps(result, ensure_ascii=False).encode())
            except (ValueError, TypeError, json.JSONDecodeError) as exc:
                return self.respond(400, json.dumps({"error": str(exc)}).encode())

        def log_message(self, format, *args):
            # No raw user questions or document content in logs.
            return

    return Handler


def serve(retriever: HybridRetriever, port: int = 8765) -> None:
    if not 1024 <= port <= 65535:
        raise ValueError("Port must be between 1024 and 65535")
    server = ThreadingHTTPServer(("127.0.0.1", port), make_handler(retriever))
    print(f"Local demo: http://127.0.0.1:{port}", flush=True)
    try:
        server.serve_forever(poll_interval=0.25)
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
