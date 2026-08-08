/* Mathew WebAgency — main.js
   Vanilla JS, keine Abhängigkeiten. Alles progressiv: ohne JS bleibt die Seite voll nutzbar. */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Header: Hintergrund einblenden, sobald gescrollt wird
     ------------------------------------------------------------------ */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     Mobile Navigation (Burger + Overlay)
     ------------------------------------------------------------------ */
  var toggle = document.querySelector(".nav-toggle");
  var overlay = document.querySelector(".nav-overlay");
  if (toggle && overlay) {
    var setNav = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
      overlay.classList.toggle("is-open", open);
      header.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-locked", open);
    };
    toggle.addEventListener("click", function () {
      setNav(toggle.getAttribute("aria-expanded") !== "true");
    });
    overlay.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay.classList.contains("is-open")) {
        setNav(false);
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     Scroll-Reveals
     ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length && "IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ------------------------------------------------------------------
     Hero-Video: erst nach dem Load-Event, nur auf größeren Screens,
     nur ohne reduced motion — Mobile sieht das Poster (Performance).
     ------------------------------------------------------------------ */
  var video = document.querySelector(".hero-media video[data-src]");
  if (video && !reduceMotion) {
    var videoQuery = window.matchMedia("(min-width: 768px)");
    var playAttempts = 0;
    var tryPlay = function () {
      if (!video.paused) return;
      playAttempts++;
      var p = video.play();
      if (p && p.catch) p.catch(function () {
        if (playAttempts < 5) setTimeout(tryPlay, 1200);
      });
    };
    var initVideo = function () {
      if (!videoQuery.matches || video.src) return;
      video.src = video.dataset.src;
      video.load();
      video.addEventListener("canplay", function () {
        video.classList.add("is-playing");
        tryPlay();
      }, { once: true });
    };
    if (document.readyState === "complete") {
      initVideo();
    } else {
      window.addEventListener("load", initVideo, { once: true });
    }
    /* Greift auch, wenn der Viewport erst später breit genug wird (Tablet-Rotation) */
    if (videoQuery.addEventListener) videoQuery.addEventListener("change", initVideo);
  }

  /* ------------------------------------------------------------------
     Vorher/Nachher-Slider — der Range-Input macht ihn auch per
     Tastatur und Screenreader bedienbar.
     ------------------------------------------------------------------ */
  document.querySelectorAll(".compare").forEach(function (compare) {
    var range = compare.querySelector(".compare-range");
    if (!range) return;
    var update = function () {
      compare.style.setProperty("--pos", range.value + "%");
    };
    range.addEventListener("input", update);
    update();
  });

  /* ------------------------------------------------------------------
     Kontaktformular
     TODO: In kontakt.html die Formular-action durch euren echten
     Formspree-Endpoint ersetzen (https://formspree.io — Formular
     anlegen, ID eintragen). Solange der Platzhalter aktiv ist, zeigt
     das Formular einen Hinweis mit Direktkontakt an.
     ------------------------------------------------------------------ */
  var form = document.querySelector("form[data-contact-form]");
  if (form) {
    var status = form.querySelector(".form-status");
    var showStatus = function (ok, msg) {
      if (!status) return;
      status.hidden = false;
      status.classList.toggle("is-ok", ok);
      status.classList.toggle("is-error", !ok);
      status.textContent = msg;
      status.scrollIntoView({ block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      /* Honeypot: Bots füllen das unsichtbare Feld — dann still abbrechen */
      var hp = form.querySelector('[name="_gotcha"]');
      if (hp && hp.value) return;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var action = form.getAttribute("action") || "";
      if (action.indexOf("DEIN-FORMSPREE-ENDPOINT") !== -1) {
        showStatus(false, "Das Formular ist noch nicht angeschlossen. Schreib uns direkt an Mathew-WebAgency@web.de oder ruf an: +49 179 2382 180.");
        return;
      }

      var submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            showStatus(true, "Danke für deine Nachricht! Wir melden uns innerhalb von 24 Stunden bei dir.");
          } else {
            throw new Error("send failed");
          }
        })
        .catch(function () {
          showStatus(false, "Das hat leider nicht geklappt. Schreib uns direkt an Mathew-WebAgency@web.de oder ruf an: +49 179 2382 180.");
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }

  /* ------------------------------------------------------------------
     Aktuelles Jahr im Footer
     ------------------------------------------------------------------ */
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
