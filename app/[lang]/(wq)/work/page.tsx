import type { Metadata } from "next";
import { FillText } from "@/components/wq/FillText";
import { EndCta, PageHead } from "@/components/wq/Page";
import { WorkGrid, type WorkCard } from "@/components/wq/WorkGrid";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { localeHref } from "@/lib/i18n";
import { work } from "@/lib/wq-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.workTitle, description: t.meta.workDescription };
}

/**
 * Work — the portfolio index.
 *
 * A filter bar over a grid whose first tile is the feature. The home page
 * carries the ring and the process band; repeating either here would make the
 * two pages read as the same page twice. What this page owes a visitor that
 * the home page does not is a way to search by discipline, which is what the
 * filter is for.
 *
 * Media slots are labelled placeholders rather than stock imagery, per the
 * brief's own rule.
 */
export default async function Work() {
  const t = await getDictionary();
  const locale = await getLocale();

  const items: WorkCard[] = work(t).map((w, i) => ({
    slug: w.slug,
    name: w.name,
    tags: w.tags,
    href: localeHref(`/work/${w.slug}`, locale),
    /* The plate cycles on the project's index rather than its slug, so two
       neighbouring tiles never land on the same picture. Stand-in photography
       until the real screenshots exist — see `public/wq/plates`. */
    image: `/wq/plates/0${(i % 6) + 1}.jpg`,
  }));

  return (
    <>
      <PageHead
        eyebrow={t.work.eyebrow}
        title={t.work.titleLead}
        accent={t.work.titleAccent}
        lede={t.work.lede}
      />

      <section className="wq-wrap wq-sec-b">
        <WorkGrid
          items={items}
          allLabel={t.actions.allWork}
          filterLabel={t.aria.workFilter}
          emptyLabel={t.work.filterEmpty}
          viewLabel={t.actions.viewProject}
        />
      </section>

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid2 wq-grid2-wide wq-grid2-start">
          <div className="wq-side">
            <p className="wq-eyebrow" data-reveal="">
              {t.work.howLabel}
            </p>
            <div className="wq-tick" aria-hidden="true" />
          </div>
          {/* The same word-by-word fill the other claims carry, rather than
              the line wipe: the two devices side by side read as two different
              kinds of statement. */}
          <FillText className="wq-statement">
            {t.work.howLead} <em>{t.work.howEm}</em>
          </FillText>
        </div>
      </section>

      <EndCta title={t.work.ctaTitle} />
    </>
  );
}
