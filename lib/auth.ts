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

/**
 * Login attempts per IP, in memory.
 *
 * The limit is deliberately wide. Its job is to make automated credential
 * stuffing pointless, not to police typing: this is a private newsroom used by
 * a few people, and the cost of a false lockout — an editor barred for a quarter
 * of an hour, with no self-service reset — is higher than the cost of an
 * attacker getting thirty guesses instead of five. Against a bcrypt hash,
 * thirty guesses is nothing; against a script working a password list, a ceiling
 * of a hundred and twenty an hour makes the attempt worthless.
 *
 * A correct password clears the count (see the login route), so the only
 * attempts that accumulate are failures.
 *
 * There is no way to turn this off. It used to have one for the test suite,
 * which meant the code path running in production was not the one under test.
 * The limit is now loose enough that a full test run never approaches it.
 */
export const RATE_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT = 30;

const attempts = new Map<string, { n: number; until: number }>();

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || rec.until < now) {
    attempts.set(ip, { n: 1, until: now + RATE_WINDOW_MS });
    return true;
  }
  rec.n += 1;
  return rec.n <= RATE_LIMIT;
}

export function clearRateLimit(ip: string) {
  attempts.delete(ip);
}
