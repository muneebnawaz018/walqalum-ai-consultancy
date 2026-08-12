import { headers } from "next/headers";

/**
 * The site's public origin, with nothing to configure.
 *
 * There is no `NEXT_PUBLIC_SITE_URL` any more. The origin is worked out from
 * where the app is actually running, in the same order Next itself uses for
 * `metadataBase` (see `lib/metadata/resolvers/resolve-url.js` in the framework):
 * a preview deployment claims its own branch URL, production claims the
 * project's domain, and a dev server claims the port it was told to listen on.
 *
 * Two functions rather than one, because the two callers want different things.
 *
 * `SITE_URL` is resolved once, without touching the request. It feeds
 * canonicals, `metadataBase` and JSON-LD — values that outlive the request that
 * produced them, and are baked into statically generated pages. Reading a
 * header for those would opt every page in the site out of static rendering,
 * and would let a forged `Host` publish canonicals pointing somewhere else.
 *
 * `originFromRequest()` asks the actual request. It is for `robots.txt`,
 * `sitemap.xml` and `llms.txt` — three standalone routes where being right on
 * whatever domain is serving matters more than being cached, and where a forged
 * host only ever lies to the person who forged it.
 */
function deployedOrigin(): string {
  const previewHost = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
  if (process.env.VERCEL_ENV === "preview" && previewHost) return `https://${previewHost}`;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  /* Not deployed: the dev server, on whichever port it was given. `next dev -p
     3005` sets PORT, so this follows it rather than assuming 3000. */
  if (process.env.NODE_ENV !== "production") {
    return `http://localhost:${process.env.PORT || 3000}`;
  }
  /* Self-hosted somewhere that announces nothing about itself. */
  return "https://walqalum.com";
}

export const SITE_URL = deployedOrigin().replace(/\/$/, "");

/**
 * The origin this request arrived on.
 *
 * Falls back to `SITE_URL` when there is no host to read, which is what happens
 * if one of these routes is ever prerendered rather than served.
 */
export async function originFromRequest(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") || h.get("host");
  if (!host) return SITE_URL;
  /* A proxy terminating TLS reports the original scheme here. Without it,
     anything that is not localhost is assumed to be served over HTTPS. */
  const proto = h.get("x-forwarded-proto") || (/^(localhost|127\.0\.0\.1|\[::1\])(:|$)/.test(host) ? "http" : "https");
  return `${proto}://${host}`.replace(/\/$/, "");
}

/** Absolute URL against a given origin. */
export const absOn = (origin: string, path: string) =>
  `${origin}${path.startsWith("/") ? path : `/${path}`}`;

/** Absolute URL against the resolved origin. */
export const abs = (path: string) => absOn(SITE_URL, path);

/**
 * The site's fixed routes. Language is switched in the browser rather than by
 * URL, so each page is a single canonical address.
 */
export const ROUTES = ["/", "/industries", "/products", "/work", "/about", "/contact", "/blog", "/privacy", "/terms"] as const;
