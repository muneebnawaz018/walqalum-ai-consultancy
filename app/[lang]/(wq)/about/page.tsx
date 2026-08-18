import type { Metadata } from "next";
import { EndCta, PageHead, RowList, SectionHead, Split, Statement } from "@/components/wq/Page";
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
        {/* One key per line, so the editorial breaks survive translation: a
            line here is a phrase, and the Arabic phrase is not the same length
            as the English one. */}
        <Statement
          lines={[
            t.about.statementLead,
            <em key="em">{t.about.statementEm}</em>,
            t.about.statementTail,
          ]}
        />
      </Split>

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

      <EndCta />
    </>
  );
}
