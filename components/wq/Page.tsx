import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { localeHref } from "@/lib/i18n";

/**
 * The shared page furniture.
 *
 * The design only covers the home page, so these are derived from its own
 * devices rather than invented: the mono eyebrow, the very tight display face,
 * the hairline that separates every row, and the accent used once per view.
 * Every inner page is built from these, which is what keeps them looking like
 * one site rather than six.
 */

/**
 * The masthead every inner page opens with, in place of the home hero.
 *
 * The headline arrives as two strings rather than as markup. Every page's
 * headline ends on an accented phrase, and building that as JSX in the page
 * meant an English sentence split across a `<span>` — the one shape that cannot
 * be handed to a translator. As two keys it survives translation, and a
 * language that does not want the emphasis can simply leave `accent` empty.
 */
export function PageHead({
  eyebrow,
  title,
  accent,
  lede,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  lede?: string;
}) {
  return (
    <header className="wq-pagehead wq-wrap">
      <p className="wq-eyebrow">{eyebrow}</p>
      <h1 className="wq-pagehead-h1">
        {title}
        {accent ? (
          <>
            {" "}
            <span className="wq-accent">{accent}</span>
          </>
        ) : null}
      </h1>
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

/**
 * The closing band, so every page ends on the same invitation.
 *
 * Reads its own default from the dictionary rather than taking an English
 * fallback in the signature — a default argument is exactly the kind of string
 * that never makes it into a translation file.
 */
export async function EndCta({ title }: { title?: string }) {
  const t = await getDictionary();
  const locale = await getLocale();
  return (
    <section aria-label={t.aria.cta} className="wq-cta-band">
      <h2>{title ?? t.home.ctaTitle}</h2>
      <Link
        href={localeHref("/contact", locale)}
        className="wq-cta wq-cta-xl"
        data-magnetic="8"
      >
        {t.actions.startProject}
      </Link>
    </section>
  );
}
