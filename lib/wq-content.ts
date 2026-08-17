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

export type Capability = { num: string; name: string; desc: string };

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

export type WorkItem = { slug: string; name: string; tags: string };

/** Slugs are URLs, so they stay in English in both locales. */
export const WORK_SLUGS = ["audit-platform", "securance", "epictory"] as const;

export function work(t: Dictionary): WorkItem[] {
  return WORK_SLUGS.map((slug) => ({
    slug,
    name: t.works[slug].name,
    tags: t.works[slug].tags,
  }));
}

export type Post = { slug: string; meta: string; title: string };

export const POST_SLUGS = [
  "rag-security-review",
  "agent-evals",
  "boring-model",
] as const;

export function posts(t: Dictionary): Post[] {
  return POST_SLUGS.map((slug) => ({
    slug,
    meta: t.posts[slug].meta,
    title: t.posts[slug].title,
  }));
}
