# SEO and crawler coverage

Working tracker. Tick items as they land, keep the evidence lines so a later
reader can re-run the check rather than trust the tick.

Audited 10 August 2026 against the running dev server, not against the source,
so every "missing" below is missing from HTML a crawler actually receives.

---

## Baseline: what the home page serves today

```html
<meta charSet="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>WalQalum · AI Partner</title>
<meta name="description" content="Your AI partner for scalable growth...">
<link rel="icon" href="/favicon.ico" sizes="256x256" type="image/x-icon">
```

Four tags. Blog posts are the only URLs on the site carrying a social card.

Re-run:

```bash
curl -s http://localhost:3000/ | python3 -c "import sys,re; h=sys.stdin.read().split('</head>')[0]; print('\n'.join(t for t in re.findall(r'<(?:meta|title|link)[^>]*>', h) if '_next' not in t))"
```

---

## Done

| Item | Where | Note |
| --- | --- | --- |
| `robots.txt` | `app/robots.ts` | one `*` rule, blocks `/admin` and `/api`, points at the sitemap |
| `sitemap.xml` | `app/sitemap.ts` | 9 routes + cases + products + posts, revalidate 3600 |
| `llms.txt` | `app/llms.txt/route.ts` | pages, products, cases, posts |
| Article + FAQPage JSON-LD | `lib/schema-org.ts` | blog posts only, custom block merges by `@type` |
| OG and Twitter tags | `app/(nb)/blog/[slug]/page.tsx` | blog posts only |
| Canonical and noindex | same file | blog posts only, editor-controlled |
| Title and description | 13 routes | every route has both |
| `metadataBase` | `app/(nb)/layout.tsx` | relative OG URLs resolve |
| Admin excluded | `app/(admin)/layout.tsx` | `robots: { index: false, follow: false }` |
| SSR HTML | all routes | crawlers need no JS to read the page |
| Old URL redirects | `next.config.ts` | 10 permanent redirects off the previous site |
| 404 returns 404 | `app/(nb)/not-found.tsx` | verified, not a soft 200 |
| Trailing slash | Next default | `/blog/` 308s to `/blog` |
| JSON-LD tests | `tests/seo.test.ts` | 16 tests |

Verified status codes:

```text
/                     200 text/html
/blog/                308
/nonexistent          404 text/html
/sitemap.xml          200 application/xml
/robots.txt           200 text/plain
/llms.txt             200 text/plain
/feed.xml             404   <- missing
/manifest.webmanifest 404   <- missing
```

---

## Brand assets and profiles

Both were pulled off the live site at walqalum.com on 10 August 2026.

Social, from the live footer:

```text
LinkedIn    https://www.linkedin.com/company/walqalum
X           https://x.com/qalamkars
Instagram   https://www.instagram.com/theqalamkars/?hl=en
```

- [ ] **Confirm the X and Instagram handles.** Both are `qalamkars`, not
      `walqalum`. `sameAs` should only list profiles that genuinely represent
      the same organisation, so this needs a yes from you before it ships.
      LinkedIn is unambiguous and can go in now.

Logo, saved to `public/brand/`:

| File | Source | Size |
| --- | --- | --- |
| `walqalum-wordmark-white.png` | extracted from the raster embedded in the live site's `walqalum.svg` | 568x439 |
| `walqalum-wordmark-white.svg` | live site `<link rel="image_src">` | 30KB wrapper, raster inside, not true vector |
| `walqalum-mark-blue.png` | live site favicon | 84x84 |

Every asset above is white art on transparency, so it vanishes on white. The
live site has the same problem and ships it as its own `og:image`, which is why
sharing walqalum.com today produces a blank white card on most platforms.
Solved here by cropping the eagle to its own file and using it as a mask, so it
is painted with `currentColor` and can never be the wrong colour against its
background. The crop is the artwork's measured alpha bounding box, mark at
y 92-205 and x 119-421 of the 568x439 source, with the wordmark occupying
y 228-298.

| File | Purpose | Size |
| --- | --- | --- |
| `public/brand/walqalum-mark.png` | the eagle alone, transparent, used as a CSS mask | 606x228 |
| `app/icon.png` | favicon, white eagle on brand ink | 512x512 |
| `app/apple-icon.png` | iOS home screen and iMessage fallback | 180x180 |

