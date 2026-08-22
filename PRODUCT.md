# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Inhaberinnen und Inhaber kleiner lokaler Betriebe: Handwerk (Dachdeckerei, Elektrotechnik,
Tischlerei, Sanitär, Metallbau, GaLaBau, Malerbetrieb), Kanzleien (Rechtsanwälte,
Steuerberatung) und Dienstleister (Physiotherapie, Zahnarztpraxis, Fahrschule).

Die Situation: Der Betrieb liefert gute Arbeit, hat aber eine Baukasten- oder Alt-Website,
die keine Anfragen bringt. Die Person entscheidet selbst und schnell, hat kein
Marketing-Budget-Gremium, wenig Zeit und keine Lust auf Agentur-Deutsch. Sie liest die
Seite häufig mobil und zwischen zwei Terminen.

Der Job: herausfinden, ob dieser Anbieter ihr Problem zu einem kalkulierbaren Preis löst,
ohne sich dafür in einen sechsmonatigen Prozess zu begeben.

## Product Purpose

Websites, lokale Auffindbarkeit und laufende Betreuung — drei Leistungen, mehr nicht.
Videoproduktion und digitales Marketing gehören ausdrücklich **nicht** dazu (siehe
Capabilities and Constraints); die frühere Aufzählung hier war ein Widerspruch dazu.

Diese Website selbst ist das Verkaufsinstrument der Agentur: Sie muss Vertrauen herstellen
und zu genau einer Handlung führen — dem kostenlosen 30-Minuten-Erstgespräch. Erfolg ist
nicht Traffic, sondern die Zahl qualifizierter Erstgespräch-Anfragen.

## Positioning

Das Ergebnis zählt, nicht der Herstellungsweg. Bestätigt vom Inhaber (2026-08-10): Die
Website darf **nicht** behaupten, der Code sei von Hand geschrieben — das ist er nicht,
und den Kunden interessiert es ohnehin nicht. Formulierungen wie „von Hand gebaut",
„handgebauter Code" oder „handgeschrieben" sind aus der gesamten Website entfernt und
dürfen nicht zurückkehren, auch nicht in abgewandelter Form.

Was stattdessen trägt und wahr bleibt: Die Seite entsteht **für diesen einen Betrieb**,
nicht aus einer Vorlage und nicht in einem Baukasten — das ist eine Aussage über das
Produkt, nicht über die Werkzeuge.

**Keine Vergleiche. Bestätigt vom Inhaber (2026-08-18):** Die Website vergleicht sich
nicht mit Wettbewerbern und verteidigt sich nicht gegen Einwände. Wörtlich: *„Wir sind
überzeugt, dass wir Profis in unserem Gebiet sind. Wir müssen uns an vielen Stellen
nicht erklären."* Entfernt und nicht zurückzuholen: die Sektion „Klassische Agentur.
Und dann wir." mit ihren „Anderswo …"-Karten, der Beruhigungsblock „Warum du dabei
nichts verlieren kannst", und Verneinungsketten wie „kein Video, keine
Social-Media-Pakete, kein Weiterreichen an Freelancer, kein Ticketsystem, keine
Warteschleife".

Die vier Konditionen bleiben als **Fakten** gültig und einlösbar — sie werden positiv
formuliert, nie als Abgrenzung gegen andere:

- Festpreis **vor** Projektstart; Mehrarbeit trägt die Agentur.
- Zwei bis vier Wochen bis Launch (Regelfall drei).
- Direkte Handynummer, auch per WhatsApp; ein Ansprechpartner.
- Klare Sprache; Betreuung monatlich kündbar.

Neu bestätigt (2026-08-18): **Auch Konzept und Entwurf sind kostenlos und
unverbindlich.** Die feste Entscheidung fällt erst, nachdem der Kunde seinen echten
Entwurf gesehen hat.

## Operating Context

Fünf feste Phasen, in dieser Reihenfolge: Erstgespräch (30 Min., kostenlos, unverbindlich)
→ Konzept & Design (ca. 1 Woche, echter Entwurf, Änderungswünsche erwünscht) → Umsetzung
(1–2 Wochen) → Launch (1 Tag, nach Freigabe) → Betreuung (laufend, monatlich kündbar).

Der Erstkontakt läuft über Formular, Telefon, WhatsApp oder E-Mail; zugesagt ist Antwort
innerhalb von 24 Stunden, Inhaltsänderungen in der Betreuung innerhalb von 48 Stunden.
Kunden liefern selten fertige Texte oder Fotos — das Beschaffen dieses Materials ist
regelmäßig der längste Teil des Projekts, nicht die Technik.

