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

      <header className="np-head">
        <div>
          <span className="eyebrow mono">Newsroom</span>
          <h1 className="display">Posts.</h1>
          <p>
            A post can publish in English with Arabic still empty. The site falls back to the English and says so.
          </p>
        </div>
        <Link className="admin-btn" href="/admin/posts/new">
          Write a post
        </Link>
      </header>

      <PostList
        posts={docs.map((d) => ({
          id: String(d._id),
          slug: d.slug,
          status: d.status,
          title: d.title,
          excerpt: d.excerpt,
          category: d.category,
          cover: d.cover?.url || "",
          readingMinutes: d.readingMinutes ?? 1,
          featured: d.featured,
          updatedAt: d.updatedAt?.toISOString() ?? null,
          publishedAt: d.publishedAt?.toISOString() ?? null,
          hasArabic: Boolean(d.body?.ar?.trim()),
        }))}
      />
    </div>
  );
}
