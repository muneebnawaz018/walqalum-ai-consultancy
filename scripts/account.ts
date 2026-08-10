/**
 * The one definition of the newsroom account, shared by both seeds.
 *
 * `seed:admin` creates it and stops. `seed:demo` creates it and adds sample
 * posts on top. They used to describe the account twice, in two different ways,
 * which meant `npm test` could sign in as an account the demo seed had never
 * made. Now there is one source: SEED_EMAIL, SEED_NAME and SEED_PASSWORD.
 *
 * Arguments still override the environment, so a host that would rather not
 * write a password into a file can pass one inline instead:
 *
 *   npm run seed:admin -- editor@walqalum.com "Name" 'a-long-password'
 */
import bcrypt from "bcryptjs";

import { ensureIndexes, users, type UserDoc } from "../lib/db";

export const MIN_PASSWORD = 12;

export type Account = { email: string; name: string; password: string };

/** Argument first, environment second, so neither route needs the other. */
export function resolveAccount(argv: string[] = process.argv.slice(2)): Account {
  const [email, name, password] = argv;
  return {
    email: (email || process.env.SEED_EMAIL || "").trim(),
    name: (name || process.env.SEED_NAME || "Marketing").trim(),
    password: password || process.env.SEED_PASSWORD || "",
  };
}

/** Exits with something a person can act on rather than a stack trace. */
export function requireAccount(account: Account): Account {
  const fail = (message: string) => {
    console.error(message);
    process.exit(1);
  };

  if (!process.env.MONGODB_URI) {
    fail("MONGODB_URI is not set. Start the database with `npm run db:up` first.");
  }
  if (!account.email || !account.email.includes("@")) {
    fail(
      "No account email. Set SEED_EMAIL in .env.development.local, or pass one:\n" +
        '  npm run seed:admin -- editor@walqalum.com "Name" \'a-long-password\''
    );
  }
  if (!account.password) {
    fail("No account password. Set SEED_PASSWORD in .env.development.local, or pass one as the third argument.");
  }
  if (account.password.length < MIN_PASSWORD) {
    fail(`The password is ${account.password.length} characters. Use at least ${MIN_PASSWORD}.`);
  }
  return account;
}

export type UpsertResult = { doc: UserDoc | null; created: boolean };

/**
 * Upserts by email. An existing account keeps its createdAt and lastLoginAt and
 * has its password replaced, which is a reset rather than a no-op, so callers
 * say which of the two happened.
 */
export async function upsertAccount(account: Account): Promise<UpsertResult> {
  await ensureIndexes();
  const col = await users();
  const email = account.email.toLowerCase();
  const passwordHash = await bcrypt.hash(account.password, 12);

  const before = await col.findOne({ email });
  const doc = await col.findOneAndUpdate(
    { email },
    {
      $set: { passwordHash, name: account.name, role: "admin" as const },
      $setOnInsert: { email, createdAt: new Date(), lastLoginAt: null },
    },
    { upsert: true, returnDocument: "after" }
  );

  return { doc, created: !before };
}
