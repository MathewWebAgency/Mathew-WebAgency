"""Nimmt PNG-Daten (base64, text/plain) per POST an und legt sie in render-out ab."""
import base64, http.server, os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "assets", "img")
class H(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        name = os.path.basename(self.path.strip("/")) or "bild.png"
        data = self.rfile.read(int(self.headers["Content-Length"])).decode()
        raw = base64.b64decode(data.split(",", 1)[1])
        open(os.path.join(OUT, name), "wb").write(raw)
        self.send_response(204); self.send_header("Access-Control-Allow-Origin", "*"); self.end_headers()
        print("gespeichert", name, len(raw), flush=True)
    def log_message(self, *a): pass
os.chdir(OUT)
http.server.HTTPServer(("127.0.0.1", 4175), H).serve_forever()
