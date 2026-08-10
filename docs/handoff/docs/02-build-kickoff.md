# WalQalum — build kickoff

Decisions locked. This is what the developer needs before writing the first route.

---

## 1. The URL decision that matters most

**Do not prefix English with `/en`.**

Every page you have indexed today sits at an unprefixed path — `/about-us`, `/services/drupal-development`, `/blog`. Adding `/en` in front of them means a site-wide 301 on launch day: recoverable, but it puts every ranking you have through a redirect at once, for no gain.

```
English (default)   /about-us              /services/drupal-development
Arabic              /ar/about-us           /ar/services/drupal-development
```

In Next.js: `i18n` with `defaultLocale: 'en'` and `localePrefix: 'as-needed'`, or an equivalent `[[...locale]]` catch-all. Every page emits `hreflang` for `en`, `ar` and `x-default` pointing at the English URL.

The mockup uses `#/en/…` only because a single-file hash router needs an explicit locale. Do not carry that into production.

---

## 2. Redirect map

**The good news: almost nothing needs to move.** The mockup was built onto your existing URLs deliberately, so the migration is nine redirects, not ninety.

### 301s required

| From (live today) | To | Why |
|---|---|---|
| `/services/it-Infrastructure-and-cloud-ervices` | `/services/it-infrastructure-and-cloud` | Capital `I`, and `ervices` is missing its `s`. Fix the slug, redirect the typo. |
| `/our-client` | `/our-partners` | Singular, and it serves the Partners page. Optional — see note. |

If you would rather not touch `/our-client`, leave it. It carries almost no inbound value, so it is a tidiness decision rather than an SEO one. The mockup currently answers on it either way.

### Unchanged — no redirect, no action

```
/                                    /about-us
/services                            /our-work
/blog                                /contact
/privacy-policy                      /term-and-condition
/life-walqalum
/services/mobile-development         /services/web-development
/services/software-development       /services/ai-and-machine-learning
/services/drupal-development         /services/shopify-development
/services/data-intelligence-and-cybersecurity
```

### New URLs — no old equivalent

`/engagements` · `/industries` · `/capabilities`
`/services/{ai-advisory, digital-transformation, growth-systems, engineering}`
`/our-work/{7 case slugs}`
`/blog/{2 new posts}`
Plus every `/ar/*` mirror.

### Before you switch DNS

1. Crawl the live site (Screaming Frog or equivalent) and export every 200-status URL.
2. Diff against the new sitemap. **Anything in the old list that is not in the new one, or in this redirect table, is a page about to 404.**
3. Keep the old `sitemap.xml` reachable for a fortnight after launch.

---

## 3. The newsroom — MongoDB

Next.js API routes, a protected admin, CRUD on posts. No CMS.

### Collections

```js
// posts
{
  _id, slug,                        // unique index
  status: "draft" | "published",
  publishedAt: Date, updatedAt: Date,
  category: { en: String, ar: String },
  author:   { name: String, id: ObjectId },
  readingMinutes: Number,           // computed on save
  featured: Boolean,
  cover: { url: String, alt: { en, ar } },
  title:   { en: String, ar: String },
  excerpt: { en: String, ar: String },
  body:    { en: String, ar: String },   // markdown
  seo:     { title: {en,ar}, description: {en,ar} }
}

// users
{ _id, email, passwordHash, name, role: "admin"|"editor", createdAt, lastLoginAt }
```

Indexes: `posts.slug` unique · `posts.status + publishedAt` descending · `users.email` unique.

**Arabic is a first-class field, not a translation table.** A post can be published in English with Arabic still empty; the site falls back to English and the language switch says so rather than showing a blank page.

### Routes

```
/admin                     login
/admin/posts               list, filter by status
/admin/posts/new           create
/admin/posts/[id]          edit, preview, publish, delete

POST   /api/auth/login     credentials -> httpOnly cookie
POST   /api/auth/logout
GET    /api/posts          ?status= &lang=       (published only, unless authed)
POST   /api/posts          create                (auth)
PATCH  /api/posts/[id]     update                (auth)
DELETE /api/posts/[id]     delete                (auth)
POST   /api/upload         cover images -> S3    (auth)
```

### Auth

Credentials only — there is no reason to add OAuth for a team of forty.

- `bcrypt` at cost 12. **No user-registration endpoint** — accounts are seeded by a script, because a public signup route on an admin panel is how these get compromised.
- Session as a signed JWT (`jose`) in an **httpOnly, Secure, SameSite=Lax** cookie. Seven-day expiry, rolling.
- Guard `/admin/*` and every mutating `/api/*` in `proxy.ts`. Check the session on the server for each request — never trust a client-side check alone.
- Rate-limit `/api/auth/login` to five attempts per IP per fifteen minutes.
- `zod` on every request body. Sanitise markdown on render, not on save, so the original text is never silently mangled.

### Publishing

On create, update or delete, call `revalidateTag('posts')` and `revalidateTag('post:' + slug)`. Public pages use `next: { tags: [...] }`, so a publish appears within seconds and no rebuild is triggered.

### Images

You already run S3 and Cloudflare. Upload covers to the same bucket via a presigned URL and serve through `next/image` with that host allow-listed. Nothing new to procure.

---

## 4. SEO layer

- **JSON-LD** per template: `Organization` + `WebSite` sitewide; `Service` on the twelve service and capability pages; `Article` on posts; `CaseStudy`/`CreativeWork` on cases; `BreadcrumbList` everywhere.
- **`llms.txt`** at the root — what the firm does, the four practices, the three diagnostics, and a route index.
- **`.md` twin of every route.** `/services/drupal-development.md` returns clean markdown. Proxy rewrites `*.md` to a route handler that renders the same content object as text. Retrieval systems read structure, not adjectives, and this is the cheapest way to give them the structure.
- `sitemap.xml` generated from the content layer, with `hreflang` pairs on every entry.
- `robots.txt` disallowing `/admin` and `/api`.

---

## 5. Sequence

1. Scaffold, design system, content layer, locale routing *(largely done)*
2. **Redirect map + SEO layer** — first, not last
3. All 38 pages, both languages
4. Newsroom: Mongo, auth, admin, CRUD
5. Lighthouse, axe, real devices, crawl diff, launch

---

## Still outstanding

- **Photography** — three slots, dummy plates in place for now
- **Client-confirmed metrics** — Securance, Nectios, Hainok
- **Legal review** of Privacy and Terms
- **Tagline sign-off** and a **native Arabic read** of all copy
- **Hosting** — Vercel, or your existing AWS

Resolved: logo (served from your S3), Sharjah as the UAE office, Partners / Careers / legal copy accepted as written.
