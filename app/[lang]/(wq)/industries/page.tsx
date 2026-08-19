import type { Metadata } from "next";
import { FillText } from "@/components/wq/FillText";
import { PageHead, SectionHead } from "@/components/wq/Page";
import { SpyRows } from "@/components/wq/SpyRows";
import { getDictionary } from "@/lib/dictionaries";
import { industries } from "@/lib/wq-pages";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    title: t.meta.industriesTitle,
    description: t.meta.industriesDescription,
  };
}

/**
 * Industries.
 *
 * Replaces the design's Services tab, per the brief. Built on the reference
 * site's device for a list of this length — a sticky index beside numbered rows
 * that dim as they leave the middle of the screen — rather than a flat list,
 * because eight rows read as a catalogue otherwise.
 */
export default async function Industries() {
  const t = await getDictionary();

  return (
    <>
      <PageHead
        eyebrow={t.industries.eyebrow}
        title={t.industries.titleLead}
        accent={t.industries.titleAccent}
        lede={t.industries.lede}
      />

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid2 wq-grid2-wide wq-grid2-start">
          <div className="wq-side">
            <p className="wq-eyebrow" data-reveal="">
              {t.industries.whyLabel}
            </p>
            <div className="wq-tick" aria-hidden="true" />
          </div>
          <FillText className="wq-statement">
            {t.industries.statementLead} <em>{t.industries.statementEm}</em>{" "}
            {t.industries.statementTail}
          </FillText>
        </div>
      </section>

      <div className="wq-wrap">
        <SectionHead
          index={t.industries.listLabel}
          title={[t.industries.listTitle]}
          note={t.industries.listNote}
        />
      </div>
      {/* No label of its own: the heading above is the section's heading, and
          a second eyebrow with the same number beside it read as two headers
          for one list. The sticky column keeps the running number. */}
      <SpyRows rows={industries(t)} />
    </>
  );
}
