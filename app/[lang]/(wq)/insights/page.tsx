import type { Metadata } from "next";
import { EndCta, PageHead } from "@/components/wq/Page";
import { PostList, type PostCard } from "@/components/wq/PostList";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { localeHref } from "@/lib/i18n";
import { posts } from "@/lib/wq-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.meta.insightsTitle,
    description: t.meta.insightsDescription,
  };
}

/**
 * Insights.
 *
 * A newsroom rather than a card grid: the newest piece set large, the rest as
 * dated rows under a topic filter. A headline at reading size carries further
 * than the same words in a box, and the date belongs in its own column — it is
 * how anyone actually scans a list of writing.
 */
export default async function Insights() {
  const t = await getDictionary();
  const locale = await getLocale();

  const items: PostCard[] = posts(t).map((p) => ({
    slug: p.slug,
    date: p.date,
    topic: p.topic,
    title: p.title,
    href: localeHref(`/insights/${p.slug}`, locale),
  }));

  return (
    <>
      <PageHead
        eyebrow={t.insights.eyebrow}
        title={t.insights.titleLead}
        accent={t.insights.titleAccent}
        lede={t.insights.lede}
      />

      <section className="wq-wrap wq-sec-b">
        <PostList
          posts={items}
          allLabel={t.actions.allInsights}
          filterLabel={t.aria.insightsFilter}
          emptyLabel={t.insights.filterEmpty}
        />
      </section>

      <EndCta />
    </>
  );
}
