/**
 * The header's navigation and its hover panels.
 *
 * The design gave a mega panel to Services alone. The brief here is to give one
 * to every tab, so each panel is built from content that already exists on the
 * page it belongs to — every entry lands on a real section, not a placeholder.
 * That is the whole point of the panel: it is a shortcut, so a dead link or a
 * link that only repeats the tab itself would make it worse than no panel.
 *
 * Descriptions are deliberately short. At 13px in a two-column grid a full
 * sentence wraps to three lines and the panel stops being scannable.
 *
 * Built per request rather than exported as a constant, because every label in
 * it is now a translated string. The hrefs are locale-free — `LocaleLink` adds
 * the prefix — so this shape is identical in both languages and only the words
 * differ.
 */

import type { Dictionary } from "@/lib/dictionaries/en";
import { EMAIL, offices, telHref } from "@/lib/wq-pages";
import { posts, work } from "@/lib/wq-content";

export type MegaItem = {
  name: string;
  desc: string;
  href: string;
  /** Set for mailto/tel, which Next's Link should not intercept. */
  external?: boolean;
};

export type MegaGroup = { label: string; items: MegaItem[] };

export type NavItem = {
  href: string;
  label: string;
  /** The panel shown on hover or focus. Every tab has one. */
  mega: MegaGroup[];
};

export function buildNav(t: Dictionary): NavItem[] {
  const item = (key: keyof Dictionary["menu"]["items"], href: string): MegaItem => ({
    name: t.menu.items[key].name,
    desc: t.menu.items[key].desc,
    href,
  });

  /* The short blurb, not the page's full sentence — see the note above. */
  const sector = (slug: keyof Dictionary["sectors"]): MegaItem => ({
    name: t.sectors[slug].name,
    desc: t.sectors[slug].blurb,
    href: `/industries#${slug}`,
  });

  return [
    {
      href: "/",
      label: t.nav.home,
      mega: [
        {
          label: t.menu.groups.theArgument,
          items: [
            item("homePosition", "/#position"),
            item("homeCapabilities", "/#capabilities"),
            item("homeProcess", "/#process"),
          ],
        },
        {
          label: t.menu.groups.theEvidence,
          items: [
            item("homeWork", "/#work"),
            item("homeStats", "/#stats"),
            item("homeInsights", "/#insights"),
          ],
        },
      ],
    },
    {
      href: "/about",
      label: t.nav.about,
      mega: [
        {
          label: t.menu.groups.theFirm,
          items: [
            item("aboutPosition", "/about#position"),
            item("aboutStats", "/about#stats"),
            item("aboutOffices", "/about#offices"),
          ],
        },
        {
          label: t.menu.groups.workingTogether,
          items: [
            item("aboutProcess", "/#process"),
            item("aboutWork", "/work"),
            item("aboutContact", "/contact"),
          ],
        },
      ],
    },
    {
      href: "/industries",
      label: t.nav.industries,
      mega: [
        {
          label: t.menu.groups.regulated,
          items: [
            sector("healthcare"),
            sector("finance"),
            sector("fintech"),
            sector("legal"),
          ],
        },
        {
          label: t.menu.groups.operations,
          items: [
            sector("real-estate"),
            sector("retail"),
            sector("education"),
            sector("manufacturing"),
          ],
        },
      ],
    },
    {
      href: "/work",
      label: t.nav.work,
      mega: [
        {
          label: t.menu.groups.selectedWork,
          items: work(t).map((w) => ({
            name: w.name,
            desc: w.tags,
            href: `/work/${w.slug}`,
          })),
        },
        {
          label: t.menu.groups.howItGetsBuilt,
          items: [
            item("workCapabilities", "/#capabilities"),
            item("workProcess", "/#process"),
            item("workAll", "/work"),
          ],
        },
      ],
    },
    {
      href: "/insights",
      label: t.nav.insights,
      mega: [
        {
          label: t.menu.groups.latest,
          items: posts(t).map((p) => ({
            name: p.title,
            desc: p.meta,
            href: `/insights/${p.slug}`,
          })),
        },
      ],
    },
    {
      href: "/contact",
      label: t.nav.contact,
      mega: [
        {
          label: t.menu.groups.talkToUs,
          items: [
            item("contactStart", "/contact"),
            {
              /* The address is data, so it is the one entry whose name is not a
                 dictionary lookup. */
              name: EMAIL,
              desc: t.menu.emailDesc,
              href: `mailto:${EMAIL}`,
              external: true,
            },
          ],
        },
        {
          label: t.menu.groups.offices,
          items: offices(t).map((o) => ({
            name: `${o.city}, ${o.country}`,
            desc: o.tel,
            href: telHref(o.tel),
            external: true,
          })),
        },
      ],
    },
  ];
}
