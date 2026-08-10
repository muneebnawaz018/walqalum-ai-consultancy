import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { ObjectId } from "mongodb";
import { currentSession } from "@/lib/auth";
import { posts, readingMinutes, type PostDoc } from "@/lib/db";
import { postInput } from "@/lib/schemas";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const session = await currentSession();

  const col = await posts();
  const filter: Record<string, unknown> = session
    ? status
      ? { status }
      : {}
    : { status: "published", publishedAt: { $lte: new Date() } };

  const docs = await col.find(filter).sort({ publishedAt: -1, updatedAt: -1 }).limit(200).toArray();
  return NextResponse.json({ posts: docs });
}

export async function POST(req: Request) {
  const session = await currentSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const parsed = postInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request", issues: parsed.error.issues }, { status: 400 });
  }
  const input = parsed.data;

  const col = await posts();
  if (await col.findOne({ slug: input.slug })) {
    return NextResponse.json({ error: "That slug already exists" }, { status: 409 });
  }

  const { readingMinutes: override, lastUpdatedAt, ...rest } = input;
  const doc: PostDoc = {
    ...rest,
    publishedAt: input.status === "published" ? new Date(input.publishedAt || Date.now()) : null,
    updatedAt: new Date(),
    lastUpdatedAt: lastUpdatedAt ? new Date(lastUpdatedAt) : null,
    author: { name: session.name, id: new ObjectId(session.sub) },
    // The estimate is the default; a number typed in the editor wins.
    readingMinutes: override ?? readingMinutes(input.body),
  };
  const res = await col.insertOne(doc);

  revalidateTag("posts", "max");
  revalidateTag(`post:${input.slug}`, "max");
  return NextResponse.json({ ok: true, id: String(res.insertedId) }, { status: 201 });
}
