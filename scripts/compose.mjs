/**
 * Runs `docker compose` with the local container's root credentials unpacked
 * from MONGODB_URI.
 *
 * The database used to be configured twice: once as MONGO_USER and
 * MONGO_PASSWORD for compose, and again inside the connection string for the
 * app. Editing one and not the other produced an authentication failure that
 * reads like a bug in the code. Compose cannot parse a connection string, so
 * something has to unpack it, and this is that something. MONGODB_URI is now
 * the only place the database is described, locally and on a host alike.
 *
 *   node --env-file=.env.development.local scripts/compose.mjs up -d
 */
import { spawnSync } from "node:child_process";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set. Copy .env.example to .env.development.local and fill it in.");
  process.exit(1);
}

let user = "";
let password = "";
try {
  const parsed = new URL(uri);
  user = decodeURIComponent(parsed.username);
  password = decodeURIComponent(parsed.password);
} catch {
  console.error(`MONGODB_URI is not a valid connection string:\n  ${uri}`);
  process.exit(1);
}

if (!user || !password) {
  console.error(
    "MONGODB_URI carries no credentials, so the container has no root user to create.\n" +
      "  Expected: mongodb://<user>:<password>@127.0.0.1:27017/walqalum?authSource=admin"
  );
  process.exit(1);
}

const res = spawnSync("docker", ["compose", ...process.argv.slice(2)], {
  stdio: "inherit",
  env: { ...process.env, MONGO_USER: user, MONGO_PASSWORD: password },
});

if (res.error) {
  console.error(`Could not run docker: ${res.error.message}`);
  process.exit(1);
}
process.exit(res.status ?? 1);