Die Zusammenarbeit ist vollständig remote (Telefon, Videocall).

## Capabilities and Constraints

**Reines Webdesign-Unternehmen.** Bestätigt vom Inhaber (2026-08-10): Videografie,
Marketing und alles Vergleichbare gehören **nicht** zum Angebot und sind aus der Website
entfernt. Nicht wieder aufnehmen, ohne dass der Inhaber es ausdrücklich sagt.

**Leistungen (drei, alle selbst erbracht, kein Weiterreichen an Freelancer):** Websites ·
Auffindbarkeit (lokale Suche, Google-Business-Profil, Technik-SEO) · Betreuung (Hosting,
Domain, SSL, Updates, Backups, Inhaltsänderungen, laufende Auffindbarkeit).

**Technisch verbindlich:** statisches HTML/CSS/Vanilla JS, kein Framework, kein Build-Step.
GSAP + ScrollTrigger + Lenis liegen lokal im Repo. Zur Laufzeit werden keine externen
Server kontaktiert (Schriften selbst gehostet, kein Google-Fonts-CDN) — das ist eine
DSGVO-Entscheidung und keine Geschmacksfrage. Deployment per FTP nach `public_html/` auf
Hostinger; was im Repo liegt, geht live.

**Terminologie:** „Auffindbarkeit" statt „SEO", wenn es um Kundennutzen geht. Duzen
durchgehend. Der Betrieb heißt „Betrieb", nicht „Unternehmen" oder „Business".

**Offene Entscheidungen — nicht erfinden, sondern klären:**

- *Preismodell.* Zwei Teile: einmalig für den Aufbau, danach ein fester Monatsbetrag für
  Hosting, Domain, SSL, Wartung und laufende Auffindbarkeit; monatlich kündbar. Als
  Größenordnung im Gespräch genannt: rund 1999 € einmalig und 49 € monatlich — **beide
  Zahlen sind noch nicht final und dürfen nirgends auf der Website erscheinen.** Die Seite
  verkauft das Modell (ein Betrag statt vier Verträge, ein Ansprechpartner, kündbar), nicht
  den Preis. Erst wenn der Inhaber die Zahlen freigibt, dürfen sie genannt werden.
- *Kein regionaler Fokus.* Bestätigt: Die Agentur arbeitet bundesweit und vollständig
  aus der Ferne. Sie hat keinen regionalen Zielmarkt und keinen Sitz in Münster.
  Erledigt (Stand 2026-08-10): Sämtliche Ortsbehauptungen sind aus allen zehn Seiten
  entfernt — Koordinaten, Seitentitel, Meta- und OG-Texte, `areaServed` und `address`
  im Schema-Markup, die FAQ-Antworten, die Fahrradstrecke-Zusage und „Nur Leute aus
  Münster". `areaServed` steht jetzt auf Deutschland, eine Adresse führt das Markup
  nicht mehr, bis das Impressum eine echte hat. Auch der Stufengiebel ist entfallen
  und das Designsystem heißt nicht mehr „Promenadengrün".
- *Formular.* `kontakt.html` hat noch keinen Endpoint (Platzhalter
  `DEIN-FORMSPREE-ENDPOINT`). Bis dahin zeigt es bewusst einen Hinweis mit Telefonnummer
  und E-Mail, statt ins Leere zu senden.
- *Referenzen.* Der gesamte Projekt-/Referenzbereich ist auf Wunsch des Inhabers entfernt
  (Seite `referenzen.html`, Startseiten-Sektion, Navigationseinträge, Platzhalter-SVGs).
  Kommt zurück, sobald echte Projekte mit Freigabe vorliegen.

- *Rechtstexte.* Impressum und Datenschutz sind mit den echten Daten von
  mathew-webagency.de gefüllt (Kian Mathew, Am Wasserturm 2, 59379 Selm,
  Kleinunternehmer § 19 UStG). Die Datenschutzerklärung wurde angepasst, nicht kopiert:
  Newsletter, YouTube und Cookie-Banner der alten Seite gibt es hier nicht. Die AGB
  ließen sich nur zusammengefasst abrufen und sind deshalb **kein Originalwortlaut** —
  vor Launch gegen das Original abgleichen.

## Brand Commitments

**Name:** Mathew WebAgency. **Domain:** mathew-webagency.de (Canonical-, OG-URLs und
sitemap.xml zeigen bereits dorthin).

