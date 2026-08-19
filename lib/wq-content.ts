/**
 * The home page's *structure*.
 *
 * What is left here after localisation is everything that is not a word: the
 * order things appear in, the slugs that form URLs, and the figures the counter
 * animates. All prose lives in `lib/dictionaries/*.json` and arrives through the
 * builder functions below.
 *
 * Lists are keyed by a stable id rather than being arrays of translated objects.
 * That is what makes the type check bite: an array of six capabilities and an
 * array of five both satisfy `{name,desc}[]`, but a record missing the `cloud`
 * key does not satisfy the English record's type. Order lives here, in code,
 * because it is layout — not something a translator should be able to change by
 * moving lines around in a JSON file.
 */

import type { Dictionary } from "@/lib/dictionaries/en";
import type { SectorSlug } from "@/lib/wq-pages";

/** "01", "02", … — the design's numbering, derived from position, never stored. */
const pad = (n: number) => String(n).padStart(2, "0");

/** Client names for the marquee. Proper nouns: the same in every language. */
export const CLIENTS = [
  "Tutors",
  "Securance",
  "Shumaila",
  "Epictory",
  "Bremod",
  "Misk",
] as const;

export type Capability = { num: string; name: string; desc: string; bullets: string[] };

/** Display order. The number beside each one is its position, not a stored value. */
export const CAPABILITY_IDS = [
  "agents",
  "rag",
  "ml",
  "data",
  "software",
  "cloud",
] as const;

export function capabilities(t: Dictionary): Capability[] {
  return CAPABILITY_IDS.map((id, i) => ({
    num: pad(i + 1),
    name: t.capabilities[id].name,
    desc: t.capabilities[id].desc,
    bullets: t.capabilities[id].bullets,
  }));
}

export type Step = { num: string; name: string; desc: string };

export const STEP_IDS = ["discover", "prototype", "ship", "scale"] as const;

export function steps(t: Dictionary): Step[] {
  return STEP_IDS.map((id, i) => ({
    /* "STEP 01" is a translated word plus a derived number, not one string —
       otherwise the word "STEP" would be retyped four times per language. */
    num: `${t.home.stepLabel} ${pad(i + 1)}`,
    name: t.steps[id].name,
    desc: t.steps[id].desc,
  }));
}

export type Stat = { n: number; suffix: string; label: string };

/** The figures are data, not copy — they do not change with the language. */
const STAT_FIGURES = [
  { id: "years", n: 15, suffix: "" },
  { id: "engineers", n: 30, suffix: "+" },
  { id: "countries", n: 3, suffix: "" },
  { id: "projects", n: 120, suffix: "+" },
] as const;

export function stats(t: Dictionary): Stat[] {
  return STAT_FIGURES.map((s) => ({
    n: s.n,
    suffix: s.suffix,
    label: t.stats[s.id],
  }));
}

export type WorkItem = {
  slug: WorkSlug;
  name: string;
  tags: string[];
  /** The sectors this project was built for — how `/industries/[slug]` finds it. */
  sectors: readonly SectorSlug[];
  /** Stand-in photography. See `public/wq/plates` and the README. */
  image: string;
};

/** Slugs are URLs, so they stay in English in both locales. */
export const WORK_SLUGS = [
  "audit-platform",
  "securance",
  "epictory",
  "clinical-notes",
  "triage-router",
  "ledger-reconciler",
  "portfolio-valuation",
  "catalogue-enrichment",
  "marking-assistant",
  "line-inspection",
  "kyc-intake",
  "contract-review",
] as const;

export type WorkSlug = (typeof WORK_SLUGS)[number];

/**
 * Which sectors each project belongs to.
 *
 * Structure, not copy: an industry page is a filter over this map, so a
 * translator moving lines in a JSON file must not be able to change which
 * project appears under which sector. A project may belong to two — document
 * review is the same problem in a law firm and in a bank.
 */
const WORK_SECTORS: Record<WorkSlug, readonly SectorSlug[]> = {
  "audit-platform": ["retail", "real-estate"],
  securance: ["legal", "finance"],
  epictory: ["retail", "manufacturing"],
  "clinical-notes": ["healthcare"],
  "triage-router": ["healthcare"],
  "ledger-reconciler": ["finance"],
  "portfolio-valuation": ["real-estate", "finance"],
  "catalogue-enrichment": ["retail"],
  "marking-assistant": ["education"],
  "line-inspection": ["manufacturing"],
  "kyc-intake": ["fintech"],
  "contract-review": ["legal"],
};

/**
 * The stand-in picture for the nth item in any list.
 *
 * One function rather than the same modulo written at five call sites: the
 * plates are a fixed set, and every surface that shows one has to agree on
 * which one, or the same project carries two different pictures on two pages.
 */
export const PLATE_COUNT = 12;
export const plate = (i: number) =>
  `/wq/plates/${String((((i % PLATE_COUNT) + PLATE_COUNT) % PLATE_COUNT) + 1).padStart(2, "0")}.jpg`;

export function work(t: Dictionary): WorkItem[] {
  return WORK_SLUGS.map((slug, i) => ({
    slug,
    name: t.works[slug].name,
    tags: t.works[slug].tags,
    sectors: WORK_SECTORS[slug],
    image: plate(i),
  }));
}

/** Every tag used by the work, in the order the projects introduce them. */
export function workTags(t: Dictionary): string[] {
  return [...new Set(work(t).flatMap((w) => w.tags))];
}

/** The projects shown on an industry page. */
export function workInSector(t: Dictionary, sector: SectorSlug): WorkItem[] {
  return work(t).filter((w) => w.sectors.includes(sector));
}

export type Post = {
  slug: string;
  date: string;
  topic: string;
  title: string;
  /** Stand-in photography, offset off the work set so a project and an article
      linked from the same page never carry the same picture. */
  image: string;
};

export const POST_SLUGS = [
  "rag-security-review",
  "agent-evals",
  "boring-model",
] as const;

/** Every topic used by the posts, newest first, for the insights filter. */
export function postTopics(t: Dictionary): string[] {
  return [...new Set(posts(t).map((p) => p.topic))];
}

export function posts(t: Dictionary): Post[] {
  return POST_SLUGS.map((slug, i) => ({
    slug,
    image: plate(i + 8),
    date: t.posts[slug].date,
    topic: t.posts[slug].topic,
    title: t.posts[slug].title,
  }));
}
