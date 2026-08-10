/** The public site: every route, the SEO surface, and the old-URL redirects. */
import assert from "node:assert/strict";
import { before, describe, test } from "node:test";

import { CASES } from "../lib/cases";
import { PRODUCTS } from "../lib/products";
import { SECTORS } from "../lib/sectors";
import { appIsUp, esc, json, req, slug } from "./helpers";

let up = false;
before(async () => {
  up = await appIsUp();
  if (!up) console.error("\n  The app is not answering on the test base URL. Start `npm run dev` first.\n");
});

describe("pages", () => {
  const pages = ["/", "/industries", "/products", "/work", "/about", "/contact", "/blog", "/privacy", "/terms"];

  for (const path of pages) {
    test(`${path} renders`, async (t) => {
      if (!up) return t.skip("app not running");
      const res = await req(path);
      assert.equal(res.status, 200, `${path} returned ${res.status}`);
      assert.match(res.text, /<\/html>/, `${path} did not return a complete document`);
    });
  }

  test("a missing page 404s", async (t) => {
    if (!up) return t.skip("app not running");
    assert.equal((await req("/no-such-page")).status, 404);
  });
});

describe("case studies", () => {
  for (const [id, study] of Object.entries(CASES)) {
    test(`/work/${id} renders its title`, async (t) => {
      if (!up) return t.skip("app not running");
      const res = await req(`/work/${id}`);
      assert.equal(res.status, 200);
      // The artifact injected case copy with JavaScript. It has to be in the HTML.
      assert.ok(res.text.includes(esc(study.title)), `"${study.title}" was not server-rendered`);
    });
  }

  test("an unknown case 404s", async (t) => {
    if (!up) return t.skip("app not running");
    assert.equal((await req("/work/not-a-case")).status, 404);
  });
});

describe("products", () => {
  for (const product of PRODUCTS) {
    test(`/products/${product.slug} renders its use cases`, async (t) => {
      if (!up) return t.skip("app not running");
      const res = await req(`/products/${product.slug}`);
      assert.equal(res.status, 200);
      assert.ok(res.text.includes(esc(product.name)), "product name missing");
      // The whole point of the page: every use case, not a highlight reel.
      for (const useCase of product.useCases) {
        assert.ok(res.text.includes(esc(useCase.title)), `use case "${useCase.title}" missing`);
      }
      for (const solution of product.solutions) {
        assert.ok(res.text.includes(esc(solution.title)), `solution "${solution.title}" missing`);
      }
    });
  }

  test("an unknown product 404s", async (t) => {
    if (!up) return t.skip("app not running");
    assert.equal((await req("/products/not-a-product")).status, 404);
  });

  test("the index links to every product", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/products");
    for (const product of PRODUCTS) {
      assert.ok(res.text.includes(`/products/${product.slug}`), `no link to ${product.slug}`);
    }
  });
});

describe("sectors", () => {
  test("the industries page names all eight", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/industries");
    for (const sector of SECTORS) {
      assert.ok(res.text.includes(esc(sector.name)), `sector "${sector.name}" missing`);
    }
  });

  test("the first sector panel is server-rendered", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/industries");
    // The tabs swap panels client-side; the first one must not depend on that.
    assert.ok(res.text.includes(esc(SECTORS[0].uses[0])), "the default panel had no content in the HTML");
  });
});

describe("bilingual copy", () => {
  test("Arabic ships in the markup, not on a second URL", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/");
    assert.ok(res.text.includes("data-ar="), "no data-ar attributes found");
    assert.match(res.text, /[؀-ۿ]/, "no Arabic characters in the HTML");
  });

  test("there is no /ar route", async (t) => {
    if (!up) return t.skip("app not running");
    assert.equal((await req("/ar")).status, 404);
  });
});

describe("SEO", () => {
  test("sitemap lists pages, cases and products", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/sitemap.xml");
    assert.equal(res.status, 200);
    for (const id of Object.keys(CASES)) assert.ok(res.text.includes(`/work/${id}`), `sitemap missing ${id}`);
    for (const p of PRODUCTS) assert.ok(res.text.includes(`/products/${p.slug}`), `sitemap missing ${p.slug}`);
  });

  test("robots.txt keeps crawlers out of the newsroom", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/robots.txt");
    assert.equal(res.status, 200);
    assert.match(res.text, /Disallow: \/admin/);
    assert.match(res.text, /Disallow: \/api/);
    assert.match(res.text, /Sitemap:/);
  });

  test("llms.txt describes the site", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/llms.txt");
    assert.equal(res.status, 200);
    assert.match(res.text, /# WalQalum/);
    assert.match(res.text, /## Products/);
    assert.match(res.text, /## Case studies/);
  });

  test("the home page carries a title and description", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await req("/");
    assert.match(res.text, /<title>[^<]+<\/title>/);
    assert.match(res.text, /<meta name="description"/);
  });
});

describe("old URLs", () => {
  const moved: Array<[string, string]> = [
    ["/contact-us", "/contact"],
    ["/our-work", "/work"],
    ["/about-us", "/about"],
    ["/our-client", "/about"],
    ["/our-partners", "/about"],
    ["/life-walqalum", "/about"],
    ["/capabilities", "/industries"],
    ["/engagements", "/industries"],
    ["/services", "/industries"],
    ["/services/anything", "/industries"],
  ];

  for (const [from, to] of moved) {
    test(`${from} redirects to ${to}`, async (t) => {
      if (!up) return t.skip("app not running");
      const res = await req(from);
      assert.equal(res.status, 308, `${from} returned ${res.status}`);
      assert.equal(res.headers.get("location"), to);
    });
  }
});

describe("the contact form", () => {
  test("accepts a valid enquiry", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await json("/api/enquiries", {
      name: "Test Person",
      email: `${slug("enquiry")}@example.com`,
      company: "Test Co",
      who: "startup",
      needs: ["AI agents & automation"],
      message: "Submitted by the integration suite.",
      lang: "en",
    });
    assert.equal(res.status, 201);
  });

  test("rejects a missing email", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await json("/api/enquiries", { name: "No Email" });
    assert.equal(res.status, 400);
  });

  test("rejects a malformed email", async (t) => {
    if (!up) return t.skip("app not running");
    const res = await json("/api/enquiries", { name: "Bad", email: "not-an-email" });
    assert.equal(res.status, 400);
  });
});
