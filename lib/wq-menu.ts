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
 */

import { ABOUT, INDUSTRIES } from "@/lib/wq-pages";
import { CONTACT } from "@/lib/wq-pages";
import { POSTS, WORK } from "@/lib/wq-content";

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

/** Short-form sector blurbs. The full sentence lives on the page itself. */
const SECTOR_BLURB: Record<string, string> = {
  healthcare: "Documentation and triage, with sign-off.",
  finance: "Reconciliation and review, fully traceable.",
  "real-estate": "Listings, valuation and tenant comms.",
  retail: "Catalogue, demand signals and support.",
  education: "Assessment and student-facing assistants.",
  manufacturing: "Inspection, maintenance and reporting.",
  fintech: "Onboarding, KYC and fraud signals.",
  legal: "Contract review, discovery and precedent.",
};

const sector = (slug: string): MegaItem => {
  const row = INDUSTRIES.find((i) => i.slug === slug);
  return {
    name: row ? row.name : slug,
    desc: SECTOR_BLURB[slug] ?? "",
    href: `/industries#${slug}`,
  };
};

/**
 * Industries replaces the design's Services tab, per the brief. Work carries
 * the portfolio. Order is the design's own.
 */
export const NAV: NavItem[] = [
  {
    href: "/",
    label: "Home",
    mega: [
      {
        label: "THE ARGUMENT",
        items: [
          {
            name: "Position",
            desc: "Why AI pilots stall, and what closes the gap.",
            href: "/#position",
          },
          {
            name: "Capabilities",
            desc: "Six disciplines, one team.",
            href: "/#capabilities",
          },
          {
            name: "Process",
            desc: "Discover, prototype, ship, scale.",
            href: "/#process",
          },
        ],
      },
      {
        label: "THE EVIDENCE",
        items: [
          {
            name: "Selected work",
            desc: "Systems running in production.",
            href: "/#work",
          },
          {
            name: "By the numbers",
            desc: "Fifteen years, thirty engineers, three countries.",
            href: "/#stats",
          },
          {
            name: "Insights",
            desc: "Notes from the last build.",
            href: "/#insights",
          },
        ],
      },
    ],
  },
  {
    href: "/about",
    label: "About",
    mega: [
      {
        label: "THE FIRM",
        items: [
          {
            name: "Position",
            desc: "Strategy and delivery from one accountable team.",
            href: "/about#position",
          },
          {
            name: "By the numbers",
            desc: "What fifteen years actually adds up to.",
            href: "/about#stats",
          },
          {
            name: "Offices",
            desc: "Sharjah, Lahore and Dubbo.",
            href: "/about#offices",
          },
        ],
      },
      {
        label: "WORKING TOGETHER",
        items: [
          {
            name: "How we work",
            desc: "The four stages of an engagement.",
            href: "/#process",
          },
          {
            name: "Selected work",
            desc: "What we have shipped and still run.",
            href: "/work",
          },
          {
            name: "Start a project",
            desc: "Tell us what has stalled.",
            href: "/contact",
          },
        ],
      },
    ],
  },
  {
    href: "/industries",
    label: "Industries",
    mega: [
      {
        label: "REGULATED",
        items: [
          sector("healthcare"),
          sector("finance"),
          sector("fintech"),
          sector("legal"),
        ],
      },
      {
        label: "OPERATIONS",
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
    label: "Work",
    mega: [
      {
        label: "SELECTED WORK",
        items: WORK.map((w) => ({
          name: w.name,
          desc: w.tags,
          href: `/work/${w.slug}`,
        })),
      },
      {
        label: "HOW IT GETS BUILT",
        items: [
          {
            name: "Capabilities",
            desc: "The six disciplines behind every project.",
            href: "/#capabilities",
          },
          {
            name: "Process",
            desc: "From audit to handover.",
            href: "/#process",
          },
          {
            name: "All work",
            desc: "Everything we are able to show.",
            href: "/work",
          },
        ],
      },
    ],
  },
  {
    href: "/insights",
    label: "Insights",
    mega: [
      {
        label: "LATEST",
        items: POSTS.map((p) => ({
          name: p.title,
          desc: p.meta,
          href: `/insights/${p.slug}`,
        })),
      },
    ],
  },
  {
    href: "/contact",
    label: "Contact",
    mega: [
      {
        label: "TALK TO US",
        items: [
          {
            name: "Start a project",
            desc: "Scope, timeline and whether we are the right team.",
            href: "/contact",
          },
          {
            name: CONTACT.email,
            desc: "Straight to the people who answer.",
            href: `mailto:${CONTACT.email}`,
            external: true,
          },
        ],
      },
      {
        label: "OFFICES",
        items: ABOUT.offices.map((o) => ({
          name: `${o.city}, ${o.country}`,
          desc: o.tel,
          href: `tel:${o.tel.replace(/\s/g, "")}`,
          external: true,
        })),
      },
    ],
  },
];
