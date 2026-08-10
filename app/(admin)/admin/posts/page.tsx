import Link from "next/link";
import { redirect } from "next/navigation";
import { currentSession } from "@/lib/auth";
import { posts } from "@/lib/db";
import { AdminBar } from "../AdminBar";
import { PostList } from "./PostList";

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  const session = await currentSession();
  if (!session) redirect("/admin");

  const col = await posts();
  const docs = await col.find({}).sort({ updatedAt: -1 }).limit(200).toArray();

  return (
    <div className="admin-shell">
      <AdminBar name={session.name} />
      <PostList
        posts={docs.map((d) => ({
          id: String(d._id),
          slug: d.slug,
          status: d.status,
          title: d.title,
          category: d.category,
          featured: d.featured,
          updatedAt: d.updatedAt?.toISOString() ?? null,
          publishedAt: d.publishedAt?.toISOString() ?? null,
          hasArabic: Boolean(d.body?.ar?.trim()),
        }))}
      />
      <p className="admin-note" style={{ marginTop: "2rem" }}>
        <Link href="/admin/posts/new">Write a post</Link> — a post can publish in English with Arabic still empty; the
        site falls back and says so.
      </p>
    </div>
  );
}
