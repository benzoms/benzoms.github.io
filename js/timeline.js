/* Dreamwave OS — timeline: scroll-drawn spine, filters, order toggle, tooltips */
(function () {
  "use strict";

  var timeline = document.getElementById("timeline");
  var spine = document.getElementById("spine");
  if (!timeline || !spine) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- spine draws with scroll progress ---- */
  var ticking = false;
  function drawSpine() {
    ticking = false;
    if (reducedMotion) { spine.style.transform = "scaleY(1)"; return; }
    var rect = timeline.getBoundingClientRect();
    var viewportAnchor = window.innerHeight * 0.75;
    var progress = (viewportAnchor - rect.top) / rect.height;
    progress = Math.max(0, Math.min(1, progress));
    spine.style.transform = "scaleY(" + progress + ")";
  }
  if (reducedMotion) {
    spine.style.transform = "scaleY(1)";
  } else {
    window.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(drawSpine);
      }
    }, { passive: true });
  }

  /* ---- nodes pop in as their item is reached ---- */
  var items = Array.prototype.slice.call(timeline.querySelectorAll(".timeline__item"));
  if (reducedMotion || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-reached"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-reached");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---- filters + order ---- */
  var groups = Array.prototype.slice.call(timeline.querySelectorAll(".timeline__group"));
  var filterButtons = document.querySelectorAll(".tl-filter");
  var orderButton = document.getElementById("tl-order");
  var activeCat = "all";
  var newestFirst = true;

  var GAP = 14;          /* matches .timeline__item margin-bottom */
  var MIN_STAGGER = 90;  /* keeps nodes descending in order down the spine */

  function relayout() {
    /* show/hide items, hide year groups with nothing visible */
    groups.forEach(function (group) {
      var any = false;
      group.style.paddingBottom = "";
      group.querySelectorAll(".timeline__item").forEach(function (item) {
        var show = activeCat === "all" || item.getAttribute("data-cat") === activeCat;
        item.style.display = show ? "" : "none";
        item.style.marginTop = "";
        if (show) any = true;
      });
      group.style.display = any ? "" : "none";
    });

    /* alternate visible items left/right so filtering never leaves gaps */
    var side = 0;
    var sides = [];
    items.forEach(function (item) {
      if (item.style.display === "none") return;
      item.classList.remove("timeline__item--left", "timeline__item--right");
      var s = side % 2 === 0 ? "left" : "right";
      item.classList.add("timeline__item--" + s);
      sides.push(s);
      side++;
    });

    /* interleave opposite columns within each year group (desktop only):
       each card starts MIN_STAGGER below the previous card's top, as long as
       its own column is clear — collapses the empty space beside tall cards */
    if (window.innerWidth > 760) {
      groups.forEach(function (group) {
        if (group.style.display === "none") return;
        var visible = Array.prototype.filter.call(
          group.querySelectorAll(".timeline__item"),
          function (item) { return item.style.display !== "none"; }
        );
        var colBottom = { left: -GAP, right: -GAP };
        var prevTop = null, prevH = 0;
        visible.forEach(function (item) {
          var s = item.classList.contains("timeline__item--left") ? "left" : "right";
          var h = item.offsetHeight;
          var top;
          if (prevTop === null) {
            top = 0;
          } else {
            top = Math.max(colBottom[s] + GAP, prevTop + MIN_STAGGER);
            item.style.marginTop = (top - (prevTop + prevH + GAP)) + "px";
          }
          colBottom[s] = top + h;
          prevTop = top;
          prevH = h;
        });
        /* the group's flow height ends at its LAST card; pad down to the
           tallest column so the next year group never covers a card */
        var slack = Math.max(colBottom.left, colBottom.right) - (prevTop + prevH);
        group.style.paddingBottom = slack > 0 ? slack + "px" : "";
      });
    }

    drawSpine();
  }

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(relayout, 150);
  });
  window.addEventListener("load", relayout);

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeCat = btn.getAttribute("data-cat");
      filterButtons.forEach(function (b) {
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });
      relayout();
    });
  });

  if (orderButton) {
    orderButton.addEventListener("click", function () {
      newestFirst = !newestFirst;
      orderButton.textContent = newestFirst ? "↓ Newest first" : "↑ Oldest first";
      /* reverse the year groups; each group keeps its year marker on top */
      groups.slice().reverse().forEach(function (group) {
        timeline.insertBefore(group, timeline.querySelector(".pixel-tooltip"));
      });
      groups.reverse();
      relayout();
    });
  }

  /* newest-first is the DOM default; groups[] tracks current order */
  relayout();

  /* ---- pixel tooltip on node hover/focus ---- */
  var tooltip = document.getElementById("timeline-tooltip");
  var tipTitle = tooltip.querySelector(".pixel-tooltip__title");
  var tipMeta = tooltip.querySelector(".pixel-tooltip__meta");
  var tipText = tooltip.querySelector(".pixel-tooltip__text");

  function openTooltip(node) {
    tipTitle.textContent = node.getAttribute("data-title");
    tipMeta.textContent = node.getAttribute("data-dates");
    tipText.textContent = node.getAttribute("data-blurb");
    tooltip.setAttribute("aria-hidden", "false");
    tooltip.classList.add("is-open");

    var tlRect = timeline.getBoundingClientRect();
    var nRect = node.getBoundingClientRect();
    var top = nRect.top - tlRect.top + 30;
    var left = nRect.left - tlRect.left + 30;
    if (left + 290 > tlRect.width) left = nRect.left - tlRect.left - 296;
    if (left < 0) left = 8;
    tooltip.style.top = top + "px";
    tooltip.style.left = left + "px";
  }
  function closeTooltip() {
    tooltip.classList.remove("is-open");
    tooltip.setAttribute("aria-hidden", "true");
  }

  timeline.querySelectorAll(".timeline__node").forEach(function (node) {
    node.addEventListener("mouseenter", function () { openTooltip(node); });
    node.addEventListener("mouseleave", closeTooltip);
    node.addEventListener("focus", function () { openTooltip(node); });
    node.addEventListener("blur", closeTooltip);
    node.addEventListener("click", function () {
      if (tooltip.classList.contains("is-open") && tipTitle.textContent === node.getAttribute("data-title")) {
        closeTooltip();
      } else {
        openTooltip(node);
      }
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeTooltip();
  });
})();
