import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession, type Session } from "./auth-edge";

/**
 * Server-side session read. Every mutating handler calls this — the proxy check
 * narrows the surface, it does not replace this one.
 */
export async function currentSession(): Promise<Session | null> {
  const jar = await cookies();
  return verifySession(jar.get(SESSION_COOKIE)?.value);
}

export async function requireSession(): Promise<Session> {
  const s = await currentSession();
  if (!s) throw new Response("Unauthorised", { status: 401 });
  return s;
}

/** Five attempts per IP per fifteen minutes, in memory. */
const attempts = new Map<string, { n: number; until: number }>();
const WINDOW = 15 * 60 * 1000;
const LIMIT = 5;

/**
 * The integration suite signs in for real over HTTP, and a tripped limiter locks
 * the whole run out for fifteen minutes — including the correct password, since
 * the check runs before the password is read. The escape hatch is explicit and
 * refuses to apply in production, and the counting itself is covered directly in
 * tests/ratelimit.test.ts so turning it off here costs no coverage.
 */
const bypassed = () => process.env.AUTH_RATE_LIMIT === "off" && process.env.NODE_ENV !== "production";

export function rateLimit(ip: string): boolean {
  if (bypassed()) return true;
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || rec.until < now) {
    attempts.set(ip, { n: 1, until: now + WINDOW });
    return true;
  }
  rec.n += 1;
  return rec.n <= LIMIT;
}

export function clearRateLimit(ip: string) {
  attempts.delete(ip);
}
