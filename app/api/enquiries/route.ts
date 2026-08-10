import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { enquiryInput } from "@/lib/schemas";

export const runtime = "nodejs";

/** The contact form. Stored, not emailed — delivery is a later decision. */
export async function POST(req: Request) {
  const parsed = enquiryInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const db = await getDb();
  await db.collection("enquiries").insertOne({
    ...parsed.data,
    createdAt: new Date(),
    userAgent: req.headers.get("user-agent") || "",
  });
  return NextResponse.json({ ok: true }, { status: 201 });
}
