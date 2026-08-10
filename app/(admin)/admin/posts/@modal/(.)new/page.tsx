import { redirect } from "next/navigation";
import { currentSession } from "@/lib/auth";
import { EditorModal } from "../../EditorModal";
import { PostEditor } from "../../PostEditor";

export const dynamic = "force-dynamic";

/** /admin/posts/new, intercepted so it opens over the list. */
export default async function NewPostModal() {
  const session = await currentSession();
  if (!session) redirect("/admin");

  return (
    <EditorModal title="Write a post">
      <PostEditor inModal />
    </EditorModal>
  );
}
