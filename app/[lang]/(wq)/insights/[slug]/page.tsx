import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EndCta, PageHead } from "@/components/wq/Page";
import { getDictionary } from "@/lib/dictionaries";
import { POST_SLUGS, posts } from "@/lib/wq-content";

export function generateStaticParams() {
  return POST_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = await getDictionary();
  const post = posts(t).find((p) => p.slug === slug);
  return post ? { title: `${post.title} · WalQalum`, description: post.meta } : {};
}

/**
 * An article.
 *
 * The Insights list and the header's panel both linked here before this route
 * existed, which meant every headline was a 404. The bodies themselves are not
 * written yet — these three headlines come from the design — so the page states
 * that plainly rather than inventing an article under someone's byline.
 */
export default async function Article({ params }: PageProps<"/[lang]/insights/[slug]">) {
  const { slug } = await params;
  const t = await getDictionary();
  const post = posts(t).find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <PageHead eyebrow={post.meta} title={post.title} />
      <section className="wq-wrap wq-sec-b">
        <p className="wq-lede wq-case-note">{t.insights.articlePending}</p>
      </section>
      <EndCta title={t.insights.ctaTitle} />
    </>
  );
}
