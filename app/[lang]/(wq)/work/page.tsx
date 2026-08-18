/* eslint-disable @next/next/no-img-element --
   The plates are local static SVGs. next/image refuses SVG unless the project
   turns on `dangerouslyAllowSVG`, which would let any future remote SVG render
   as markup — too much surface to open for placeholder art. There is nothing
   for an optimiser to do to a 1KB vector anyway. */
import type { Metadata } from "next";
import Link from "next/link";
import { EndCta, PageHead, SectionHead, Statement } from "@/components/wq/Page";
import { WorkRing } from "@/components/wq/WorkRing";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { localeHref } from "@/lib/i18n";
import { steps, work } from "@/lib/wq-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.workTitle, description: t.meta.workDescription };
}

/**
 * Work — the portfolio.
 *
 * The reference site's shape: a grid of cards that tilt toward the pointer,
 * under a heading that wipes in a line at a time, with the process spelled out
 * below so the work is read as a way of building rather than a gallery.
 *
 * Media slots stay empty rather than filled with stock imagery. The brief's own
 * rule is that placeholders stay visibly labelled instead of dressed up as
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

      {/* The ring, above the grid rather than instead of it: it is the way in
          for someone browsing, and the grid is the way through for someone
          comparing. Hidden below 768px, where a circle this size does not fit
          and the grid is the better read anyway. */}
      <section className="wq-wrap">
        <WorkRing items={work(t)} locale={locale} />
      </section>

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid3" data-reveal-group="">
          {work(t).map((w, i) => (
            <Link
              key={w.slug}
              href={localeHref(`/work/${w.slug}`, locale)}
              className="wq-card"
              data-tilt=""
            >
              <div data-tilt-inner="">
                <div className="wq-card-media" aria-hidden="true">
                  <img src={`/wq/dummy/0${(i % 6) + 1}.svg`} alt="" loading="lazy" />
                </div>
                <div className="wq-card-row">
                  <h3>{w.name}</h3>
                  <span className="wq-arrow" aria-hidden="true">
                    →
                  </span>
                </div>
                <p className="wq-card-tags">{w.tags}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid2 wq-grid2-start">
          <div className="wq-side">
            <p className="wq-eyebrow" data-reveal="">
              {t.work.howLabel}
            </p>
            <div className="wq-tick" aria-hidden="true" />
          </div>
          <Statement
            lines={[t.work.howLead, <em key="em">{t.work.howEm}</em>]}
          />
        </div>
      </section>

      <section className="wq-wrap wq-sec-b">
        {/* The home page's process band, restated here for someone who arrived
            on /work: same four steps, same dictionary keys. */}
        <SectionHead
          index={t.work.processLabel}
          title={[t.home.processTitle]}
          note={t.work.processNote}
        />
        <div className="wq-grid4" data-reveal-group="">
          {steps(t).map((step) => (
            <div key={step.num}>
              <div className="wq-step-num">{step.num}</div>
              <h3 className="wq-step-name">{step.name}</h3>
              <p className="wq-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <EndCta title={t.work.ctaTitle} />
    </>
  );
}
