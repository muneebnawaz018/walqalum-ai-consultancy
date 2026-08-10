# WalQalum — project brief

You are building the WalQalum website. Read this file first. It tells you what exists, what is decided, and what you must not change.

---

## What this is

WalQalum is repositioning from a software development agency into an **AI and digital transformation consultancy**. The old site sold "Mobile App Development" and "Drupal Development" as its offer, and published a $25/hour rate. The new site sells four consulting practices and three fixed-scope diagnostics, with the technologies moved down a level where they belong.

Everything in this repo exists to serve that shift. If a decision seems arbitrary, `docs/01-positioning.md` explains why.

**The wedge, in one sentence:** the Big Four write the strategy and hand you a deck, integrators build what the deck says, late — WalQalum does both with one accountable team.

---

## Where everything is

| You need | Read |
| --- | --- |
| Why the site says what it says | `docs/01-positioning.md` |
| URLs, redirects, MongoDB schema, auth, SEO layer | `docs/02-build-kickoff.md` |
| Colours, type, spacing, components | `design/design-system.css` — the real thing, not a description |
| **What every page looks like** | `design/mockup.html` — open it in a browser |
| All copy, both languages | `content/*.js` |
| What is real vs placeholder | `docs/03-content-inventory.md` |
| What is still outstanding | `docs/04-open-items.md` |

**`design/mockup.html` is the specification.** It is one self-contained file containing all 38 pages in English and Arabic, with a working router. When you are unsure how something should look or behave, open it rather than inventing an answer. Its CSS is `design/design-system.css` — port it, do not rewrite it.

---

## Stack

- **Next.js 16**, App Router, TypeScript, Tailwind v4
- **MongoDB** for the newsroom (posts + users). No CMS.
- Fonts: Newsreader (display, Latin), Noto Naskh Arabic (display, Arabic), IBM Plex Sans + IBM Plex Sans Arabic (body)
- Hosting: to be confirmed — Vercel or the client's existing AWS

### Next.js 16 gotchas that will bite you

- **Middleware is now `proxy.ts`**, not `middleware.ts`, and the export is `proxy` not `middleware`. Same behaviour, different name.
- `params` is a **Promise** — `const { slug } = await params`.
- `PageProps<'/blog/[slug]'>` and `LayoutProps<...>` are **global** helpers. No import.
- Multiple root layouts via route groups are supported, and you will want them: one for the public site, one for `/admin`.
- Read `node_modules/next/dist/docs/` before assuming an API. The bundled docs are authoritative for this version.

---

## Non-negotiables

These are decisions already made with the client. Do not revisit them without asking.

### 1. English is not prefixed

```text
English (default)   /about-us          /services/drupal-development
Arabic              /ar/about-us       /ar/services/drupal-development
```

Every URL the client has indexed is unprefixed today. Adding `/en` forces a site-wide 301 on launch day and risks every ranking they have. The mockup uses `#/en/…` only because a hash router needs an explicit locale — **do not carry that into production.**

### 2. Never invent a metric

Case-study metric bands render as `—` placeholders. Three clients have not yet confirmed their numbers. A consultancy caught publishing a fabricated outcome loses more than the number ever gained it. Leave the dashes.

The same rule covers partner certifications on `/our-partners`: the tier is deliberately blank until it can be evidenced in procurement.

### 3. Arabic is a first-class field, not a translation table

Every content object is `{ en, ar }`. A blog post can be published in English with Arabic empty — the site falls back to English and says so, rather than rendering a blank page. Do not build Arabic as a post-processing layer.

RTL is a real mirror, not `direction: rtl` alone: the layout flips, arrow glyphs flip, and Latin-ordered figures (`40+`, `UTC+4`) are bidi-isolated so they do not reverse.

### 4. No user-registration endpoint

Admin accounts are seeded by a script. A public signup route on an admin panel is how these get compromised. See `docs/02-build-kickoff.md` for the full auth model.

### 5. The eight capability pages keep their live slugs

`/services/drupal-development`, `/services/shopify-development` and the rest are indexed and rank for commercial searches. They sit *under* a practice, not beside one. Do not "tidy" them into new URLs.

Each carries an **"And when it is not"** block — one sentence naming when this is the wrong purchase and where to go instead. Six of the eight send the reader somewhere that costs WalQalum revenue. **This is deliberate and it must survive.** It is what makes the page read as advice rather than a price list.

### 6. Placeholders stay visibly labelled

Photography slots, metric bands and the alliances section are marked as placeholders in the interface. Do not fill them with stock imagery or plausible-looking numbers to make the page feel finished.

---

## Content shape

```js
const T = (en, ar) => ({ en, ar });

C.practices[]     // 4 — the consulting layer
C.capabilities[]  // 8 — the legacy service pages, kept and reframed
C.engagements[]   // 5 — 3 diagnostics + 2 delivery tiers
C.industries[]    // 4
C.work[]          // 7 case studies
C.posts[]         // 6 — 4 live on the current site, 2 marked "Proposed"
C.firm            // leadership, offices
C.partners, C.careers, C.legal
```

Port these to TypeScript with a shared `I18n = { en: string; ar: string }`. The structure is already correct; do not reshape it.

---

## Where to start

1. **Scaffold** — Next.js 16, TS, Tailwind v4, locale routing per §1, `proxy.ts` for the locale and `.md` rewrites.
2. **Port the design system** from `design/design-system.css` into Tailwind theme tokens plus component CSS. Keep the class names — the mockup markup maps onto them directly.
3. **SEO and redirects next, not last.** `docs/02-build-kickoff.md` has the map. Doing this at the end is how launches lose rankings.
4. **Pages** — all 38, both languages, using `content/*.js` as the source.
5. **Newsroom** — MongoDB, auth, admin CRUD.
6. **Pre-launch** — Lighthouse, axe, real devices, and a crawl diff of the live site against the new sitemap.

---

## Quality bar

The mockup was audited at sixteen viewport widths from 320px to 2560px in both languages. It has: no horizontal overflow, no text below 11.4px, no touch target below 40px, nothing clipped, no console errors. **Hold the build to the same bar.**

Two things worth knowing because they cost time to discover:

- `min-height` does nothing on an inline box. Anchors need `inline-flex` or `inline-block` before a touch-target height will apply.
- Form inputs must be 16px on mobile or iOS Safari zooms the page on focus.
