import { CASES } from "@/lib/cases";
import { PRODUCTS } from "@/lib/products";
import { listPosts } from "@/lib/posts";
import { abs, ROUTES } from "@/lib/seo";

export const revalidate = 3600;

/** A plain-text map of the site for language models that read llms.txt. */
export async function GET() {
  const posts = await listPosts();

  const body = [
    "# WalQalum",
    "",
    "> Your AI partner for scalable growth: agents, models and the data platforms",
    "> underneath them, from pilot to long after production. Offices in Sharjah,",
    "> Lahore and Dubbo.",
    "",
    "## Pages",
    ...ROUTES.map((p) => `- [${p === "/" ? "Home" : p.slice(1)}](${abs(p)})`),
    "",
    "## Products",
    ...PRODUCTS.map((p) => `- [${p.name}](${abs(`/products/${p.slug}`)}) · ${p.tagline}`),
    "",
    "## Case studies",
    ...Object.entries(CASES).map(([slug, c]) => `- [${c.title}](${abs(`/work/${slug}`)}) · ${c.ind}, ${c.year}`),
    "",
    "## Writing",
    ...posts.map((p) => `- [${p.title.en}](${abs(`/blog/${p.slug}`)})`),
    "",
  ].join("\n");

  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
