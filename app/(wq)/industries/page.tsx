import type { Metadata } from "next";
import { EndCta, PageHead, RowList } from "@/components/wq/Page";
import { INDUSTRIES } from "@/lib/wq-pages";

export const metadata: Metadata = {
  title: "Industries · WalQalum",
  description:
    "Eight sectors where we already know the constraints: healthcare, finance, real estate, retail, education, manufacturing, fintech and legal.",
};

/**
 * Industries.
 *
 * Replaces the design's Services tab. Built on the home page's Capabilities
 * pattern — a numbered row list — because these are the same shape of content:
 * a named thing and one honest sentence about it.
 */
export default function Industries() {
  return (
    <>
      <PageHead
        eyebrow="01 / Industries"
        title={
          <>
            Eight sectors where the constraints are{" "}
            <span className="wq-accent">already known.</span>
          </>
        }
        lede="What a model may decide, and what the data looks like underneath, differ by sector. These are the ones we have shipped into."
      />
      <section className="wq-wrap wq-sec-b">
        <RowList rows={INDUSTRIES} />
      </section>
      <EndCta title="Working in one of these?" />
    </>
  );
}
