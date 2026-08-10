import { NextResponse } from "next/server";
import { currentSession } from "@/lib/auth";
import { ALLOWED, MAX_BYTES, bucket, fileUrl, sniff } from "@/lib/uploads";

export const runtime = "nodejs";

/** Cover images, stored in GridFS. Auth required; the proxy checks this too. */
export async function POST(req: Request) {
  const session = await currentSession();
  if (!session) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });

  if (file.size === 0) return NextResponse.json({ error: "That file is empty" }, { status: 400 });
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: `Files must be under ${MAX_BYTES / 1024 / 1024}MB` }, { status: 413 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const contentType = sniff(bytes, file.type);
  if (!contentType) {
    return NextResponse.json(
      { error: `Use one of: ${Object.keys(ALLOWED).join(", ")}. SVG is not accepted.` },
      { status: 415 }
    );
  }

  const gfs = await bucket();
  const filename = `${Date.now()}-${file.name.replace(/[^\w.-]+/g, "-").slice(-80)}`;
  const id = await new Promise<string>((resolve, reject) => {
    // The driver dropped the top-level contentType option; it lives in metadata now.
    const stream = gfs.openUploadStream(filename, {
      metadata: { contentType, uploadedBy: session.email, uploadedAt: new Date() },
    });
    stream.on("error", reject);
    stream.on("finish", () => resolve(String(stream.id)));
    stream.end(Buffer.from(bytes));
  });

  return NextResponse.json({ ok: true, id, url: fileUrl(id), contentType }, { status: 201 });
}
