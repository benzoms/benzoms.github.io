/* Dreamwave OS — shared chrome behavior */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- live clock (system bar) ---- */
  var clock = document.querySelector(".system-bar__clock");
  function tick() {
    var d = new Date();
    var h = d.getHours();
    var ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    var m = String(d.getMinutes()).padStart(2, "0");
    clock.textContent = h + ":" + m + " " + ampm;
  }
  if (clock) {
    tick();
    setInterval(tick, 10000);
  }

  /* ---- background mode toggle (scene <-> grid), persisted ---- */
  var BG_KEY = "bz-bg-mode";
  var toggle = document.querySelector(".bg-toggle");
  function applyBg(mode) {
    document.documentElement.removeAttribute("data-early-bg");
    document.body.setAttribute("data-bg", mode);
    if (toggle) {
      toggle.textContent = mode === "scene" ? "BG: SCENE" : "BG: GRID";
      toggle.setAttribute("aria-label", "Switch background to " + (mode === "scene" ? "grid" : "scene"));
    }
  }
  var saved = "scene";
  try { saved = localStorage.getItem(BG_KEY) || "scene"; } catch (e) {}
  applyBg(saved === "grid" ? "grid" : "scene");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = document.body.getAttribute("data-bg") === "scene" ? "grid" : "scene";
      applyBg(next);
      try { localStorage.setItem(BG_KEY, next); } catch (e) {}
    });
  }

  /* ---- scroll reveal: windows "open" as they enter the viewport ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var stagger = 0;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.setProperty("--reveal-delay", (stagger % 3) * 70 + "ms");
        stagger++;
        el.classList.add("is-visible");
        observer.unobserve(el);
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  }
})();
