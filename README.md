# Porto_Ari v2

A dark, editorial portfolio for **Muhammad Ariansyah Fajar Saputra**
(NIM 607012500067, D3 Sistem Informasi 49-03), backed by a live PostgreSQL
database — with reserved slots for certificates.

Open `index.html` directly in a browser. No build step, no server, no npm install.

---

## What is here

```
portofoliov2/
├── index.html              the site (open this)
├── assets/
│   ├── styles.css          all styling
│   ├── app.js              rendering + interaction
│   └── data.js             GENERATED - profile, projects, skills, certificates
└── tools/
    └── generate_data.py    rebuild data.js from the live database
```

`data.js` is GENERATED and must not be hand-edited — it is overwritten on the
next run. Edit the database (and the `CERTIFICATES` list for credentials), then
re-run `tools/generate_data.py`.

This is a separate build from `../portfolio` (v1), which still exists untouched.
v1 is a light, near-white page; v2 is the dark, cinematic one.

---

## Design direction

Referenced from award-winning portfolio sites on awwwards — the vocabulary those
sites share rather than any one site's layout: a near-black ground that lets the
accent read as light, oversized editorial typography, a numbered index of work,
and motion used to establish hierarchy rather than to decorate.

**The blue.** One professional blue system, not a single flat accent:

| Token | Value | Used for |
|---|---|---|
| `--blue` | `#2f7bff` | primary actions, active states, focus rings |
| `--blue-2` | `#5c9bff` | links, hover, emphasis, proficiency dots |
| `--blue-3` | `#8fbaff` | small labels on dark art |
| `--blue-deep` | `#0b3fa8` | gradient floors, ambient bloom |
| `--blue-ink` | `#cfe0ff` | body text inside blue-tinted panels |
| `--blue-glow` | `rgba(47,123,255,.35)` | button and badge shadows |

It is used structurally, not decoratively: ambient bloom behind the hero, the
featured panel's radial wash, the scroll-progress bar, the tag and meter fills,
the rotated arrow on row hover, and the drawer's accents. Contrast of `--blue-2`
on the `#080b14` ground is well above the 4.5:1 threshold for body text.

**Deliberately absent:** emoji, glassmorphism without depth behind it, gradients
applied for their own sake, three-equal-feature-card grids, oversized stat
monuments, and decorative SVG illustrations posing as product imagery.

---

## Certificates — how to fill the slots

There are **6 certificate slots**, currently all empty. An empty slot renders as
a visibly-marked, dashed "Reserved for your certificate" card. Nothing is ever
shown as earned until you put something in it — no invented credentials.

To add a real one, edit the `CERTIFICATES` list near the top of
`tools/generate_data.py`:

```python
CERTIFICATES = [
    {
        "title": "Belajar Dasar Pemrograman Web",   # required
        "issuer": "Dicoding Indonesia",
        "issued": "2026-03",                        # any format you like
        "credentialId": "ABC123XYZ",                # optional
        "url": "https://dicoding.com/certificate/ABC123",  # optional "Verify" link
        "skills": ["HTML", "CSS"],
        "image": "",                                # optional image path/URL
        "highlight": True,                          # marks it Featured
    },
    # ... five more slots
]
```

Then run:

```bash
python tools/generate_data.py
```

Real certificates sort to the front and empty slots fall to the back, so the
grid always leads with what you have actually earned. Leaving `"title": ""`
keeps a card as an empty slot. Alternatively, edit the `certificates` array in
`assets/data.js` directly if you would rather not re-run the generator — just
remember it is overwritten next time the generator runs.

---

## The database behind it

The content is generated from a live KroomBase project (`Porto_Ari`,
schema `p_59126794f35744fd9c3ea4c618241d3b`): 11 tables, 12 projects,
19 skills, 10 courses, 21 artifacts.

Like v1, this site is **static and holds no credential**. It reads only the
generated `assets/data.js`. The project's API key grants full read/write on the
database, so it must never be shipped to a browser — live data would need a small
proxy server holding the key. The schema and its DDL live in `../portfolio/database/`.

Regenerating:

```bash
python tools/generate_data.py
```

The token is read from `KROOMBASE_API_KEY`, then from `MCP_KROOMBASE_API_KEY` in
`E:\hermes\.env`. Requires Python 3.8+.

---

## Reference to v1

`../portfolio` is the earlier light build with the full schema documentation,
DDL and ERD. Both read the same database; they are independent static sites.

---

## Accessibility

Skip link, visible focus rings on every control, keyboard-openable work rows and
spotlight (Enter/Space), Escape closes the drawer, `aria-pressed` on filters,
`aria-live` on the result count, `aria-label` on proficiency meters, and a
`prefers-reduced-motion` block that also disables the scroll-reveal animation
(revealed content stays visible rather than animating in).

## Browser support

Modern evergreen browsers. Uses `IntersectionObserver` (guarded — content renders
without it), `backdrop-filter`, CSS grid, `clamp()` and `:focus-visible`.

## Verified

Checked with jsdom harnesses that load the page, run both scripts and assert the
rendered DOM — 44 assertions plus a filled-certificate edge case, 0 runtime errors:

- 12 projects render as 1 spotlight (item 01) + 11 numbered index rows, numbers unique
- 6 certificate slots render as empty, clearly marked, with the how-to hint
- a filled certificate renders title, issuer, credential ID and a verify link,
  and the counter reads "2 of 3 slots filled"
- 6 skill bands / 19 skills with meters, 10 course cells, 3 contact links
- drawer opens from both a row and the spotlight and closes on Escape
- search filters and hides the spotlight; featured filter narrows correctly
- all 38 selectors resolve, all 13 icon paths defined, CSS braces balanced,
  every `var()` declared, all 24 hex values valid
