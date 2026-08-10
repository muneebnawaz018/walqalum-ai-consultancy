/**
 * The blog module, end to end: create, read, update, delete, and the thing that
 * actually matters — that a draft stays invisible and a published post reaches
 * the public site.
 */
import assert from "node:assert/strict";
import { after, before, describe, test, type TestContext } from "node:test";

import { appIsUp, idOf, json, postOf, req, signIn, slug } from "./helpers";

let up = false;
let cookie = "";
const created: string[] = [];

const draft = (s: string) => ({
  slug: s,
  status: "draft" as const,
  featured: false,
  category: { en: "Engineering", ar: "هندسة" },
  cover: { url: "", alt: { en: "", ar: "" } },
  title: { en: `Post ${s}`, ar: `مقال ${s}` },
  excerpt: { en: "Written by the integration suite.", ar: "كتبته مجموعة الاختبارات." },
  body: { en: "## Heading\n\nA paragraph of body copy.", ar: "" },
  seo: { title: { en: "", ar: "" }, description: { en: "", ar: "" } },
});

before(async () => {
  up = await appIsUp();
  if (up) {
    try {
      cookie = await signIn();
    } catch (e) {
      console.error(`\n  ${(e as Error).message}\n`);
    }
  }
});

/** Whatever the assertions did, the database goes back to how it was found. */
after(async () => {
  if (!cookie) return;
  for (const id of created) await req(`/api/posts/${id}`, { method: "DELETE", cookie });
});

const ready = (t: TestContext) => {
  if (!up) return t.skip("app not running"), false;
  if (!cookie) return t.skip("no seeded account"), false;
  return true;
};

describe("create", () => {
  test("a valid post is created", async (t) => {
    if (!ready(t)) return;
    const s = slug("create");
    const res = await json("/api/posts", draft(s), { cookie });
    assert.equal(res.status, 201);
    const id = idOf(res);
    assert.ok(id, "no id returned");
    created.push(id);
  });

  test("a duplicate slug is refused", async (t) => {
    if (!ready(t)) return;
    const s = slug("dupe");
    const first = await json("/api/posts", draft(s), { cookie });
    created.push(idOf(first));
    const second = await json("/api/posts", draft(s), { cookie });
    assert.equal(second.status, 409, "two posts must not share a slug");
  });

  test("an invalid slug is refused", async (t) => {
    if (!ready(t)) return;
    for (const bad of ["Has Spaces", "UPPER", "trailing-", "punc!tuation"]) {
      const res = await json("/api/posts", { ...draft("x"), slug: bad }, { cookie });
      assert.equal(res.status, 400, `slug "${bad}" should have been rejected`);
    }
  });

  test("a cover must be an upload or an https URL", async (t) => {
    if (!ready(t)) return;
    const bad = { ...draft(slug("cover")), cover: { url: "javascript:alert(1)", alt: { en: "", ar: "" } } };
    assert.equal((await json("/api/posts", bad, { cookie })).status, 400);
  });

  test("a post can publish with Arabic empty", async (t) => {
    if (!ready(t)) return;
    const s = slug("en-only");
    const res = await json("/api/posts", { ...draft(s), status: "published" }, { cookie });
    assert.equal(res.status, 201, "English-only publishing is deliberate");
    created.push(idOf(res));
  });
});

describe("read", () => {
  test("a draft is hidden from the public and visible to the editor", async (t) => {
    if (!ready(t)) return;
    const s = slug("hidden");
    const id = idOf(await json("/api/posts", draft(s), { cookie }));
    created.push(id);

    assert.equal((await req(`/api/posts/${id}`, { cookie })).status, 200, "the editor should see the draft");
    assert.equal((await req(`/api/posts/${id}`)).status, 404, "the public must not see a draft");
    assert.equal((await req(`/blog/${s}`)).status, 404, "a draft must not have a public page");

    const list = await req("/api/posts");
    assert.ok(!list.text.includes(s), "a draft leaked into the public list");
  });

  test("an unknown id 404s rather than erroring", async (t) => {
    if (!ready(t)) return;
    assert.equal((await req("/api/posts/000000000000000000000000", { cookie })).status, 404);
  });

  test("a malformed id 404s rather than throwing", async (t) => {
    if (!ready(t)) return;
    assert.equal((await req("/api/posts/not-an-object-id", { cookie })).status, 404);
  });
});

