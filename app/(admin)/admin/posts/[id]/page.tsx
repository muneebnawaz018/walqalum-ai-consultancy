import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { currentSession } from "@/lib/auth";
import { posts } from "@/lib/db";
import { AdminBar } from "../../AdminBar";
import { toInput } from "../form";
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
      <header className="ed-head">
        <div className="crumbline">
          <Link href="/admin/posts">Posts</Link> / <span>{doc.title.en || doc.slug}</span>
        </div>
        <h1>{doc.title.en || doc.slug}</h1>
        <p>{doc.status === "published" ? "Published" : "Draft"} · /blog/{doc.slug}</p>
      </header>
      <PostEditor id={id} initial={toInput(doc)} />
    </div>
  );
}
