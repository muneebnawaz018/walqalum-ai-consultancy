import Link from "next/link";
import { CLIENTS, POSTS, WORK } from "@/lib/wq-content";

/** The arrow that leans out on hover, used by every "see all" link. */
function ArrowLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="wq-link wq-link-arrowed">
      {children}
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 17L17 7M17 7H8M17 7V16" />
      </svg>
    </Link>
  );
}

/**
 * The client marquee.
 *
 * The list is repeated four times so the strip can scroll continuously without
 * a visible seam. The duplicates are decoration, so only the first pass is left
 * in the accessibility tree — otherwise a screen reader reads every client name
 * four times over.
 */
export function Marquee() {
  const passes = [0, 1, 2, 3];
  return (
    <section aria-label="Clients" className="wq-marquee">
      <div className="wq-track">
        {passes.map((pass) => (
          <div className="wq-track-pass" key={pass} aria-hidden={pass > 0 || undefined}>
            {CLIENTS.map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/** 01 / Position — the claim, set large, against a short caption. */
export function Positioning() {
  return (
    <section id="position" aria-label="Positioning" className="wq-sec wq-wrap">
      <div className="wq-grid2">
        <div className="wq-side">
          <p className="wq-eyebrow">01 / Position</p>
          {/* A rule that fades out downward, the design's section marker. */}
          <div className="wq-tick" aria-hidden="true" />
          <p className="wq-side-note">
            Fifteen years of production engineering, applied only where AI earns
            its place.
          </p>
        </div>
        <div className="wq-statement">
          Most AI initiatives stall between the demo and the deployment.{" "}
          <em>We close that gap.</em> Applied AI on fifteen years of production
          engineering, so the agent that impressed the board still runs, audited
          and monitored, a year later.
        </div>
      </div>
    </section>
  );
}

/** 04 / Selected work — three cards, image slots pending real screenshots. */
export function SelectedWork() {
  return (
    <section id="work" aria-label="Selected work" className="wq-wrap wq-sec-b">
      <div className="wq-sec-head">
        <div>
          <p className="wq-eyebrow">04 / Selected work</p>
          <h2 className="wq-h2-lg">Built, shipped, running.</h2>
        </div>
        <ArrowLink href="/work">All work</ArrowLink>
      </div>
      <div className="wq-grid3">
        {WORK.map((w) => (
          <Link key={w.slug} href={`/work/${w.slug}`} className="wq-card">
            {/* The design ships placeholder slots here. Left as an empty
                surface rather than filled with stock imagery, so it reads as
                deliberately pending rather than finished. */}
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
  );
}

/** 06 / Insights — three headlines, no excerpts. */
export function Insights() {
  return (
    <section id="insights" aria-label="Insights" className="wq-sec wq-wrap">
      <div className="wq-sec-head">
        <div>
          <p className="wq-eyebrow">06 / Insights</p>
          <h2 className="wq-h2-lg">Notes from the field.</h2>
        </div>
        <ArrowLink href="/insights">All insights</ArrowLink>
      </div>
      <div className="wq-grid3">
        {POSTS.map((p) => (
          <Link key={p.slug} href={`/insights/${p.slug}`} className="wq-post">
            <p className="wq-post-meta">{p.meta}</p>
            <h3>{p.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** The closing call to action. */
export function CallToAction() {
  return (
    <section aria-label="Call to action" className="wq-cta-band">
      <h2>Have a system in mind?</h2>
      <Link href="/contact" className="wq-cta wq-cta-xl">
        Start a project
      </Link>
    </section>
  );
}
