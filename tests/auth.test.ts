/**
 * The lock on the newsroom.
 *
 * Every one of these asserts against the running app, so the proxy is in the
 * path. Calling the route handlers directly would skip it and pass even if the
 * admin were wide open.
 */
import assert from "node:assert/strict";
import { before, describe, test } from "node:test";

import { ACCOUNT, appIsUp, errorOf, json, req, signIn } from "./helpers";

let up = false;
before(async () => {
  up = await appIsUp();
});

describe("signed out", () => {
  test("the login page is reachable", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/admin");
    assert.equal(res.status, 200);
  });

  test("the login page is noindex", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/admin");
    assert.match(res.text, /noindex/, "the newsroom must not be indexable");
  });

  const guarded = ["/admin/posts", "/admin/posts/new", "/admin/posts/000000000000000000000000"];
  for (const path of guarded) {
    test(`${path} redirects to the login`, async (t) => {
      if (!up) return t.skip("app not running");
      const res = await req(path);
      assert.equal(res.status, 307, `${path} returned ${res.status}`);
      const location = res.headers.get("location") || "";
      assert.ok(location.includes("/admin"), `redirected to ${location}`);
      assert.ok(location.includes("next="), "the intended destination was not preserved");
    });
  }

  const mutating: Array<[string, string]> = [
    ["POST", "/api/posts"],
    ["PATCH", "/api/posts/000000000000000000000000"],
    ["DELETE", "/api/posts/000000000000000000000000"],
    ["POST", "/api/upload"],
  ];
  for (const [method, path] of mutating) {
    test(`${method} ${path} is 401`, async (t) => {
      if (!up) return t.skip("app not running");
      const res = await req(path, { method });
      assert.equal(res.status, 401, `${method} ${path} returned ${res.status}`);
    });
  }

  test("published posts are still readable", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/api/posts");
    assert.equal(res.status, 200, "the public blog reads through this route");
  });
});

describe("signing in", () => {
  test("a wrong password is rejected", async (t) => {
    if (!up || !ACCOUNT.email) return t.skip("app not running or no seeded account");
    const res = await json("/api/auth/login", { email: ACCOUNT.email, password: "definitely-not-it" });
    assert.equal(res.status, 401);
  });

  test("an unknown account is rejected", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await json("/api/auth/login", { email: "nobody@example.com", password: "definitely-not-it" });
    assert.equal(res.status, 401);
  });

  test("a wrong password does not say whether the account exists", async (t) => {
    if (!up || !ACCOUNT.email) return t.skip("app not running or no seeded account");
    const known = await json("/api/auth/login", { email: ACCOUNT.email, password: "definitely-not-it" });
    const unknown = await json("/api/auth/login", { email: "nobody@example.com", password: "definitely-not-it" });
    assert.equal(known.status, unknown.status);
    assert.equal(errorOf(known), errorOf(unknown), "the error text leaks whether the account exists");
  });

  test("a malformed request is rejected", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await json("/api/auth/login", { email: "not-an-email", password: "short" });
    assert.ok(res.status === 400 || res.status === 401, `got ${res.status}`);
  });

  test("the right password returns an httpOnly session", async (t) => {
    if (!up || !ACCOUNT.email || !ACCOUNT.password) return t.skip("no seeded account");
    const res = await json("/api/auth/login", ACCOUNT);
    assert.equal(res.status, 200);
    const cookies = res.headers.getSetCookie?.() ?? [];
    const session = cookies.find((c) => c.startsWith("wq_session="));
    assert.ok(session, "no wq_session cookie");
    assert.match(session!, /HttpOnly/i, "the session cookie must not be readable from JavaScript");
    assert.match(session!, /SameSite/i, "the session cookie needs a SameSite policy");
  });
});

describe("signed in", () => {
  test("the admin opens and sign-out clears the session", async (t) => {
    if (!up || !ACCOUNT.password) return t.skip("no seeded account");
    const cookie = await signIn();

    assert.equal((await req("/admin/posts", { cookie })).status, 200, "the post list should open");
    assert.equal((await req("/admin/posts/new", { cookie })).status, 200, "the editor should open");

    // Visiting the login page while signed in should not show the form again.
    const login = await req("/admin", { cookie });
    assert.equal(login.status, 307, "an authenticated visit to /admin should redirect onward");

    const out = await req("/api/auth/logout", { method: "POST", cookie });
    assert.equal(out.status, 200);
    const cleared = (out.headers.getSetCookie?.() ?? []).find((c) => c.startsWith("wq_session="));
    assert.ok(cleared, "logout did not send a cookie header");
    assert.match(cleared!, /wq_session=;|Max-Age=0|Expires=Thu, 01 Jan 1970/i, "the session cookie was not cleared");
  });

  test("a forged session is refused", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/admin/posts", { cookie: "wq_session=not.a.real.jwt" });
    assert.equal(res.status, 307, "an unverifiable token must not be treated as a session");
  });
});
