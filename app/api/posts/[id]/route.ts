import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { ObjectId } from "mongodb";
import { currentSession } from "@/lib/auth";
import { posts, readingMinutes } from "@/lib/db";
import { postPatch } from "@/lib/schemas";

export const runtime = "nodejs";

const oid = (id: string) => (ObjectId.isValid(id) ? new ObjectId(id) : null);

const plain = (v: unknown): v is Record<string, unknown> =>
  Boolean(v) && typeof v === "object" && !Array.isArray(v) && !(v instanceof Date);

/** Keeps only the keys the request actually carried, all the way down. */
function prune(raw: unknown, parsed: unknown): unknown {
  if (!plain(raw) || !plain(parsed)) return parsed;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(raw)) {
    if (key in parsed) out[key] = prune(raw[key], parsed[key]);
  }
  return out;
}

/** { seo: { canonical } } becomes { "seo.canonical": ... }. Arrays stay whole. */
function dotted(value: Record<string, unknown>, prefix = "", out: Record<string, unknown> = {}) {
  for (const [key, v] of Object.entries(value)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (plain(v)) dotted(v, path, out);
    else out[path] = v;
  }
  return out;
}

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const _id = oid(id);
  if (!_id) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const col = await posts();
  const doc = await col.findOne({ _id });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const session = await currentSession();
  if (doc.status !== "published" && !session) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post: doc });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await currentSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { id } = await params;
  const _id = oid(id);
  if (!_id) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const raw = await req.json().catch(() => null);
  const parsed = postPatch.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request", issues: parsed.error.issues }, { status: 400 });
  }

  /**
   * Zod applies a field's default even through `.partial()`, so parsing a patch
   * that carries only a body hands back `status: "draft"`, `featured: false` and
   * empty `cover` and `seo` as well. Writing all of that would silently
   * unpublish the post and wipe its cover. Keep only what the caller sent, at
   * every depth: `seo` has its own defaults, so a patch naming one SEO field
   * would otherwise blank the other seven.
   */
  const patch = prune(raw, parsed.data) as Partial<typeof parsed.data>;

  const col = await posts();
  const existing = await col.findOne({ _id });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (patch.slug && patch.slug !== existing.slug) {
    if (await col.findOne({ slug: patch.slug })) {
      return NextResponse.json({ error: "That slug already exists" }, { status: 409 });
    }
  }

  const next = { ...existing, ...patch };
  const publishedAt =
    next.status === "published" ? existing.publishedAt || new Date(patch.publishedAt || Date.now()) : null;

  /* Three fields are written by hand below rather than copied across:
     `readingMinutes` is a number on the document but nullable in the input,
     where null means "estimate it"; the two date fields arrive as strings and
     are stored as Dates. Everything else goes through as sent. */
  const { readingMinutes: override, lastUpdatedAt } = patch;
  const fields = { ...patch };
  delete fields.readingMinutes;
  delete fields.lastUpdatedAt;
  delete fields.publishedAt;
  const body = { ...existing.body, ...(patch.body ?? {}) };
  const minutes = "readingMinutes" in patch ? (override ?? readingMinutes(body)) : readingMinutes(body);

  await col.updateOne(
    { _id },
    {
      $set: {
        // Dot paths, so `{ seo: { canonical } }` writes seo.canonical and
        // leaves the rest of the sub-document where it was.
        ...dotted(fields),
        ...("lastUpdatedAt" in patch ? { lastUpdatedAt: lastUpdatedAt ? new Date(lastUpdatedAt) : null } : {}),
        publishedAt,
        updatedAt: new Date(),
        readingMinutes: minutes,
      },
    }
  );

  revalidateTag("posts", "max");
  revalidateTag(`post:${existing.slug}`, "max");
  if (next.slug !== existing.slug) revalidateTag(`post:${next.slug}`, "max");
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await currentSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const { id } = await params;
  const _id = oid(id);
  if (!_id) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const col = await posts();
  const doc = await col.findOneAndDelete({ _id });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidateTag("posts", "max");
  revalidateTag(`post:${doc.slug}`, "max");
  return NextResponse.json({ ok: true });
}
