import type { MetadataRoute } from "next";
import { CASES } from "@/lib/cases";
import { PRODUCTS } from "@/lib/products";
import { listPosts } from "@/lib/posts";
import { ROUTES, absOn, originFromRequest } from "@/lib/seo";

/**
 * Built per request rather than cached, so the URLs it lists are on the domain
 * that served it. `revalidate` is gone with the caching it configured: reading
 * the host is a request-time API, which opts this route out either way.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = await originFromRequest();
  const abs = (path: string) => absOn(origin, path);
  const now = new Date();
  const pages: MetadataRoute.Sitemap = ROUTES.map((path) => ({
    url: abs(path),
    lastModified: now,
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const cases: MetadataRoute.Sitemap = Object.keys(CASES).map((slug) => ({
    url: abs(`/work/${slug}`),
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

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
