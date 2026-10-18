# Teilbild und App-Symbole neu bauen

Rendert `og-image.png` (1200x630), `icon-512.png`, `icon-192.png` und
`apple-touch-icon.png` mit den echten Schriften der Seite auf ein Canvas.
Der Empfänger schreibt die PNGs direkt nach `assets/img/`.

```bash
python3 .claude/devserver.py &             # liefert Seite und Schriften auf :4173
python3 .claude/render/empfaenger.py &     # nimmt die PNGs auf :4175 an
open http://localhost:4173/.claude/render/ # rendert und speichert automatisch
cp assets/img/icon-512.png assets/img/logo-google.png
```

Danach die Bilder ansehen und in allen HTML-Dateien die Version an der
Teilbild-Adresse hochzählen (`og-image.png?v=JJJJMMTT`). WhatsApp und Facebook
puffern Teilbilder unter ihrer Adresse wochenlang.
