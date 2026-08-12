# WalQalum

The WalQalum site: an AI partner building agents, models and the data
platforms underneath them.
Bilingual English and Arabic, Next.js 16 with a MongoDB newsroom.

The design is the 2026 artifact, rebuilt as real routes. The older handoff
material in `docs/handoff/` describes the previous positioning and no longer
matches what is built.

## Running it

```bash
npm install
cp .env.example .env.development.local   # fill in every blank in it
npm run dev
```

The public site runs without MongoDB. The blog simply renders empty until the
newsroom has published something.

### The database

MongoDB is hosted. There is no local container and no Docker in this repo: every
environment, including a developer's laptop, talks to the cluster over
`MONGODB_URI`. Nothing in the code branches on where the database lives, so the
connection string is the whole of its configuration.

That includes the database name, which lives in the string's path
(`.../walqalum?...`) rather than in a variable or a constant. One newsroom for
one company, described in one place. The path is not optional: without it the
driver falls back to `test`, and the site renders as an empty blog instead of
failing.

The string lives in `.env.development.local`, the file Next itself loads for
`next dev`, which is why the seed and test scripts pass `--env-file` at it too.
Nothing but `.env.example` is committed.

Two consequences of a shared cluster worth knowing before you run anything:

- **The integration tests write to whatever `MONGODB_URI` points at.** They
  create and delete posts through the API. Isolating a run means pointing
  `MONGODB_URI` at another database — change the name in its path.
- **Access is by IP allowlist on the provider, not by anything in this repo.** A
  connection that hangs and then times out is usually an address that has not
  been added, not a wrong password: a bad password fails fast and says so.

Seed an account (there is no sign-up route, deliberately):

```bash
npm run seed:admin    # the account on its own
npm run seed:demo     # the same account plus a few bilingual posts
```

Both read `SEED_EMAIL`, `SEED_NAME` and `SEED_PASSWORD` from
`.env.development.local` through `scripts/account.ts`, so the two cannot end up
describing different logins. There is no default in the code: a password
committed to the repo is one that eventually reaches a real deployment, so they
refuse to run until you set your own, and refuse again if it is under 12
characters.

Arguments override the environment, for a host where you would rather not put a
password in a file at all:

```bash
npm run seed:admin -- editor@walqalum.com "Name" 'a-long-password'
```

Running either against an email that already exists **resets that account's
password**. `seed:admin` says so when it happens. Posts are left alone if their
slug already exists, unless you pass `--force`.

Sign in at `/admin`. Nothing on the site links to it: the newsroom is reachable
by URL only, carries `noindex`, and is disallowed in `robots.txt`.

### Deploying

Two variables, and none of the local ones:

```bash
MONGODB_URI=<the cluster's connection string, ending /walqalum>
AUTH_SECRET=<openssl rand -base64 48, a different one from local>
```

The site's own address is not one of them. `lib/seo.ts` works it out from where
the app is running — the Vercel project domain in production, the branch URL on
a preview, the dev server's port locally — in the same order Next resolves
`metadataBase`. `robots.txt`, `sitemap.xml` and `llms.txt` go further and answer
on whatever host requested them, so a staging domain describes itself rather
than production.

The `SEED_*` trio is needed only when you seed against that database, and there
you are better off passing them to `npm run seed:admin` as arguments, which
leaves the password in no file at all.

## Tests

```bash
npm run seed:demo    # once
npm run dev          # one terminal
npm test             # another
```

The suite writes through the API to whatever `MONGODB_URI` points at, and that
cluster is shared. Change the database name in its path if a run must not touch
real content.

The suite signs in as the same `SEED_EMAIL` / `SEED_PASSWORD` the seed created,
so there is no second pair of credentials to keep in step. Without them the
tests that need an account skip rather than fail.

95 integration tests over the running app, on Node's built-in runner, no extra
dependencies. They drive real HTTP rather than importing route handlers: the
newsroom is guarded in `proxy.ts` as well as in each handler, and a test that
called a handler directly would walk straight past the proxy and prove nothing.

- `tests/public.test.ts` — every page, case study and product, the sector list,
  bilingual markup, sitemap, robots, llms.txt, old-URL redirects, contact form
- `tests/auth.test.ts` — the guards, session cookie flags, sign-out, forged tokens
- `tests/posts.test.ts` — blog CRUD, draft privacy, publish and unpublish,
  markdown rendering, stored-XSS escaping
- `tests/uploads.test.ts` — magic-byte sniffing, SVG refusal, size cap, ETags
- `tests/ratelimit.test.ts` — the login limiter, called directly

Posts the suite creates are deleted afterwards. There is no switch that turns
the login limiter off for a test run: the allowance is thirty failed attempts
per address per fifteen minutes, which a run never approaches, so the limiter
under test is the one that runs in production.

## The 2026 rebrand

The site is the design artifact, built as real Next.js routes. The previous
dark/gold consultancy site was removed wholesale, design system and 38-route
content layer included, and nothing of it remains.

- `app/artifact.css` is the stylesheet, verbatim from the artifact. Its fonts
  were base64 in the artifact and are real files in `public/fonts` here.
- `components/nb/` holds the pages; `Behaviour.tsx` carries every interaction
  the artifact had: the generative canvas, parallax, reveals, counters, tabs,
  drawer, magnetic buttons, language toggle and prototype controls.
- Bilingual copy lives on `data-en` / `data-ar` and is swapped in the browser,
  as the artifact did it. There are no `/ar` URLs.
- Case studies come from `lib/cases.ts`, extracted from the artifact's JS and
  rendered on the server so each study is a real, crawlable URL.

## How it fits together

```text
app/(nb)          the site: home, industries, products, work, about, contact, blog
app/(nb)/work/[slug]   the five case studies, from lib/cases.ts
app/(nb)/blog/[slug]   articles, from MongoDB
app/(admin)       login, post list, editor
app/api           auth, posts CRUD, uploads, enquiries
components/nb     every page and the behaviour layer
lib/cases.ts      case study content
lib/posts.ts      newsroom reads
lib/db.ts         MongoDB
```

### Decisions

- **One URL per page.** Language is switched in the browser, as the artifact
  did it, so there are no `/ar` URLs and no `hreflang` pairs.
- **The prototype panel ships.** The accent and type switcher is live, so the
  brand colour can still be settled against the real site.
- **No registration endpoint.** Accounts come from `npm run seed:admin`, which
  overwrites the password if the email already exists. Sessions are signed JWTs
  in an httpOnly cookie, login is rate-limited, and `/admin` plus every mutating
  API route are checked in `proxy.ts` *and* again on the server. Nothing revokes
  a session early: the cookie is verified by signature alone, so changing or
  deleting an account leaves its existing sessions valid for their 7 days.
  Rotating `AUTH_SECRET` is what ends them all.

### SEO

`sitemap.xml`, `robots.txt` and `llms.txt` are generated from the route list in
`lib/seo.ts`, plus the case studies and published posts.

## Still outstanding

Privacy and terms are written but need a lawyer's read before launch. The
pre-launch pass (Lighthouse, axe, real devices) is still to do.

## Images

Every image goes through `next/image`. The artifact's plate containers are
already sized and positioned, so images fill them.

Cover images upload to MongoDB via GridFS rather than S3: `POST /api/upload`
(auth required, 5MB cap, magic-byte sniffing, SVG refused because it is a script
container served from our own origin), and `GET /api/images/<id>` serves them
back with a long immutable cache.
