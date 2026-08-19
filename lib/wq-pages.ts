/**
 * The inner pages' *structure*.
 *
 * Same split as `wq-content.ts`: order, slugs and contact details live here,
 * prose lives in `lib/dictionaries/*.json`.
 *
 * Phone numbers and the email address are deliberately code, not dictionary.
 * They are the same in every language, and a translator editing a JSON file
 * should not be able to change the number the firm answers on.
 */

import type { Dictionary } from "@/lib/dictionaries/en";
import { plate } from "@/lib/wq-content";

const pad = (n: number) => String(n).padStart(2, "0");

/** Where to write. The design's own address. */
export const EMAIL = "tafseel@walqalum.com";

export type Sector = {
  num: string;
  slug: SectorSlug;
  name: string;
  desc: string;
  /** The one-line version, set as a kicker above the paragraph. */
  blurb: string;
  /** Stand-in photography, from the same set the work uses. */
  image: string;
};

/** The eight sectors, in the existing site's own order. Slugs are anchor ids. */
export const SECTOR_SLUGS = [
  "healthcare",
  "finance",
  "real-estate",
  "retail",
  "education",
  "manufacturing",
  "fintech",
  "legal",
] as const;

export type SectorSlug = (typeof SECTOR_SLUGS)[number];

export function industries(t: Dictionary): Sector[] {
  return SECTOR_SLUGS.map((slug, i) => ({
    num: pad(i + 1),
    slug,
    name: t.sectors[slug].name,
    desc: t.sectors[slug].desc,
    blurb: t.sectors[slug].blurb,
    /* Offset so a sector and the first project under it never land on the
       same picture — the two sit on the same page. */
    image: plate(i + 3),
  }));
}

export type PositionRow = { num: string; name: string; desc: string };

export const POSITION_IDS = ["accountable", "earnsPlace", "outlive"] as const;

export function positions(t: Dictionary): PositionRow[] {
  return POSITION_IDS.map((id, i) => ({
    num: pad(i + 1),
    name: t.position[id].name,
    desc: t.position[id].desc,
  }));
}

export type Office = {
  id: string;
  city: string;
  country: string;
  /** The footer's longer form: district and country on one line. */
  locality: string;
  tel: string;
};

export const OFFICE_IDS = ["sharjah", "lahore", "dubbo"] as const;

const OFFICE_TEL: Record<(typeof OFFICE_IDS)[number], string> = {
  sharjah: "+971 54 744 8002",
  lahore: "+92 322 4696562",
  dubbo: "+61 470 669 147",
};

export function offices(t: Dictionary): Office[] {
  return OFFICE_IDS.map((id) => ({
    id,
    city: t.offices[id].city,
    country: t.offices[id].country,
    locality: t.offices[id].locality,
    tel: OFFICE_TEL[id],
  }));
}

/** A `tel:` href needs the number without its display spacing. */
export const telHref = (tel: string) => `tel:${tel.replace(/\s/g, "")}`;
