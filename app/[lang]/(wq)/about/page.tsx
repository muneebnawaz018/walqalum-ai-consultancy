import type { Metadata } from "next";
import { EndCta, PageHead, RowList, Split } from "@/components/wq/Page";
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
 * Reuses the home page's Stats band rather than restating the figures in a new
 * shape — the same numbers in the same treatment is the point.
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

      <Split id="position" label={t.about.positionLabel} note={t.about.positionNote}>
        <RowList rows={positions(t)} />
      </Split>

      <Stats rows={stats(t)} aria={t.aria.stats} />

      <Split id="offices" label={t.about.officesLabel} note={t.about.officesNote}>
        <div className="wq-grid3">
          {offices(t).map((o) => (
            <div key={o.id} className="wq-office-card">
              <h3>{o.city}</h3>
              <p>{o.country}</p>
              {/* A real link, not decoration: the outgoing footer rendered
                  these as anchors with no href, which meant they could not be
                  focused or dialled. */}
              <a href={telHref(o.tel)}>{o.tel}</a>
            </div>
          ))}
        </div>
      </Split>

      <EndCta />
    </>
  );
}
