import type { PostDoc } from "./db";

type Block = Record<string, unknown>;

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://walqalum.com";

const abs = (url: string) => (url.startsWith("http") ? url : `${SITE}${url}`);

/**
 * The JSON-LD a post ships.
 *
 * Article is always generated, FAQPage whenever the post has questions, and the
 * editor's custom block is merged in last. Merged rather than appended: a page
 * carrying two blocks of the same @type is a validation warning in Search
 * Console, so a custom block that names a generated type replaces it outright
 * and is treated as the deliberate override it looks like.
 */
export function schemaFor(post: PostDoc): Block[] {
  const url = `${SITE}/blog/${post.slug}`;
  const image = post.seo?.ogImage?.url || post.cover?.url || "";

  const article: Block = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seo?.title?.en || post.title.en,
    description: post.seo?.description?.en || post.excerpt.en,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined,
    dateModified: new Date(post.lastUpdatedAt || post.updatedAt || post.publishedAt || Date.now()).toISOString(),
    author: { "@type": "Person", name: post.authorName || post.author?.name || "WalQalum" },
    publisher: { "@type": "Organization", name: "WalQalum", url: SITE },
    ...(image ? { image: [abs(image)] } : {}),
    ...(post.reviewedBy ? { reviewedBy: { "@type": "Person", name: post.reviewedBy } } : {}),
    ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
    ...(post.category?.en ? { articleSection: post.category.en } : {}),
  };

  const generated: Block[] = [article];

  const faqs = (post.faqs ?? []).filter((f) => f.q.en.trim() && f.a.en.trim());
  if (faqs.length) {
    generated.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q.en,
        acceptedAnswer: { "@type": "Answer", text: f.a.en },
      })),
    });
  }

  const custom = parseCustom(post.seo?.jsonLd);
  if (!custom.length) return generated;

  const overridden = new Set(custom.map((b) => String(b["@type"] ?? "")));
  return [...generated.filter((b) => !overridden.has(String(b["@type"]))), ...custom];
}

/** Bad JSON is dropped rather than thrown: a typo must not take the page down. */
function parseCustom(raw?: string): Block[] {
  if (!raw?.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    const blocks = (Array.isArray(parsed) ? parsed : [parsed]).filter(
      (b): b is Block => Boolean(b) && typeof b === "object"
    );
    return blocks.map((b) => ({ "@context": "https://schema.org", ...b }));
  } catch {
    return [];
  }
}
