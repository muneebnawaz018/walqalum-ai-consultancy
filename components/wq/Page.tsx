import Link from "next/link";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { localeHref } from "@/lib/i18n";

/**
 * The shared page furniture.
 *
 * The design only drew the home page, so these are derived from its own devices
 * rather than invented: the mono eyebrow, the very tight display face, the
 * hairline that separates every row, and the accent used once per view. The
 * reference site adds the rest of the vocabulary — an oversized section
 * heading, a numbered list, a sticky index column — and those are built here
 * from the same tokens rather than borrowed as markup.
 *
 * Motion is applied by attribute (`data-reveal`, `data-lines`) and driven by
 * `components/wq/Motion.tsx`, so these stay server components.
 */

/** Splits a heading into the line spans the line-wipe animation needs. */
function Lines({ lines }: { lines: React.ReactNode[] }) {
  return (
    <>
      {lines.map((line, i) => (
        /* Two elements per line on purpose: the outer one is the mask, the
           inner one is what moves. */
        <span key={i}>
          <span data-line="">{line}</span>
        </span>
      ))}
    </>
  );
}

/**
 * The masthead every inner page opens with, in place of the home hero.
 *
 * The headline arrives as two strings rather than as markup. Every page's
 * headline ends on an accented phrase, and building that as JSX in the page
 * meant an English sentence split across a `<span>` — the one shape that cannot
 * be handed to a translator. As two keys it survives translation, and a
 * language that does not want the emphasis can simply leave `accent` empty.
 *
 * The two strings are also the two lines the wipe animates, which is why they
 * are handed to `Lines` rather than concatenated back into one sentence.
 */
export function PageHead({
  eyebrow,
  title,
  accent,
  lede,
}: {
  eyebrow: string;
  /** The first line. */
  title: string;
  /** The second line, set in the accent. Each line wipes up in turn. */
  accent?: string;
  lede?: string;
}) {
  return (
    <header className="wq-pagehead wq-wrap">
      <p className="wq-eyebrow" data-reveal="">
        {eyebrow}
      </p>
      <h1 className="wq-pagehead-h1" data-lines="">
        <Lines
          lines={
            accent
              ? [title, <span key="accent" className="wq-accent">{accent}</span>]
              : [title]
          }
        />
      </h1>
      {lede ? (
        <p className="wq-lede wq-pagehead-lede" data-reveal="">
          {lede}
        </p>
      ) : null}
    </header>
  );
}

/** An oversized section heading with its mono index above it. */
export function SectionHead({
  index,
  title,
  note,
  link,
}: {
  index: string;
  title: React.ReactNode[];
  note?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="wq-sec-head">
      <div>
        <p className="wq-eyebrow" data-reveal="">
          {index}
        </p>
        <h2 className="wq-h2-lg" data-lines="">
          <Lines lines={title} />
        </h2>
        {note ? (
          <p className="wq-side-note wq-sec-note" data-reveal="">
            {note}
          </p>
        ) : null}
      </div>
      {link ? (
        <Link href={link.href} className="wq-link wq-link-arrowed" data-reveal="">
          {link.label}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17L17 7M17 7H8M17 7V16" />
          </svg>
        </Link>
      ) : null}
    </div>
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
    <div className="wq-rows" data-reveal-group="">
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
          <p className="wq-eyebrow" data-reveal="">
            {label}
          </p>
          <div className="wq-tick" aria-hidden="true" />
          {note ? (
            <p className="wq-side-note" data-reveal="">
              {note}
            </p>
          ) : null}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
}

/**
 * The statement block: a claim set large, broken into fixed lines so it wipes
 * in one line at a time. The breaks are editorial — each line is a phrase, not
 * a measure — which is why they are passed in rather than left to wrap.
 */
export function Statement({ lines }: { lines: React.ReactNode[] }) {
  return (
    <div className="wq-statement" data-lines="">
      <Lines lines={lines} />
    </div>
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
      <h2 data-lines="">
        <Lines lines={[title ?? t.home.ctaTitle]} />
      </h2>
      <Link
        href={localeHref("/contact", locale)}
        className="wq-cta wq-cta-xl"
        data-magnetic="8"
        data-reveal=""
      >
        {t.actions.startProject}
      </Link>
    </section>
  );
}

/**
 * The reference's section opener: two oversized lines, the first set back and
 * the second solid, with a short caption hung off the end of the row.
 *
 * Each line wipes in from its own top edge, staggered — `data-clip` rather than
 * `data-lines`, because these are set flush and have no space beneath to slide
 * out of.
 */
export function StackHead({
  top,
  bottom,
  note,
}: {
  top: string;
  bottom: string;
  note?: string;
}) {
  return (
    <div className="wq-stack-row">
      <h2 className="wq-stack-head" data-clip="">
        <span data-clip-line="">{top}</span>
        <span data-clip-line="">{bottom}</span>
      </h2>
      {note ? (
        <p className="wq-stack-note" data-reveal="">
          {note}
        </p>
      ) : null}
    </div>
  );
}
