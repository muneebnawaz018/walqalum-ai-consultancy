import type { Metadata } from "next";
import Link from "next/link";
import { EndCta, PageHead } from "@/components/wq/Page";
import { POSTS } from "@/lib/wq-content";

export const metadata: Metadata = {
  title: "Insights · WalQalum",
  description:
    "Notes from the field on RAG, agent evaluation and choosing where AI is worth the budget.",
};

/**
 * Insights.
 *
 * A list rather than a card grid: these are headlines, and a headline set at
 * reading size carries further than the same words in a box. The hairline
 * between rows is the design's own separator.
 */
export default function Insights() {
  return (
    <>
      <PageHead
        eyebrow="01 / Insights"
        title={
          <>
            Notes from the <span className="wq-accent">field.</span>
          </>
        }
        lede="What we learned building the last thing, written down before we forget it."
      />

      <section className="wq-wrap wq-sec-b">
        <div className="wq-rows">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/insights/${p.slug}`} className="wq-insight-row">
              <p className="wq-post-meta">{p.meta}</p>
              <h2>{p.title}</h2>
              <span className="wq-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <EndCta />
    </>
  );
}
