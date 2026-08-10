import { GridFSBucket, ObjectId } from "mongodb";
import { getDb } from "./db";

/** Cover images live in Mongo — GridFS, so nothing new has to be procured. */
export const BUCKET = "covers";

export const MAX_BYTES = 5 * 1024 * 1024;

/** Allow-list, and the magic bytes each one must actually start with. */
export const ALLOWED: Record<string, { ext: string; magic: number[][] }> = {
  "image/jpeg": { ext: "jpg", magic: [[0xff, 0xd8, 0xff]] },
  "image/png": { ext: "png", magic: [[0x89, 0x50, 0x4e, 0x47]] },
  "image/webp": { ext: "webp", magic: [[0x52, 0x49, 0x46, 0x46]] },
  "image/avif": { ext: "avif", magic: [] },
};

export async function bucket() {
  const db = await getDb();
  return new GridFSBucket(db, { bucketName: BUCKET });
}

/**
 * A declared content type is a claim by the uploader. SVG is refused outright —
 * it is a script container, and it would be served from our own origin.
 */
export function sniff(bytes: Uint8Array, declared: string): string | null {
  const spec = ALLOWED[declared];
  if (!spec) return null;
  if (!spec.magic.length) return declared;
  const ok = spec.magic.some((sig) => sig.every((b, i) => bytes[i] === b));
  return ok ? declared : null;
}

export const fileUrl = (id: ObjectId | string) => `/api/images/${String(id)}`;
