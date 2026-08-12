import { MongoClient, type Db, type MongoClientOptions, type ObjectId } from "mongodb";
/** Every stored string is a bilingual pair — the site has no translation table. */
export type I18n = { en: string; ar: string };

const uri = process.env.MONGODB_URI;

/**
 * Client options, chosen against the traffic this actually carries: a marketing
 * site whose reads are cached by Next, and a newsroom used by a handful of
 * people. The driver's defaults are tuned for a busy service on its own cluster
 * and are wrong here in two ways.
 */
const OPTIONS: MongoClientOptions = {
  /**
   * The default is 100 *per process*. The cluster allows 500 connections in
   * total, so three or four instances at full pool would exhaust it and the
   * fifth would be refused. Ten is far more than this workload needs: a pooled
   * connection is only held for the length of a query.
   */
  maxPoolSize: 10,
  /** Nothing held open while idle, which matters on a shared cluster. */
  minPoolSize: 0,
  /** Return sockets to the cluster after a minute of quiet rather than never. */
  maxIdleTimeMS: 60_000,
  /**
   * The default is 30s. That is a sensible wait for a background job and a
   * terrible one for a page render: an IP that is not allowlisted, or a cluster
   * mid-election, turns into half a minute of blank browser. Ten seconds still
   * covers an Atlas failover, which typically completes well inside it.
   */
  serverSelectionTimeoutMS: 10_000,
  connectTimeoutMS: 10_000,
  /** Named so slow queries are attributable in Atlas's own profiler. */
  appName: "walqalum-site",
};

let promise: Promise<MongoClient> | null = null;

/** One client per process; Next reloads modules in dev, so cache on globalThis. */
declare global {
  var __wqMongo: Promise<MongoClient> | undefined;
}

/**
 * Connect, and forget a connection that failed.
 *
 * Caching the promise is what keeps one pool per process. Caching a *rejected*
 * promise is a trap: the first request during a network blip would poison every
 * request after it, and the process would never recover without a restart. The
 * handler clears the slot so the next caller tries again; callers still see the
 * original rejection.
 */
function connect(): Promise<MongoClient> {
  const attempt = new MongoClient(uri as string, OPTIONS).connect();
  attempt.catch(() => {
    if (promise === attempt) promise = null;
    if (global.__wqMongo === attempt) global.__wqMongo = undefined;
  });
  return attempt;
}

export function getClient(): Promise<MongoClient> {
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (process.env.NODE_ENV === "development") {
    if (!global.__wqMongo) global.__wqMongo = connect();
    return global.__wqMongo;
  }
  if (!promise) promise = connect();
  return promise;
}

/**
 * The database named in MONGODB_URI's path.
 *
 * No argument and no environment variable: the connection string is the only
 * place the database is described. It has to carry a path — `.../walqalum?...`
 * — because the driver falls back to `test` when it does not.
 */
export async function getDb(): Promise<Db> {
  return (await getClient()).db();
}

export type Faq = { q: I18n; a: I18n };

export type PostDoc = {
  _id?: ObjectId;
  slug: string;
  status: "draft" | "published";
  publishedAt: Date | null;
  updatedAt: Date;
  /** Set by hand in the editor when an edit is worth announcing. */
  lastUpdatedAt?: Date | null;
  category: I18n;
  /** Who signed in and saved it. `authorName` is the byline the site prints. */
  author: { name: string; id?: ObjectId };
  authorName?: string;
  reviewedBy?: string;
  tags?: string[];
  /** Always a number on the document: the estimate, or the editor's override. */
  readingMinutes: number;
  featured: boolean;
  cover: { url: string; alt: I18n };
  title: I18n;
  excerpt: I18n;
  body: I18n;
  faqs?: Faq[];
  seo: {
    title: I18n;
    description: I18n;
    ogImage?: { url: string; alt: I18n };
    canonical?: string;
    primaryKeyword?: string;
    keywords?: string[];
    noindex?: boolean;
    jsonLd?: string;
  };
};

export type UserDoc = {
  _id?: ObjectId;
  email: string;
  passwordHash: string;
  name: string;
  role: "admin" | "editor";
  createdAt: Date;
  lastLoginAt: Date | null;
};

export async function posts() {
  const db = await getDb();
  return db.collection<PostDoc>("posts");
}

export async function users() {
  const db = await getDb();
  return db.collection<UserDoc>("users");
}

export async function ensureIndexes() {
  const p = await posts();
  const u = await users();
  await p.createIndex({ slug: 1 }, { unique: true });
  await p.createIndex({ status: 1, publishedAt: -1 });
  await u.createIndex({ email: 1 }, { unique: true });
}

/** Words per minute is a convention, not a measurement — 200 is the usual one. */
export const readingMinutes = (body: I18n) =>
  Math.max(1, Math.round((body.en || body.ar || "").trim().split(/\s+/).length / 200));
