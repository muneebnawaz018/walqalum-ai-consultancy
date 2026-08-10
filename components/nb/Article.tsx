import Image from "next/image";
import Link from "next/link";
import type { PostDoc } from "@/lib/db";
import { PostBody } from "./PostBody";

/**
 * The article page. The artifact's sample prose is replaced by the newsroom
 * post; everything around it is the artifact's own template.
 */
export function Article({ post }: { post: PostDoc }) {
  const body = post.body.en || post.excerpt.en;
  const cover = post.cover?.url || null;
  const published = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })
    : "Draft";

  return (
    <section className="view" data-route="article">
      <div className="pagehead"><div className="wrap">
        <div className="crumb reveal"><Link href="/blog" data-nav="blog" style={{ cursor: "pointer" }} data-en="Blog" data-ar="المدوّنة">Blog</Link> <b>/</b> {post.category.en ? <span data-en={post.category.en} data-ar={post.category.ar || post.category.en}>{post.category.en}</span> : null}</div>
        <h1 className="display reveal" data-en={post.title.en} data-ar={post.title.ar || post.title.en}>{post.title.en}</h1>
        <div className="case-meta reveal">
          <div><div className="k" data-en="Author" data-ar="الكاتب">Author</div><div className="v">{post.author?.name || "WalQalum"}</div></div>
          <div><div className="k" data-en="Published" data-ar="النشر">Published</div><div className="v">{published}</div></div>
          <div><div className="k" data-en="Read" data-ar="القراءة">Read</div><div className="v">{post.readingMinutes} min</div></div>
        </div>
      </div></div>
      <div className="wrap"><div className="case-hero reveal" data-parallax="">{cover ? <Image src={cover} alt={post.cover?.alt?.en || ""} fill priority sizes="100vw" /> : null}</div></div>
      <section className="band" style={{ borderTop: "1px solid var(--hair)" }}><div className="wrap">
        <div className="prose reveal">
          <div className="body">
            <PostBody markdown={body} />
          </div>
        </div>
      </div></section>
  
    </section>
  );
}
