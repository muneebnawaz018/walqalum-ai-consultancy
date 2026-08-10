"use client";

import Image from "next/image";
import type { PostInput } from "@/lib/schemas";

const SITE = "walqalum.com";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function stamp(iso?: string | null) {
  const d = iso ? new Date(iso) : new Date();
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/**
 * Three places the post is read before anyone reaches the article: the blog
 * index card, a search result and a shared link. Each is fed by a different
 * field, and each falls back to a different one when that field is blank, which
 * is exactly what an editor cannot hold in their head. Showing all three is
 * cheaper than explaining the fallbacks.
 */
export function Preview({ post }: { post: PostInput }) {
  const title = post.title.en || "Your post title";
  const excerpt = post.excerpt.en || "Your excerpt appears here as you type.";
  const cover = post.cover.url;
  const og = post.seo.ogImage.url || cover;
  const seoTitle = post.seo.title.en || post.title.en || "Your post title";
  const seoDesc = post.seo.description.en || post.excerpt.en || "Your excerpt appears here as you type.";
  const slug = post.slug || "post-slug";
  const category = post.category.en || "Uncategorised";

  const schemas = ["Article", ...(post.faqs.length ? ["FAQPage"] : []), ...customTypes(post.seo.jsonLd)];

  return (
    <aside className="pv">
      <h2 className="pv-h">Live preview</h2>

      <section>
        <h3 className="pv-k">Blog card</h3>
        <div className="pv-card">
          <div className="pv-img">
            {cover ? <Image alt="" src={cover} fill sizes="320px" unoptimized /> : <Placeholder />}
          </div>
          <div className="pv-card-in">
            <div className="pv-line">
              <span className="tag warm">{category}</span>
              <span className="pv-date">{stamp(post.publishedAt)}</span>
            </div>
            <strong>{title}</strong>
            <p>{excerpt}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="pv-k">Google result</h3>
        <div className="pv-serp">
          <div className="pv-serp-site">
            <span className="pv-favicon">W</span>
            <div>
              <b>WalQalum</b>
              <span>
                {SITE} › blog › {slug}
              </span>
            </div>
          </div>
          <span className="pv-serp-title">{seoTitle}</span>
          <p>
            {stamp(post.publishedAt)} — {seoDesc}
          </p>
          {post.seo.noindex ? <p className="pv-warn">Hidden from search engines by the noindex switch.</p> : null}
        </div>
      </section>

      <section>
        <h3 className="pv-k">Social share</h3>
        <div className="pv-og">
          <div className="pv-og-img">{og ? <Image alt="" src={og} fill sizes="320px" unoptimized /> : <Placeholder />}</div>
          <div className="pv-og-in">
            <span className="pv-og-host">{SITE.toUpperCase()}</span>
            <strong>{seoTitle}</strong>
            <p>{seoDesc}</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="pv-k">Structured data</h3>
        <div className="pv-chips">
          {schemas.map((s) => (
            <span className="pill" key={s}>
              {s}
            </span>
          ))}
        </div>
      </section>
    </aside>
  );
}

const Placeholder = () => (
  <svg viewBox="0 0 24 24" className="pv-ph" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 16l5-5 4 4 3-3 6 6" />
    <circle cx="9" cy="9" r="1.4" />
  </svg>
);

/** Reads @type out of the custom block so the chips show what will ship. */
function customTypes(raw: string): string[] {
  if (!raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    const blocks = Array.isArray(parsed) ? parsed : [parsed];
    return blocks.map((b) => String(b?.["@type"] ?? "")).filter(Boolean);
  } catch {
    return ["invalid JSON"];
  }
}
