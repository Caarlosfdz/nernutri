/* =============================================================
   NERNUTRI — main.js  ?v=20260615b
   IIFE pattern. No import/export. No type="module".
   ============================================================= */
(function () {
  "use strict";

  /* ── Helpers ── */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.from((root || document).querySelectorAll(sel)); };
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  function safe(fn, name) {
    try { fn(); }
    catch (e) { console.warn("[nernutri:" + name + "]", e); }
  }

  /* ── Data from manifest ── */
  var D = window.__NERNUTRI__ || {};
  var waUrl = "https://wa.me/" + (D.whatsapp || "34602592794") +
    "?text=" + (D.whatsappMsg || "Hola%2C%20me%20gustar%C3%ADa%20pedir%20una%20consulta%20inicial%20gratuita.");

  /* ══════════════════════════════════════════
     1. SPLASH — double safety net
  ══════════════════════════════════════════ */
  function initSplash() {
    var splash = $("#splash");
    if (!splash) return;

    function hide() {
      splash.classList.add("is-hidden");
      setTimeout(function () { splash.remove(); }, 700);
      document.body.style.overflow = "";
    }

    document.body.style.overflow = "hidden";

    /* JS safety net fires at 5s (CSS fires at 4.5s) */
    setTimeout(hide, 5000);

    /* If JS is fast, also hide on DOMContentLoaded */
    if (document.readyState === "complete") {
      setTimeout(hide, 300);
    } else {
      window.addEventListener("load", function () {
        setTimeout(hide, 300);
      });
    }
  }

  /* ══════════════════════════════════════════
     2. NAVIGATION — sticky + mobile toggle
  ══════════════════════════════════════════ */
  function initNav() {
    var nav = $("#nav");
    var burger = $("#nav-burger");
    var mobileNav = $("#nav-mobile");
    if (!nav) return;

    /* Sticky solidify on scroll */
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        if (window.scrollY > 60) {
          nav.classList.add("is-scrolled");
        } else {
          nav.classList.remove("is-scrolled");
        }
        ticking = false;
      });
    }, { passive: true });

    /* Mobile burger */
    if (burger && mobileNav) {
      burger.addEventListener("click", function () {
        var open = nav.classList.toggle("is-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
        document.body.style.overflow = open ? "hidden" : "";
      });

      /* Close on link click */
      $$(".nav-mobile-link", mobileNav).forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          mobileNav.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
        });
      });

      /* Close on backdrop click (outside menu) */
      mobileNav.addEventListener("click", function (e) {
        if (e.target === mobileNav) {
          nav.classList.remove("is-open");
          burger.setAttribute("aria-expanded", "false");
          mobileNav.setAttribute("aria-hidden", "true");
          document.body.style.overflow = "";
        }
      });
    }

    /* Smooth anchor scroll with offset for fixed nav */
    document.addEventListener("click", function (e) {
      var link = e.target.closest('a[href^="#"]');
      if (!link) return;
      var id = link.getAttribute("href").slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var navH = nav.offsetHeight;
      var top = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  }

  /* ══════════════════════════════════════════
     3. MOUSE-REACTIVE GRADIENT
  ══════════════════════════════════════════ */
  function initGradient() {
    if (!fineHover) return;

    var raf = null;
    var tx = 50, ty = 50;
    var cx = 50, cy = 50;

    window.addEventListener("mousemove", function (e) {
      tx = (e.clientX / window.innerWidth) * 100;
      ty = (e.clientY / window.innerHeight) * 100;
      if (!raf) raf = requestAnimationFrame(tick);
    }, { passive: true });

    function tick() {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      document.documentElement.style.setProperty("--mx", cx.toFixed(1) + "%");
      document.documentElement.style.setProperty("--my", cy.toFixed(1) + "%");
      raf = (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1)
        ? requestAnimationFrame(tick)
        : null;
    }
  }

  /* ══════════════════════════════════════════
     4. CUSTOM CURSOR
  ══════════════════════════════════════════ */
  function initCursor() {
    var root = $("[data-cursor-root]");
    if (!root || !fineHover) return;

    document.documentElement.classList.add("has-cursor");
    var ring = $(".cursor-ring", root);
    var dot = $(".cursor-dot", root);
    var tx = 0, ty = 0, rx = 0, ry = 0;
    var firstMove = false;

    window.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      if (dot) dot.style.transform = "translate3d(" + tx + "px," + ty + "px,0)";
      if (!firstMove) {
        firstMove = true;
        rx = tx; ry = ty;
        if (ring) ring.style.transform = "translate3d(" + rx + "px," + ry + "px,0)";
        root.classList.add("is-ready");
      }
    }, { passive: true });

    (function tick() {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (ring) ring.style.transform = "translate3d(" + rx.toFixed(1) + "px," + ry.toFixed(1) + "px,0)";
      requestAnimationFrame(tick);
    })();

    var HOVER_SEL = "[data-cursor], .service-card, .testimonial-card, .btn, a[href], button";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest(HOVER_SEL)) root.classList.add("is-interactive");
    });
    document.addEventListener("mouseout", function (e) {
      var related = e.relatedTarget;
      if (e.target.closest(HOVER_SEL) && !(related && related.closest(HOVER_SEL))) {
        root.classList.remove("is-interactive");
      }
    });
  }

  /* ══════════════════════════════════════════
     5. SCROLL REVEALS — IntersectionObserver
  ══════════════════════════════════════════ */
  function initReveals() {
    var items = $$(".reveal");
    if (!items.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -3% 0px" });

    items.forEach(function (el) { io.observe(el); });

    /* Safety timeout: force-reveal anything still hidden after 6s */
    setTimeout(function () {
      $$(".reveal:not(.is-visible)").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight + 100) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ══════════════════════════════════════════
     6. SERVICE CARDS — card-local mouse gradient
  ══════════════════════════════════════════ */
  function initServiceCards() {
    if (!fineHover) return;
    $$(".service-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
        var y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
        card.style.setProperty("--mx", x + "%");
        card.style.setProperty("--my", y + "%");
      }, { passive: true });
    });
  }

  /* ══════════════════════════════════════════
     7. MARQUEE — JS enhances (CSS is fallback)
  ══════════════════════════════════════════ */
  function initMarquee() {
    var track = $("#marquee-track");
    if (!track || !D.marqueeItems || !D.marqueeItems.length) return;

    /* Only rebuild if we have manifest data */
    var items = D.marqueeItems;
    /* Duplicate for seamless loop */
    var doubled = items.concat(items);
    track.innerHTML = doubled.map(function (text) {
      return '<span class="marquee-item"><span class="marquee-dot" aria-hidden="true"></span>' +
        escH(text) + "</span>";
    }).join("");
  }

  /* ══════════════════════════════════════════
     8. TESTIMONIALS — multi-card infinite carousel
  ══════════════════════════════════════════ */
  function initTestimonials() {
    var track    = $("#tcar-track");
    if (!track) return;
    var origSlides = $$(".tcard", track);
    var total      = origSlides.length;
    if (total < 2) return;

    var viewport = track.parentElement;
    var car      = viewport && viewport.parentElement;
    var prevBtn  = $("#tcar-prev");
    var nextBtn  = $("#tcar-next");
    var dotsWrap = $("#tcar-dots");

    var TRANS_MS = 580;
    var AUTO_MS  = 5000;
    var idx      = 0;   /* index of left-most visible real card */
    var busy     = false;
    var timer    = null;

    /* Clone all slides: [clone…] [real…] [clone…] for infinite loop */
    var fragB = document.createDocumentFragment();
    var fragA = document.createDocumentFragment();
    origSlides.forEach(function (s) {
      var cb = s.cloneNode(true); cb.setAttribute("aria-hidden", "true"); fragB.appendChild(cb);
      var ca = s.cloneNode(true); ca.setAttribute("aria-hidden", "true"); fragA.appendChild(ca);
    });
    track.insertBefore(fragB, track.firstChild);
    track.appendChild(fragA);

    /* Responsive column count */
    function getCols() {
      var w = car ? car.offsetWidth : 900;
      return w < 560 ? 1 : w < 900 ? 2 : 3;
    }

    /* Set all card widths so exactly getCols() fit in the viewport */
    function applyWidths() {
      if (!viewport) return;
      var cols = getCols();
      var gap  = parseFloat(getComputedStyle(track).columnGap) || 24;
      var w    = Math.floor((viewport.offsetWidth - (cols - 1) * gap) / cols);
      $$(".tcard", track).forEach(function (c) {
        c.style.flexBasis = w + "px";
        c.style.minWidth  = w + "px";
        c.style.maxWidth  = w + "px";
      });
    }

    /* Pixel step = card width + gap */
    function getStep() {
      var c = track.querySelector(".tcard");
      if (!c) return 300;
      return c.offsetWidth + (parseFloat(getComputedStyle(track).columnGap) || 24);
    }

    /* Move track without or with animation */
    function setPos(n, animate) {
      var px = (total + n) * getStep();
      if (!animate) {
        track.style.transition = "none";
        track.style.transform  = "translateX(-" + px + "px)";
        track.offsetHeight;   /* force reflow */
      } else {
        track.style.transition = "transform " + (TRANS_MS / 1000) + "s cubic-bezier(.4,0,.2,1)";
        track.style.transform  = "translateX(-" + px + "px)";
      }
    }

    /* Dots */
    var dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      for (var n = 0; n < total; n++) {
        (function (n) {
          var b = document.createElement("button");
          b.className = "tcar-dot";
          b.type      = "button";
          b.setAttribute("role", "tab");
          b.setAttribute("aria-label", "Ir al testimonio " + (n + 1));
          b.addEventListener("click", function () { goTo(n); restart(); });
          dotsWrap.appendChild(b);
          dots.push(b);
        })(n);
      }
    }

    function updateDots() {
      var d = ((idx % total) + total) % total;
      dots.forEach(function (dot, k) {
        dot.classList.toggle("is-active", k === d);
        dot.setAttribute("aria-selected", k === d ? "true" : "false");
      });
    }

    function goTo(n) { idx = ((n % total) + total) % total; setPos(idx, true); updateDots(); }

    function next() {
      if (busy) return; busy = true;
      idx++;
      setPos(idx, true); updateDots();
      setTimeout(function () {
        if (idx >= total) { idx = 0; setPos(0, false); }
        busy = false;
      }, TRANS_MS + 60);
    }

    function prev() {
      if (busy) return; busy = true;
      idx--;
      setPos(idx, true); updateDots();
      setTimeout(function () {
        if (idx < 0) { idx = total - 1; setPos(total - 1, false); }
        busy = false;
      }, TRANS_MS + 60);
    }

    function startTimer() { if (!timer) timer = setInterval(next, AUTO_MS); }
    function stopTimer()  { clearInterval(timer); timer = null; }
    function restart()    { stopTimer(); startTimer(); }

    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
    if (car) {
      car.addEventListener("mouseenter", stopTimer);
      car.addEventListener("mouseleave", startTimer);
    }

    var resizeT;
    window.addEventListener("resize", function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(function () { applyWidths(); setPos(idx, false); }, 150);
    });

    /* Init after layout */
    applyWidths();
    requestAnimationFrame(function () {
      setPos(0, false);
      updateDots();
      startTimer();
    });
  }

  /* ══════════════════════════════════════════
     9. WHATSAPP CTAs — update links from manifest
  ══════════════════════════════════════════ */
  function initWhatsApp() {
    if (!D.whatsapp) return;
    $$('a[href*="wa.me"]').forEach(function (link) {
      link.href = waUrl;
    });
  }

  /* ══════════════════════════════════════════
     10. HERO interactive tilt (desktop only)
  ══════════════════════════════════════════ */
  function initHeroParallax() {
    if (!fineHover) return;
    var orbs = $$(".hero-orb");
    window.addEventListener("mousemove", function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 20;
      var y = (e.clientY / window.innerHeight - 0.5) * 20;
      orbs.forEach(function (orb, i) {
        var factor = i === 0 ? 1 : -0.7;
        orb.style.transform = "translate(" + (x * factor) + "px, " + (y * factor) + "px)";
      });
    }, { passive: true });
  }

  /* ══════════════════════════════════════════
     UTILITIES
  ══════════════════════════════════════════ */
  function escH(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  /* ══════════════════════════════════════════
     BOOT
  ══════════════════════════════════════════ */
  function boot() {
    safe(initSplash,       "splash");
    safe(initNav,          "nav");
    safe(initGradient,     "gradient");
    safe(initCursor,       "cursor");
    safe(initReveals,      "reveals");
    safe(initServiceCards, "serviceCards");
    safe(initMarquee,      "marquee");
    safe(initTestimonials, "testimonials");
    safe(initWhatsApp,     "whatsapp");
    safe(initHeroParallax, "heroParallax");

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