**Kontakt, öffentlich und bestätigt:** +49 179 2382 180 (auch WhatsApp),
info@mathew-webagency.de, Instagram @mathew_webagency.

**Ansprache:** Der Betrieb wird von einer Person geführt. Die Website spricht dennoch
durchgehend von „wir" — das ist eine bewusste, bestätigte Entscheidung und bleibt so.
Nachgeschärft werden muss dafür alles, was daraus eine Ortsgruppen- oder Team-Behauptung
macht („Nur Leute aus Münster", „Hinter jeder guten Website stehen Menschen"), damit die
Ich-Realität und das Vertrauensversprechen „ein Ansprechpartner, den du kennst" nicht
gegeneinander laufen.

**Stimme:** direkt, bodenständig, ohne Buzzwords. Kurze Sätze, konkrete Zahlen,
gelegentlich trocken. Behauptung und Widerspruch als Satzpaar („Reden kostet nichts.
Außer 30 Minuten.") sind das wiederkehrende rhetorische Muster.

**Bestehendes Designsystem:** „Kalkgrau & Tiefgrün", vollständig dokumentiert in
`README.md` und als Tokens in `assets/css/site.css`. Die Palette ist vom Nutzer
bestätigt und bleibt. Hergeleitet ist sie jetzt aus dem Angebot auf Papier, nicht
mehr aus Münster.

**Schriften (Stand 2026-08-19, vom Inhaber gewählt):** Display **Fraunces**
(variabel, Achsen `opsz`, `SOFT`, `WONK`), Fließtext **Newsreader** (variabel,
200–800). **Es gibt keine dritte Schrift in unserer eigenen Oberfläche.** Die
Beschriftungen (`FESTPREIS`, `ANSPRECHPARTNER`, `DANACH`, `ANTWORT INNERHALB VON
24 STUNDEN`) liefen in gesperrten Versalien in Space Mono — der Inhaber hat genau
diese Stellen als KI-Look markiert. Sie laufen jetzt in der Fließtextschrift, in
normaler Schreibweise, ohne Sperrung. Space Mono bleibt ausschließlich im
Browserrahmen des Beispiels (Adresszeile, Besucherzähler, Maßangaben), wo die
Schreibmaschine eine echte Konvention ist. Instrument Sans, Bricolage Grotesque
und Source Serif 4 wurden nacheinander als KI-typisch abgelehnt und sind restlos
entfernt — keine davon zurückholen. Alle Schriften sind selbst gehostet; das ist
eine DSGVO-Entscheidung, kein Geschmack.

**Grün ist Aktionsfarbe, kein Dekor.** Betonung in Überschriften kommt aus dem
Schriftgewicht (700 gegen 400), nicht aus einer zweiten Farbe. Der frühere grüne
Radial-Glow im Seitenkopf und die mintgrüne zweite Headline-Zeile waren die
deutlichsten Vorlagen-Signale und sind entfernt.

**Links tragen keine Unterstriche.** Unter dem Zeiger wächst ein grüner Marker von
der Grundlinie hoch. Links mitten im Fließtext bekommen zusätzlich Gewicht 600 als
ruhendes Merkmal — Farbe allein trägt nicht (Tiefgrün steht nur 1,47:1 gegen den
Fließtext, nötig wären 3:1).

**Die Beispiel-Website „Tischlerei Brinkmann" hat eine eigene Farbwelt** (Tiefblau
`#14202e`, Papierweiß `#f2ece1`, Messing `#c8863c`) **und eine eigene Schrift**
(**Archivo**, Token `--bk-font`) und darf **nie** unsere Palette oder Schrift
tragen: Wir versprechen Gestaltung für genau diesen einen Betrieb — die Arbeitsprobe
muss das vorführen, statt unser eigenes Kalkgrau-Tiefgrün zu wiederholen.

**Logo:** ein M-Monogramm mit Wortmarke, vom Nutzer geliefert. Die Datei liegt noch
nicht im Projekt (erwartet als `assets/img/logo.svg`). Zwei offene Punkte dazu: Das
Monogramm lebt von schmalen Schlitzen zwischen den Diagonalen und braucht für
Header-Größe (22 px) eine vereinfachte Fassung; und die Wortmarke setzt „WebAgency"
in einer kontrastreichen Serif. Mit Fraunces und Newsreader hat sie im
Typo-System eine Entsprechung — ob das Lockup dadurch im Header tragbar wird, ist
noch nicht geprüft. Bis dahin bleibt es beim Monogramm plus Seitenschrift, das
volle Lockup für Impressum, Rechnungen und OG-Bild.

