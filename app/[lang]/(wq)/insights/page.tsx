import type { Metadata } from "next";
import Link from "next/link";
import { EndCta, PageHead, Statement } from "@/components/wq/Page";
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
 * A list rather than a card grid: these are headlines, and a headline set at
 * reading size carries further than the same words in a box. Rows rise in turn
 * as they arrive, which is the reference site's treatment for its newsroom.
 */
export default async function Insights() {
  const t = await getDictionary();
  const locale = await getLocale();

  return (
    <>
      <PageHead
        eyebrow={t.insights.eyebrow}
        title={t.insights.titleLead}
        accent={t.insights.titleAccent}
        lede={t.insights.lede}
      />

      <section className="wq-wrap wq-sec-b">
        <div className="wq-rows" data-reveal-group="">
          {posts(t).map((p) => (
            <Link
              key={p.slug}
              href={localeHref(`/insights/${p.slug}`, locale)}
              className="wq-insight-row"
            >
              <p className="wq-post-meta">{p.meta}</p>
              <h2>{p.title}</h2>
              <span className="wq-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid2 wq-grid2-start">
          <div className="wq-side">
            <p className="wq-eyebrow" data-reveal="">
              {t.insights.whyLabel}
            </p>
            <div className="wq-tick" aria-hidden="true" />
          </div>
          <Statement
            lines={[
              t.insights.whyLead,
              <em key="em">{t.insights.whyEm}</em>,
              t.insights.whyTail,
            ]}
          />
        </div>
      </section>

      <EndCta />
    </>
  );
}
