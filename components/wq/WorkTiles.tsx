import Image from "next/image";
import Link from "next/link";
import type { WorkCard } from "@/components/wq/WorkGrid";

/**
 * The work grid without the filter.
 *
 * `WorkGrid` owns the /work index: it holds filter state, so it is a client
 * component, and its first tile is a feature. An industry page is already a
 * filtered view — the sector *is* the filter — so it needs neither, and there
 * is no reason to ship the filter's JavaScript to a page that cannot use it.
 *
 * The tile markup is deliberately the same as the index's, down to the class
 * names: a project should not look like a different kind of thing depending on
 * which page found it.
 */
export function WorkTiles({
  items,
  viewLabel,
}: {
  items: WorkCard[];
  /** The word the cursor carries over a tile. */
  viewLabel: string;
}) {
  return (
    <div className="wq-work-grid" data-reveal-group="">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={item.href}
          className="wq-work-card"
          data-cursor-label={viewLabel}
          data-tilt=""
        >
          <div data-tilt-inner="">
            <div className="wq-work-plate" aria-hidden="true">
              <div
                className="wq-work-plate-inner"
                data-parallax=""
                data-parallax-strength="0.03"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
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
  );
}
