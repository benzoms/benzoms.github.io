/* Dreamwave OS — tabbed skill trees: Frontend / Backend / Full Stack / AI */
(function () {
  "use strict";

  var viewport = document.getElementById("sk-viewport");
  if (!viewport) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- branches (colors live in CSS as --skb-* so themes can restyle) ---------- */
  var BRANCHES = {
    root:    { label: null },
    tooling: { label: "Tooling & Version Control" },
    systems: { label: "Systems & Java" },
    dotnet:  { label: ".NET" },
    python:  { label: "Python & LLMs" },
    data:    { label: "Data & Analytics" },
    web:     { label: "Web (JS/TS)" },
    mobile:  { label: "Mobile (Swift)" },
    appdev:  { label: "Data & App Services" },
    cloud:   { label: "Cloud & Infra" }
  };

  /* ---------- four trees (n = name, b = branch, t = tooltip, c = children) ---------- */
  var TREES = {
    frontend: {
      n: "FRONTEND", b: "root", root: true,
      t: "Shipping UI from admin centers to startups — and this very site.",
      c: [
        { n: "JavaScript", b: "web", t: "The everyday language — from Tableau extensions to this site.", c: [
          { n: "TypeScript", b: "web", t: "Type-safe apps: inventory PWA, O365 Admin Center, Copilot portals.", c: [
            { n: "React", b: "web", t: "O365 Admin Center, Copilot Studio portal, HealthEats web, inventory PWA.", c: [
              { n: "Redux", b: "web", t: "State management in the O365 Admin Center." }
            ]}
          ]}
        ]},
        { n: "HTML", b: "web", t: "Semantic markup — including this very page." },
        { n: "CSS", b: "web", t: "Hand-rolled design systems (like this pixel OS)." },
        { n: "Figma", b: "web", t: "Sketch-to-UI workflows since FanClub Digital." },
        { n: "Browser Dev", b: "web", t: "Automation where the work actually happens: the browser.", c: [
          { n: "Playwright", b: "web", t: "Natural-language UX test automation with Copilot + Playwright MCP." },
          { n: "Chrome Extensions", b: "web", t: "Insurance-rate automation: 2 days of manual work down to 20 minutes." }
        ]},
        { n: "Shopify SDK", b: "web", t: "Athlete storefronts on iOS at FanClub Digital." }
      ]
    },
    backend: {
      n: "BACKEND", b: "root", root: true,
      t: "APIs, services, data, and the clouds they ship on.",
      c: [
        { n: "NodeJS", b: "web", t: "O365 Admin Center services and ProducTodo.", c: [
          { n: "Express", b: "web", t: "Inventory PWA backend and ProducTodo." }
        ]},
        { n: "C#", b: "dotnet", t: "Built Copilot Studio's AI scenario configuration portal at Microsoft.", c: [
          { n: "ASP.NET", b: "dotnet", t: "Backend for the Copilot Studio config portal on Unify." }
        ]},
        { n: "Flask", b: "python", t: "Real-time AI presentation app for a ~$3B real-estate client at FizzeeLabs." },
        { n: "Databases", b: "appdev", t: "Relational and document stores across every project.", c: [
          { n: "SQL", b: "appdev", t: "Relational data everywhere.", c: [
            { n: "PostgreSQL", b: "appdev", t: "Inventory PWA with atomic stock adjustments and audit trails." },
            { n: "SSMS", b: "appdev", t: "Streamlined Tableau queries for Fortune 500 dashboards." }
          ]},
          { n: "MongoDB", b: "appdev", t: "ProducTodo's datastore." },
          { n: "Redis", b: "appdev", t: "Caching layer experience." },
          { n: "Firebase", b: "appdev", t: "HealthEats, SoberPro, FanClub — storage, auth, and ML." }
        ]},
        { n: "Auth", b: "appdev", t: "Login flows done right.", c: [
          { n: "OAuth 2.0", b: "appdev", t: "Google SSO in ProducTodo; enterprise auth flows." },
          { n: "JWT", b: "appdev", t: "Token auth for role-based access (inventory PWA)." }
        ]},
        { n: "Postman", b: "appdev", t: "API design and testing workflow." },
        { n: "Cloud", b: "cloud", t: "Where it all ships.", c: [
          { n: "AWS", b: "cloud", t: "Transcribe-powered realtime AI app at FizzeeLabs." },
          { n: "Azure", b: "cloud", t: "Microsoft's AI platform services and telemetry.", c: [
            { n: "KQL", b: "cloud", t: "Telemetry queries over 200K+ sessions/month.", c: [
              { n: "Kusto", b: "cloud", t: "Data layer of the Copilot Studio scenario portal." }
            ]}
          ]},
          { n: "CI/CD", b: "cloud", t: "Pipeline fixes and safe deployments for Microsoft's shared AI platform services." }
        ]}
      ]
    },
    fullstack: {
      n: "FULL STACK", b: "root", root: true,
      t: "The foundations that hold every stack together — plus mobile and systems depth.",
      c: [
        { n: "Version Control", b: "tooling", t: "Source control across every team and project.", c: [
          { n: "Git", b: "tooling", t: "Core workflow tool on every project.", c: [
            { n: "GitHub", b: "tooling", t: "Centralized NYU Baedeker's site into a GitHub repo; used everywhere since." },
            { n: "Bitbucket", b: "tooling", t: "Used in professional team workflows." }
          ]}
        ]},
        { n: "Command Line", b: "tooling", t: "Daily driver for builds, deploys, and automation.", c: [
          { n: "Bash", b: "tooling", t: "Scripting and automation on every project since college." },
          { n: "PowerShell", b: "tooling", t: "Windows automation and pipeline scripts at Microsoft." }
        ]},
        { n: "Systems", b: "systems", t: "Down-to-the-metal foundations from NYU CS.", c: [
          { n: "C", b: "systems", t: "Systems programming foundation from NYU CS.", c: [
            { n: "C++", b: "systems", t: "Systems coursework building on C.", c: [
              { n: "x64 Assembly", b: "systems", t: "Low-level programming — down to the metal." }
            ]}
          ]},
          { n: "Java", b: "systems", t: "Core object-oriented foundation from NYU CS." }
        ]},
        { n: "Mobile", b: "mobile", t: "Native iOS since 2021.", c: [
          { n: "Swift", b: "mobile", t: "FanClub stores, SoberPro, HealthEats iOS.", c: [
            { n: "SwiftUI", b: "mobile", t: "FanClub stores, SoberPro (+ Apple Watch), HealthEats iOS." }
          ]}
        ]}
      ]
    },
    ai: {
      n: "AI & DATA", b: "root", root: true,
      t: "The specialization: agents, evals, LLM plumbing, and the data science beneath it.",
      c: [
        { n: "Python", b: "python", t: "AI tooling and data work at Microsoft, FizzeeLabs, and beyond.", c: [
          { n: "OpenAI API", b: "python", t: "ChatGPT-powered visual aid generation at FizzeeLabs; LLM tooling since.", c: [
            { n: "LangChain", b: "python", t: "LLM orchestration for agent workflows." },
            { n: "MCP", b: "python", t: "Playwright MCP test automation at Microsoft — +25% UX coverage." },
            { n: "AI Agents", b: "python", t: "Built agents to monitor and benchmark top LLMs for Copilot teams.", c: [
              { n: "LLM Evaluation", b: "python", t: "Citation Correctness & Consistent Language metrics for Copilot." },
              { n: "Benchmarking", b: "python", t: "Data-driven model and configuration comparisons for Copilot teams." }
            ]}
          ]},
          { n: "Copilot", b: "python", t: "Built on and for Copilot — Studio portal, BIC platform, GitHub Copilot workflows." },
          { n: "AWS Transcribe", b: "cloud", t: "Live speech-to-text driving real-time presentation visuals at FizzeeLabs." }
        ]},
        { n: "Data Science", b: "data", t: "Numeric and ML stack from the Data Science minor.", c: [
          { n: "NumPy", b: "data", t: "Numeric computing from the Data Science minor.", c: [
            { n: "Pandas", b: "data", t: "Dataframe wrangling for analysis projects.", c: [
              { n: "Matplotlib", b: "data", t: "Charts and plots for data coursework and analysis." },
              { n: "Scikit-learn", b: "data", t: "Classical ML from the Data Science minor.", c: [
                { n: "TensorFlow", b: "data", t: "Deep learning coursework and experiments." }
              ]}
            ]}
          ]}
        ]},
        { n: "R", b: "data", t: "Statistical analysis from the Data Science minor.", c: [
          { n: "Data Analysis", b: "data", t: "Sales-performance and retention analysis presented to C-suite execs.", c: [
            { n: "Tableau", b: "data", t: "Built a Tableau server extension monitoring supply-chain KPIs for Fortune 500 clients." },
            { n: "Power BI", b: "data", t: "Business dashboarding alongside Tableau work." }
          ]}
        ]}
      ]
    }
  };

  var SVG = "http://www.w3.org/2000/svg";
  var LEVEL_H = 104;
  var GAP_X = 26;
  var NODE_H = 36;

  function el(name, attrs) {
    var e = document.createElementNS(SVG, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function nodeWidth(d) { return Math.max(d.n.length * 8.2 + 26, 64); }

  /* ---------- shared view / interaction state ---------- */
  var view = { x: 0, y: 0, k: 1 };
  var world = null, worldW = 0, worldH = 0, rootNode = null, nodes = [];

  var tooltip = document.getElementById("sk-tooltip");
  var tipTitle = tooltip.querySelector(".pixel-tooltip__title");
  var tipMeta = tooltip.querySelector(".pixel-tooltip__meta");
  var tipText = tooltip.querySelector(".pixel-tooltip__text");

  function applyView() {
    if (world) world.setAttribute("transform", "translate(" + view.x + "," + view.y + ") scale(" + view.k + ")");
  }
  function resetView() {
    var vw = viewport.clientWidth, vh = viewport.clientHeight;
    view.k = Math.max(0.45, Math.min(vw / worldW, vh / worldH, 1));
    view.x = (vw - worldW * view.k) / 2;
    view.y = Math.max(8, (vh - worldH * view.k) / 2);
    applyView();
  }
  function openTooltip(d) {
    tipTitle.textContent = d.n;
    tipMeta.textContent = BRANCHES[d.b].label || "Category root";
    tipText.textContent = d.t || "";
    tooltip.classList.add("is-open");
    tooltip.setAttribute("aria-hidden", "false");
    var host = viewport.parentElement.getBoundingClientRect();
    var r = d.g.getBoundingClientRect();
    var left = r.left - host.left + r.width / 2 - 130;
    left = Math.max(8, Math.min(left, host.width - 290));
    var top = r.bottom - host.top + 10;
    if (top > host.height - 120) top = r.top - host.top - 110;
    tooltip.style.left = left + "px";
    tooltip.style.top = top + "px";
  }
  function closeTooltip() {
    tooltip.classList.remove("is-open");
    tooltip.setAttribute("aria-hidden", "true");
  }

  /* ---------- render one tree into the viewport ---------- */
  function render(treeKey) {
    closeTooltip();
    viewport.innerHTML = "";
    nodes = [];
    var links = [];
    var cursorX = 0;

    rootNode = JSON.parse(JSON.stringify(TREES[treeKey]));

    (function layout(d, depth) {
      d.depth = depth;
      d.w = d.root ? nodeWidth(d) + 30 : nodeWidth(d);
      d.h = d.root ? NODE_H + 12 : NODE_H;
      if (d.c && d.c.length) {
        d.c.forEach(function (child) {
          layout(child, depth + 1);
          links.push({ from: d, to: child });
        });
        d.x = (d.c[0].x + d.c[d.c.length - 1].x) / 2;
      } else {
        d.x = cursorX + d.w / 2;
        cursorX += d.w + GAP_X;
      }
      d.y = depth * LEVEL_H + 50;
      nodes.push(d);
    })(rootNode, 0);

    worldW = cursorX + 20;
    worldH = 0;
    nodes.forEach(function (d) { worldH = Math.max(worldH, d.y + d.h); });
    worldH += 40;

    var svg = el("svg", { width: "100%", height: "100%", role: "group", "aria-label": "Skill tree: " + rootNode.n });
    world = el("g", {});
    svg.appendChild(world);
    if (!reducedMotion) world.classList.add("sk-anim");

    links.forEach(function (l) {
      var midY = (l.from.y + l.from.h / 2 + l.to.y - l.to.h / 2) / 2 + l.from.h / 2;
      var p = el("path", {
        d: "M" + l.from.x + "," + (l.from.y + l.from.h / 2) + " V" + midY + " H" + l.to.x + " V" + (l.to.y - l.to.h / 2),
        "class": "sk-link"
      });
      l.path = p;
      world.appendChild(p);
    });

    nodes.forEach(function (d) {
      var g = el("g", {
        "class": "sk-node sk-b-" + d.b + (d.root ? " sk-node--root" : ""),
        transform: "translate(" + (d.x - d.w / 2) + "," + (d.y - d.h / 2) + ")",
        tabindex: "0",
        role: "img",
        "aria-label": d.n + ". " + (d.t || "")
      });
      var shadow = el("rect", { "class": "sk-node__shadow", width: d.w, height: d.h, x: 3, y: 3, stroke: "none" });
      var rect = el("rect", { "class": "sk-node__box", width: d.w, height: d.h });
      var label = el("text", { x: d.w / 2, y: d.h / 2 + 1 });
      label.textContent = d.n;
      g.appendChild(shadow);
      g.appendChild(rect);
      g.appendChild(label);
      d.g = g;
      world.appendChild(g);

      g.addEventListener("mouseenter", function () { openTooltip(d); });
      g.addEventListener("mouseleave", closeTooltip);
      g.addEventListener("focus", function () { openTooltip(d); });
      g.addEventListener("blur", closeTooltip);
      g.addEventListener("click", function (e) {
        if (panMoved) return;
        e.stopPropagation();
        if (tooltip.classList.contains("is-open") && tipTitle.textContent === d.n) closeTooltip();
        else openTooltip(d);
      });
    });

    viewport.appendChild(svg);
    resetView();

    if (!reducedMotion) {
      nodes.forEach(function (d) {
        setTimeout(function () { d.g.classList.add("sk-on"); }, 80 + d.depth * 100);
      });
      links.forEach(function (l) {
        setTimeout(function () { l.path.classList.add("sk-on"); }, 80 + l.to.depth * 100 - 40);
      });
      var g0 = world;
      setTimeout(function () { g0.classList.remove("sk-anim"); }, 80 + 7 * 100 + 300);
    }

    /* legend for this tab */
    var legend = document.getElementById("sk-legend");
    if (legend) {
      legend.innerHTML = "";
      var seen = {};
      nodes.forEach(function (d) { if (!d.root) seen[d.b] = true; });
      Object.keys(BRANCHES).forEach(function (key) {
        if (!seen[key] || !BRANCHES[key].label) return;
        var chip = document.createElement("span");
        chip.className = "legend-chip";
        var i = document.createElement("i");
        i.className = "sk-i-" + key;
        chip.appendChild(i);
        chip.appendChild(document.createTextNode(" " + BRANCHES[key].label));
        legend.appendChild(chip);
      });
    }
  }

  /* ---------- pan & zoom (bound once to the viewport) ---------- */
  var panning = false, px = 0, py = 0, panMoved = false;
  viewport.addEventListener("pointerdown", function (e) {
    panning = true; panMoved = false;
    px = e.clientX; py = e.clientY;
    viewport.classList.add("is-panning");
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener("pointermove", function (e) {
    if (!panning) return;
    var dx = e.clientX - px, dy = e.clientY - py;
    if (Math.abs(dx) + Math.abs(dy) > 3) panMoved = true;
    view.x += dx; view.y += dy;
    px = e.clientX; py = e.clientY;
    applyView();
  });
  function endPan() { panning = false; viewport.classList.remove("is-panning"); }
  viewport.addEventListener("pointerup", endPan);
  viewport.addEventListener("pointercancel", endPan);

  function zoomAt(cx, cy, factor) {
    var k = Math.max(0.25, Math.min(2.5, view.k * factor));
    var real = k / view.k;
    view.x = cx - (cx - view.x) * real;
    view.y = cy - (cy - view.y) * real;
    view.k = k;
    applyView();
  }
  viewport.addEventListener("wheel", function (e) {
    e.preventDefault();
    var rect = viewport.getBoundingClientRect();
    zoomAt(e.clientX - rect.left, e.clientY - rect.top, e.deltaY < 0 ? 1.12 : 0.89);
  }, { passive: false });

  document.getElementById("sk-zoom-in").addEventListener("click", function () {
    zoomAt(viewport.clientWidth / 2, viewport.clientHeight / 2, 1.25);
  });
  document.getElementById("sk-zoom-out").addEventListener("click", function () {
    zoomAt(viewport.clientWidth / 2, viewport.clientHeight / 2, 0.8);
  });
  document.getElementById("sk-reset").addEventListener("click", resetView);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeTooltip(); });
  window.addEventListener("resize", resetView);

  /* ---------- tabs (tree tabs + the raw List tab) ---------- */
  var tabs = document.querySelectorAll(".sk-tab");
  var listPanel = document.getElementById("sk-list");
  var controls = document.querySelector(".skilltree-controls");
  var legendWindow = document.getElementById("sk-legend-window");

  function showList(on) {
    if (listPanel) listPanel.hidden = !on;
    viewport.style.display = on ? "none" : "";
    if (controls) controls.style.display = on ? "none" : "";
    if (legendWindow) legendWindow.style.display = on ? "none" : "";
    if (on) closeTooltip();
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.setAttribute("aria-selected", t === tab ? "true" : "false"); });
      var key = tab.getAttribute("data-tree");
      if (key === "list") {
        showList(true);
      } else {
        showList(false);
        render(key);
      }
    });
  });

  render("frontend");
})();
