import { posts, type PostDoc } from "./db";

/**
 * Published posts for the newsroom, newest first. If MongoDB is unreachable the
 * blog renders empty rather than taking the whole page down with it — the rest
 * of the site does not depend on the database being up.
 */
export async function listPosts(): Promise<PostDoc[]> {
  try {
    const col = await posts();
    return await col.find({ status: "published" }).sort({ publishedAt: -1 }).toArray();
  } catch {
    return [];
  }
}

export async function getPost(slug: string): Promise<PostDoc | null> {
  try {
    const col = await posts();
    return await col.findOne({ slug, status: "published" });
  } catch {
    return null;
  }
}
