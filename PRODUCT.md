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

Handgebaute Websites (plus lokale Auffindbarkeit, laufende Betreuung, Videoproduktion und
digitales Marketing) für Betriebe, die mehr wollen als „online sein".

Diese Website selbst ist das Verkaufsinstrument der Agentur: Sie muss Vertrauen herstellen
und zu genau einer Handlung führen — dem kostenlosen 30-Minuten-Erstgespräch. Erfolg ist
nicht Traffic, sondern die Zahl qualifizierter Erstgespräch-Anfragen.

## Positioning

Der Auftritt beweist die Behauptung, indem er selbst das Gegenteil eines Baukastens ist —
„Von Hand gebaut. Nicht zusammengeklickt." Ein Wettbewerber, der auf WordPress-Themes oder
einem Baukasten arbeitet, könnte diesen Satz nicht wahrheitsgemäß sagen, und eine
klassische Agentur könnte das Tempo- und Preisversprechen nicht halten.

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

**Leistungen (fünf, alle selbst erbracht, kein Weiterreichen an Freelancer):** Websites ·
Auffindbarkeit (lokale Suche, Google-Business-Profil, Technik-SEO) · Betreuung (Updates,
Backups, Inhaltsänderungen) · Video (Image- und Erklärvideos, Kurzformate, KI-gestützt
produziert) · Marketing (Google- und Social-Anzeigen, Content-Plan, monatliche Auswertung).

**Technisch verbindlich:** statisches HTML/CSS/Vanilla JS, kein Framework, kein Build-Step.
GSAP + ScrollTrigger + Lenis liegen lokal im Repo. Zur Laufzeit werden keine externen
Server kontaktiert (Schriften selbst gehostet, kein Google-Fonts-CDN) — das ist eine
DSGVO-Entscheidung und keine Geschmacksfrage. Deployment per FTP nach `public_html/` auf
Hostinger; was im Repo liegt, geht live.

**Terminologie:** „Auffindbarkeit" statt „SEO", wenn es um Kundennutzen geht. Duzen
durchgehend. Der Betrieb heißt „Betrieb", nicht „Unternehmen" oder „Business".

**Offene Entscheidungen — nicht erfinden, sondern klären:**

- *Sitz und Impressum.* Es gibt keinen Sitz in Münster. Die Anschrift für Impressum,
  Datenschutz und AGB steht noch nicht fest; alle drei Seiten tragen dort TODOs.
  Rechtlich zwingend vor Launch.
- *Kein regionaler Fokus.* Bestätigt: Die Agentur arbeitet bundesweit remote und hat
  keinen regionalen Zielmarkt. Die gesamte bestehende Website behauptet jedoch das
  Gegenteil — Koordinaten 51.96° N im Hero und Footer, „Nur Leute aus Münster", „ein
  Termin bei dir im Büro ist keine Fahrt, sondern eine Fahrradstrecke", `areaServed:
  Münster` und `addressLocality: Münster` im Schema-Markup, der Seitentitel „Webdesign
  Münster", „Arbeitet ihr nur in Münster?" in der FAQ. Diese Ortsbehauptungen sind
  unbelegt und müssen aufgelöst werden, bevor die Seite live geht.
- *Formular.* `kontakt.html` hat noch keinen Endpoint (Platzhalter
  `DEIN-FORMSPREE-ENDPOINT`). Bis dahin zeigt es bewusst einen Hinweis mit Telefonnummer
  und E-Mail, statt ins Leere zu senden.
- *Preise.* Es gibt keine veröffentlichte Preisliste und keine Preisspanne. Der Festpreis
  entsteht nach dem Erstgespräch. Keine Zahl erfinden.

## Brand Commitments

**Name:** Mathew WebAgency. **Domain:** mathew-webagency.de (Canonical-, OG-URLs und
sitemap.xml zeigen bereits dorthin).

**Kontakt, öffentlich und bestätigt:** +49 179 2382 180 (auch WhatsApp),
Mathew-WebAgency@web.de, Instagram @mathew_webagency.

**Ansprache:** Der Betrieb wird von einer Person geführt. Die Website spricht dennoch
durchgehend von „wir" — das ist eine bewusste, bestätigte Entscheidung und bleibt so.
Nachgeschärft werden muss dafür alles, was daraus eine Ortsgruppen- oder Team-Behauptung
macht („Nur Leute aus Münster", „Hinter jeder guten Website stehen Menschen"), damit die
Ich-Realität und das Vertrauensversprechen „ein Ansprechpartner, den du kennst" nicht
gegeneinander laufen.

**Stimme:** direkt, bodenständig, ohne Buzzwords. Kurze Sätze, konkrete Zahlen,
gelegentlich trocken. Behauptung und Widerspruch als Satzpaar („Reden kostet nichts.
Außer 30 Minuten.") sind das wiederkehrende rhetorische Muster.

**Bestehendes Designsystem:** „Kalkgrau & Promenadengrün", vollständig dokumentiert in
`README.md` und als Tokens in `assets/css/site.css`. Der Stufengiebel ist Logo und
Ortszeichen zugleich. Beides ist bislang aus Münster hergeleitet und steht deshalb unter
demselben Vorbehalt wie oben.

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

1. **Der Auftritt ist der Beweis.** Was die Seite über handgebaute Qualität behauptet,
   muss sie an sich selbst vorführen — in Ladezeit, Code und Gestaltung. Ein
   Baukasten-Reflex auf dieser Seite widerlegt das Angebot.
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
