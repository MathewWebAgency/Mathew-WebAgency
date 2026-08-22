# SEO-Landkarte

Erfüllt Phase 0 des Skills `seo-technisch`: Zuordnung URL → Suchintent → Keywords.
Stand: 22.08.2026. Bei jeder Änderung an Titeln oder Beschreibungen mitpflegen.

## Ausgangslage

Sitz in Selm (Kreis Unna). Einzugsgebiet für persönliche Termine: Selm, Lünen, Werne,
Dortmund, Olfen, Nordkirchen. Gearbeitet wird ortsunabhängig, bundesweit — der Ort ist
**Herkunft, keine Grenze**. Titel und Texte formulieren das als „aus Selm", nie als
„für Selm und Umgebung".

Realistische Einschätzung: „Webdesign" allein ist bundesweit gegen etablierte Domains
kurzfristig nicht zu gewinnen. „Webdesign Selm", „Webdesign Werne" und „Webdesign Lünen"
haben dünne Konkurrenz — dort ist die Spitze erreichbar. Dortmund liegt dazwischen.

## Zuordnung je URL

| URL | Suchintent | Haupt-Keyword | Neben-Keywords |
|---|---|---|---|
| `/` | Kommerziell, Anbietersuche | Webdesign Selm | Website erstellen lassen, Webdesigner Kreis Unna, Website ohne Baukasten |
| `/leistungen.html` | Vergleich, Leistungsumfang | Webdesign Leistungen | lokale Auffindbarkeit Google, Website Betreuung, Website Wartung Festpreis |
| `/ablauf.html` | Information, Ablauf und Dauer | Website erstellen lassen Ablauf | Wie lange dauert eine Website, Website Festpreis |
| `/ueber-uns.html` | Vertrauen, Anbieterprüfung | Webdesign Agentur Selm | Webdesigner NRW, kleine Webagentur |
| `/kontakt.html` | Transaktional, Kontaktaufnahme | Webdesigner Kontakt | kostenloses Erstgespräch Website, Webdesign Angebot |
| `/impressum.html` `/datenschutz.html` `/agb.html` | Rechtlich, keine Rankingabsicht | — | — |
| `/404.html` | — (`noindex`) | — | — |

## Suchsprache der Zielgruppe

Die Zielgruppe sind Betriebsinhaber, keine Marketingleute. Sie tippen:

- „website erstellen lassen kosten"
- „webdesigner in der nähe"
- „homepage für handwerksbetrieb"
- „website selbst machen oder machen lassen"

Nicht: „Conversion-optimierte Corporate Website", „Digital Presence". Im Fließtext gilt die
Sprachregel aus `webdesign-agentur`: **„Auffindbarkeit" statt „Suchmaschinenoptimierung"**,
wenn es um Kundennutzen geht. SEO-Vokabular gehört in Meta-Felder und in dieses Dokument,
nicht auf die Seite.

## Bewusst nicht gemacht

- **Keine eigenen Ortsseiten** je Stadt. Vier weitgehend gleiche Seiten wertet Google als
  Doorway Pages. Ohne echte, unterscheidbare Inhalte je Stadt (Referenzen, Projekte) wäre
  das ein Risiko ohne Gegenwert. Sobald Kundenprojekte vorzeigbar sind, neu bewerten.
- **Keine Bewertungen im Schema.** `AggregateRating` und `Review` bleiben draußen, bis es
  echte, nachweisbare Bewertungen gibt.
- **Kein HSTS.** Bewusste Entscheidung: bindet die Domain verbindlich an HTTPS, ohne
  nennenswerten Rankingnutzen.
- **Keine Breadcrumbs.** Bei vier Unterseiten und Klicktiefe 1 ist der Nutzen gering, die
  sichtbare Pfadzeile widerspricht dem Layout.

## Offen

- Google Search Console einrichten, `sitemap.xml` einreichen. **Die Seite ist noch nicht
  indexiert** — das ist derzeit der größte einzelne Hebel.
- Google-Unternehmensprofil: Kategorie „Webdesigner", NAP zeichengenau wie im Impressum
  (Mathew WebAgency · Am Wasserturm 2 · 59379 Selm · +49 179 2382 180).
- Erste echte Bewertungen einsammeln.
- Bing Webmaster Tools.
- Lighthouse-Lauf, sobald Node verfügbar ist (`brew install node && npm i -g lighthouse`).
  Gate: SEO 100, Accessibility ≥ 95, Performance ≥ 90 auf Mobile.
- AV-Vertrag mit Formspree.
