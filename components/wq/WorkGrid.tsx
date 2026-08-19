"use client";

/* eslint-disable @next/next/no-img-element --
   The plates are local static SVGs. next/image refuses SVG unless the project
   turns on `dangerouslyAllowSVG`, which would let any future remote SVG render
   as markup — too much surface to open for placeholder art. */

import Link from "next/link";
import { useMemo, useState } from "react";
import { TagFilter } from "@/components/wq/TagFilter";

/**
 * The work index: a filter bar over a grid whose first tile is the feature.
 *
 * Two devices from the two references, doing different jobs. The feature tile
 * is the way in for someone browsing — it is twice the width and reads as an
 * invitation. The filter is the way through for someone comparing, because a
 * portfolio is searched by discipline more often than it is read top to bottom.
 *
 * The ring lives on the home page and deliberately does not repeat here: the
 * home page is being persuaded, this page is being read.
 */

export type WorkCard = {
  slug: string;
  name: string;
  tags: string[];
  href: string;
  image: string;
};

export function WorkGrid({
  items,
  allLabel,
  filterLabel,
  emptyLabel,
  viewLabel,
}: {
  items: WorkCard[];
  allLabel: string;
  filterLabel: string;
  emptyLabel: string;
  /** The word the cursor carries over a tile. */
  viewLabel: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const tags = useMemo(() => [...new Set(items.flatMap((i) => i.tags))], [items]);
  const shown = active ? items.filter((i) => i.tags.includes(active)) : items;

  return (
    <>
      <TagFilter
        tags={tags}
        active={active}
        onSelect={setActive}
        allLabel={allLabel}
        label={filterLabel}
      />

      {/* Keyed on the filter so the tiles remount and re-run their entrance
          rather than silently swapping under a static grid. */}
      <div className="wq-work-grid" key={active ?? "all"} data-reveal-group="">
        {shown.map((item, i) => (
          <Link
            key={item.slug}
            href={item.href}
            className="wq-work-card"
            data-cursor-label={viewLabel}
            /* Only the first tile of the unfiltered view is the feature. Under
               a filter every tile is equally the answer to the question the
               visitor just asked. */
            data-feature={!active && i === 0 ? "" : undefined}
            data-tilt=""
          >
            <div data-tilt-inner="">
              <div className="wq-work-plate" aria-hidden="true">
                {/* The picture drifts inside its frame rather than the frame
                    drifting on the page, so the grid stays where it is. The
                    plate crops the slack the drift needs. */}
                <img
                  src={item.image}
                  alt=""
                  loading="lazy"
                  data-parallax=""
                  /* Far under the reference's default eighth: theirs drifts a
                     whole element down the page, this one drifts a picture
                     inside a fixed frame, and the travel has to stay inside
                     the crop or the frame shows an edge. */
                  data-parallax-strength="0.03"
                />
              </div>
              <div className="wq-work-row">
                <h3>{item.name}</h3>
                <span className="wq-arrow" aria-hidden="true">
                  →
                </span>
              </div>
              <ul className="wq-chips">
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>

      {shown.length === 0 ? <p className="wq-lede wq-empty">{emptyLabel}</p> : null}
    </>
  );
}
