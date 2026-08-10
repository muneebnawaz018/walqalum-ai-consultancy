import { Readable } from "node:stream";
import { ObjectId } from "mongodb";
import { bucket } from "@/lib/uploads";

export const runtime = "nodejs";

/** Serves a cover image out of GridFS. Public — these sit on published posts. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return new Response("Not found", { status: 404 });
  const _id = new ObjectId(id);

  const gfs = await bucket();
  const [doc] = await gfs.find({ _id }).limit(1).toArray();
  if (!doc) return new Response("Not found", { status: 404 });

  // The id changes whenever the file does, so this can be cached indefinitely.
  const etag = `"${id}"`;
  if (req.headers.get("if-none-match") === etag) return new Response(null, { status: 304 });

  const stream = Readable.toWeb(gfs.openDownloadStream(_id)) as ReadableStream;
  return new Response(stream, {
    headers: {
      "content-type": String(doc.metadata?.contentType || "application/octet-stream"),
      "content-length": String(doc.length),
      "cache-control": "public, max-age=31536000, immutable",
      "content-disposition": "inline",
      etag,
    },
  });
}
