/* ==========================================================================
   Mathew WebAgency — site.js
   Vanilla JS. GSAP + ScrollTrigger + Lenis sind lokal eingebunden.

   Reihenfolge:
   1. Grundlagen (Header, Menü, Reveals, FAQ)
   2. Signature: "Die Baustelle" — gepinnt und scroll-gescrubbt
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

  /* Leistungsverzeichnis: eine Zeile offen, wie eine Akkordeon-Mappe. */
  function initLv() {
    var items = document.querySelectorAll('.lv__item');
    items.forEach(function (item) {
      var btn = item.querySelector('.lv__btn');
      var panel = item.querySelector('.lv__panel');
      if (!btn || !panel) return;
      btn.addEventListener('click', function () {
        var open = item.classList.contains('is-open');
        items.forEach(function (o) {
          o.classList.remove('is-open');
          var b = o.querySelector('.lv__btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
        if (hasST) ScrollTrigger.refresh();
      });
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
  /* SIGNATURE — "Die Baustelle"
     Eine Baukastenseite wird beim Scrollen abgerissen und neu gebaut.
     Echtes Scrubbing: die Timeline hängt am Scrollfortschritt, nicht an
     einem Timer, damit das Tempo dem Nutzer gehört.

     Phasen:
       0.00–0.18  Bestand — die alte Seite steht, Cookie-Wand verdeckt sie
       0.18–0.44  Abriss  — Elemente fliegen gestaffelt heraus
       0.44–0.52  Bauline — grüner Strich wischt durchs Bild
       0.52–0.86  Aufbau  — Raster, Headline, Bildfeld, Button, Handy
       0.86–1.00  Fertig  — Kennwerte setzen sich, Rahmen atmet aus
  */
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

    gsap.set(neu, { opacity: 0 });
    gsap.set(grid, { opacity: 0 });
    gsap.set([newBar, newHParts, newCopy, newStrip], { opacity: 0, y: 14 });
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

    /* --- Bestand: nur leichtes Heranfahren, damit es "lebt" ------------ */
    tl.to(frame, { scale: 1.015, duration: 0.18 }, 0);

    /* --- Abriss: Cookie-Wand kippt weg, dann fliegt der Rest ---------- */
    tl.to(
      oldCookie,
      { y: 90, opacity: 0, rotate: 2, duration: 0.08, ease: 'power2.in' },
      0.18
    )
      .to(
        oldCounter,
        { opacity: 0, scale: 0.7, duration: 0.06 },
        0.2
      )
      .to(
        oldLines,
        {
          opacity: 0,
          x: function (i) {
            return (i % 2 ? -1 : 1) * (40 + i * 12);
          },
          scaleX: 0.2,
          duration: 0.14,
          stagger: { each: 0.006, from: 'end' },
          ease: 'power2.in'
        },
        0.21
      )
      .to(
        oldPhoto,
        { opacity: 0, y: 60, rotate: -7, duration: 0.13, ease: 'power2.in' },
        0.25
      )
      .to(
        oldBtn,
        { opacity: 0, y: 40, duration: 0.1, ease: 'power2.in' },
        0.27
      )
      .to(
        oldBar,
        { opacity: 0, y: -50, duration: 0.11, ease: 'power2.in' },
        0.29
      )
      .to(
        oldTitle,
        { opacity: 0, scale: 0.86, filter: 'blur(6px)', duration: 0.13 },
        0.31
      )
      .to(old, { opacity: 0, duration: 0.06 }, 0.42);

    /* --- Bauline: der Wischer, der den Schnitt macht ------------------ */
    tl.set(sweep, { opacity: 1, left: '-2%' }, 0.44)
      .to(sweep, { left: '102%', duration: 0.08, ease: 'power1.inOut' }, 0.44)
      .to(sweep, { opacity: 0, duration: 0.02 }, 0.52)
      /* Bauraster blitzt auf und verschwindet wieder */
      .to(grid, { opacity: 1, duration: 0.05 }, 0.45)
      .to(grid, { opacity: 0, duration: 0.12 }, 0.66);

    /* --- Aufbau: von oben nach unten, wie ein echtes Layout ---------- */
    tl.to(neu, { opacity: 1, duration: 0.04 }, 0.5)
      .to(newBar, { opacity: 1, y: 0, duration: 0.06 }, 0.53)
      .to(
        newHParts,
        { opacity: 1, y: 0, duration: 0.1, stagger: 0.05 },
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
      /* Die Regalböden schieben sich ein — wie beim Einbauen. */
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
        { opacity: 1, scale: 1, duration: 0.1, ease: 'back.out(2.4)' },
        0.78
      );

    if (phone) {
      tl.to(
        phone,
        { opacity: 1, x: 0, rotate: 0, duration: 0.12, ease: 'power3.out' },
        0.76
      );
    }

    tl.to(newCopy, { opacity: 1, y: 0, duration: 0.07 }, 0.84)
      .to(
        newStrip,
        { opacity: 1, y: 0, duration: 0.07, stagger: 0.02 },
        0.88
      )
      .to(frame, { scale: 1, duration: 0.1 }, 0.9);

    /* Für Tests: erlaubt es, die Timeline von außen abzuspielen. */
    window.__rb = tl;

    paintBeat(0);
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

  function initForm() {
    var form = document.querySelector('.form');
    if (!form) return;
    var status = form.querySelector('.form__status');

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
        if (status) {
          status.dataset.state = 'err';
          status.textContent =
            'Das Formular ist noch nicht angeschlossen. Schreib uns bis dahin direkt: Mathew-WebAgency@web.de oder +49 179 2382 180.';
        }
        return;
      }
      if (status) {
        status.dataset.state = '';
        status.textContent = 'Wird gesendet …';
      }
    });
  }

  /* ------------------------------------------------------------ Start ---- */

  function boot() {
    initLenis();
    initHeader();
    initMenu();
    initReveals();
    initLv();
    initFaq();
    initBeforeAfter();
    initForm();
    initRebuild();
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
