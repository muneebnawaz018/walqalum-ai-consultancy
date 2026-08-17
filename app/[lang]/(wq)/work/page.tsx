import type { Metadata } from "next";
import Link from "next/link";
import { EndCta, PageHead } from "@/components/wq/Page";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { localeHref } from "@/lib/i18n";
import { work } from "@/lib/wq-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.workTitle, description: t.meta.workDescription };
}

/**
 * Work — the portfolio.
 *
 * The same card as the home page's Selected work, at full list length. Media
 * slots stay empty rather than filled with stock imagery: the brief's own rule
 * is that placeholders stay visibly labelled instead of being dressed up as
 * finished.
 */
export default async function Work() {
  const t = await getDictionary();
  const locale = await getLocale();

  return (
    <>
      <PageHead
        eyebrow={t.work.eyebrow}
        title={t.work.titleLead}
        accent={t.work.titleAccent}
        lede={t.work.lede}
      />

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid3">
          {work(t).map((w) => (
            <Link
              key={w.slug}
              href={localeHref(`/work/${w.slug}`, locale)}
              className="wq-card"
            >
              <div className="wq-card-media" aria-hidden="true" />
              <div className="wq-card-row">
                <h3>{w.name}</h3>
                <span className="wq-arrow" aria-hidden="true">
                  →
                </span>
              </div>
              <p className="wq-card-tags">{w.tags}</p>
            </Link>
          ))}
        </div>
      </section>

      <EndCta title={t.work.ctaTitle} />
    </>
  );
}
