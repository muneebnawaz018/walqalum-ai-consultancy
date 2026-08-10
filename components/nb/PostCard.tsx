import Image from "next/image";
import Link from "next/link";
import type { PostDoc } from "@/lib/db";

/** Cover art for posts that have none, so the grid keeps its rhythm. */
const FALLBACK = ["banner", "ps20", "ps180", "ps0", "ps504", "ps2"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dateLabel(d: Date | null | undefined) {
  if (!d) return "Draft";
  const dt = new Date(d);
  return `${MONTHS[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
}

/**
 * The artifact's blog card, driven by a newsroom post. The bilingual copy sits
 * on data-en / data-ar exactly as everywhere else, so the language toggle
 * reaches posts too.
 */
export function PostCard({ post, index, wide = false }: { post: PostDoc; index: number; wide?: boolean }) {
  const cover = post.cover?.url || `/img/${FALLBACK[index % FALLBACK.length]}.jpg`;

  return (
    <Link href={`/blog/${post.slug}`} className={`case${wide ? " wide" : ""}`}>
      <div className="img">
        <Image
          alt={post.cover?.alt?.en || ""}
          src={cover}
          fill
          sizes={wide ? "(max-width: 900px) 100vw, 66vw" : "(max-width: 900px) 100vw, 33vw"}
        />
      </div>
      <div className="meta">
        <span className="tag warm" data-en={post.category.en} data-ar={post.category.ar || post.category.en}>
          {post.category.en}
        </span>
        <span className="yr">{dateLabel(post.publishedAt)}</span>
        <span className="readtime">{post.readingMinutes} min</span>
      </div>
      <h3 className="display" data-en={post.title.en} data-ar={post.title.ar || post.title.en}>
        {post.title.en}
      </h3>
      <p data-en={post.excerpt.en} data-ar={post.excerpt.ar || post.excerpt.en}>
        {post.excerpt.en}
      </p>
    </Link>
  );
}
