# Mathew WebAgency – Website

Statische Website für **mathew-webagency.de**. Kein Framework, kein Build-Step:
HTML, CSS, Vanilla JS. Alle Abhängigkeiten liegen lokal im Repo – es werden zur
Laufzeit keine externen Server kontaktiert (relevant für die DSGVO).

## Seiten

```
index.html          Startseite: Hero, „Die Baustelle“, Leistungen, Ablauf, Projekte, FAQ
leistungen.html     Fünf Leistungen im Detail (#websites #auffindbarkeit #betreuung #video #marketing)
ablauf.html         Fünf Phasen von Erstgespräch bis Betreuung + Garantien
referenzen.html     Drei Projekte mit Vorher/Nachher-Schieber
ueber-uns.html      Haltung, Vergleich zur klassischen Agentur, Grundsätze
kontakt.html        Formular, Direktkontakt, FAQ vor dem Erstgespräch
impressum.html      TODO: echte Angaben
datenschutz.html    TODO: rechtssicherer Text
agb.html            TODO: rechtssicherer Text
404.html            Fehlerseite
```

## Designsystem „Kalkgrau & Promenadengrün“

Alle Tokens stehen oben in `assets/css/site.css` unter `:root`.

| Token | Wert | Verwendung |
|---|---|---|
| `--paper` | `#E7EAE4` | Kalkgrau, kühle Seitenbasis |
| `--paper-2` | `#F3F5F0` | Karten, erhöhte Flächen |
| `--ink` | `#10171A` | kühles Fast-Schwarz für invertierte Bänder |
| `--gruen` | `#14523A` | Promenadengrün – die einzige Aktionsfarbe |
| `--gruen-hell` | `#7DC9A3` | Grün auf dunklem Grund (Kontrast) |
| `--sand` | `#C8B48C` | Sandstein der Giebel, nur Linien und Labels |

Herleitung: nasser Kalkstein am Prinzipalmarkt, das Laubdach der Promenade, der
Sandstein der Giebel. Der **Stufengiebel** ist das wiederkehrende Ortszeichen –
als Logo, als Eyebrow-Marker und im Bildfeld der Beispielseite.

Schriften (selbst gehostet in `assets/fonts/`):

- **Bricolage Grotesque** (variabel 400–800) für Display – der Name heißt
  „Bastelei“ und passt zu „Von Hand gebaut“
- **Instrument Sans** (variabel) für Fließtext und Bedienelemente
- **Space Mono** für Labels, Kennwerte und Koordinaten

Radien: nur `3px`, `6px`, `10px` und echte Pillen. Nichts dazwischen.

## „Die Baustelle“ – die Signature-Animation

Der Abschnitt `#baustelle` auf der Startseite ist das eine Element, das die Seite
merkbar macht: Eine Baukastenseite wird beim Scrollen abgerissen und neu gebaut.

- Die Bühne klebt per CSS (`position: sticky`) – funktioniert auch ohne JS.
- GSAP + ScrollTrigger scrubben eine Timeline über die Scrollstrecke
  (`scrub: 0.7`), das Tempo hängt also am Rad des Nutzers, nicht an einem Timer.
- Animiert werden ausschließlich `transform`, `opacity` und `clip-path`.
- Phasen: Bestand → Abriss → Bauline → Aufbau → Fertig. Die Texte dazu stehen
  im Array `beats` in `assets/js/site.js`.
- Unter 900px läuft eine vereinfachte Fassung (kein Handy-Mockup, Hochkantrahmen).
- Bei `prefers-reduced-motion: reduce` entfällt das Pinning komplett; stattdessen
  stehen beide Zustände als ruhige Karten nebeneinander (`.rb__static`).

## Lokale Vorschau

```bash
python3 -m http.server 4173
```

Dann `http://localhost:4173` öffnen. Die Seiten verlinken absolut (`/assets/…`),
ein Server ist deshalb nötig – Doppelklick auf die HTML-Datei reicht nicht.

## Offene TODOs vor dem Launch

Alle Stellen sind im Code markiert: `grep -rn "TODO" *.html assets/`

1. **Impressum** – Name, Rechtsform, Anschrift und Umsatzsteuer-Angabe eintragen.
2. **Datenschutz + AGB** – rechtssichere Texte einfügen.
3. **Formular** – Formspree-Endpoint in `kontakt.html` eintragen (Platzhalter
   `DEIN-FORMSPREE-ENDPOINT`). Solange er fehlt, zeigt das Formular einen Hinweis
   mit Telefonnummer und E-Mail an, statt ins Leere zu senden.
4. **Projekte** – die SVG-Platzhalter in `assets/img/case-*.svg` durch echte
   Screenshots ersetzen. Ergebniszahlen erst eintragen, wenn sie belegt sind.
5. **Domain prüfen** – Canonical-, OG-URLs und `sitemap.xml` zeigen auf
   `https://mathew-webagency.de/`.

## Deployment

Zielumgebung ist FTP auf Hostinger: den kompletten Ordnerinhalt in `public_html/`
hochladen. Es gibt keinen Build-Schritt – was im Repo liegt, ist was live geht.
`.claude/` muss nicht mit hochgeladen werden.
