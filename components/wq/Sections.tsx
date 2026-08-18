import Link from "next/link";
import { FillText } from "@/components/wq/FillText";
import { StackHead } from "@/components/wq/Page";
import { WorkRing } from "@/components/wq/WorkRing";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { localeHref, type Locale } from "@/lib/i18n";
import { CLIENTS, posts, work } from "@/lib/wq-content";

/**
 * The home page's server-rendered sections.
 *
 * All of these read the dictionary directly rather than taking props: they are
 * server components, so `getDictionary()` is a call, not a round trip, and
 * threading the same object through the page just to hand it back would be the
 * same value written twice.
 *
 * Links are built with `localeHref` rather than `LocaleLink` for the same
 * reason — the locale is already known here, so there is no need to make these
 * client components just to read the pathname.
 */

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
 *
 * The names themselves are proper nouns and stay out of the dictionary.
 */
export async function Marquee() {
  const t = await getDictionary();
  const passes = [0, 1, 2, 3];
  return (
    <section aria-label={t.aria.clients} className="wq-marquee">
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
export async function Positioning() {
  const t = await getDictionary();
  return (
    <section
      id="position"
      aria-label={t.aria.positioning}
      className="wq-sec wq-wrap"
    >
      <div className="wq-grid2 wq-grid2-wide">
        <div className="wq-side">
          <p className="wq-eyebrow">{t.home.positionEyebrow}</p>
          {/* A rule that fades out downward, the design's section marker. */}
          <div className="wq-tick" aria-hidden="true" />
          <p className="wq-side-note">{t.home.positionNote}</p>
        </div>
        {/* Three keys rather than one: the emphasised clause is the design's
            own device, and a translator needs to be able to move it inside the
            sentence without editing markup.

            Left to flow rather than broken into fixed lines as the reference
            has it: a hand-cut line break is a measurement of one language's
            words, and the Arabic sentence is neither the same length nor read
            in the same direction. `FillText` boxes each word, so the scroll
            fill still runs in reading order wherever the lines happen to
            break. */}
        <FillText className="wq-statement">
          {t.home.statementLead} <em>{t.home.statementEm}</em>{" "}
          {t.home.statementTail}
        </FillText>
      </div>
    </section>
  );
}

/**
 * 04 / Selected work — the reference's shape: a stacked heading, the slow ring
 * of projects, and one link onward. The card grid lives on /work, where someone
 * comparing projects can see them side by side; here the ring is the invitation.
 */
export async function SelectedWork() {
  const t = await getDictionary();
  const locale: Locale = await getLocale();
  return (
    <section
      id="work"
      aria-label={t.aria.selectedWork}
      className="wq-wrap wq-sec-b"
    >
      <StackHead
        top={t.home.workTop}
        bottom={t.home.workBottom}
        note={t.home.workNote}
      />
      <WorkRing items={work(t)} locale={locale} />
      <div className="wq-ring-cta">
        <ArrowLink href={localeHref("/work", locale)}>{t.actions.allWork}</ArrowLink>
      </div>
    </section>
  );
}

/** 06 / Insights — three headlines, no excerpts. */
export async function Insights() {
  const t = await getDictionary();
  const locale: Locale = await getLocale();
  return (
    <section
      id="insights"
      aria-label={t.aria.insights}
      className="wq-sec wq-wrap"
    >
      <div className="wq-sec-head">
        <div>
          <p className="wq-eyebrow">{t.home.insightsEyebrow}</p>
          <h2 className="wq-h2-lg">{t.home.insightsTitle}</h2>
        </div>
        <ArrowLink href={localeHref("/insights", locale)}>
          {t.actions.allInsights}
        </ArrowLink>
      </div>
      <div className="wq-grid3">
        {posts(t).map((p) => (
          <Link
            key={p.slug}
            href={localeHref(`/insights/${p.slug}`, locale)}
            className="wq-post"
          >
            <p className="wq-post-meta">{p.meta}</p>
            <h3>{p.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** The closing call to action. */
export async function CallToAction() {
  const t = await getDictionary();
  const locale: Locale = await getLocale();
  return (
    <section aria-label={t.aria.cta} className="wq-cta-band">
      <h2>{t.home.ctaTitle}</h2>
      <Link href={localeHref("/contact", locale)} className="wq-cta wq-cta-xl">
        {t.actions.startProject}
      </Link>
    </section>
  );
}
