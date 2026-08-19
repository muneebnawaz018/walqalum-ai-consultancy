import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FillText } from "@/components/wq/FillText";
import { EndCta, NextItems, PageHead } from "@/components/wq/Page";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { localeHref } from "@/lib/i18n";
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
  return post
    ? { title: `${post.title} · WalQalum`, description: `${post.date} · ${post.topic}` }
    : {};
}

/**
 * An article.
 *
 * The bodies are not written yet — these three headlines come from the design —
 * so the page states that plainly rather than inventing an article under
 * someone's byline. What it does carry is the frame the finished piece will
 * live in: the dateline, the topic, and the rest of the writing underneath.
 */
export default async function Article({ params }: PageProps<"/[lang]/insights/[slug]">) {
  const { slug } = await params;
  const t = await getDictionary();
  const locale = await getLocale();
  const all = posts(t);
  const post = all.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = all
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      href: localeHref(`/insights/${p.slug}`, locale),
      name: p.title,
      meta: `${p.date} · ${p.topic}`,
    }));

  return (
    <>
      <PageHead eyebrow={`${post.date} · ${post.topic}`} title={post.title} />

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid2 wq-grid2-wide wq-grid2-start">
          <div className="wq-side">
            <p className="wq-eyebrow" data-reveal="">
              {t.insights.statusLabel}
            </p>
            <div className="wq-tick" aria-hidden="true" />
          </div>
          <FillText className="wq-statement">
            {t.insights.articlePendingLead} <em>{t.insights.articlePendingEm}</em>{" "}
            {t.insights.articlePendingTail}
          </FillText>
        </div>
      </section>

      <NextItems label={t.insights.moreLabel} items={others} />

      <EndCta title={t.insights.ctaTitle} />
    </>
  );
}