describe("update", () => {
  test("publishing puts the post on the public site", async (t) => {
    if (!ready(t)) return;
    const s = slug("publish");
    const id = idOf(await json("/api/posts", draft(s), { cookie }));
    created.push(id);

    const patch = await req(`/api/posts/${id}`, {
      method: "PATCH",
      cookie,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: "published" }),
    });
    assert.equal(patch.status, 200);

    const page = await req(`/blog/${s}`);
    assert.equal(page.status, 200, "a published post needs a public page");
    assert.ok(page.text.includes(`Post ${s}`), "the title was not rendered");

    const index = await req("/blog");
    assert.ok(index.text.includes(`Post ${s}`), "the post did not reach the blog index");
  });

  test("editing the body changes what the public sees", async (t) => {
    if (!ready(t)) return;
    const s = slug("edit");
    const id = idOf(await json("/api/posts", { ...draft(s), status: "published" }, { cookie }));
    created.push(id);

    const marker = `edited-${Date.now().toString(36)}`;
    await req(`/api/posts/${id}`, {
      method: "PATCH",
      cookie,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ body: { en: `A paragraph containing ${marker}.`, ar: "" } }),
    });

    const page = await req(`/blog/${s}`);
    assert.ok(page.text.includes(marker), "the edit did not reach the public page");
  });

  test("unpublishing takes it back down", async (t) => {
    if (!ready(t)) return;
    const s = slug("unpublish");
    const id = idOf(await json("/api/posts", { ...draft(s), status: "published" }, { cookie }));
    created.push(id);
    assert.equal((await req(`/blog/${s}`)).status, 200);

    await req(`/api/posts/${id}`, {
      method: "PATCH",
      cookie,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: "draft" }),
    });
    assert.equal((await req(`/blog/${s}`)).status, 404, "an unpublished post must disappear");
  });

  test("a partial edit does not unpublish the post", async (t) => {
    if (!ready(t)) return;
    // Zod applies field defaults through .partial(), so a body-only patch used
    // to come back carrying status:"draft" and quietly took the post offline.
    const s = slug("partial");
    const id = idOf(await json("/api/posts", { ...draft(s), status: "published", featured: true }, { cookie }));
    created.push(id);

    await req(`/api/posts/${id}`, {
      method: "PATCH",
      cookie,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ body: { en: "Only the body changed.", ar: "" } }),
    });

    const doc = postOf(await req(`/api/posts/${id}`, { cookie }));
    assert.equal(doc.status, "published", "a body-only edit must not change the status");
    assert.equal(doc.featured, true, "a body-only edit must not clear the featured flag");
    assert.ok(doc.publishedAt, "a body-only edit must not clear the publish date");
    assert.equal((await req(`/blog/${s}`)).status, 200, "the post should still have a public page");
  });

  test("a partial edit does not wipe the cover or SEO fields", async (t) => {
    if (!ready(t)) return;
    const s = slug("keep-fields");
    const seed = {
      ...draft(s),
      status: "published" as const,
      cover: { url: "https://example.com/cover.jpg", alt: { en: "A cover", ar: "غلاف" } },
      seo: { title: { en: "SEO title", ar: "" }, description: { en: "SEO description", ar: "" } },
    };
    const id = idOf(await json("/api/posts", seed, { cookie }));
    created.push(id);

    await req(`/api/posts/${id}`, {
      method: "PATCH",
      cookie,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: { en: "A new title", ar: "" } }),
    });

    const doc = postOf(await req(`/api/posts/${id}`, { cookie }));
    assert.equal(doc.title.en, "A new title", "the field that was sent should change");
    assert.equal(doc.cover.url, seed.cover.url, "the cover was wiped by an unrelated edit");
    assert.equal(doc.seo.title.en, "SEO title", "the SEO title was wiped by an unrelated edit");
  });

  test("renaming onto a taken slug is refused", async (t) => {
    if (!ready(t)) return;
    const a = slug("rename-a");
    const b = slug("rename-b");
    created.push(idOf(await json("/api/posts", draft(a), { cookie })));
    const idB = idOf(await json("/api/posts", draft(b), { cookie }));
    created.push(idB);

    const clash = await req(`/api/posts/${idB}`, {
      method: "PATCH",
      cookie,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug: a }),
    });
    assert.equal(clash.status, 409);
  });
});

