import Image from "next/image";
import Link from "next/link";
import type { PostDoc } from "@/lib/db";
import { PostBody } from "./PostBody";

const stamp = (d: Date | string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/**
 * The article page. The artifact's sample prose is replaced by the newsroom
 * post; everything around it is the artifact's own template.
 */
export function Article({ post }: { post: PostDoc }) {
  const body = post.body.en || post.excerpt.en;
  const cover = post.cover?.url || null;
  const published = post.publishedAt ? stamp(post.publishedAt) : "Draft";
  const byline = post.authorName || post.author?.name || "WalQalum";
  const faqs = (post.faqs ?? []).filter((f) => f.q.en.trim() && f.a.en.trim());

  return (
    <section className="view" data-route="article">
      <div className="pagehead"><div className="wrap">
        <div className="crumb reveal"><Link href="/blog" data-nav="blog" style={{ cursor: "pointer" }} data-en="Blog" data-ar="المدوّنة">Blog</Link> <b>/</b> {post.category.en ? <span data-en={post.category.en} data-ar={post.category.ar || post.category.en}>{post.category.en}</span> : null}</div>
        <h1 className="display reveal" data-en={post.title.en} data-ar={post.title.ar || post.title.en}>{post.title.en}</h1>
        <p className="reveal" data-en={post.excerpt.en} data-ar={post.excerpt.ar || post.excerpt.en}>{post.excerpt.en}</p>
        <div className="case-meta reveal">
          <div><div className="k" data-en="Author" data-ar="الكاتب">Author</div><div className="v">{byline}</div></div>
          <div><div className="k" data-en="Published" data-ar="النشر">Published</div><div className="v">{published}</div></div>
          {/* One string, not `{n} min`: React splits adjacent text nodes with a
              comment marker in SSR, which breaks anything reading the rendered
              text back out. */}
          <div><div className="k" data-en="Read" data-ar="القراءة">Read</div><div className="v">{`${post.readingMinutes} min`}</div></div>
        </div>
        {post.reviewedBy || post.lastUpdatedAt ? (
          <p className="mono postnote reveal">
            {post.reviewedBy ? <span data-en={`Reviewed by ${post.reviewedBy}`} data-ar={`راجعه ${post.reviewedBy}`}>Reviewed by {post.reviewedBy}</span> : null}
            {post.lastUpdatedAt ? <span data-en={`Last updated ${stamp(post.lastUpdatedAt)}`} data-ar={`آخر تحديث ${stamp(post.lastUpdatedAt)}`}>Last updated {stamp(post.lastUpdatedAt)}</span> : null}
          </p>
        ) : null}
      </div></div>

      <div className="wrap"><div className="case-hero reveal" data-parallax="">{cover ? <Image src={cover} alt={post.cover?.alt?.en || ""} fill priority sizes="100vw" /> : null}</div></div>

      <section className="band" style={{ borderTop: "1px solid var(--hair)" }}><div className="wrap">
        <div className="prose reveal">
          <div className="body">
            <PostBody markdown={body} />
          </div>
        </div>

        {faqs.length ? (
          <div className="faqs reveal">
            <h2 className="display" data-en="Questions" data-ar="أسئلة">Questions</h2>
            {/* <details> rather than a scripted accordion: it opens without
                JavaScript, and find-in-page reaches closed answers. */}
            {faqs.map((faq, i) => (
              <details key={i}>
                <summary data-en={faq.q.en} data-ar={faq.q.ar || faq.q.en}>{faq.q.en}</summary>
                <p data-en={faq.a.en} data-ar={faq.a.ar || faq.a.en}>{faq.a.en}</p>
              </details>
            ))}
          </div>
        ) : null}

        {post.tags?.length ? (
          <ul className="chips posttags reveal">
            {post.tags.map((tag) => (
              <li key={tag}><span>{tag}</span></li>
            ))}
          </ul>
        ) : null}
      </div></section>
    </section>
  );
}
