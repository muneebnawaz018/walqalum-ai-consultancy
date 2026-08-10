/**
 * Shared plumbing for the integration suite.
 *
 * These tests drive the running app over HTTP rather than importing route
 * handlers. That is deliberate: the guards live in proxy.ts as well as in the
 * handlers, and a test that calls the handler directly would walk straight past
 * the proxy and prove nothing about whether the newsroom is actually locked.
 */
export const BASE = process.env.TEST_BASE_URL || "http://localhost:3000";

export type Res = { status: number; headers: Headers; text: string; json: <T = unknown>() => T | null };

/** fetch, with redirects left alone so a 307 can be asserted on. */
export async function req(
  path: string,
  init: RequestInit & { cookie?: string } = {}
): Promise<Res> {
  const { cookie, headers, ...rest } = init;
  const res = await fetch(`${BASE}${path}`, {
    redirect: "manual",
    ...rest,
    headers: { ...(headers as Record<string, string>), ...(cookie ? { cookie } : {}) },
  });
  const text = await res.text();
  return {
    status: res.status,
    headers: res.headers,
    text,
    json: <T,>(): T | null => {
      try {
        return JSON.parse(text) as T;
      } catch {
        return null;
      }
    },
  };
}

export const json = (path: string, body: unknown, init: RequestInit & { cookie?: string } = {}) =>
  req(path, {
    method: "POST",
    ...init,
    headers: { "content-type": "application/json", ...(init.headers as Record<string, string>) },
    body: JSON.stringify(body),
  });

/**
 * The account the demo seed creates. Both read the same two variables, so the
 * suite cannot end up signing in as an account the seed never made.
 */
export const ACCOUNT = {
  email: process.env.SEED_EMAIL || "",
  password: process.env.SEED_PASSWORD || "",
};

/** Signs in and returns the session cookie, or throws with a usable message. */
export async function signIn(): Promise<string> {
  if (!ACCOUNT.email || !ACCOUNT.password) {
    throw new Error(
      "SEED_EMAIL and SEED_PASSWORD are not set in .env.local. Run `npm run seed:demo` first."
    );
  }
  const res = await json("/api/auth/login", ACCOUNT);
  if (res.status !== 200) {
    throw new Error(`Sign-in failed (${res.status}). Has the account been seeded? ${res.text.slice(0, 160)}`);
  }
  const setCookie = res.headers.getSetCookie?.() ?? [];
  const session = setCookie.find((c) => c.startsWith("wq_session="));
  if (!session) throw new Error("Sign-in returned no wq_session cookie");
  return session.split(";")[0];
}

/** Skips a whole file with an explanation rather than failing 30 assertions. */
export async function appIsUp(): Promise<boolean> {
  try {
    const res = await req("/");
    return res.status === 200;
  } catch {
    return false;
  }
}

/** A real 2x2 PNG, so the upload magic-byte check has something honest to read. */
export const PNG_2X2 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFklEQVR4nGP8z8DwnwEIGAcVMDEwAAArGwL+GmpgmwAAAABJRU5ErkJggg==",
  "base64"
);

/** A unique slug per run, so a failed run never blocks the next one. */
export const slug = (label: string) => `test-${label}-${Date.now().toString(36)}`;

/**
 * React escapes text nodes, so `Retail & commerce` reaches the browser as
 * `Retail &amp; commerce`. Assertions about rendered copy have to compare the
 * escaped form or they report a false miss.
 */
export const esc = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* Typed readers for the shapes these routes return, so the assertions do not
   have to reach into `unknown` or fall back to `any`. */
export type PostShape = {
  slug: string;
  status: "draft" | "published";
  featured: boolean;
  publishedAt: string | null;
  readingMinutes: number;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
  cover: { url: string; alt: { en: string; ar: string } };
  seo: { title: { en: string; ar: string }; description: { en: string; ar: string } };
};

export const idOf = (res: Res) => res.json<{ id?: string }>()?.id ?? "";
export const urlOf = (res: Res) => res.json<{ url?: string }>()?.url ?? "";
export const errorOf = (res: Res) => res.json<{ error?: string }>()?.error;
export const postOf = (res: Res) => res.json<{ post: PostShape }>()?.post as PostShape;
