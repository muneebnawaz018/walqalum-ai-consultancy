import type { PostDoc } from "@/lib/db";
import type { PostInput } from "@/lib/schemas";

/**
 * A stored post as the editor's form state.
 *
 * Every optional field on the document gets a concrete value here, because a
 * controlled input handed `undefined` becomes uncontrolled and React complains
 * about it on the first keystroke rather than on render. Posts written before
 * these fields existed come through this too, which is why nothing below reads
 * a nested property without a fallback.
 */
export function toInput(doc: PostDoc): PostInput {
  return {
    slug: doc.slug,
    status: doc.status,
    category: doc.category,
    featured: doc.featured,
    cover: doc.cover ?? { url: "", alt: { en: "", ar: "" } },
    title: doc.title,
    excerpt: doc.excerpt,
    body: doc.body,
    faqs: doc.faqs ?? [],
    seo: {
      title: doc.seo?.title ?? { en: "", ar: "" },
      description: doc.seo?.description ?? { en: "", ar: "" },
      ogImage: doc.seo?.ogImage ?? { url: "", alt: { en: "", ar: "" } },
      canonical: doc.seo?.canonical ?? "",
      primaryKeyword: doc.seo?.primaryKeyword ?? "",
      keywords: doc.seo?.keywords ?? [],
      noindex: doc.seo?.noindex ?? false,
      jsonLd: doc.seo?.jsonLd ?? "",
    },
    // Falls back to whoever saved it, so an older post shows a byline rather
    // than an empty required field.
    authorName: doc.authorName || doc.author?.name || "",
    reviewedBy: doc.reviewedBy ?? "",
    tags: doc.tags ?? [],
    readingMinutes: doc.readingMinutes ?? null,
    publishedAt: doc.publishedAt ? new Date(doc.publishedAt).toISOString() : null,
    lastUpdatedAt: doc.lastUpdatedAt ? new Date(doc.lastUpdatedAt).toISOString() : null,
  };
}
