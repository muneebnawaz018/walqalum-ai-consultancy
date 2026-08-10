export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://walqalum.com").replace(/\/$/, "");

export const abs = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * The site's fixed routes. Language is switched in the browser rather than by
 * URL, so each page is a single canonical address.
 */
export const ROUTES = ["/", "/industries", "/products", "/work", "/about", "/contact", "/blog", "/privacy", "/terms"] as const;