## Evidence on Hand

**Vorhanden:** ein bis zwei echte, abgeschlossene Kundenprojekte. Screenshots davon liegen
noch nicht im Repo.

**Nicht vorhanden, und deshalb nicht erfindbar:** Es gibt keine belegten
Ergebniszahlen, keine Testimonials, keine Kundennamen, keine Fallstudien, keine
Ladezeit- oder Ranking-Messungen. Alles, was in der Baustellen-Animation an Zahlen
auftaucht, ist Beispielinhalt einer erfundenen Musterseite (Tischlerei Brinkmann) —
keine Messwerte. Der Hinweis darauf steht sichtbar an der Animation und bleibt dort.

Die früheren Projektkarten mit SVG-Platzhaltern (`assets/img/case-*.svg`) und die
Seite `referenzen.html` sind entfernt; die Dateien existieren nicht mehr. Künftige
Arbeit ersetzt Platzhalter durch Belegtes oder entfernt sie — sie füllt sie nicht
mit Plausiblem auf.

`assets/img/team-placeholder.svg` und `assets/img/hero-poster.jpg` waren unbelegt
und von keiner Seite mehr eingebunden — beide sind entfernt.

**Teilbild und App-Symbol (neu 2026-08-19):** `assets/img/og-image.png` (1200x630)
und `assets/img/apple-touch-icon.png` (180x180) sind aus dem aktuellen System neu
gebaut. Die Vorgaenger stammten von Mitte Juli und zeigten gesperrte Versalien, den
gruenen Radial-Schein, das alte Marineblau und einen abgeloesten Slogan; das
App-Symbol trug sogar ein voellig anderes Zeichen als der Browser-Tab. Gebaut werden
sie aus einer SVG mit base64-eingebetteten Schriften, gerastert per
`qlmanage -t -s <breite>` und zugeschnitten per `sips` — auf diesem Rechner gibt es
weder Node noch ImageMagick noch rsvg. qlmanage polstert auf ein Quadrat, deshalb
liegt das Motiv mittig auf einer 1200x1200-Buehne und wird danach mittig
beschnitten.

**Bilder allgemein:** Auf Wunsch des Inhabers (2026-08-18) wird noch keine Bildwelt
erzeugt, solange keine Bildrichtung feststeht. Nicht ungefragt generieren. Das gilt
fuer Motive, nicht fuer Marken- und Teilbilder aus dem eigenen System.

## Product Principles

1. **Der Auftritt ist der Beweis.** Was die Seite über Qualität behauptet, muss sie an
   sich selbst vorführen — in Ladezeit, Struktur und Gestaltung. Ein Baukasten-Reflex auf
   dieser Seite widerlegt das Angebot. Der Beweis liegt im Ergebnis, nie im
   Herstellungsweg: Wie die Seite entstanden ist, ist kein Verkaufsargument.
2. **Ein Ziel pro Seite.** Jede Seite führt zum Erstgespräch. Zweitziele, die davon
   ablenken, kommen nicht dazu.
3. **Nur behaupten, was belegt ist.** Lieber eine Lücke sichtbar lassen als sie mit
   plausiblen Zahlen füllen. Das ist zugleich Grundsatz 1 der Agentur („Ehrlich verkauft
   sich besser") und Voraussetzung dafür, dass die Seite dem eigenen Ton standhält.
4. **Klarheit vor Cleverness.** Wenn ein Satz erklärt werden muss, ist er falsch
   geschrieben. Fachbegriffe nur, wenn der Kunde sie selbst benutzt.
5. **Mobil ist der Normalfall.** Über 60 % der Besucher kommen mobil, oft unterwegs.
   Was auf dem Handy im Transporter nicht lesbar ist, existiert nicht.

## Accessibility & Inclusion

Kein vom Nutzer gesetzter Standard. Aus dem Code ablesbare, bereits gelebte Praxis
(bestätigt als Beobachtung, nicht als Zusage): Skip-Link, `aria-expanded`/`aria-controls`
an allen Bedienelementen, Screenreader-Textalternative zum Laufband, sichtbarer
Fokus-Ring, und eine vollständige ruhige Fassung der Baustellen-Animation unter
`prefers-reduced-motion: reduce`. Dieses Niveau ist der Ausgangspunkt für weitere Arbeit.
