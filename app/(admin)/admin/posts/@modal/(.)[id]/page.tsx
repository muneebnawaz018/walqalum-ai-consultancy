import { notFound, redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { currentSession } from "@/lib/auth";
import { posts } from "@/lib/db";
import { EditorModal } from "../../EditorModal";
import { toInput } from "../../form";
import { PostEditor } from "../../PostEditor";

export const dynamic = "force-dynamic";

/** /admin/posts/[id], intercepted so editing opens over the list. */
export default async function EditPostModal({ params }: PageProps<"/admin/posts/[id]">) {
  const session = await currentSession();
  if (!session) redirect("/admin");

  const { id } = await params;
  if (!ObjectId.isValid(id)) notFound();

  const col = await posts();
  const doc = await col.findOne({ _id: new ObjectId(id) });
  if (!doc) notFound();

  return (
    <EditorModal title={doc.title.en || doc.slug}>
      <PostEditor inModal id={id} initial={toInput(doc)} />
    </EditorModal>
  );
}
