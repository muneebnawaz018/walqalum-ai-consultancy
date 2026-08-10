"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import type { PostInput } from "@/lib/schemas";
import { Dropzone } from "./Dropzone";
import { Field, MarkdownToolbar, Pair, TagInput } from "./Fields";
import { Preview } from "./Preview";

const empty: PostInput = {
  slug: "",
  status: "draft",
  category: { en: "", ar: "" },
  featured: false,
  cover: { url: "", alt: { en: "", ar: "" } },
  title: { en: "", ar: "" },
  excerpt: { en: "", ar: "" },
  body: { en: "", ar: "" },
  faqs: [],
  seo: {
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    ogImage: { url: "", alt: { en: "", ar: "" } },
    canonical: "",
    primaryKeyword: "",
    keywords: [],
    noindex: false,
    jsonLd: "",
  },
  authorName: "",
  reviewedBy: "",
  tags: [],
  readingMinutes: null,
  publishedAt: null,
  lastUpdatedAt: null,
};

type Tab = "content" | "seo" | "publishing";

/** ISO in, value a datetime-local input accepts out, and back again. */
const toLocal = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};
const fromLocal = (v: string) => (v ? new Date(v).toISOString() : null);

const slugify = (v: string) =>
  v
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

export function PostEditor({
  id,
  initial,
  inModal = false,
}: {
  id?: string;
  initial?: PostInput;
  /** Opened over the list: saving closes it rather than navigating the page. */
  inModal?: boolean;
}) {
  const router = useRouter();
  const [post, setPost] = useState<PostInput>(initial ?? empty);
  const [tab, setTab] = useState<Tab>("content");
  const [showPreview, setShowPreview] = useState(!inModal);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const bodyEn = useRef<HTMLTextAreaElement>(null);
  const bodyAr = useRef<HTMLTextAreaElement>(null);

  const set = (patch: Partial<PostInput>) => setPost((p) => ({ ...p, ...patch }));
  const pair = (key: "title" | "excerpt" | "body" | "category", lang: "en" | "ar", value: string) =>
    setPost((p) => ({ ...p, [key]: { ...p[key], [lang]: value } }));
  const seo = (patch: Partial<PostInput["seo"]>) => setPost((p) => ({ ...p, seo: { ...p.seo, ...patch } }));

  /**
   * What each tab is still missing, so the dot on the tab and the message on
   * save name the same things. Publishing is only blocking for a publish, which
   * is why a draft can be saved half-written.
   */
  const problems = useMemo(() => {
    const content: string[] = [];
    if (!post.title.en.trim()) content.push("a title");
    if (!post.slug.trim()) content.push("a slug");
    else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) content.push("a valid slug (lower-case words and hyphens)");
    if (!post.excerpt.en.trim()) content.push("an excerpt");
    if (!post.body.en.trim()) content.push("a body");

    const publishing: string[] = [];
    if (!post.authorName.trim()) publishing.push("an author");

    return { content, seo: [] as string[], publishing };
  }, [post]);

  const blocking = [...problems.content, ...problems.publishing];

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
    pair("body", lang, post.body[lang].slice(0, at) + snippet + post.body[lang].slice(at));
  }

  async function save(status?: "draft" | "published") {
    if (status === "published" && blocking.length) {
      setError(`Still needs ${blocking.join(", ")}.`);
      return;
    }
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
    setPost(payload);

    if (inModal) {
      router.back();
      router.refresh();
      return;
    }
    if (!id && body.id) router.replace(`/admin/posts/${body.id}`);
    else router.refresh();
  }

  async function remove() {
    if (!id) return;
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setPending(true);
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPending(false);
    if (!res.ok) {
      setError("Could not delete");
      return;
    }
    if (inModal) router.back();
    else router.replace("/admin/posts");
    router.refresh();
  }

  const tabs: Array<[Tab, string, number]> = [
    ["content", "Content", problems.content.length],
    ["seo", "SEO", problems.seo.length],
    ["publishing", "Publishing", problems.publishing.length],
  ];

  return (
    <div className="ed">
      <div className="ed-bar">
        <div className="ed-tabs" role="tablist">
          {tabs.map(([key, label, count]) => (
            <button
              key={key}
              role="tab"
              aria-selected={tab === key}
              className={tab === key ? "on" : ""}
              onClick={() => setTab(key)}
            >
              {label}
              {count ? <i className="ed-dot" title={`${count} still to fill in`} /> : null}
            </button>
          ))}
        </div>
        <div className="ed-acts">
          <button className="admin-btn ghost" onClick={() => setShowPreview((v) => !v)}>
            {showPreview ? "Hide preview" : "Show preview"}
          </button>
          <button className="admin-btn ghost" disabled={pending} onClick={() => save("draft")}>
            Save draft
          </button>
          <button className="admin-btn" disabled={pending} onClick={() => save("published")}>
            {post.status === "published" ? "Update" : "Publish"}
          </button>
          {id ? (
            <button className="admin-btn danger" disabled={pending} onClick={remove}>
              Delete
            </button>
          ) : null}
        </div>
      </div>

      {error ? <p className="admin-error">{error}</p> : null}

      <div className={`ed-cols${showPreview ? " with-preview" : ""}`}>
        <div className="ed-main">
          {tab === "content" ? (
            <>
              <Pair
                label="Title"
                required
                max={120}
                value={post.title}
                onChange={(l, v) => pair("title", l, v)}
                placeholder="Your post title"
              />

              <Field label="URL slug" help="Lower-case words separated by hyphens. This is the public address.">
                <div className="fld-inline">
                  <input
                    value={post.slug}
                    placeholder="auto-generated-from-title"
                    onChange={(e) => set({ slug: e.target.value })}
                  />
                  <button
                    type="button"
                    className="admin-btn ghost"
                    disabled={!post.title.en.trim()}
                    onClick={() => set({ slug: slugify(post.title.en) })}
                  >
                    Generate
                  </button>
                </div>
              </Field>

              <Pair
                label="Excerpt"
                required
                max={200}
                rows={3}
                textarea
                help="Shown on the blog card and used as the lead paragraph. One or two sentences."
                value={post.excerpt}
                onChange={(l, v) => pair("excerpt", l, v)}
              />

              <Dropzone
                label="Hero image"
                hint="JPEG, PNG, WebP or AVIF, up to 5MB"
                value={post.cover.url}
                busy={uploading}
                onFile={async (file) => {
                  const url = await upload(file);
                  if (url) set({ cover: { ...post.cover, url } });
                }}
                onClear={() => set({ cover: { ...post.cover, url: "" } })}
              />
              <Field label="Hero image URL" help="Or paste one that already exists.">
                <input
                  value={post.cover.url}
                  placeholder="https://"
                  onChange={(e) => set({ cover: { ...post.cover, url: e.target.value } })}
                />
              </Field>
              <Pair
                label="Alt text"
                help="Describe the image for screen readers and search engines."
                value={post.cover.alt}
                onChange={(l, v) => set({ cover: { ...post.cover, alt: { ...post.cover.alt, [l]: v } } })}
              />

              <Field label="Body" required count={post.body.en.length} max={100000} help="Markdown.">
                <span className="fld-lang">English</span>
                <MarkdownToolbar target={bodyEn} value={post.body.en} onChange={(v) => pair("body", "en", v)} />
                <textarea
                  ref={bodyEn}
                  className="ed-body"
                  value={post.body.en}
                  placeholder="Write the article..."
                  onChange={(e) => pair("body", "en", e.target.value)}
                />
              </Field>
              <Dropzone
                label="Insert an image into the English body"
                hint="Dropped at the caret, as markdown"
                busy={uploading}
                onFile={(file) => insertImage(file, "en")}
              />

              <Field label="Body, Arabic" help="May stay empty. The site falls back to the English and says so.">
                <MarkdownToolbar target={bodyAr} value={post.body.ar} onChange={(v) => pair("body", "ar", v)} />
                <textarea
                  ref={bodyAr}
                  className="ed-body"
                  dir="rtl"
                  value={post.body.ar}
                  onChange={(e) => pair("body", "ar", e.target.value)}
                />
              </Field>
              <Dropzone
                label="Insert an image into the Arabic body"
                hint="Dropped at the caret, as markdown"
                busy={uploading}
                onFile={(file) => insertImage(file, "ar")}
              />

              <FaqEditor value={post.faqs} onChange={(faqs) => set({ faqs })} />
            </>
          ) : null}

          {tab === "seo" ? (
            <>
              <Pair
                label="Meta title"
                max={70}
                help="Falls back to the post title. Around 50 to 70 characters reads best in a result."
                value={post.seo.title}
                onChange={(l, v) => seo({ title: { ...post.seo.title, [l]: v } })}
              />
              <Pair
                label="Meta description"
                max={160}
                rows={3}
                textarea
                help="Falls back to the excerpt."
                value={post.seo.description}
                onChange={(l, v) => seo({ description: { ...post.seo.description, [l]: v } })}
              />

              <Dropzone
                label="Open Graph image"
                hint="Falls back to the hero image. 1200x630 renders best when shared."
                value={post.seo.ogImage.url}
                busy={uploading}
                onFile={async (file) => {
                  const url = await upload(file);
                  if (url) seo({ ogImage: { ...post.seo.ogImage, url } });
                }}
                onClear={() => seo({ ogImage: { ...post.seo.ogImage, url: "" } })}
              />
              <Pair
                label="Open Graph alt text"
                value={post.seo.ogImage.alt}
                onChange={(l, v) => seo({ ogImage: { ...post.seo.ogImage, alt: { ...post.seo.ogImage.alt, [l]: v } } })}
              />

              <Field label="Canonical URL" help="Only if the post first appeared somewhere else.">
                <input
                  value={post.seo.canonical}
                  placeholder="https://"
                  onChange={(e) => seo({ canonical: e.target.value })}
                />
              </Field>

              <Field label="Primary keyword" help="The phrase this post is meant to answer.">
                <input
                  value={post.seo.primaryKeyword}
                  placeholder="e.g. production-ready AI"
                  onChange={(e) => seo({ primaryKeyword: e.target.value })}
                />
              </Field>

              <TagInput
                label="Secondary keywords"
                help="Up to 15, 40 characters each."
                value={post.seo.keywords}
                onChange={(keywords) => seo({ keywords })}
              />

              <label className="ed-toggle">
                <input
                  type="checkbox"
                  checked={post.seo.noindex}
                  onChange={(e) => seo({ noindex: e.target.checked })}
                />
                <span>
                  <b>Hide from search engines</b>
                  <em>
                    Adds <code>&lt;meta name=&quot;robots&quot; content=&quot;noindex&quot;&gt;</code>. For pages you
                    want reachable but not ranked.
                  </em>
                </span>
              </label>

              <Field
                label="Custom JSON-LD"
                help="Optional. Article and FAQPage are generated from the post. A block whose @type matches a generated one replaces it; anything else is added alongside."
              >
                <textarea
                  className="ed-code"
                  value={post.seo.jsonLd}
                  spellCheck={false}
                  placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "HowTo",\n  "name": "..."\n}'}
                  onChange={(e) => seo({ jsonLd: e.target.value })}
                />
                <JsonLdState raw={post.seo.jsonLd} onFormat={(v) => seo({ jsonLd: v })} />
              </Field>
            </>
          ) : null}

          {tab === "publishing" ? (
            <>
              <Field label="Author" required help="The byline printed on the post.">
                <input
                  value={post.authorName}
                  placeholder="e.g. Muneeb Siddique"
                  onChange={(e) => set({ authorName: e.target.value })}
                />
              </Field>

              <Field
                label="Reviewed by"
                help="Shown on the post and emitted as reviewedBy in the Article schema. Worth filling in on anything technical."
              >
                <input
                  value={post.reviewedBy}
                  placeholder="e.g. Data engineering lead"
                  onChange={(e) => set({ reviewedBy: e.target.value })}
                />
              </Field>

              <Pair
                label="Category"
                help="One per post. It groups the blog index."
                value={post.category}
                onChange={(l, v) => pair("category", l, v)}
                placeholder="e.g. AI / ML"
              />

              <TagInput
                label="Tags"
                help="Up to 15, 40 characters each."
                value={post.tags}
                onChange={(tags) => set({ tags })}
              />

              <Field label="Reading time" help="Minutes. Leave blank to estimate from the body.">
                <input
                  type="number"
                  min={1}
                  max={120}
                  value={post.readingMinutes ?? ""}
                  placeholder="estimated"
                  onChange={(e) => set({ readingMinutes: e.target.value ? Number(e.target.value) : null })}
                />
              </Field>

              <Field label="Publish date" help="When the post is dated. Publishing without one uses now.">
                <input
                  type="datetime-local"
                  value={toLocal(post.publishedAt)}
                  onChange={(e) => set({ publishedAt: fromLocal(e.target.value) })}
                />
              </Field>

              <Field
                label="Last updated"
                help="Bump this after a material edit. It drives the visible caption and dateModified in the schema."
              >
                <input
                  type="datetime-local"
                  value={toLocal(post.lastUpdatedAt)}
                  onChange={(e) => set({ lastUpdatedAt: fromLocal(e.target.value) })}
                />
              </Field>

              <label className="ed-toggle">
                <input
                  type="checkbox"
                  checked={post.featured}
                  onChange={(e) => set({ featured: e.target.checked })}
                />
                <span>
                  <b>Featured</b>
                  <em>Runs full width at the top of the blog index.</em>
                </span>
              </label>
            </>
          ) : null}
        </div>

        {showPreview ? <Preview post={post} /> : null}
      </div>
    </div>
  );
}

