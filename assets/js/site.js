/* ==========================================================================
   Mathew WebAgency – site.js
   Vanilla JS. GSAP + ScrollTrigger + Lenis sind lokal eingebunden.

   Reihenfolge:
   1. Grundlagen (Header, Menü, Reveals, FAQ)
   2. Signature: "Die Baustelle" – gepinnt und scroll-gescrubbt
   3. Vorher/Nachher-Schieber
   4. Formular
   ========================================================================== */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof window.gsap !== 'undefined';
  var hasST = hasGsap && typeof window.ScrollTrigger !== 'undefined';

  if (hasST) gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------------- 1 ---- */

  /* Smooth-Scroll nur, wenn Bewegung erlaubt ist. Lenis treibt ScrollTrigger. */
  function initLenis() {
    if (reduced || typeof window.Lenis === 'undefined') return;
    var lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    window.lenis = lenis;
    function raf(t) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    if (hasST) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }
    /* Anker-Links über Lenis führen, sonst springt es. */
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
      });
    });
  }

  /* Header: wird beim Scrollen kompakt, und weiß, ob er über Tinte steht. */
  function initHeader() {
    var hdr = document.querySelector('.hdr');
    if (!hdr) return;
    /* Nur die Unterseiten öffnen dunkel. Die Startseite beginnt auf Papier,
       dort läuft der Header von Anfang an in normaler Optik. */
    var dark = document.querySelector('.phead');

    function onScroll() {
      hdr.classList.toggle('is-stuck', window.scrollY > 24);
      if (dark) {
        var end = dark.getBoundingClientRect().bottom;
        hdr.classList.toggle('on-dark', end > 56);
      }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initMenu() {
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.mnav');
    if (!burger || !menu) return;

    function set(open) {
      burger.setAttribute('aria-expanded', String(open));
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    }
    burger.addEventListener('click', function () {
      set(burger.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        set(false);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') set(false);
    });
  }

  /* Reveals: bewusst schlicht. Der Wow-Moment gehört der Baustelle. */
  function initReveals() {
    var items = document.querySelectorAll('.rev');
    if (!items.length) return;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach(function (el) {
        el.classList.add('is-revealed');
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          var d = parseFloat(el.dataset.revDelay || 0);
          el.style.transitionDelay = d + 's';
          el.classList.add('is-revealed');
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );
    items.forEach(function (el) {
      io.observe(el);
    });
  }

  /* Zeiger: ein Ring, der dem Systemzeiger mit leichter Verzögerung folgt
     und über Bedienelementen zufasst. Bei reduzierter Bewegung entfällt er
     – eine nachlaufende Ebene ist genau das, was der Nutzer abbestellt hat.

     Die Zeigerart wird nicht über eine Media Query entschieden, sondern am
     Ereignis selbst: `(pointer: fine)` meldet grob, sobald ein Browser
     Touch nachstellt – in der Handy-Vorschau am Rechner steckt aber weiter
     eine Maus dahinter, und der Ring fehlte dort. Gebaut wird der Ring
     deshalb erst bei der ersten echten Mausbewegung. Auf einem Gerät ohne
     Maus tritt sie nie ein, dort entsteht auch kein Ring. */
  function initCursor() {
    if (reduced) return;

    var el = null;
    var tx = 0, ty = 0, x = 0, y = 0, started = false;

    function build() {
      el = document.createElement('div');
      el.className = 'cur';
      el.setAttribute('aria-hidden', 'true');
      document.body.appendChild(el);

      (function loop() {
        x += (tx - x) * 0.18;
        y += (ty - y) * 0.18;
        el.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
        requestAnimationFrame(loop);
      })();

      document.addEventListener('mouseleave', function () {
        el.classList.remove('is-on');
      });
      document.addEventListener('mouseenter', function () {
        if (started) el.classList.add('is-on');
      });
    }

    document.addEventListener(
      'pointermove',
      function (e) {
        if (e.pointerType !== 'mouse') return;
        if (!el) build();
        tx = e.clientX;
        ty = e.clientY;
        if (!started) {
          started = true;
          x = tx;
          y = ty;
          el.classList.add('is-on');
        }
        var t = e.target;
        var hot = t.closest('a, button, summary, input, textarea, label, [role="button"]');
        var text = t.closest('input[type="text"], input[type="email"], input[type="tel"], textarea');
        el.classList.toggle('is-text', !!text);
        el.classList.toggle('is-hot', !!hot && !text);
      },
      { passive: true }
    );
  }

  /* Kopf-Öffnung: die erste Überschrift der Seite wird gesetzt, Wort für
     Wort unter der eigenen Kante hervor. Läuft beim Laden, nicht beim
     Scrollen – der Besucher soll etwas sehen, bevor er etwas liest.

     Der Screenreader bekommt den Satz am Stück über aria-label; die
     Wort-Container sind für ihn nicht vorhanden. Ohne JS oder bei
     reduzierter Bewegung steht die Überschrift unverändert da. */
  function initHeadOpen() {
    var h = document.querySelector('.hero__h, .phead h1');
    if (!h || reduced || !hasGsap) return;

    var text = h.textContent.replace(/\s+/g, ' ').trim();

    /* Zeilen bleiben Zeilen: .claim-b trägt den Widerspruch und muss seinen
       eigenen Umbruch behalten. */
    var lines = [];
    h.childNodes.forEach(function (node) {
      if (node.nodeType === 3) {
        var t = node.textContent.replace(/\s+/g, ' ').trim();
        if (t) lines.push({ text: t, cls: '' });
      } else if (node.nodeType === 1) {
        lines.push({ text: node.textContent.trim(), cls: node.className });
      }
    });
    if (!lines.length) return;

    h.setAttribute('aria-label', text);
    h.innerHTML = '';

    var words = [];
    lines.forEach(function (line) {
      var lineEl = document.createElement('span');
      lineEl.className = 'ko__line ' + line.cls;
      lineEl.setAttribute('aria-hidden', 'true');
      line.text.split(' ').forEach(function (w, i) {
        /* Das Trennzeichen steht zwischen den Masken, nicht in ihnen: nur
           so verwirft der Browser es am Zeilenumbruch, statt die Folgezeile
           einzurücken. */
        if (i > 0) lineEl.appendChild(document.createTextNode(' '));
        var mask = document.createElement('span');
        mask.className = 'ko__mask';
        var inner = document.createElement('span');
        inner.className = 'ko__w';
        inner.textContent = w;
        mask.appendChild(inner);
        lineEl.appendChild(mask);
        words.push(inner);
      });
      h.appendChild(lineEl);
    });

    /* 132 statt 108: die Maske hat unten 0.2em Luft fuer die Unterlaengen,
       das Wort muss vor der Bewegung entsprechend tiefer stehen. */
    gsap.set(words, { yPercent: 132 });
    gsap.to(words, {
      yPercent: 0,
      duration: 0.85,
      ease: 'expo.out',
      stagger: 0.055,
      delay: 0.12
    });
  }

  /* Nur eine FAQ-Antwort gleichzeitig offen halten. */
  function initFaq() {
    var all = document.querySelectorAll('.faq details');
    all.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        all.forEach(function (o) {
          if (o !== d) o.open = false;
        });
      });
    });
  }

  /* ---------------------------------------------------------------- 2 ---- */
  /* SIGNATURE – "Die Baustelle"
     Eine Baukastenseite wird beim Scrollen abgerissen und neu gebaut.
     Echtes Scrubbing: die Timeline hängt am Scrollfortschritt, nicht an
     einem Timer, damit das Tempo dem Nutzer gehört.

     Phasen:
       0.00–0.18  Bestand – die alte Seite steht, Cookie-Wand verdeckt sie
       0.18–0.44  Abriss  – Elemente fliegen gestaffelt heraus
       0.44–0.52  Bauline – grüner Strich wischt durchs Bild
       0.52–0.86  Aufbau  – Raster, Headline, Bildfeld, Button, Handy
       0.86–1.00  Fertig  – Kennwerte setzen sich, Rahmen atmet aus
  */
  /* Die Buehne der Baustelle misst sich selbst.

     Der Rahmen ist breitengesteuert (siehe .rb__frame im CSS), damit sich
     alle Browser gleich verhalten - Safari leitet bei width: auto die
     Breite eines Flex-Kindes nicht aus dem Seitenverhaeltnis ab und
     schrumpfte den Rahmen auf 250px. Breitengesteuert kann er dafuer auf
     flachen Fenstern zu hoch werden. Wie hoch er hoechstens sein darf,
     laesst sich in CSS nicht ausdruecken: es ist die Buehnenhoehe minus
     Kopf, minus Abstaende, und der Kopf bricht je nach Breite anders um.
     Also wird gemessen statt gerechnet. */
  /* Die Spur auf schmalen Schirmen.

     Am Rechner laeuft die Ablaufseite ueber eine gepinnte Buehne. Die
     braucht Breite fuer Schiene und Tafel nebeneinander, weshalb auf dem
     Telefon die ruhige Liste uebernimmt - und damit lief die Seite dort
     ganz ohne Bewegung. Statt die Buehne zu erzwingen (gepinntes Scrollen
     ist auf mobilem Safari heikel) zeichnet sich hier eine senkrechte
     Linie durch die Liste, und jede Phase setzt sich beim Erreichen.

     Bewusst ohne ScrollTrigger: die Ablaufseite laedt GSAP zwar, aber
     diese Spur soll auch dann laufen, wenn die gepinnte Fassung nicht
     greift. Ein Scroll-Horcher mit requestAnimationFrame reicht. */
  function initStepTrail() {
    var liste = document.querySelector('.track__static .steps');
    if (!liste) return;
    var schritte = [].slice.call(liste.querySelectorAll('.step'));
    if (!schritte.length) return;

    var grund = document.createElement('span');
    grund.className = 'steps__base';
    grund.setAttribute('aria-hidden', 'true');
    var linie = document.createElement('span');
    linie.className = 'steps__draw';
    linie.setAttribute('aria-hidden', 'true');
    liste.appendChild(grund);
    liste.appendChild(linie);

    if (reduced) {
      schritte.forEach(function (el) {
        el.classList.add('is-on');
      });
      return;
    }

    var wartet = false;

    function zeichne() {
      wartet = false;
      var r = liste.getBoundingClientRect();
      if (!r.height) return;
      /* Die Linie folgt einem Punkt bei 55 Prozent der Bildhoehe: dort
         landet beim Scrollen das, was man gerade liest. */
      var marke = window.innerHeight * 0.55;
      var p = (marke - r.top) / r.height;
      p = p < 0 ? 0 : p > 1 ? 1 : p;
      linie.style.transform = 'scaleY(' + p + ')';

      schritte.forEach(function (el) {
        var er = el.getBoundingClientRect();
        el.classList.toggle('is-on', er.top < marke);
      });
    }

    function beiScroll() {
      if (wartet) return;
      wartet = true;
      requestAnimationFrame(zeichne);
    }

    window.addEventListener('scroll', beiScroll, { passive: true });
    window.addEventListener('resize', beiScroll, { passive: true });
    zeichne();
  }

  function initStageFit() {
    var feld = document.querySelector('.rb__field');
    if (!feld) return;
    var stapel = feld.querySelector('.rb__stack');
    if (!stapel) return;

    function passe() {
      /* Gilt in jeder Ansicht. Das CSS waehlt nur das Verhaeltnis - quer am
         Rechner, hochkant auf dem Telefon -, die Grenze ist immer die
         gemessene freie Hoehe. */
      var hoehe = feld.clientHeight;
      if (!hoehe) return;
      stapel.style.setProperty('--rb-max', hoehe + 'px');
    }

    passe();
    window.addEventListener('resize', passe, { passive: true });
    window.addEventListener('orientationchange', passe);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(passe);
    }
  }

  function initRebuild() {
    var rb = document.querySelector('.rb');
    if (!rb || reduced || !hasST) return;

    var frame = rb.querySelector('.rb__frame');
    var grid = rb.querySelector('.rb__grid');
    var sweep = rb.querySelector('.rb__sweep');
    var old = rb.querySelector('.old');
    var neu = rb.querySelector('.new');
    var phone = rb.querySelector('.rb__phone');
    var state = rb.querySelector('.rb__state');
    var stateTxt = state && state.querySelector('.rb__label');
    var caption = rb.querySelector('.rb__caption');
    var url = rb.querySelector('.rb__url');

    if (!frame || !old || !neu) return;

    /* Textstände: der Rahmen kommentiert sich selbst. */
    var beats = [
      {
        at: 0,
        phase: 'alt',
        label: 'Bestand',
        url: 'www.tischlerei-brinkmann.de/start.htm',
        title: 'Eine Tischlerei, die keiner findet.',
        text: 'Brinkmann baut Einbauschränke nach Maß. Die Seite sagt „Herzlich Willkommen“, führt ein Gästebuch im Menü und stellt eine Cookie-Wand über den halben Inhalt.'
      },
      {
        at: 0.22,
        phase: 'abriss',
        label: 'Abriss',
        url: 'www.tischlerei-brinkmann.de/start.htm',
        title: 'Alles raus, was keine Anfrage bringt.',
        text: 'Blindtext, Zierrat, Besucherzähler. Es bleibt nur, wonach ein Kunde tatsächlich sucht: was der Betrieb macht, wie es aussieht, und wie man einen Termin bekommt.'
      },
      {
        at: 0.52,
        phase: 'neu',
        label: 'Aufbau',
        url: 'tischlerei-brinkmann.de',
        title: 'Erst die Aussage, dann alles andere.',
        text: '„Möbel nach Maß. Aus einer Werkstatt.“ steht in der ersten Zeile. Daneben die Arbeit selbst, darunter ein Satz, der erklärt, wofür man Brinkmann holt.'
      },
      {
        at: 0.88,
        phase: 'neu',
        label: 'Fertig',
        url: 'tischlerei-brinkmann.de',
        title: 'Ein Weg. Auf jedem Gerät derselbe.',
        text: 'Ein Ziel pro Seite, lesbar auf dem Handy in der Werkstatt. Was Brinkmann kann, sieht man jetzt in der ersten Sekunde – nicht erst im dritten Klick.'
      }
    ];

    var current = -1;
    function paintBeat(p) {
      var i = 0;
      for (var k = 0; k < beats.length; k++) if (p >= beats[k].at) i = k;
      if (i === current) return;
      current = i;
      var b = beats[i];
      if (state) state.dataset.phase = b.phase;
      if (stateTxt) stateTxt.textContent = b.label;
      if (url) url.textContent = b.url;
      if (caption) {
        /* Der Einblender läuft per CSS-Animation: durch das Neusetzen von
           innerHTML startet sie von selbst neu und hängt nicht am
           GSAP-Ticker (der in Hintergrund-Tabs pausiert). */
        caption.innerHTML =
          '<strong>' + b.title + '</strong><p>' + b.text + '</p>';
      }
    }

    /* Bausteine der alten Seite, gestaffelt nach "Reißfolge". */
    var oldBar = old.querySelector('.old__bar');
    var oldTitle = old.querySelector('.old__title');
    var oldLines = old.querySelectorAll('.old__lines i');
    var oldPhoto = old.querySelector('.old__photo');
    var oldBtn = old.querySelector('.old__btn');
    var oldCounter = old.querySelector('.old__counter');
    var oldCookie = old.querySelector('.old__cookie');

    var newBar = neu.querySelector('.new__bar');
    var newHParts = neu.querySelectorAll('.new__h > *');
    var newImg = neu.querySelector('.new__img');
    var newShelves = neu.querySelectorAll('.new__shelf i');
    var newCopy = neu.querySelector('.new__copy');
    var newCta = neu.querySelector('.new__cta');
    var newStrip = neu.querySelectorAll('.new__strip span');

    /* Die neue Seite liegt von Anfang an fertig da, nur abgeschnitten. Sie
       wird von der Bauline freigelegt, nicht eingeblendet – deshalb clipPath
       statt opacity. */
    gsap.set(neu, { opacity: 1, clipPath: 'inset(0% 100% 0% 0%)' });
    gsap.set(grid, { opacity: 0 });
    /* Die Kopfleiste steht schon, bevor die Bauline kommt: sie ist Teil
       dessen, was freigelegt wird, nicht Teil des Aufbaus. Sonst legt der
       Wischer eine leere Fläche frei und übergibt nichts. */
    gsap.set(newBar, { opacity: 1, y: 0 });
    gsap.set([newHParts, newCopy, newStrip], { opacity: 0, y: 14 });
    gsap.set(newShelves, { opacity: 0, x: -18 });
    gsap.set(newImg, { clipPath: 'inset(0% 0% 100% 0%)' });
    gsap.set(newCta, { opacity: 0, scale: 0.5 });
    if (phone) gsap.set(phone, { opacity: 0, x: 90, rotate: 6 });

    var tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: rb,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.7,
        /* Kein GSAP-Pin: die Bühne klebt per CSS (position: sticky).
           Das funktioniert auch ohne JS und spart eine fixierte Ebene. */
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          paintBeat(self.progress);
        }
      }
    });

    /* --- Bestand: leichtes Heranfahren, der Raum kippt kaum merklich --- */
    tl.to(frame, { scale: 1.015, duration: 0.18 }, 0).to(
      frame,
      { rotateY: -7, rotateX: 3, duration: 0.26 },
      0.16
    );

    /* --- Abriss: nichts blendet aus, alles fällt. Die Unschärfe wächst
           mit der Fallgeschwindigkeit, der Schatten mit der Fallhöhe. --- */
    tl.to(
      oldCookie,
      {
        y: 130,
        rotate: 5,
        opacity: 0,
        filter: 'blur(7px)',
        duration: 0.09,
        ease: 'power2.in'
      },
      0.18
    )
      .to(oldCounter, { opacity: 0, scale: 0.7, duration: 0.06 }, 0.2)
      .to(
        oldLines,
        {
          opacity: 0,
          x: function (i) {
            return (i % 2 ? -1 : 1) * (60 + i * 16);
          },
          y: function (i) {
            return 30 + i * 9;
          },
          rotate: function (i) {
            return (i % 2 ? -1 : 1) * (5 + i);
          },
          scaleX: 0.3,
          filter: 'blur(4px)',
          duration: 0.16,
          stagger: { each: 0.007, from: 'end' },
          ease: 'power2.in'
        },
        0.21
      )
      .to(
        oldPhoto,
        {
          y: 150,
          rotate: -14,
          scale: 0.86,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 0.15,
          ease: 'power2.in'
        },
        0.25
      )
      .to(
        oldBtn,
        {
          y: 110,
          rotate: 9,
          opacity: 0,
          filter: 'blur(5px)',
          duration: 0.12,
          ease: 'power2.in'
        },
        0.27
      )
      .to(
        oldBar,
        {
          y: -80,
          rotate: -3,
          opacity: 0,
          filter: 'blur(5px)',
          duration: 0.12,
          ease: 'power2.in'
        },
        0.29
      )
      .to(
        oldTitle,
        {
          y: 90,
          scale: 0.8,
          opacity: 0,
          filter: 'blur(10px)',
          duration: 0.14,
          ease: 'power2.in'
        },
        0.31
      )
      .to(old, { opacity: 0, duration: 0.05 }, 0.43);

    /* --- Bauline: die Kante läuft durch, und hinter ihr liegt die neue
           Seite frei. Freilegen und Durchlauf teilen sich exakt dasselbe
           Zeitfenster – sonst löst sich die Kante vom Ergebnis. --- */
    tl.set(sweep, { opacity: 1, left: '-3%' }, 0.44)
      .to(sweep, { left: '103%', duration: 0.1, ease: 'power1.inOut' }, 0.44)
      .to(
        neu,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.1,
          ease: 'power1.inOut'
        },
        0.44
      )
      .to(sweep, { opacity: 0, duration: 0.02 }, 0.54)
      /* Bauraster blitzt auf und verschwindet wieder */
      .to(grid, { opacity: 1, duration: 0.05 }, 0.45)
      .to(grid, { opacity: 0, duration: 0.12 }, 0.66);

    /* --- Aufbau: von oben nach unten, wie ein echtes Layout ---------- */
    /* Die Headline wird gesetzt, nicht eingeblendet: jede Zeile kommt
       in Leserichtung unter ihrer eigenen Kante hervor. */
    tl.fromTo(
        newHParts,
        { clipPath: 'inset(0% 100% 0% 0%)' },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.11,
          stagger: 0.05,
          ease: 'power2.out'
        },
        0.57
      )
      .to(
        newImg,
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.14,
          ease: 'power2.out'
        },
        0.63
      )
      /* Die Regalböden schieben sich ein – wie beim Einbauen. */
      .to(
        newShelves,
        {
          opacity: 1,
          x: 0,
          duration: 0.1,
          stagger: 0.025,
          ease: 'power2.out'
        },
        0.7
      )
      .to(
        newCta,
        { opacity: 1, scale: 1, duration: 0.1, ease: 'power3.out' },
        0.78
      );

    if (phone) {
      tl.to(
        phone,
        { opacity: 1, x: 0, rotate: 0, duration: 0.12, ease: 'power3.out' },
        0.76
      );
    }

    /* --- Landung: der Raum stellt sich gerade, der Schatten setzt sich.
           Das ist der Moment, in dem etwas fertig wird. --- */
    tl.to(newCopy, { opacity: 1, y: 0, duration: 0.07 }, 0.84)
      .to(newStrip, { opacity: 1, y: 0, duration: 0.07, stagger: 0.02 }, 0.88)
      .to(
        frame,
        {
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          duration: 0.12,
          ease: 'power2.out'
        },
        0.88
      )
      .to(
        frame,
        {
          boxShadow: '0 46px 90px -34px rgba(16, 23, 26, 0.66)',
          duration: 0.07
        },
        0.9
      )
      .to(
        frame,
        {
          boxShadow: '0 24px 60px -30px rgba(16, 23, 26, 0.4)',
          duration: 0.08
        },
        0.97
      );

    /* Für Tests: erlaubt es, die Timeline von außen abzuspielen. */
    window.__rb = tl;

    paintBeat(0);
  }

  /* ------------------------------------------------------------- 2b ---- */
  /* SIGNATURE (Ablauf) – "Die Spur"
     Die Linie zieht sich am Scrollfortschritt durch fünf Knoten. Anders als
     bei der Baustelle gibt es keine Timeline: der Fortschritt schaltet nur
     zwischen fünf Zuständen, und die Übergänge gehören dem CSS. Das hält
     die Sache billig und macht sie unterbrechungsfest. */
  function initTrack() {
    var track = document.querySelector('.track');
    if (!track || reduced || !hasST) return;
    /* Unter 820px zeigt das CSS die ruhige Liste – dann gibt es keine
       Bühne zu steuern. */
    if (window.matchMedia('(max-width: 819px)').matches) return;

    var draw = track.querySelector('.rail__draw');
    var nodes = track.querySelectorAll('.rail__node');
    var panels = track.querySelectorAll('.tp');
    if (!draw || !nodes.length || nodes.length !== panels.length) return;

    var count = nodes.length;

    /* Ab hier übernimmt das Skript: erst jetzt darf die Bühne die ruhige
       Liste ablösen. */
    track.classList.add('is-live');

    /* Jedes Icon zeichnet sich beim Aktivwerden selbst. Die Pfadlänge steht
       erst nach dem Layout fest, deshalb hier und nicht im CSS. */
    var icons = [];
    panels.forEach(function (p) {
      var path = p.querySelector('.tp__icon path');
      if (!path) {
        icons.push(null);
        return;
      }
      var len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      path.style.transition = 'stroke-dashoffset 0.75s var(--ease)';
      icons.push({ el: path, len: len });
    });

    var current = -1;
    function activate(i) {
      if (i === current) return;
      current = i;
      nodes.forEach(function (n, k) {
        n.classList.toggle('is-on', k === i);
        n.classList.toggle('is-done', k < i);
      });
      panels.forEach(function (p, k) {
        p.classList.toggle('is-on', k === i);
      });
      icons.forEach(function (ic, k) {
        if (!ic) return;
        ic.el.style.strokeDashoffset = k === i ? 0 : ic.len;
      });
    }

    ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: function (self) {
        var p = self.progress;
        draw.style.transform = 'scaleX(' + p + ')';
        /* Der letzte Knoten soll erreicht sein, bevor die Sektion endet –
           sonst steht Phase 05 nur einen Wimpernschlag. */
        var i = Math.min(count - 1, Math.floor(p * count * 1.08));
        activate(i);
      }
    });

    activate(0);
  }

  /* ---------------------------------------------------------------- 3 ---- */

  function initBeforeAfter() {
    document.querySelectorAll('.ba').forEach(function (ba) {
      var after = ba.querySelector('.ba__after');
      var handle = ba.querySelector('.ba__handle');
      var range = ba.querySelector('.ba__range');
      if (!after || !range) return;

      function apply(v) {
        after.style.clipPath = 'inset(0 0 0 ' + v + '%)';
        if (handle) handle.style.left = v + '%';
      }
      range.addEventListener('input', function () {
        apply(range.value);
      });
      apply(range.value);
    });
  }

  /* ---------------------------------------------------------------- 4 ---- */

  /* Das Formular sendet ueber fetch, damit der Absender auf der Seite
     bleibt und die Bestaetigung dort steht, wo er gerade geschrieben hat –
     statt auf einer fremden Danke-Seite zu landen und zurueckfinden zu
     muessen. Ohne JS bleibt der normale POST als Rueckfallebene bestehen;
     dann uebernimmt der Anbieter die Bestaetigung. */
  function initForm() {
    var form = document.querySelector('.form');
    if (!form) return;
    var status = form.querySelector('.form__status');
    var submit = form.querySelector('button[type="submit"]');
    var busy = false;

    function say(state, text) {
      if (!status) return;
      status.dataset.state = state;
      status.textContent = text;
    }

    var DIREKT =
      'Schreib uns bitte direkt: info@mathew-webagency.de oder +49 179 2382 180.';

    form.addEventListener('submit', function (e) {
      /* Honeypot: Bots füllen Felder, die Menschen nicht sehen. */
      var hp = form.querySelector('.hp input');
      if (hp && hp.value) {
        e.preventDefault();
        return;
      }

      /* Ohne echten Endpoint nicht ins Leere senden. */
      var action = form.getAttribute('action') || '';
      if (!action || action.indexOf('DEIN-FORMSPREE-ENDPOINT') !== -1) {
        e.preventDefault();
        say(
          'err',
          'Das Formular ist noch nicht angeschlossen. ' + DIREKT
        );
        return;
      }

      /* Ohne fetch laeuft der gewoehnliche POST weiter. */
      if (!window.fetch) {
        say('', 'Wird gesendet …');
        return;
      }

      e.preventDefault();
      if (busy) return;
      busy = true;
      if (submit) submit.disabled = true;
      say('', 'Wird gesendet …');

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (!res.ok) throw new Error(String(res.status));
          form.reset();
          say(
            'ok',
            'Angekommen. Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag.'
          );
        })
        .catch(function () {
          /* Der Absender hat gerade Zeit investiert - er darf nicht mit
             einer Fehlermeldung allein dastehen. Deshalb steht der Weg,
             der sicher funktioniert, in derselben Zeile. */
          say('err', 'Das hat nicht geklappt. ' + DIREKT);
        })
        .then(function () {
          busy = false;
          if (submit) submit.disabled = false;
        });
    });
  }

  /* ------------------------------------------------------------ Start ---- */

  function boot() {
    initLenis();
    initHeader();
    initMenu();
    initCursor();
    initHeadOpen();
    initReveals();
    initFaq();
    initBeforeAfter();
    initForm();
    initStageFit();
    initStepTrail();
    initRebuild();
    initTrack();
    /* Nach dem Laden der Schriften verschieben sich Höhen. */
    if (document.fonts && hasST) {
      document.fonts.ready.then(function () {
        ScrollTrigger.refresh();
      });
    }
  }

  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
