/**
 * The fields that only exist to change the page's head or its structured data.
 *
 * Every one of these is invisible in the editor and invisible on the rendered
 * post, which is exactly why they are worth pinning: a canonical that silently
 * stops emitting, or an FAQPage block that loses its questions, looks fine on
 * screen and costs traffic quietly.
 */
import assert from "node:assert/strict";
import { after, before, describe, test, type TestContext } from "node:test";

import { appIsUp, idOf, json, req, signIn, slug } from "./helpers";

let up = false;
let cookie = "";
const created: string[] = [];

const base = (s: string) => ({
  slug: s,
  status: "published" as const,
  featured: false,
  category: { en: "Engineering", ar: "هندسة" },
  cover: { url: "", alt: { en: "", ar: "" } },
  title: { en: `Post ${s}`, ar: "" },
  excerpt: { en: "Written by the integration suite.", ar: "" },
  body: { en: "A paragraph of body copy.", ar: "" },
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

after(async () => {
  if (!cookie) return;
  for (const id of created) await req(`/api/posts/${id}`, { method: "DELETE", cookie });
});

const ready = (t: TestContext) => {
  if (!up) return t.skip("app not running"), false;
  if (!cookie) return t.skip("no seeded account"), false;
  return true;
};

/** Creates a post, remembers it for cleanup, and returns its rendered page. */
async function publish(extra: Record<string, unknown>) {
  const s = slug("seo");
  const res = await json("/api/posts", { ...base(s), ...extra }, { cookie });
  created.push(idOf(res));
  return { slug: s, page: await req(`/blog/${s}`) };
}

/** Every ld+json block on the page, parsed. */
function blocks(html: string): Array<Record<string, unknown>> {
  const found = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  return found.map((m) => JSON.parse(m[1].replace(/\\u003c/g, "<")));
}

describe("structured data", () => {
  test("every post carries an Article block", async (t) => {
    if (!ready(t)) return;
    const { page } = await publish({ authorName: "A Writer" });
    const article = blocks(page.text).find((b) => b["@type"] === "Article");
    assert.ok(article, "no Article block on the page");
    assert.equal((article!.author as { name: string }).name, "A Writer", "the byline did not reach the schema");
    assert.ok(article!.datePublished, "a published post needs datePublished");
  });

  test("questions become an FAQPage block and an accordion", async (t) => {
    if (!ready(t)) return;
    const { page } = await publish({
      faqs: [
        { q: { en: "Does this work?", ar: "" }, a: { en: "It does.", ar: "" } },
        { q: { en: "And this one?", ar: "" }, a: { en: "Also yes.", ar: "" } },
      ],
    });

    const faq = blocks(page.text).find((b) => b["@type"] === "FAQPage");
    assert.ok(faq, "no FAQPage block");
    assert.equal((faq!.mainEntity as unknown[]).length, 2, "both questions should be in the schema");

    assert.match(page.text, /<details/, "the questions should render as an accordion");
    assert.ok(page.text.includes("Does this work?"), "the question text is missing from the page");
    assert.ok(page.text.includes("It does."), "the answer text is missing from the page");
  });

  test("a half-written question is left out of both", async (t) => {
    if (!ready(t)) return;
    const { page } = await publish({
      faqs: [{ q: { en: "A question with no answer", ar: "" }, a: { en: "", ar: "" } }],
    });
    assert.ok(!blocks(page.text).some((b) => b["@type"] === "FAQPage"), "an unanswered question made an FAQPage");
    assert.ok(!page.text.includes("A question with no answer"), "an unanswered question was rendered");
  });

  test("a custom block of a new type is added alongside", async (t) => {
    if (!ready(t)) return;
    const { page } = await publish({
      seo: { jsonLd: JSON.stringify({ "@type": "HowTo", name: "A how-to" }) },
    });
    const types = blocks(page.text).map((b) => b["@type"]);
    assert.ok(types.includes("Article"), "the generated Article should survive");
    assert.ok(types.includes("HowTo"), "the custom block should be emitted");
  });

  test("a custom block replaces the generated one of the same type", async (t) => {
    if (!ready(t)) return;
    const { page } = await publish({
      seo: { jsonLd: JSON.stringify({ "@type": "Article", headline: "Hand written" }) },
    });
    const articles = blocks(page.text).filter((b) => b["@type"] === "Article");
    assert.equal(articles.length, 1, "two Article blocks would be flagged in Search Console");
    assert.equal(articles[0].headline, "Hand written", "the custom block should win");
  });

  test("invalid custom JSON does not take the page down", async (t) => {
    if (!ready(t)) return;
    const { page } = await publish({ seo: { jsonLd: "{ not json at all" } });
    assert.equal(page.status, 200, "a typo in the schema box must not 500 the post");
    assert.ok(blocks(page.text).some((b) => b["@type"] === "Article"), "the generated blocks should still ship");
  });
});

describe("the head", () => {
  test("noindex is emitted only when the switch is on", async (t) => {
    if (!ready(t)) return;
    const off = await publish({});
    assert.ok(!/name="robots"[^>]*noindex/.test(off.page.text), "noindex appeared without being asked for");

    const on = await publish({ seo: { noindex: true } });
    assert.match(on.page.text, /noindex/, "the noindex switch did nothing");
  });

  test("a canonical is emitted only when one is set", async (t) => {
    if (!ready(t)) return;
    const none = await publish({});
    assert.ok(!/rel="canonical"/.test(none.page.text), "an unset canonical should not be emitted");

    const set = await publish({ seo: { canonical: "https://example.com/original" } });
    assert.match(set.page.text, /rel="canonical"[^>]*example\.com\/original/, "the canonical was not emitted");
  });

  test("meta and Open Graph fall back to the post's own copy", async (t) => {
    if (!ready(t)) return;
    const { page } = await publish({});
    assert.match(page.text, /property="og:type" content="article"/, "og:type is missing");
    assert.ok(page.text.includes("Written by the integration suite."), "the excerpt should stand in as the description");
  });

  test("the meta title overrides the post title", async (t) => {
    if (!ready(t)) return;
    const { page } = await publish({ seo: { title: { en: "A different SEO title", ar: "" } } });
    assert.match(page.text, /<title>A different SEO title/, "the meta title was ignored");
  });
});

describe("publishing fields", () => {
  test("a reading time typed in the editor overrides the estimate", async (t) => {
    if (!ready(t)) return;
    const s = slug("minutes");
    const res = await json("/api/posts", { ...base(s), readingMinutes: 42 }, { cookie });
    created.push(idOf(res));

    const page = await req(`/blog/${s}`);
    assert.ok(page.text.includes("42 min"), "the override did not reach the page");
  });

  test("a blank reading time is estimated from the body", async (t) => {
    if (!ready(t)) return;
    const s = slug("estimate");
    const res = await json("/api/posts", { ...base(s), body: { en: "word ".repeat(800), ar: "" } }, { cookie });
    created.push(idOf(res));

    const doc = (await req(`/api/posts/${idOf(res)}`, { cookie })).json<{ post: { readingMinutes: number } }>();
    assert.ok((doc?.post.readingMinutes ?? 0) >= 3, "800 words should estimate over three minutes");
  });

  test("tags reach the page and the schema", async (t) => {
    if (!ready(t)) return;
    const { page } = await publish({ tags: ["retrieval", "evaluation"] });
    assert.ok(page.text.includes("retrieval"), "the tag was not rendered");
    const article = blocks(page.text).find((b) => b["@type"] === "Article");
    assert.match(String(article?.keywords), /retrieval/, "tags should become schema keywords");
  });

  test("a reviewer is shown and emitted", async (t) => {
    if (!ready(t)) return;
    const { page } = await publish({ reviewedBy: "A Reviewer" });
    assert.ok(page.text.includes("A Reviewer"), "the reviewer was not shown on the post");
    const article = blocks(page.text).find((b) => b["@type"] === "Article");
    assert.equal((article?.reviewedBy as { name: string })?.name, "A Reviewer", "reviewedBy is missing from the schema");
  });

  test("too many tags are refused", async (t) => {
    if (!ready(t)) return;
    const many = Array.from({ length: 16 }, (_, i) => `tag-${i}`);
    const res = await json("/api/posts", { ...base(slug("toomany")), tags: many }, { cookie });
    assert.equal(res.status, 400, "the 15 tag limit is not enforced");
  });
});
