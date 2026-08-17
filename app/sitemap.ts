import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";
import { PRODUCTS } from "@/lib/products";
import { listPosts } from "@/lib/posts";
import { ROUTES, absOn, originFromRequest } from "@/lib/seo";
import { LOCALES, DEFAULT_LOCALE, isLocalisedPath, localeHref } from "@/lib/i18n";

/**
 * Built per request rather than cached, so the URLs it lists are on the domain
 * that served it. `revalidate` is gone with the caching it configured: reading
 * the host is a request-time API, which opts this route out either way.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = await originFromRequest();
  const abs = (path: string) => absOn(origin, path);
  const now = new Date();
  /* Localised pages are listed once per locale. The legacy routes are not
     under [lang] and exist in English only, so they are listed as they are. */
  const pages: MetadataRoute.Sitemap = ROUTES.flatMap((path) => {
    const locales = isLocalisedPath(path) ? LOCALES : [DEFAULT_LOCALE];
    return locales.map((locale) => ({
      url: abs(localeHref(path, locale)),
      lastModified: now,
      changeFrequency: path === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.7,
    }));
  });

  const cases: MetadataRoute.Sitemap = Object.keys(CASES).flatMap((slug) =>
    LOCALES.map((locale) => ({
      url: abs(localeHref(`/work/${slug}`, locale)),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  );

  const products: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: abs(`/products/${product.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const posts = await listPosts();
  const articles: MetadataRoute.Sitemap = posts.map((p) => ({
    url: abs(`/blog/${p.slug}`),
    lastModified: p.updatedAt || p.publishedAt || now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...cases, ...products, ...articles];
}
