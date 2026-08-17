import type { Metadata } from "next";
import Link from "next/link";
import { EndCta, PageHead } from "@/components/wq/Page";
import { WORK } from "@/lib/wq-content";

export const metadata: Metadata = {
  title: "Work · WalQalum",
  description:
    "Selected projects: AI agents, document intelligence and rendering at scale. Built, shipped and still running.",
};

/**
 * Work — the portfolio.
 *
 * The same card as the home page's Selected work, at full list length. Media
 * slots stay empty rather than filled with stock imagery: the brief's own rule
 * is that placeholders stay visibly labelled instead of being dressed up as
 * finished.
 */
export default function Work() {
  return (
    <>
      <PageHead
        eyebrow="01 / Work"
        title={
          <>
            Built, shipped, <span className="wq-accent">running.</span>
          </>
        }
        lede="A selection of systems in production. Client-confirmed outcomes are published once the client confirms them, and not before."
      />

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid3">
          {WORK.map((w) => (
            <Link key={w.slug} href={`/work/${w.slug}`} className="wq-card">
              <div className="wq-card-media" aria-hidden="true" />
              <div className="wq-card-row">
                <h3>{w.name}</h3>
                <span className="wq-arrow" aria-hidden="true">
                  →
                </span>
              </div>
              <p className="wq-card-tags">{w.tags}</p>
            </Link>
          ))}
        </div>
      </section>

      <EndCta title="Want something like this?" />
    </>
  );
}
