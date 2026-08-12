import type { MetadataRoute } from "next";
import { originFromRequest } from "@/lib/seo";

/**
 * Reading the request's host makes this a dynamic route, which is the point: a
 * robots.txt served on a staging domain should point at that domain's sitemap,
 * not production's. It is one small text file, so nothing is lost by not
 * caching it.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const origin = await originFromRequest();
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: `${origin}/sitemap.xml`,
  };
}
