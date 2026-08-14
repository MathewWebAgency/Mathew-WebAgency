# Mathew WebAgency – Website

Statische Website für **mathew-webagency.de**. Kein Framework, kein Build-Step:
HTML, CSS, Vanilla JS. Alle Abhängigkeiten liegen lokal im Repo – es werden zur
Laufzeit keine externen Server kontaktiert (relevant für die DSGVO).

## Seiten

```
index.html          Startseite: Hero, „Die Baustelle“, Leistungen, Ablauf, FAQ
leistungen.html     Drei Leistungen im Detail (#websites #auffindbarkeit #betreuung)
ablauf.html         Fünf Phasen von Erstgespräch bis Betreuung + Garantien
ueber-uns.html      Haltung, Vergleich zur klassischen Agentur, Grundsätze
kontakt.html        Formular, Direktkontakt, FAQ vor dem Erstgespräch
impressum.html      Echte Angaben (Kian Mathew, Selm)
datenschutz.html    Von der Live-Seite übertragen und angepasst
agb.html            Von der Live-Seite übertragen – gegen Original abgleichen
404.html            Fehlerseite
```

Kein Referenz-/Projektbereich: auf Wunsch des Inhabers vollständig entfernt, bis
echte, freigegebene Projekte vorliegen. Ebenso kein Video und kein Marketing –
das Unternehmen macht ausschließlich Webdesign.

## Designsystem „Kalkgrau & Tiefgrün“

Alle Tokens stehen oben in `assets/css/site.css` unter `:root`.

| Token | Wert | Verwendung |
|---|---|---|
| `--paper` | `#E7EAE4` | Kalkgrau, kühle Seitenbasis |
| `--paper-2` | `#F3F5F0` | Karten, erhöhte Flächen |
| `--ink` | `#10171A` | kühles Fast-Schwarz für invertierte Bänder |
| `--gruen` | `#14523A` | Tiefgrün – die einzige Aktionsfarbe |
| `--gruen-hell` | `#7DC9A3` | Grün auf dunklem Grund (Kontrast) |
| `--sand` | `#C8B48C` | Sandstein der Giebel, nur Linien und Labels |

Herleitung: das Angebot auf Papier. Kalkgrau ist der kühle Bogen, auf dem eine
Kalkulation steht – bewusst kein Creme. Tiefgrün ist die Farbe, in der man
unterschreibt, und die einzige Aktionsfarbe der Seite.

Der frühere **Stufengiebel** (Logo, Eyebrow-Marker, Bildfeld der Beispielseite)
ist vollständig entfallen: Er war aus dem Prinzipalmarkt hergeleitet, und die
Agentur arbeitet ortsunabhängig. Bis die Logodatei vorliegt, tragen Header und
Footer die reine Wortmarke; `.brand__mark` im CSS ist für das M-Monogramm
reserviert.

Schriften (selbst gehostet in `assets/fonts/`):

- **Bricolage Grotesque** (variabel 400–800) für Display – der Name heißt
  „Bastelei“ – eine Grotesk mit Eigenheiten statt einer glatten Systemschrift
- **Instrument Sans** (variabel) für Fließtext und Bedienelemente
- **Space Mono** für Labels, Kennwerte und Koordinaten

Radien: nur `3px`, `6px`, `10px` und echte Pillen. Nichts dazwischen.

## „Die Baustelle“ – die Signature-Animation

Der Abschnitt `#baustelle` auf der Startseite ist das eine Element, das die Seite
merkbar macht: Eine Baukastenseite wird beim Scrollen abgerissen und neu gebaut.

Durchgespielt wird das an **Tischlerei Brinkmann** – einem erfundenen Beispiel-
betrieb. Beide Zustände zeigen denselben Betrieb, von `www.tischlerei-brinkmann.de/start.htm`
zu `tischlerei-brinkmann.de`. Dass der Betrieb erfunden ist, steht sichtbar in der
Sektion (`.rb__disclaimer`) – das bleibt so, solange kein echter Kunde als Beispiel
freigegeben ist.

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

1. **AGB abgleichen** – der Text wurde von der Live-Seite übertragen, ließ sich
   dort aber nur zusammengefasst abrufen. Vor dem Launch gegen den Originalwortlaut
   prüfen.
2. **Formular** – Formspree-Endpoint in `kontakt.html` eintragen (Platzhalter
   `DEIN-FORMSPREE-ENDPOINT`). Solange er fehlt, zeigt das Formular einen Hinweis
   mit Telefonnummer und E-Mail an, statt ins Leere zu senden. Danach den
   Dienstleister in Abschnitt 4 der Datenschutzerklärung ergänzen.
3. **Logo** – `assets/img/logo.svg` ablegen, dann Monogramm in Header und Footer
   einsetzen (`.brand__mark` ist im CSS dafür reserviert).
4. **Preise** – erst nennen, wenn das Modell final ist. Die Seite verkauft aktuell
   das Modell, nicht die Zahlen.
5. **Domain prüfen** – Canonical-, OG-URLs und `sitemap.xml` zeigen auf
   `https://mathew-webagency.de/`.

## Deployment

Zielumgebung ist FTP auf Hostinger: den kompletten Ordnerinhalt in `public_html/`
hochladen. Es gibt keinen Build-Schritt – was im Repo liegt, ist was live geht.
`.claude/` muss nicht mit hochgeladen werden.

**Vor jedem Upload: Cache-Version hochzählen.** `site.css` und `site.js` sind in
allen HTML-Dateien mit `?v=JJJJMMTT` verlinkt. Ohne Bump bekommen wiederkehrende
Besucher altes CSS zu neuem HTML serviert – der Browser hält die Dateien sonst
tagelang. Ein Durchlauf für alle Seiten:

```bash
sed -i '' 's|site\.css?v=[0-9]*|site.css?v=20260810|g; s|site\.js?v=[0-9]*|site.js?v=20260810|g' *.html
```

Die Bibliotheken in `assets/js/` (GSAP, ScrollTrigger, Lenis) ändern sich nicht und
brauchen keine Version.
