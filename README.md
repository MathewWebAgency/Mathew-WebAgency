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

- **Fraunces** (variabel 100–900, Achsen `opsz`, `SOFT`, `WONK`) für Display.
  `WONK` kippt g, a und y aus der Achse – Überschriften sollen gesetzt
  aussehen, nicht gegriffen. Gesetzt über `font-variation-settings`.
- **Newsreader** (variabel 200–800) für Fließtext und Bedienelemente
- **Keine dritte Schrift für Beschriftungen.** `FESTPREIS`, `ANSPRECHPARTNER`
  und Verwandte liefen in gesperrten Versalien in Space Mono – das Bauteil,
  das in jeder zweiten Vorlage steckt. Sie laufen jetzt in Newsreader, in
  normaler Schreibweise, ohne Sperrung (`--label`).
- **Space Mono** nur noch im Browserrahmen des Beispiels: Adresszeile,
  Besucherzähler, Maßangaben (`--code`).
- **Archivo** gehört nicht uns, sondern der Tischlerei Brinkmann (`--bk-font`).
  Das Beispiel hat eine eigene Farbwelt und braucht auch eine eigene Schrift.

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

Erledigt am 2026-08-19: Formular an Formspree angeschlossen (`myeglzod`, per
`fetch` mit Bestätigung auf der Seite, Endpoint durchgetestet, HTTP 200), Logo
als Monogramm in Header und Footer, Anschrift im Schema-Markup, Teilbild und
App-Symbol neu gebaut.

1. **AGB abgleichen** – der Text wurde von der Live-Seite übertragen, ließ sich
   dort aber nur zusammengefasst abrufen. Vor dem Launch gegen den Originalwortlaut
   prüfen. Der Hinweiskasten auf der Seite bleibt stehen, bis das erledigt ist.
2. **Auftragsverarbeitungsvertrag mit Formspree schließen** – Abschnitt 4 der
   Datenschutzerklärung nennt einen AV-Vertrag samt EU-Standardvertragsklauseln.
   Der Satz ist erst wahr, wenn der Vertrag im Formspree-Konto tatsächlich
   abgeschlossen ist. Bis dahin behauptet die Seite etwas, das es nicht gibt.
3. **Preise** – erst nennen, wenn das Modell final ist. Die Seite verkauft aktuell
   das Modell, nicht die Zahlen.
4. **Domain prüfen** – Canonical-, OG-URLs und `sitemap.xml` zeigen auf
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
