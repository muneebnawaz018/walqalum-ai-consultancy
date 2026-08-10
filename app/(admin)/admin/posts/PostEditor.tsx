"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { PostInput } from "@/lib/schemas";

const empty: PostInput = {
  slug: "",
  status: "draft",
  category: { en: "", ar: "" },
  featured: false,
  cover: { url: "", alt: { en: "", ar: "" } },
  title: { en: "", ar: "" },
  excerpt: { en: "", ar: "" },
  body: { en: "", ar: "" },
  seo: { title: { en: "", ar: "" }, description: { en: "", ar: "" } },
};

export function PostEditor({ id, initial }: { id?: string; initial?: PostInput }) {
  const router = useRouter();
  const [post, setPost] = useState<PostInput>(initial ?? empty);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const bodyEn = useRef<HTMLTextAreaElement>(null);
  const bodyAr = useRef<HTMLTextAreaElement>(null);

  const set = (patch: Partial<PostInput>) => setPost((p) => ({ ...p, ...patch }));
  const pair = (key: "title" | "excerpt" | "body" | "category", lang: "en" | "ar", value: string) =>
    setPost((p) => ({ ...p, [key]: { ...p[key], [lang]: value } }));

  async function upload(file: File): Promise<string | null> {
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    setUploading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Upload failed");
      return null;
    }
    const { url } = await res.json();
    return url as string;
  }

  /** Drops an image into the body at the caret, as markdown. */
  async function insertImage(file: File, lang: "en" | "ar") {
    const url = await upload(file);
    if (!url) return;
    const el = (lang === "en" ? bodyEn : bodyAr).current;
    const snippet = `\n\n![${file.name.replace(/\.[^.]+$/, "")}](${url})\n\n`;
    const at = el ? el.selectionStart : post.body[lang].length;
    const next = post.body[lang].slice(0, at) + snippet + post.body[lang].slice(at);
    pair("body", lang, next);
  }

  async function save(status?: "draft" | "published") {
    const payload = { ...post, status: status ?? post.status };
    setPending(true);
    setError(null);
    const res = await fetch(id ? `/api/posts/${id}` : "/api/posts", {
      method: id ? "PATCH" : "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    setPending(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Could not save");
      return;
    }
    const body = await res.json().catch(() => ({}));
    if (!id && body.id) router.replace(`/admin/posts/${body.id}`);
    else router.refresh();
    setPost(payload);
  }

  async function remove() {
    if (!id) return;
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setPending(true);
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPending(false);
    if (res.ok) router.replace("/admin/posts");
    else setError("Could not delete");
  }

  return (
    <div className="admin-card">
      {error ? <p className="admin-error">{error}</p> : null}

      <div className="admin-row">
        <label>
          <span>Slug</span>
          <input value={post.slug} onChange={(e) => set({ slug: e.target.value })} placeholder="how-we-audit-ai" />
        </label>
        <label>
          <span>Category (English)</span>
          <input value={post.category.en} onChange={(e) => pair("category", "en", e.target.value)} />
        </label>
        <label>
          <span>Category (Arabic)</span>
          <input dir="rtl" value={post.category.ar} onChange={(e) => pair("category", "ar", e.target.value)} />
        </label>
      </div>

      <div className="admin-row">
        <label>
          <span>Title (English)</span>
          <input value={post.title.en} onChange={(e) => pair("title", "en", e.target.value)} />
        </label>
        <label>
          <span>Title (Arabic)</span>
          <input dir="rtl" value={post.title.ar} onChange={(e) => pair("title", "ar", e.target.value)} />
        </label>
      </div>

      <div className="admin-row">
        <label>
          <span>Excerpt (English)</span>
          <textarea style={{ minHeight: "6rem" }} value={post.excerpt.en} onChange={(e) => pair("excerpt", "en", e.target.value)} />
        </label>
        <label>
          <span>Excerpt (Arabic)</span>
          <textarea
            dir="rtl"
            style={{ minHeight: "6rem" }}
            value={post.excerpt.ar}
            onChange={(e) => pair("excerpt", "ar", e.target.value)}
          />
        </label>
      </div>

      <label>
        <span>Body — English (markdown)</span>
        <textarea ref={bodyEn} value={post.body.en} onChange={(e) => pair("body", "en", e.target.value)} />
      </label>
      <ImagePicker lang="en" onPick={insertImage} disabled={uploading} />

      <label>
        <span>Body — Arabic (markdown, may stay empty)</span>
        <textarea ref={bodyAr} dir="rtl" value={post.body.ar} onChange={(e) => pair("body", "ar", e.target.value)} />
      </label>
      <ImagePicker lang="ar" onPick={insertImage} disabled={uploading} />

      <div className="admin-row">
        <label>
          <span>Cover image</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            disabled={uploading}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              const url = await upload(file);
              if (url) set({ cover: { ...post.cover, url } });
            }}
          />
          {uploading ? <span style={{ fontSize: ".8rem", color: "var(--muted)" }}>Uploading…</span> : null}
          {post.cover.url ? (
            <span style={{ fontSize: ".8rem", color: "var(--muted)", wordBreak: "break-all" }}>{post.cover.url}</span>
          ) : null}
        </label>
        <label>
          <span>Cover image URL</span>
          <input value={post.cover.url} onChange={(e) => set({ cover: { ...post.cover, url: e.target.value } })} />
        </label>
        <label>
          <span>Cover alt (English)</span>
          <input
            value={post.cover.alt.en}
            onChange={(e) => set({ cover: { ...post.cover, alt: { ...post.cover.alt, en: e.target.value } } })}
          />
        </label>
        <label>
          <span>Cover alt (Arabic)</span>
          <input
            dir="rtl"
            value={post.cover.alt.ar}
            onChange={(e) => set({ cover: { ...post.cover, alt: { ...post.cover.alt, ar: e.target.value } } })}
          />
        </label>
      </div>

      <div className="admin-row">
        <label>
          <span>SEO title (English)</span>
          <input
            value={post.seo.title.en}
            onChange={(e) => set({ seo: { ...post.seo, title: { ...post.seo.title, en: e.target.value } } })}
          />
        </label>
        <label>
          <span>SEO description (English)</span>
          <input
            value={post.seo.description.en}
            onChange={(e) => set({ seo: { ...post.seo, description: { ...post.seo.description, en: e.target.value } } })}
          />
        </label>
      </div>

      <label style={{ display: "flex", gap: ".6rem", alignItems: "center" }}>
        <input
          type="checkbox"
          style={{ width: "auto", minHeight: 0 }}
          checked={post.featured}
          onChange={(e) => set({ featured: e.target.checked })}
        />
        <span style={{ margin: 0 }}>Featured</span>
      </label>

      <div style={{ display: "flex", gap: ".75rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
        <button className="admin-btn ghost" disabled={pending} onClick={() => save("draft")}>
          Save draft
        </button>
        <button className="admin-btn" disabled={pending} onClick={() => save("published")}>
          Publish
        </button>
        {id ? (
          <button className="admin-btn danger" disabled={pending} onClick={remove}>
            Delete
          </button>
        ) : null}
      </div>
    </div>
  );
}

/** Uploads into the body at the caret. Markdown stays the stored format. */
function ImagePicker({
  lang,
  onPick,
  disabled,
}: {
  lang: "en" | "ar";
  onPick: (file: File, lang: "en" | "ar") => void;
  disabled: boolean;
}) {
  return (
    <label className="admin-inline-upload">
      <span>Insert an image into the {lang === "en" ? "English" : "Arabic"} body</span>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        disabled={disabled}
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) onPick(file, lang);
        }}
      />
    </label>
  );
}
