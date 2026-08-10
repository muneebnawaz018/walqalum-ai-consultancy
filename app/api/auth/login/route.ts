import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "@/lib/db";
import { SESSION_COOKIE, cookieOptions, signSession } from "@/lib/auth-edge";
import { clearRateLimit, rateLimit } from "@/lib/auth";
import { loginInput } from "@/lib/schemas";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const parsed = loginInput.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const col = await users();
  const user = await col.findOne({ email: parsed.data.email.toLowerCase() });
  // Same message either way — a distinct one tells an attacker which half was right.
  const ok = user ? await bcrypt.compare(parsed.data.password, user.passwordHash) : false;
  if (!user || !ok) return NextResponse.json({ error: "Email or password is wrong" }, { status: 401 });

  await col.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date() } });
  clearRateLimit(ip);

  const token = await signSession({
    sub: String(user._id),
    email: user.email,
    name: user.name,
    role: user.role,
  });
  const res = NextResponse.json({ ok: true, user: { name: user.name, email: user.email, role: user.role } });
  res.cookies.set(SESSION_COOKIE, token, cookieOptions);
  return res;
}
