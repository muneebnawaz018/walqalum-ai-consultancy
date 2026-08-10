import { notFound, redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { currentSession } from "@/lib/auth";
import { posts } from "@/lib/db";
import { AdminBar } from "../../AdminBar";
import { PostEditor } from "../PostEditor";

export const dynamic = "force-dynamic";

export default async function EditPost({ params }: PageProps<"/admin/posts/[id]">) {
  const session = await currentSession();
  if (!session) redirect("/admin");

  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();

  const col = await posts();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  if (!doc) notFound();

  return (
    <div className="admin-shell">
      <AdminBar name={session.name} />
      <PostEditor
        id={id}
        initial={{
          slug: doc.slug,
          status: doc.status,
          category: doc.category,
          featured: doc.featured,
          cover: doc.cover,
          title: doc.title,
          excerpt: doc.excerpt,
          body: doc.body,
          seo: doc.seo,
          publishedAt: doc.publishedAt ? doc.publishedAt.toISOString() : null,
        }}
      />
    </div>
  );
}
