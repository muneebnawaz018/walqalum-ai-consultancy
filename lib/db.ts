import { MongoClient, type Db, type ObjectId } from "mongodb";
/** Every stored string is a bilingual pair — the site has no translation table. */
export type I18n = { en: string; ar: string };

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "walqalum";

let promise: Promise<MongoClient> | null = null;

/** One client per process; Next reloads modules in dev, so cache on globalThis. */
declare global {
  var __wqMongo: Promise<MongoClient> | undefined;
}

export function getClient(): Promise<MongoClient> {
  if (!uri) throw new Error("MONGODB_URI is not set");
  if (process.env.NODE_ENV === "development") {
    if (!global.__wqMongo) global.__wqMongo = new MongoClient(uri).connect();
    return global.__wqMongo;
  }
  if (!promise) promise = new MongoClient(uri).connect();
  return promise;
}

export async function getDb(): Promise<Db> {
  return (await getClient()).db(dbName);
}

export type PostDoc = {
  _id?: ObjectId;
  slug: string;
  status: "draft" | "published";
  publishedAt: Date | null;
  updatedAt: Date;
  category: I18n;
  author: { name: string; id?: ObjectId };
  readingMinutes: number;
  featured: boolean;
  cover: { url: string; alt: I18n };
  title: I18n;
  excerpt: I18n;
  body: I18n;
  seo: { title: I18n; description: I18n };
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
