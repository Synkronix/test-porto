/* =====================================================================
   Porto_Ari v2 — site behaviour

   Classic script (no modules) so index.html runs from file:// directly.
   Reads window.PORTFOLIO, generated from the live KroomBase database by
   tools/generate_data.py.

   Certificate cards render from window.PORTFOLIO.certificates. A slot with
   an empty title renders as a clearly-marked empty slot, so the page never
   claims a credential that has not been filled in.
   ===================================================================== */
(function () {
  "use strict";

  var DATA = window.PORTFOLIO ||
    { profile: {}, projects: [], skillGroups: [], courses: [], certificates: [], counts: {} };
  var CERTS = DATA.certificates || [];

  /* ---------- tiny DOM helpers -------------------------------------- */

  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text !== undefined && text !== null) n.textContent = text;
    return n;
  }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  }
  function setText(s, v) { var n = $(s); if (n) n.textContent = v; }

  /* ---------- icons -------------------------------------------------- */

  var ICONS = {
    code:     '<path d="M8 6 4 10l4 4M12 6l4 4-4 4"/>',
    document: '<path d="M6 3h6l4 4v10H6z"/><path d="M12 3v4h4"/>',
    diagram:  '<rect x="3" y="3" width="6" height="5" rx="1"/><rect x="11" y="12" width="6" height="5" rx="1"/><path d="M6 8v4h8"/>',
    image:    '<rect x="3" y="4" width="14" height="12" rx="2"/><circle cx="8" cy="9" r="1.4"/><path d="M4 15l4-4 3 3 2-2 3 3"/>',
    video:    '<rect x="3" y="5" width="11" height="10" rx="2"/><path d="M14 9l3-2v6l-3-2z"/>',
    mail:     '<rect x="3" y="5" width="14" height="10" rx="2"/><path d="M3.5 6.5 10 11l6.5-4.5"/>',
    github:   '<path d="M10 3a7 7 0 0 0-2.2 13.6c.35.06.48-.15.48-.33v-1.2c-1.95.42-2.36-.94-2.36-.94-.32-.8-.78-1.02-.78-1.02-.64-.43.05-.42.05-.42.7.05 1.07.72 1.07.72.63 1.07 1.65.76 2.05.58.06-.45.24-.76.44-.94-1.56-.18-3.2-.78-3.2-3.46 0-.76.27-1.39.72-1.88-.07-.18-.31-.89.07-1.85 0 0 .59-.19 1.93.72a6.7 6.7 0 0 1 3.5 0c1.34-.91 1.93-.72 1.93-.72.38.96.14 1.67.07 1.85.45.49.72 1.12.72 1.88 0 2.69-1.65 3.28-3.22 3.45.25.22.48.66.48 1.33v1.98c0 .18.13.4.49.33A7 7 0 0 0 10 3z"/>',
    linkedin: '<path d="M4.5 8v7M4.5 5.2h.02M8.5 15V8m0 3c0-1.7 1-2.6 2.4-2.6S13.5 9.3 13.5 11v4"/>',
    arrow:    '<path d="M4 10h11M11 6l4 4-4 4"/>',
    search:   '<circle cx="9" cy="9" r="5"/><path d="M13 13l4 4"/>',
    plus:     '<path d="M10 4v12M4 10h12"/>',
    award:    '<circle cx="10" cy="8" r="4.5"/><path d="M7 11.5 6 17l4-2 4 2-1-5.5"/>',
    spark:    '<path d="M10 3v4M10 13v4M3 10h4M13 10h4M5 5l2.5 2.5M12.5 12.5 15 15M15 5l-2.5 2.5M7.5 12.5 5 15"/>'
  };

  function svg(name, size) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    n.setAttribute("viewBox", "0 0 20 20");
    n.setAttribute("width", String(size || 16));
    n.setAttribute("height", String(size || 16));
    n.setAttribute("fill", "none");
    n.setAttribute("stroke", "currentColor");
    n.setAttribute("stroke-width", "1.6");
    n.setAttribute("stroke-linecap", "round");
    n.setAttribute("stroke-linejoin", "round");
    n.setAttribute("aria-hidden", "true");
    n.innerHTML = ICONS[name] || "";
    return n;
  }

  var KIND_LABEL = {
    code: "Code", document: "Document", diagram: "Diagram",
    image: "Image", video: "Video"
  };

  function pad(n) { return (n < 10 ? "0" : "") + n; }

  /* ---------- profile ------------------------------------------------ */

  function renderProfile() {
    var p = DATA.profile || {};
    setText("[data-name]", p.fullName || "Portfolio");
    setText("[data-headline]", p.headline || "");
    setText("[data-bio]", p.bio || "");
    setText("[data-role]", [p.program, p.classGroup ? "Class " + p.classGroup : null]
      .filter(Boolean).join(" · "));

    var initials = (p.fullName || "").split(/\s+/).filter(Boolean)
      .slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join("");
    $$("[data-initials]").forEach(function (n) { n.textContent = initials || "A"; });

    var facts = [];
    if (p.nim) facts.push(["NIM", p.nim]);
    if (p.location) facts.push(["Based in", p.location]);
    if (p.program) facts.push(["Program", p.program]);
    var host = $("[data-facts]");
    if (host) {
      host.innerHTML = "";
      facts.forEach(function (f) {
        var li = el("li");
        li.appendChild(el("span", "k", f[0]));
        li.appendChild(el("span", "v", f[1]));
        host.appendChild(li);
      });
    }

    var mail = $("[data-email]");
    if (mail) { mail.href = "mailto:" + (p.email || ""); mail.textContent = p.email || ""; }

    var gh = $("[data-github]");
    if (gh) {
      if (p.githubUrl) {
        gh.href = p.githubUrl;
        gh.textContent = p.githubUrl.replace(/^https?:\/\//, "");
      } else { gh.setAttribute("aria-disabled", "true"); }
    }

    /* contact cards */
    [["email", p.email, p.email, "mailto:" + (p.email || "")],
     ["github", p.githubUrl, p.githubUrl ? p.githubUrl.replace(/^https?:\/\//, "") : null, p.githubUrl],
     ["linkedin", p.linkedinUrl, p.linkedinUrl ? p.linkedinUrl.replace(/^https?:\/\//, "") : null, p.linkedinUrl]
    ].forEach(function (row) {
      var card = $('[data-contact="' + row[0] + '"]');
      if (!card) return;
      var val = $("[data-contact-value]", card);
      if (row[2]) {
        card.href = row[3];
        if (val) val.textContent = row[2];
      } else {
        card.classList.add("is-disabled");
        card.removeAttribute("href");
        if (val) val.textContent = "Not provided";
      }
    });

    if (p.placeholders) {
      var note = $("[data-slot-note]");
      if (note) note.hidden = false;
    }
  }

  function renderMetrics() {
    var c = DATA.counts || {};
    var rows = [
      { v: c.projects || 0, l: "Projects" },
      { v: c.artifacts || 0, l: "Artifacts" },
      { v: c.skills || 0, l: "Skills" },
      { v: c.courses || 0, l: "Courses" }
    ];
    var host = $("[data-metrics]");
    if (!host) return;
    host.innerHTML = "";
    rows.forEach(function (r) {
      var d = el("div", "metric");
      d.appendChild(el("span", "metric-value", String(r.v)));
      d.appendChild(el("span", "metric-label", r.l));
      host.appendChild(d);
    });
  }

  /* ---------- certificates ------------------------------------------- */

  function buildCertCard(cert) {
    var isEmpty = !cert.title || !String(cert.title).trim();
    var card = el("article", "cert-card" + (isEmpty ? " is-empty" : "") +
      (cert.highlight && !isEmpty ? " is-featured" : ""));

    var eyebrow = el("div", "cert-eyebrow");
    eyebrow.appendChild(el("span", null, "Certificate"));
    if (cert.highlight && !isEmpty) eyebrow.appendChild(el("span", "cert-tag", "Featured"));
    else if (isEmpty) eyebrow.appendChild(el("span", "cert-tag", "Empty slot"));
    card.appendChild(eyebrow);

    if (isEmpty) {
      var mark = el("div", "slot-mark");
      mark.appendChild(svg("plus", 15));
      mark.appendChild(el("span", null, "Reserved for your certificate"));
      card.appendChild(mark);

      card.appendChild(el("h3", "cert-title", "Add a certificate"));
      card.appendChild(el("p", "slot-hint",
        "Fill this in by editing the CERTIFICATES list in " +
        "tools/generate_data.py and re-running it, or edit assets/data.js directly."));
    } else {
      card.appendChild(el("h3", "cert-title", cert.title));
      if (cert.issuer) card.appendChild(el("p", "cert-issuer", cert.issuer));

      var meta = el("div", "cert-meta");
      if (cert.issued) meta.appendChild(el("span", null, cert.issued));
      if (cert.credentialId) meta.appendChild(el("span", null, "ID " + cert.credentialId));
      if (cert.url) {
        var a = el("a", null, "Verify");
        a.href = cert.url;
        a.target = "_blank";
        a.rel = "noopener";
        meta.appendChild(a);
      }
      if (meta.childNodes.length) card.appendChild(meta);

      if (cert.image) {
        var img = el("img");
        img.src = cert.image;
        img.alt = cert.title + " certificate";
        img.loading = "lazy";
        img.style.width = "100%";
        img.style.borderRadius = "8px";
        card.insertBefore(img, card.firstChild);
      }
    }
    return card;
  }

  function renderCertificates() {
    var host = $("[data-certs]");
    if (!host) return;
    host.innerHTML = "";

    /* real certificates first, empty slots after */
    var sorted = CERTS.slice().sort(function (a, b) {
      return (b.title ? 1 : 0) - (a.title ? 1 : 0);
    });
    sorted.forEach(function (c) { host.appendChild(buildCertCard(c)); });

    var filled = CERTS.filter(function (c) { return c.title; }).length;
    var slots = CERTS.length - filled;
    setText("[data-cert-count]", filled + " of " + CERTS.length + " slots filled");

    var note = $("[data-cert-note]");
    if (note && slots > 0) {
      note.hidden = false;
      setText("[data-cert-slots]", String(slots));
    }
  }

  /* ---------- work --------------------------------------------------- */

  var state = { filter: "all", query: "" };

  function matches(p) {
    if (state.filter === "featured" && !p.featured) return false;
    var q = state.query.trim().toLowerCase();
    if (!q) return true;
    return [p.title, p.summary, p.course, (p.skills || []).join(" ")]
      .join(" ").toLowerCase().indexOf(q) !== -1;
  }

  function makeOpenable(node, project) {
    node.tabIndex = 0;
    node.addEventListener("click", function () { openProject(project); });
    node.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openProject(project); }
    });
  }

  function buildSpotlight(p, num) {
    var wrap = el("article", "spotlight");
    wrap.setAttribute("data-slug", p.slug);

    var art = el("div", "spotlight-art");
    var artTop = el("div", "spotlight-top");
    artTop.appendChild(el("span", "spotlight-num", pad(num)));
    artTop.appendChild(el("span", "badge", "Featured work"));
    art.appendChild(artTop);
    var course = el("div", "spotlight-course");
    course.appendChild(document.createTextNode(p.course || "Selected work"));
    course.appendChild(el("small", null,
      (p.media || []).length + " artifacts · " + (p.skills || []).length + " skills"));
    art.appendChild(course);
    wrap.appendChild(art);

    var body = el("div", "spotlight-body");
    body.appendChild(el("h3", null, p.title));
    body.appendChild(el("p", null, p.summary));

    var tags = el("div", "work-skills");
    (p.skills || []).slice(0, 5).forEach(function (s) {
      tags.appendChild(el("span", "tag", s));
    });
    body.appendChild(tags);

    var foot = el("div", "spotlight-foot");
    var btn = el("span", "btn btn-primary btn-sm");
    btn.appendChild(document.createTextNode("Open project"));
    btn.appendChild(svg("arrow", 14));
    foot.appendChild(btn);
    if (p.role) foot.appendChild(el("span", "mono-label", p.role));
    body.appendChild(foot);
    wrap.appendChild(body);

    makeOpenable(wrap, p);
    return wrap;
  }

  function buildRow(p, i) {
    var li = el("li", "work-row");
    li.setAttribute("data-slug", p.slug);

    var inner = el("div", "work-inner");
    inner.appendChild(el("span", "work-num", pad(i + 1)));
    inner.appendChild(el("span", "work-title", p.title));
    inner.appendChild(el("span", "work-course", p.course || "—"));

    var skills = el("div", "work-skills");
    (p.skills || []).slice(0, 2).forEach(function (s) {
      skills.appendChild(el("span", "tag", s));
    });
    inner.appendChild(skills);

    var go = el("span", "work-go");
    go.appendChild(svg("arrow", 15));
    inner.appendChild(go);

    li.appendChild(inner);
    makeOpenable(li, p);
    return li;
  }

  function renderWork() {
    var list = $("[data-work-list]");
    var spotHost = $("[data-spotlight]");
    if (!list) return;

    var shown = DATA.projects.filter(matches);
    var isDefault = !state.query.trim() && state.filter === "all";
    var spot = isDefault ? (shown.filter(function (p) { return p.featured; })[0] || null) : null;

    if (spotHost) {
      spotHost.innerHTML = "";
      if (spot) spotHost.appendChild(buildSpotlight(spot, 1));
    }

    list.innerHTML = "";
    var rest = spot ? shown.filter(function (p) { return p !== spot; }) : shown;
    if (!rest.length) {
      list.appendChild(el("li", "work-row", "No projects match that filter."));
    } else {
      /* the spotlight holds 01, so the list continues from 02 */
      rest.forEach(function (p, i) { list.appendChild(buildRow(p, i + (spot ? 1 : 0))); });
    }

    setText("[data-work-count]", shown.length + " of " + DATA.projects.length + " projects");
  }

  function renderFilters() {
    var host = $("[data-filters]");
    if (!host) return;
    host.innerHTML = "";

    function make(label, value) {
      var b = el("button", "chip-btn", label);
      b.type = "button";
      b.setAttribute("aria-pressed", String(state.filter === value));
      b.addEventListener("click", function () {
        state.filter = value;
        $$(".chip-btn", host).forEach(function (o) {
          o.classList.remove("is-active");
          o.setAttribute("aria-pressed", "false");
        });
        b.classList.add("is-active");
        b.setAttribute("aria-pressed", "true");
        renderWork();
      });
      return b;
    }

    var all = make("All work", "all");
    all.classList.add("is-active");
    host.appendChild(all);
    host.appendChild(make("Featured", "featured"));
  }

  function renderSkills() {
    var host = $("[data-skills]");
    if (!host) return;
    host.innerHTML = "";

    (DATA.skillGroups || []).forEach(function (g) {
      if (!g.skills.length) return;
      var band = el("div", "skill-band");

      var head = el("div", "skill-band-head");
      head.appendChild(el("h3", null, g.name));
      head.appendChild(el("span", "count", g.skills.length + " skills"));
      band.appendChild(head);

      var cloud = el("div", "skill-cloud");
      g.skills.forEach(function (s) {
        var item = el("span", "skill-item");
        item.appendChild(el("span", "skill-name", s.name));
        var meter = el("span", "meter");
        meter.setAttribute("role", "img");
        meter.setAttribute("aria-label", s.name + " proficiency " + s.proficiency + " of 5");
        for (var i = 1; i <= 5; i++) {
          meter.appendChild(el("i", i <= s.proficiency ? "on" : null));
        }
        item.appendChild(meter);
        cloud.appendChild(item);
      });
      band.appendChild(cloud);
      host.appendChild(band);
    });
  }

  function renderCourses() {
    var host = $("[data-courses]");
    if (!host) return;
    host.innerHTML = "";
    (DATA.courses || []).forEach(function (c) {
      var cell = el("div", "course-cell");
      cell.appendChild(el("span", "course-code", c.code));
      cell.appendChild(el("span", "course-name", c.name));
      if (c.summary) cell.appendChild(el("span", "course-summary", c.summary));
      host.appendChild(cell);
    });
  }

  /* ---------- drawer ------------------------------------------------- */

  var lastFocused = null;

  function openProject(p) {
    var d = $("[data-drawer]");
    if (!d) return;
    lastFocused = document.activeElement;

    setText("[data-drawer-title]", p.title);
    var c = $("[data-drawer-course]");
    if (c) c.textContent = p.course || "";
    setText("[data-drawer-summary]", p.summary);
    setText("[data-drawer-body]", p.body || "");

    var meta = $("[data-drawer-meta]");
    meta.innerHTML = "";
    [["Role", p.role], ["Status", (p.status || "").replace("_", " ")],
     ["Artifacts", String((p.media || []).length)]].forEach(function (pair) {
      if (!pair[1]) return;
      var item = el("div", "meta-pair");
      item.appendChild(el("dt", null, pair[0]));
      item.appendChild(el("dd", null, pair[1]));
      meta.appendChild(item);
    });

    var tags = $("[data-drawer-skills]");
    tags.innerHTML = "";
    (p.skills || []).forEach(function (s) {
      tags.appendChild(el("span", "tag", s));
    });

    var arts = $("[data-drawer-artifacts]");
    arts.innerHTML = "";
    (p.media || []).forEach(function (m) {
      var li = el("li", "artifact");
      li.appendChild(svg(m.kind, 17));
      var b = el("div");
      b.appendChild(el("span", "artifact-caption", m.caption || KIND_LABEL[m.kind] || "Artifact"));
      b.appendChild(el("code", "artifact-path", m.url));
      li.appendChild(b);
      arts.appendChild(li);
    });
    if (!(p.media || []).length) {
      arts.appendChild(el("li", "artifact", "No artifact recorded for this project."));
    }

    d.hidden = false;
    document.body.style.overflow = "hidden";
    var close = $("[data-drawer-close]", d);
    if (close) close.focus();
  }

  function closeDrawer() {
    var d = $("[data-drawer]");
    if (!d || d.hidden) return;
    d.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function wireDrawer() {
    var d = $("[data-drawer]");
    if (!d) return;
    $$("[data-drawer-close]", d).forEach(function (b) {
      b.addEventListener("click", closeDrawer);
    });
    d.addEventListener("click", function (e) { if (e.target === d) closeDrawer(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
  }

  /* ---------- chrome: progress, sticky nav, active section ---------- */

  function wireChrome() {
    var bar = $("[data-progress]");
    var nav = $("[data-nav]");

    function onScroll() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (bar) bar.style.width = pct.toFixed(2) + "%";
      if (nav) nav.classList.toggle("is-stuck", window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* active link + reveal, via one observer each */
    var links = $$("[data-nav] .nav-links a");
    if (links.length && "IntersectionObserver" in window) {
      var sections = links.map(function (a) {
        return document.querySelector(a.getAttribute("href"));
      }).filter(Boolean);

      var navObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          links.forEach(function (a) {
            a.classList.toggle("is-active",
              a.getAttribute("href") === "#" + e.target.id);
          });
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(function (s) { navObs.observe(s); });
    }

    var revealed = $$(".reveal");
    if (!revealed.length) return;
    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealed.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-in");
        o.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealed.forEach(function (n) { obs.observe(n); });
  }

  /* ---------- markup icons ------------------------------------------- */

  function hydrateIcons() {
    $$("[data-icon]").forEach(function (node) {
      node.appendChild(svg(node.getAttribute("data-icon"),
        Number(node.getAttribute("data-icon-size")) || 16));
    });
  }

  /* ---------- boot ---------------------------------------------------- */

  function boot() {
    hydrateIcons();
    renderProfile();
    renderMetrics();
    renderCertificates();
    renderFilters();
    renderWork();
    renderSkills();
    renderCourses();
    wireDrawer();
    wireChrome();

    var search = $("[data-search]");
    if (search) {
      search.addEventListener("input", function () {
        state.query = search.value;
        renderWork();
      });
    }
    var year = $("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
