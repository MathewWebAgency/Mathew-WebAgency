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

Websites (plus lokale Auffindbarkeit, laufende Betreuung, Videoproduktion und digitales
Marketing) für Betriebe, die mehr wollen als „online sein".

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
Produkt, nicht über die Werkzeuge, und ein Wettbewerber auf WordPress-Themes kann sie
nicht wahrheitsgemäß machen. Dazu die Konditionen, die eine klassische Agentur nicht
halten kann:

Vier konkrete Gegenpositionen zur klassischen Agentur, alle bestätigt und alle einlösbar:

- Festpreis **vor** Projektstart statt Abrechnung nach Aufwand; Mehrarbeit trägt die Agentur.
- Zwei bis vier Wochen bis Launch (Regelfall drei) statt sechs Monate Projektlaufzeit.
- Direkte Handynummer und WhatsApp statt Ticketsystem und Hotline.
- Klare Sprache statt Marketing-Sprech; Betreuung monatlich kündbar statt Knebelvertrag.

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

**Logo:** ein M-Monogramm mit Wortmarke, vom Nutzer geliefert. Die Datei liegt noch
nicht im Projekt (erwartet als `assets/img/logo.svg`). Zwei offene Punkte dazu: Das
Monogramm lebt von schmalen Schlitzen zwischen den Diagonalen und braucht für
Header-Größe (22 px) eine vereinfachte Fassung; und die Wortmarke setzt „WebAgency"
in einer kontrastreichen Serif, die im Typo-System der Seite (Bricolage Grotesque,
Instrument Sans) keine Entsprechung hat — im Header deshalb nur das Monogramm plus
Seitenschrift, das volle Lockup für Impressum, Rechnungen und OG-Bild.

## Evidence on Hand

**Vorhanden:** ein bis zwei echte, abgeschlossene Kundenprojekte. Screenshots davon liegen
noch nicht im Repo.

**Nicht vorhanden, und deshalb nicht erfindbar:** Die drei Projektkarten auf `index.html`
und `referenzen.html` zeigen SVG-Platzhalter (`assets/img/case-*.svg`) mit ausgedachten
Kurztexten für Handwerk, GaLaBau und Kanzlei. Es gibt keine belegten Ergebniszahlen, keine
Testimonials, keine Kundennamen, keine Fallstudien, keine Ladezeit- oder
Ranking-Messungen. Die Kennwerte in der Baustellen-Animation („0,7 s Ladezeit", „24 h
Antwort") sind Beispielinhalt einer fiktiven Musterseite, keine Messwerte.

Für die dritte Projektkarte existiert damit keine Deckung. Künftige Arbeit ersetzt
Platzhalter durch Belegtes oder entfernt sie — sie füllt sie nicht mit Plausiblem auf.

`assets/img/team-placeholder.svg` ist ebenfalls unbelegt und derzeit ungenutzt.

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
