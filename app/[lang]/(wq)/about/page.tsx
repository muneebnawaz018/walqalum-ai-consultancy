import type { Metadata } from "next";
import Image from "next/image";
import { FillText } from "@/components/wq/FillText";
import { EndCta, PageHead, RowList, SectionHead, Split } from "@/components/wq/Page";
import { Stats } from "@/components/wq/Stats";
import { getDictionary } from "@/lib/dictionaries";
import { offices, positions, telHref } from "@/lib/wq-pages";
import { stats } from "@/lib/wq-content";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return { title: t.meta.aboutTitle, description: t.about.lede };
}

/**
 * About.
 *
 * Opens on a claim rather than a history, which is the reference site's own
 * order: the statement carries the page and the numbers underneath it are the
 * evidence. Reuses the home page's Stats band rather than restating the figures
 * in a new shape — the same numbers in the same treatment is the point.
 */
export default async function About() {
  const t = await getDictionary();

  return (
    <>
      <PageHead
        eyebrow={t.about.eyebrow}
        title={t.about.titleLead}
        accent={t.about.titleAccent}
        lede={t.about.lede}
      />

      <Split id="gap" label={t.about.gapLabel} note={t.about.gapNote}>
        {/* Left to flow rather than broken into fixed lines: a hand-cut break
            measures one language's words, and `FillText` boxes each word so the
            scroll fill still runs in reading order wherever the lines land. */}
        <FillText className="wq-statement">
          {t.about.statementLead} <em>{t.about.statementEm}</em>{" "}
          {t.about.statementTail}
        </FillText>
      </Split>

      <section className="wq-wrap wq-sec-b">
        <div className="wq-plate-wide" aria-hidden="true" data-parallax-scale="">
          <Image
            src="/wq/plates/02.jpg"
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <Split id="position" label={t.about.positionLabel} note={t.about.positionNote}>
        <RowList rows={positions(t)} />
      </Split>

      <div id="stats">
        <Stats rows={stats(t)} aria={t.aria.stats} />
      </div>

      <section className="wq-wrap wq-sec-b" id="offices">
        <SectionHead
          index={t.about.officesLabel}
          title={[t.about.officesTitleLead, t.about.officesTitleTail]}
          note={t.about.officesNote}
        />
        <div className="wq-grid3" data-reveal-group="">
          {offices(t).map((o) => (
            <div key={o.id} className="wq-office-card" data-tilt="">
              <div data-tilt-inner="">
                <h3>{o.city}</h3>
                <p className="wq-office-locality">{o.locality}</p>
                <p>{o.country}</p>
                {/* A real link, not decoration: the outgoing footer rendered
                    these as anchors with no href, which meant they could not be
                    focused or dialled. */}
                <a href={telHref(o.tel)}>{o.tel}</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <EndCta title={t.about.ctaTitle} />
    </>
  );
}