`app/favicon.ico` was the unmodified `create-next-app` default, a black circle
with the Vercel triangle, and served as this site's icon in every browser tab
until it was deleted. `app/icon.png` replaces it.

`app/icon.png` doubles as the `Organization.logo` source in batch 3: 512x512 on
a solid background clears Google's 112x112 minimum.

Two things on the live site deliberately not carried over: `og:phone_number`
is `919-614-6673`, a US number matching none of the three offices, and every
`og:` URL there points at `http://`, not `https://`.

---

## Batch 1: crawler reach and directives

- [ ] `robots.txt` naming every agent explicitly rather than one wildcard:
      `ClaudeBot`, `Claude-User`, `Claude-SearchBot`, `GPTBot`, `OAI-SearchBot`,
      `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `Google-Extended`,
      `Applebot-Extended`, `CCBot`, `Bytespider`, `Amazonbot`,
      `meta-externalagent`. Two separate decisions: appearing in AI answers
      (the search and user agents) and being trained on (`Google-Extended`,
      `Applebot-Extended`, `GPTBot`). `Google-Extended` does not affect Search
      ranking, which is the usual misconception.
- [ ] Sitewide `max-image-preview:large, max-snippet:-1, max-video-preview:-1`.
      Cheapest high-value item here. Without it Google truncates snippets and
      will not give the site a large image in Discover.
- [ ] Canonical on all 13 routes. Only blog posts have one, so everything else
      relies on Google guessing between slash and query-string variants.
- [ ] `/feed.xml` (RSS or Atom) plus `alternates.types` so it is discoverable.
      Aggregators and several AI ingestion pipelines follow feeds, not sitemaps.
- [ ] `llms-full.txt`: the same map with the prose inlined.
- [ ] `.md` mirrors per page, or content negotiation on `Accept: text/markdown`,
      so an agent fetching a URL gets clean prose instead of parsing the DOM.
- [ ] IndexNow key file plus a ping on publish. Bing and Yandex index in minutes
      rather than days.
- [ ] `/.well-known/security.txt` (RFC 9116).
- [ ] `X-Robots-Tag: noindex` on `/api`. `robots.txt` stops the crawl, but a
      linked JSON response can still be indexed URL-only. The header is robust.
- [ ] Sitemap `lastModified` for static routes. It currently sends
      `new Date()`, so all 9 claim to have changed an hour ago, forever, and
      crawlers learn to ignore the field. Use a build or commit timestamp.
- [ ] Image entries in the sitemap. 13 photos in `public/img`, none declared.
- [ ] Search Console and Bing verification meta.

---

## Batch 2: social cards on every route

Each platform reads a different subset, which is why one `og:image` is not
enough on its own.

| Platform | Reads | Today |
| --- | --- | --- |
| WhatsApp | `og:image` absolute and under 300KB, needs `og:image:width`/`height` or it falls back to the small card | bare link |
| LinkedIn | `og:*` only, ignores `twitter:*`, wants 1200x627, caches about 7 days | bare link |
| X | `twitter:card`, falls back to `og:*`, `summary_large_image` wants 2:1 | bare link |
| Facebook | `og:*` plus `og:image:secure_url`, `og:locale`, `og:site_name` | bare link |
| Slack | `og:*`, falls back to `twitter:*`, shows `og:site_name` and the favicon | bare link |
| Discord | `og:*` plus `theme-color` for the embed accent stripe | bare link, no `theme-color` |
| Telegram | `og:image`, `og:title` | bare link |
| iMessage | `og:image`, `og:title`, falls back to `apple-touch-icon` | bare link, no apple icon |
| Pinterest | `og:*` plus Article or Product schema for Rich Pins | no rich pin possible |
| Threads, Signal | `og:*` | bare link |
| Google Discover | `max-image-preview:large` plus an image at least 1200px wide | excluded |

- [ ] `opengraph-image.tsx` generated with `ImageResponse`, using the woff2
      files already in `public/fonts`.
- [ ] Full `og:*` and `twitter:*` on all 13 routes.
- [ ] The fields blog posts are still missing: `og:image:width`,
      `og:image:height`, `og:image:alt`, `og:locale`, `og:site_name`,
      `article:section`, `article:tag`, `twitter:site`.
- [ ] `theme-color`.
- [ ] `icon.tsx`, `apple-icon.tsx` (180x180), maskable 512.
- [ ] `manifest.ts`.
- [ ] oEmbed endpoint. Slack and several CMSs give a richer unfurl when one
      exists.

---

## Batch 3: structured data

Blog posts are the only pages with JSON-LD. Everything below is absent.

- [ ] `Organization` with logo and `sameAs`. Blocked on both items above.
- [ ] `LocalBusiness` per office. The data is already on the page and entirely
      unstructured, in `components/nb/About.tsx` and `components/nb/Contact.tsx`:

  ```text
  Sharjah Media City, UAE        +971 54 744 8002
  Johar Town, Lahore, Pakistan   +92 322 4696562
  Dubbo, NSW, Australia          +61 470 669 147
  tafseel@walqalum.com
  ```

  For a UAE agency this is probably worth more than anything else on the
  list, since it is what the local pack reads.
- [ ] `ContactPoint` on `/contact`.
- [ ] `BreadcrumbList`, plus breadcrumb UI to match.
- [ ] `SoftwareApplication` on product pages.
- [ ] `CreativeWork` or `Article` on the 5 case studies.
- [ ] `Person` for leadership, with `sameAs`.
- [ ] `FAQPage` on marketing pages. The block already exists for posts.
- [ ] `WebSite`. Note: skip `SearchAction` unless a `/search` route gets built.
      Claiming it without one is a lie in the markup.

---

## Batch 4: content structure

- [ ] Heading order. Measured in the DOM, five of seven pages skip a level:

  ```text
  /products  1->3        /work  1->3        /blog  1->3
  /about     1->4, 2->4 x3                  /      2->4
  ```

  Cause is `h5` used as a styled label, in `.mega .col h5` and
  `footer.site h5`. Both the accessibility tree and Google's outline parser
  read it as structure.
- [ ] Three images on `/blog` render `alt=""`. Seeded posts have an empty
      `cover.alt` and the editor accepts blank. Every other page measured clean.
- [ ] Blog pagination, tag pages, author pages. One flat list today. Tags exist
      in the schema and index nothing. No author page means no `Person.sameAs`,
      which is the E-E-A-T signal Google leans on hardest for AI topics.
- [ ] Footer office entries are `<a>` with no `href`.

---

## Batch 5: Arabic routing

The largest item on this page, and structural rather than a missing tag.

`lib/seo.ts` states it: "Language is switched in the browser rather than by
URL." Arabic lives in `data-ar` attributes and is swapped by JS after load, and
there is one URL per page carrying English. So:

- zero Arabic pages exist in Google, Bing, or any AI index
- no `hreflang`, nothing for an Arabic query to match
- the whole Arabic translation is invisible to every crawler

- [ ] `/ar/*` routes.
- [ ] `alternates.languages` plus `x-default`.
- [ ] Arabic entries in the sitemap.

Worth doing only if Arabic search traffic matters commercially. It touches every
page, so it stays its own batch either way.

---

## Notes on what is real

- `llms.txt` is a 2024 proposal by Jeremy Howard. No major AI vendor has
  confirmed reading it. It costs nothing and is already shipped. Do not expect
  traffic from it.
- `.md` mirrors are real and in use at Anthropic and Vercel. An agent fetching
  the page gets prose instead of DOM.
- What actually decides whether Claude or Gemini cites the site: server-rendered
  HTML (done), semantic headings (batch 4), structured data (batch 3), and
  `robots.txt` not blocking the agent (batch 1). No single file does it.
- `humans.txt` does nothing. Skipped deliberately.
- The origin is not configured any more. `lib/seo.ts` derives it from the
  deployment (Vercel's project or branch domain, or the dev server's port) and
  falls back to `https://walqalum.com` only when nothing announces itself.
  `robots.txt`, `sitemap.xml` and `llms.txt` use the requesting host instead,
  which is why they are dynamic routes.