describe("delete", () => {
  test("a deleted post is gone from the API and the site", async (t) => {
    if (!ready(t)) return;
    const s = slug("delete");
    const id = idOf(await json("/api/posts", { ...draft(s), status: "published" }, { cookie }));
    assert.equal((await req(`/blog/${s}`)).status, 200);

    assert.equal((await req(`/api/posts/${id}`, { method: "DELETE", cookie })).status, 200);
    assert.equal((await req(`/api/posts/${id}`, { cookie })).status, 404);
    assert.equal((await req(`/blog/${s}`)).status, 404, "the public page outlived the post");
  });

  test("deleting twice 404s rather than erroring", async (t) => {
    if (!ready(t)) return;
    const id = idOf(await json("/api/posts", draft(slug("twice")), { cookie }));
    await req(`/api/posts/${id}`, { method: "DELETE", cookie });
    assert.equal((await req(`/api/posts/${id}`, { method: "DELETE", cookie })).status, 404);
  });
});

describe("rendering", () => {
  test("markdown becomes elements and script tags stay text", async (t) => {
    if (!ready(t)) return;
    const s = slug("render");
    const body = [
      "## A heading",
      "",
      "A paragraph with **bold** text and a [link](https://example.com).",
      "",
      "- first item",
      "- second item",
      "",
      "> a quotation",
      "",
      "<script>window.__pwned = 1</script>",
    ].join("\n");

    const id = idOf(await json("/api/posts", { ...draft(s), status: "published", body: { en: body, ar: "" } }, { cookie }));
    created.push(id);

    const page = await req(`/blog/${s}`);
    assert.equal(page.status, 200);
    assert.match(page.text, /<h2[^>]*>A heading<\/h2>/, "## should become an h2");
    assert.match(page.text, /<strong>bold<\/strong>/, "** should become strong");
    assert.match(page.text, /<blockquote>/, "> should become a blockquote");
    assert.match(page.text, /<li>/, "- should become list items");
    assert.ok(
      !page.text.includes("<script>window.__pwned"),
      "post body was rendered as live markup — this is stored XSS"
    );
    assert.ok(page.text.includes("&lt;script&gt;"), "the script tag should survive as escaped text");
  });

  test("an external link opens safely", async (t) => {
    if (!ready(t)) return;
    const s = slug("links");
    const id = idOf(
      await json(
        "/api/posts",
        { ...draft(s), status: "published", body: { en: "See [example](https://example.com).", ar: "" } },
        { cookie }
      )
    );
    created.push(id);

    const page = await req(`/blog/${s}`);
    assert.match(page.text, /rel="noopener"/, "external links need rel=noopener");
  });

  test("reading time is calculated on save", async (t) => {
    if (!ready(t)) return;
    const s = slug("reading");
    const id = idOf(await json("/api/posts", { ...draft(s), body: { en: "word ".repeat(600), ar: "" } }, { cookie }));
    created.push(id);

    const doc = postOf(await req(`/api/posts/${id}`, { cookie }));
    assert.ok(doc.readingMinutes >= 2, `600 words should be more than a minute, got ${doc.readingMinutes}`);
  });
});
