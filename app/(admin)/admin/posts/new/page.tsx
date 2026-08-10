import Link from "next/link";
import { redirect } from "next/navigation";
import { currentSession } from "@/lib/auth";
import { AdminBar } from "../../AdminBar";
import { PostEditor } from "../PostEditor";

export const dynamic = "force-dynamic";

export default async function NewPost() {
  const session = await currentSession();
  if (!session) redirect("/admin");
  return (
    <div className="admin-shell">
      <AdminBar name={session.name} />
      <header className="ed-head">
        <div className="crumbline">
          <Link href="/admin/posts">Posts</Link> / <span>New post</span>
        </div>
        <h1>New post</h1>
        <p>Draft an article for the WalQalum blog.</p>
      </header>
      <PostEditor />
    </div>
  );
}