/** Questions and answers, bilingual, reorderable enough to be useful. */
function FaqEditor({ value, onChange }: { value: PostInput["faqs"]; onChange: (v: PostInput["faqs"]) => void }) {
  const edit = (i: number, part: "q" | "a", lang: "en" | "ar", v: string) =>
    onChange(value.map((f, n) => (n === i ? { ...f, [part]: { ...f[part], [lang]: v } } : f)));

  return (
    <Field
      label="FAQ"
      count={value.length}
      max={15}
      help="Renders as an accordion under the post and becomes the FAQPage schema. Five to ten questions is the usual advice."
    >
      {value.length === 0 ? (
        <div className="faq-empty">
          <strong>No questions yet</strong>
          <span>They render as an accordion on the post and power the FAQPage schema.</span>
        </div>
      ) : (
        <ol className="faq-list">
          {value.map((faq, i) => (
            <li key={i}>
              <div className="faq-head">
                <span className="faq-n">{String(i + 1).padStart(2, "0")}</span>
                <div className="faq-move">
                  <button type="button" disabled={i === 0} aria-label="Move up" onClick={() => onChange(swap(value, i, i - 1))}>
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={i === value.length - 1}
                    aria-label="Move down"
                    onClick={() => onChange(swap(value, i, i + 1))}
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className="danger"
                    aria-label="Remove question"
                    onClick={() => onChange(value.filter((_, n) => n !== i))}
                  >
                    &times;
                  </button>
                </div>
              </div>
              <input
                value={faq.q.en}
                placeholder="Question"
                onChange={(e) => edit(i, "q", "en", e.target.value)}
              />
              <input dir="rtl" value={faq.q.ar} placeholder="السؤال" onChange={(e) => edit(i, "q", "ar", e.target.value)} />
              <textarea
                rows={3}
                value={faq.a.en}
                placeholder="Answer"
                onChange={(e) => edit(i, "a", "en", e.target.value)}
              />
              <textarea
                dir="rtl"
                rows={3}
                value={faq.a.ar}
                placeholder="الإجابة"
                onChange={(e) => edit(i, "a", "ar", e.target.value)}
              />
            </li>
          ))}
        </ol>
      )}
      <button
        type="button"
        className="admin-btn ghost faq-add"
        disabled={value.length >= 15}
        onClick={() => onChange([...value, { q: { en: "", ar: "" }, a: { en: "", ar: "" } }])}
      >
        Add question
      </button>
    </Field>
  );
}

const swap = <T,>(list: T[], a: number, b: number) => {
  const next = [...list];
  [next[a], next[b]] = [next[b], next[a]];
  return next;
};

/** Says whether the custom block parses, and offers to tidy it if it does. */
function JsonLdState({ raw, onFormat }: { raw: string; onFormat: (v: string) => void }) {
  // Parsed first and rendered after: JSX built inside a try/catch is not
  // covered by it, since React renders the element later.
  const result = parseJson(raw);
  if (!result) return null;

  return (
    <div className="ed-code-foot">
      {result.ok ? (
        <>
          <span className="ok">Valid JSON</span>
          <button type="button" onClick={() => onFormat(result.pretty)}>
            Format
          </button>
        </>
      ) : (
        <span className="bad">{result.message}</span>
      )}
    </div>
  );
}

function parseJson(raw: string): { ok: true; pretty: string } | { ok: false; message: string } | null {
  if (!raw.trim()) return null;
  try {
    return { ok: true, pretty: JSON.stringify(JSON.parse(raw), null, 2) };
  } catch (e) {
    return { ok: false, message: (e as Error).message };
  }
}
