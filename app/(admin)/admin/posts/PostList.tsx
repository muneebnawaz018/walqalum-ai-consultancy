"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { I18n } from "@/lib/db";

type Row = {
  id: string;
  slug: string;
  status: "draft" | "published";
  title: I18n;
  category: I18n;
  featured: boolean;
  updatedAt: string | null;
  publishedAt: string | null;
  hasArabic: boolean;
};

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

      <div className="admin-tabs">
        {(["all", "draft", "published"] as const).map((f) => (
          <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {f[0].toUpperCase() + f.slice(1)} ({f === "all" ? posts.length : posts.filter((p) => p.status === f).length})
          </button>
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="admin-note">Nothing here yet.</p>
      ) : (
        <div className="admin-list">
          {rows.map((p) => (
            <article className="admin-item" key={p.id}>
              <div>
                <h3>{p.title.en || p.title.ar || p.slug}</h3>
                <div className="admin-meta">
                  <span className={`pill ${p.status}`}>{p.status}</span>
                  <span>/{p.slug}</span>
                  {p.category.en ? <span>{p.category.en}</span> : null}
                  {p.featured ? <span>featured</span> : null}
                  {p.hasArabic ? <span>EN + AR</span> : <span>EN only</span>}
                  {p.publishedAt ? <span>{new Date(p.publishedAt).toISOString().slice(0, 10)}</span> : null}
                </div>
              </div>
              <div className="actions">
                <Link className="admin-btn ghost" href={`/admin/posts/${p.id}`}>
                  Edit
                </Link>
                <button className="admin-btn danger" onClick={() => remove(p)} disabled={busy === p.id}>
                  {busy === p.id ? "Deleting…" : "Delete"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
