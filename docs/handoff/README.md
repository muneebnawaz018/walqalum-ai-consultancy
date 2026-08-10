# WalQalum website

Rebrand from a software development agency to an AI and digital transformation
consultancy. Bilingual English / Arabic, Next.js 16, MongoDB newsroom.

## Open this first

**`design/mockup.html`** — one self-contained file with all 38 pages in both
languages and a working router. Drag it into a browser. It is the specification.

Then **`CLAUDE.md`**, which indexes everything else and lists the decisions that
are already made.

## Layout

```text
CLAUDE.md                        brief for the coding agent — read first
docs/
  01-positioning.md              why the site says what it says
  02-build-kickoff.md            URLs, redirects, MongoDB, auth, SEO
  03-content-inventory.md        every page; what is real vs placeholder
  04-open-items.md               what the client still owes
design/
  mockup.html                    the clickable specification
  design-system.css              the real stylesheet — port, do not rewrite
  generate-placeholder-images.py regenerates the placeholder plates
content/
  01-core.js                     brand, nav, home, practices, engagements, industries
  02-work-insights-firm.js       case studies, posts, leadership, offices, contact
  03-capabilities.js             the eight capability pages
  04-partners-careers-legal.js   partners, careers, privacy, terms
```

## Working with Claude Code

Open this folder as the workspace. `CLAUDE.md` is picked up automatically and
carries the context and the constraints. Point it at a phase from the
"Where to start" list rather than asking for the whole site at once.
