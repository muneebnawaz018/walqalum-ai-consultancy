import Link from "next/link";

/**
 * The shared page furniture.
 *
 * The design only covers the home page, so these are derived from its own
 * devices rather than invented: the mono eyebrow, the very tight display face,
 * the hairline that separates every row, and the accent used once per view.
 * Every inner page is built from these, which is what keeps them looking like
 * one site rather than six.
 */

/** The masthead every inner page opens with, in place of the home hero. */
export function PageHead({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <header className="wq-pagehead wq-wrap">
      <p className="wq-eyebrow">{eyebrow}</p>
      <h1 className="wq-pagehead-h1">{title}</h1>
      {lede ? <p className="wq-lede wq-pagehead-lede">{lede}</p> : null}
    </header>
  );
}

/**
 * A numbered row list — the Capabilities pattern, reused for anything that is
 * a list of named things with a sentence each.
 */
export function RowList({
  rows,
}: {
  rows: {
    num: string;
    name: string;
    desc: string;
    href?: string;
    /** Anchor target, so the header's panel can link straight to this row. */
    slug?: string;
  }[];
}) {
  return (
    <div className="wq-rows">
      {rows.map((r) => {
        const body = (
          <>
            <span className="wq-cap-num">{r.num}</span>
            <div>
              <h3>{r.name}</h3>
              <p>{r.desc}</p>
            </div>
          </>
        );
        return r.href ? (
          <Link key={r.num} id={r.slug} href={r.href} className="wq-cap wq-cap-link">
            {body}
          </Link>
        ) : (
          <div key={r.num} id={r.slug} className="wq-cap wq-cap-static">
            {body}
          </div>
        );
      })}
    </div>
  );
}

/** The two-column split: a short label column beside the substance. */
export function Split({
  id,
  label,
  note,
  children,
}: {
  id?: string;
  label: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="wq-sec-b wq-wrap">
      <div className="wq-grid2 wq-grid2-start">
        <div className="wq-side">
          <p className="wq-eyebrow">{label}</p>
          <div className="wq-tick" aria-hidden="true" />
          {note ? <p className="wq-side-note">{note}</p> : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

/** The closing band, so every page ends on the same invitation. */
export function EndCta({
  title = "Have a system in mind?",
}: {
  title?: string;
}) {
  return (
    <section aria-label="Call to action" className="wq-cta-band">
      <h2>{title}</h2>
      <Link href="/contact" className="wq-cta wq-cta-xl" data-magnetic="8">
        Start a project
      </Link>
    </section>
  );
}
