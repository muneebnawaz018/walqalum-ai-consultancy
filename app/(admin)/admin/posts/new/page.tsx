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
      <PostEditor />
    </div>
  );
}
