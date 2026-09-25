"""Lokaler Vorschau-Server für die Entwicklung.

Warum nicht einfach `python3 -m http.server`: Dessen __main__-Block ruft beim
Start os.getcwd() auf. In diesem iCloud-Ordner scheitert das mit
PermissionError, bevor --directory überhaupt ausgewertet wird. Dieses Skript
umgeht den Einstiegspunkt und wechselt selbst ins Projektverzeichnis.

Zusätzlich schickt es no-store: Beim Entwickeln soll der Browser nie eine alte
Fassung von site.css oder site.js ausliefern. Im Livebetrieb übernimmt das der
?v=-Parameter in den HTML-Dateien (siehe README, Abschnitt Deployment).
"""

import http.server
import os
import socketserver

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = 4173


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(ROOT)
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("Vorschau laeuft auf http://localhost:%d" % PORT)
        httpd.serve_forever()
