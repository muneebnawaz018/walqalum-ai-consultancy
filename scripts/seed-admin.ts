/**
 * Seeds an admin account. There is no registration endpoint on purpose — a
 * public signup route on an admin panel is how these get compromised.
 *
 *   MONGODB_URI=... npm run seed -- admin@walqalum.com "Name" 'password'
 */
import bcrypt from "bcryptjs";
import { ensureIndexes, users } from "../lib/db";

async function main() {
  const [email, name, password] = process.argv.slice(2);
  if (!email || !name || !password) {
    console.error('Usage: npm run seed -- <email> "<name>" <password>');
    process.exit(1);
  }
  if (password.length < 12) {
    console.error("Use a password of at least 12 characters.");
    process.exit(1);
  }

  await ensureIndexes();
  const col = await users();
  const passwordHash = await bcrypt.hash(password, 12);

  const res = await col.updateOne(
    { email: email.toLowerCase() },
    {
      $set: { passwordHash, name, role: "admin" as const },
      $setOnInsert: { email: email.toLowerCase(), createdAt: new Date(), lastLoginAt: null },
    },
    { upsert: true }
  );

  console.log(res.upsertedCount ? `Created ${email}` : `Updated ${email}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
