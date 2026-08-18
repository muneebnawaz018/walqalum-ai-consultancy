/* eslint-disable @next/next/no-img-element --
   The plates are local static SVGs. next/image refuses SVG unless the project
   turns on `dangerouslyAllowSVG`, which would let any future remote SVG render
   as markup — too much surface to open for placeholder art. There is nothing
   for an optimiser to do to a 1KB vector anyway. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EndCta, PageHead, Statement } from "@/components/wq/Page";
import { getDictionary } from "@/lib/dictionaries";
import { WORK_SLUGS, work } from "@/lib/wq-content";

export function generateStaticParams() {
  return WORK_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = await getDictionary();
  const item = work(t).find((w) => w.slug === slug);
  return item ? { title: `${item.name} · WalQalum`, description: item.tags } : {};
}

/**
 * A case study.
 *
 * The write-ups are not yet cleared for publication, and the brief's rule is
 * that placeholders stay visibly labelled rather than dressed up as finished.
 * So this states plainly that the detail is pending instead of padding the page
 * with invented narrative or an unconfirmed metric.
 */
export default async function CaseStudy({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { slug } = await params;
  const t = await getDictionary();
  const item = work(t).find((w) => w.slug === slug);
  if (!item) notFound();

  return (
    <>
      <PageHead eyebrow={item.tags} title={item.name} />

      <section className="wq-wrap wq-sec-b">
        <div
          className="wq-card-media wq-case-media"
          aria-hidden="true"
          data-reveal-scale=""
          data-reveal=""
        >
          <img
            src={`/wq/dummy/0${(WORK_SLUGS.indexOf(slug as (typeof WORK_SLUGS)[number]) % 6) + 1}.svg`}
            alt=""
          />
        </div>
      </section>

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid2 wq-grid2-start">
          <div className="wq-side">
            <p className="wq-eyebrow" data-reveal="">
              {t.work.statusLabel}
            </p>
            <div className="wq-tick" aria-hidden="true" />
          </div>
          <Statement
            lines={[
              t.work.casePendingLead,
              <em key="em">{t.work.casePendingEm}</em>,
              t.work.casePendingTail,
            ]}
          />
        </div>
      </section>

      <EndCta title={t.work.ctaTitle} />
    </>
  );
}
