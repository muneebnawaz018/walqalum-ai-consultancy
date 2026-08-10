/**
 * Creates the newsroom account. There is no registration endpoint on purpose:
 * a public signup route on an admin panel is how these get compromised.
 *
 *   npm run seed:admin
 *
 * Reads SEED_EMAIL, SEED_NAME and SEED_PASSWORD from .env.development.local.
 * Arguments override them when you would rather not keep a password in a file:
 *
 *   npm run seed:admin -- editor@walqalum.com "Name" 'a-long-password'
 *
 * Running it twice on the same email resets that account's password. That is a
 * reset rather than a no-op, so it says so.
 */
import { requireAccount, resolveAccount, upsertAccount } from "./account";

async function main() {
  const account = requireAccount(resolveAccount());
  const { created } = await upsertAccount(account);

  console.log("");
  if (created) {
    console.log(`  Created ${account.email}`);
  } else {
    console.log(`  Updated ${account.email}`);
    console.log("  That account already existed. Its password is now the one you just supplied.");
    console.log("  Sessions already signed in are unaffected; rotate AUTH_SECRET to end those.");
  }
  console.log("");
  console.log("  Sign in at /admin");
  console.log("");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
