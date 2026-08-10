"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { I18n } from "@/lib/db";

type Row = {
  id: string;
  slug: string;
  status: "draft" | "published";
  title: I18n;
  excerpt: I18n;
  category: I18n;
  cover: string;
  readingMinutes: number;
  featured: boolean;
  updatedAt: string | null;
  publishedAt: string | null;
  hasArabic: boolean;
};

/** The public cards fall back to these when a post has no cover; so does this. */
const FALLBACK = ["banner", "ps20", "ps180", "ps0", "ps504", "ps2"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dateLabel(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** A draft has no publish date, and showing its updatedAt bare reads as one. */
function whenLabel(row: { publishedAt: string | null; updatedAt: string | null }) {
  if (row.publishedAt) return dateLabel(row.publishedAt);
  if (row.updatedAt) return `Edited ${dateLabel(row.updatedAt)}`;
  return "Not dated";
}

const title = (row: Row) => row.title.en || row.title.ar || row.slug;

/* 16px line icons, drawn to the same weight as the rest of the admin chrome. */
const Pencil = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 20h4L20 8a2.8 2.8 0 0 0-4-4L4 16v4Z" />
    <path d="M14 6l4 4" />
  </svg>
);

const Trash = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
);

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

/**
 * The newsroom index reads as the blog does, because that is what an editor is
 * actually looking at: the same card, the same cover, the same category and
 * date line. The editing chrome sits underneath the card rather than beside the
 * title, so scanning the list is reading the blog and nothing else.
 */
export function PostList({ posts }: { posts: Row[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<"all" | "draft" | "published">("all");
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const rows = posts.filter((p) => filter === "all" || p.status === filter);

  /** Delete from the list, so the whole CRUD is reachable without opening a post. */
  async function remove(row: Row) {
    if (!confirm(`Delete "${row.title.en || row.slug}"? This cannot be undone.`)) return;
    setBusy(row.id);
    setError(null);
    const res = await fetch(`/api/posts/${row.id}`, { method: "DELETE" });
    setBusy(null);
    if (res.ok) router.refresh();
    else setError("Could not delete that post.");
  }

  return (
    <>
      {error ? <p className="admin-error">{error}</p> : null}

      <div className="filters" role="group">
        {(["all", "draft", "published"] as const).map((f) => (
          <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f} ({f === "all" ? posts.length : posts.filter((p) => p.status === f).length})
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="admin-note">Nothing here yet.</p>
      ) : (
        <div className="work-grid thirds">
          {rows.map((p, i) => (
            <article className={`case np${busy === p.id ? " busy" : ""}`} key={p.id}>
              <div className="img">
                <Image
                  alt=""
                  src={p.cover || `/img/${FALLBACK[i % FALLBACK.length]}.jpg`}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
                <span className={`np-status ${p.status}`}>{p.status}</span>

                {/* Sits above the covering link, so the tools win the click. */}
                <div className="np-tools">
                  <Link href={`/admin/posts/${p.id}`} aria-label={`Edit ${title(p)}`} title="Edit">
                    <Pencil />
                  </Link>
                  {p.status === "published" ? (
                    <a
                      href={`/blog/${p.slug}`}
                      target="_blank"
                      rel="noopener"
                      aria-label={`View ${title(p)} on the site`}
                      title="View on the site"
                    >
                      <Arrow />
                    </a>
                  ) : null}
                  <button
                    type="button"
                    className="danger"
                    onClick={() => remove(p)}
                    disabled={busy === p.id}
                    aria-label={`Delete ${title(p)}`}
                    title="Delete"
                  >
                    <Trash />
                  </button>
                </div>

                {/* The cover is the hit area for editing, without nesting a link
                    inside a link the way wrapping the whole card would. */}
                <Link className="np-hit" href={`/admin/posts/${p.id}`} aria-label={`Edit ${title(p)}`} />
              </div>

              <Link className="np-open" href={`/admin/posts/${p.id}`}>
                <div className="meta">
                  {p.category.en ? <span className="tag warm">{p.category.en}</span> : null}
                  <span className="yr">{whenLabel(p)}</span>
                  <span className="readtime">{p.readingMinutes} min</span>
                </div>
                <h3>{title(p)}</h3>
                <p>{p.excerpt.en || p.excerpt.ar || "No excerpt yet."}</p>
              </Link>

              <div className="np-foot">
                <span className="np-slug">/{p.slug}</span>
                <span className="np-flags">
                  {p.featured ? <span>featured</span> : null}
                  <span>{p.hasArabic ? "EN + AR" : "EN only"}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
