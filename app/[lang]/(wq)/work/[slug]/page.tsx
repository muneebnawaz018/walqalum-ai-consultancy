import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FillText } from "@/components/wq/FillText";
import { Chips, EndCta, NextItems, PageHead } from "@/components/wq/Page";
import { getDictionary, getLocale } from "@/lib/dictionaries";
import { localeHref } from "@/lib/i18n";
import { WORK_SLUGS, work } from "@/lib/wq-content";

export function generateStaticParams() {
  return WORK_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = await getDictionary();
  const item = work(t).find((w) => w.slug === slug);
  return item
    ? { title: `${item.name} · WalQalum`, description: t.work.lede }
    : {};
}

/**
 * A case study.
 *
 * The write-ups are not published yet, so this is the case *frame* rather than
 * a case: the disciplines the project drew on, the plate, and a plain statement
 * of why the outcome is not here. Inventing results under a client's name is
 * the one thing this page must never do, and a page that says so reads better
 * than a page padded to look finished.
 *
 * The other projects sit below it. Someone who has read this far is the
 * likeliest person on the site to read a second one, and the one link that
 * cannot help them is the page they are already on.
 */
export default async function CaseStudy({ params }: PageProps<"/[lang]/work/[slug]">) {
  const { slug } = await params;
  const t = await getDictionary();
  const locale = await getLocale();
  const all = work(t);
  const item = all.find((w) => w.slug === slug);
  if (!item) notFound();

  const index = all.indexOf(item);
  const others = all
    .filter((w) => w.slug !== slug)
    .map((w) => ({
      href: localeHref(`/work/${w.slug}`, locale),
      name: w.name,
      meta: w.tags.join(" · "),
    }));

  return (
    <>
      <PageHead eyebrow={item.tags.join(" · ")} title={item.name} />

      <section className="wq-wrap wq-sec-b">
        <div
          className="wq-card-media wq-case-media"
          aria-hidden="true"
          data-parallax-scale=""
        >
          <Image
            src={`/wq/plates/0${(index % 6) + 1}.jpg`}
            alt=""
            fill
            sizes="(max-width: 1100px) 100vw, 1100px"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
      </section>

      <section className="wq-wrap wq-sec-b">
        <div className="wq-grid2 wq-grid2-wide wq-grid2-start">
          <div className="wq-side">
            <p className="wq-eyebrow" data-reveal="">
              {t.work.caseTagsLabel}
            </p>
            <div className="wq-tick" aria-hidden="true" />
            <Chips items={item.tags} />
          </div>
          <FillText className="wq-statement">
            {t.work.casePendingLead} <em>{t.work.casePendingEm}</em>{" "}
            {t.work.casePendingTail}
          </FillText>
        </div>
      </section>

      <NextItems label={t.work.moreLabel} items={others} />

      <EndCta title={t.work.ctaTitle} />
    </>
  );
}
