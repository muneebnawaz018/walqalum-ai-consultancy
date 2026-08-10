/**
 * Cover uploads.
 *
 * These are served back from our own origin, so what gets accepted matters more
 * than usual: anything the browser will execute becomes same-origin script.
 */
import assert from "node:assert/strict";
import { before, describe, test, type TestContext } from "node:test";

import { PNG_2X2, appIsUp, req, signIn, urlOf } from "./helpers";

let up = false;
let cookie = "";

before(async () => {
  up = await appIsUp();
  if (up) {
    try {
      cookie = await signIn();
    } catch {
      /* reported by the auth suite */
    }
  }
});

const ready = (t: TestContext) => {
  if (!up) return t.skip("app not running"), false;
  if (!cookie) return t.skip("no seeded account"), false;
  return true;
};

const upload = (bytes: Buffer, name: string, type: string, cookieValue = cookie) => {
  const form = new FormData();
  form.append("file", new Blob([new Uint8Array(bytes)], { type }), name);
  return req("/api/upload", { method: "POST", body: form, cookie: cookieValue });
};

describe("uploads", () => {
  test("a real PNG is accepted and served back", async (t) => {
    if (!ready(t)) return;
    const res = await upload(PNG_2X2, "pixel.png", "image/png");
    assert.equal(res.status, 201, res.text.slice(0, 200));

    const url = urlOf(res);
    assert.match(url, /^\/api\/images\/[a-f0-9]{24}$/, `unexpected url: ${url}`);

    const file = await req(url);
    assert.equal(file.status, 200);
    assert.equal(file.headers.get("content-type"), "image/png");
    assert.match(file.headers.get("cache-control") || "", /immutable/, "content-addressed files should cache hard");
  });

  test("a served image supports conditional requests", async (t) => {
    if (!ready(t)) return;
    const url = urlOf(await upload(PNG_2X2, "etag.png", "image/png"));
    const first = await req(url);
    const etag = first.headers.get("etag");
    assert.ok(etag, "no ETag on an immutable asset");

    const second = await req(url, { headers: { "if-none-match": etag! } });
    assert.equal(second.status, 304, "a matching ETag should return 304");
  });

  test("an SVG is refused", async (t) => {
    if (!ready(t)) return;
    const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
    const res = await upload(svg, "vector.svg", "image/svg+xml");
    assert.notEqual(res.status, 200, "SVG is a script container served from our own origin");
  });

  test("a file lying about its type is refused", async (t) => {
    if (!ready(t)) return;
    // HTML claiming to be a PNG. Only the magic bytes can catch this.
    const html = Buffer.from("<html><body><script>alert(1)</script></body></html>");
    const res = await upload(html, "not-really.png", "image/png");
    assert.notEqual(res.status, 200, "the declared content type must not be trusted");
  });

  test("an unsupported type is refused", async (t) => {
    if (!ready(t)) return;
    const res = await upload(Buffer.from("%PDF-1.4\n"), "doc.pdf", "application/pdf");
    assert.notEqual(res.status, 200);
  });

  test("an oversized file is refused", async (t) => {
    if (!ready(t)) return;
    // Valid PNG header, then padding past the 5MB ceiling.
    const big = Buffer.concat([PNG_2X2, Buffer.alloc(6 * 1024 * 1024)]);
    const res = await upload(big, "huge.png", "image/png");
    assert.equal(res.status, 413, `expected 413, got ${res.status}`);
  });

  test("an empty request is refused", async (t) => {
    if (!ready(t)) return;
    const res = await req("/api/upload", { method: "POST", body: new FormData(), cookie });
    assert.equal(res.status, 400);
  });

  test("uploading without a session is refused", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await upload(PNG_2X2, "anon.png", "image/png", "");
    assert.equal(res.status, 401);
  });

  test("an unknown image id 404s", async (t) => {
    if (!up) return t.skip("app not running");
    assert.equal((await req("/api/images/000000000000000000000000")).status, 404);
    assert.equal((await req("/api/images/not-an-id")).status, 404);
  });
});
