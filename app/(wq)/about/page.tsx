import type { Metadata } from "next";
import { EndCta, PageHead, RowList, Split } from "@/components/wq/Page";
import { Stats } from "@/components/wq/Stats";
import { ABOUT } from "@/lib/wq-pages";

export const metadata: Metadata = {
  title: "About · WalQalum",
  description: ABOUT.lede,
};

/**
 * About.
 *
 * Reuses the home page's Stats band rather than restating the figures in a new
 * shape — the same numbers in the same treatment is the point.
 */
export default function About() {
  return (
    <>
      <PageHead
        eyebrow="01 / About"
        title={
          <>
            Strategy and delivery, from{" "}
            <span className="wq-accent">one team.</span>
          </>
        }
        lede={ABOUT.lede}
      />

      <Split
        id="position"
        label="02 / Position"
        note="Fifteen years of production engineering, applied only where AI earns its place."
      >
        <RowList rows={ABOUT.position} />
      </Split>

      <Stats />

      <Split id="offices" label="03 / Offices" note="Three time zones, one team.">
        <div className="wq-grid3">
          {ABOUT.offices.map((o) => (
            <div key={o.city} className="wq-office-card">
              <h3>{o.city}</h3>
              <p>{o.country}</p>
              {/* A real link, not decoration: the outgoing footer rendered
                  these as anchors with no href, which meant they could not be
                  focused or dialled. */}
              <a href={`tel:${o.tel.replace(/\s/g, "")}`}>{o.tel}</a>
            </div>
          ))}
        </div>
      </Split>

      <EndCta />
    </>
  );
}
