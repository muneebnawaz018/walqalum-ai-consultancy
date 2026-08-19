import Image from "next/image";
import Link from "next/link";
import { localeHref, type Locale } from "@/lib/i18n";
import { plate, type WorkItem } from "@/lib/wq-content";

/**
 * The projects ring.
 *
 * Ten tiles on a slow circle, each one a link to its project. The geometry and
 * the timing are taken from the reference's own runtime rather than guessed:
 * ten evenly spaced positions starting at the top, a radius of 2.1 times the
 * tile, each tile turned to its own angle, and one full revolution every three
 * minutes — slow enough to read as drift rather than as a carousel.
 *
 * The reference computes each position in JavaScript and writes the transform
 * per tile. Here it is a single CSS transform — `rotate(a) translateY(-r)`
 * lands a tile at the same point and leaves it turned by the same angle, which
 * is exactly the pair of values the reference calculates. That means the ring
 * is laid out and turning before any script runs, and it costs no main-thread
 * work while it spins.
 *
 * Ten tiles from however many projects exist, cycling if there are fewer — the
 * reference does the same. The circle needs ten to look like a circle.
 *
 * The projects arrive as a prop rather than being read here: the caller has the
 * dictionary already, and the names on the tiles are translated copy.
 */

const COUNT = 10;

export function WorkRing({ items, locale }: { items: WorkItem[]; locale: Locale }) {
  /* Ten tiles from however many projects exist. The plate cycles on its own
     index rather than the project's, so two tiles of the same project do not
     land on the same picture and read as a duplicate. */
  const tiles = Array.from({ length: COUNT }, (_, i) => ({
    ...items[i % items.length],
    image: plate(i),
  }));

  return (
    <div className="wq-ring-stage">
      {/* The element that turns. Zero-sized, so its children position from the
          centre of the circle and nothing about the layout depends on it. */}
      {/* Hidden from assistive technology and taken out of the tab order: every
          tile repeats a link from the grid below, and ten duplicates of three
          projects is noise to anyone reading the page linearly. The grid is the
          accessible path to the same places. */}
      <div className="wq-ring" data-spin-in-view="" aria-hidden="true">
        {tiles.map((item, i) => (
          <Link
            key={i}
            href={localeHref(`/work/${item.slug}`, locale)}
            className="wq-ring-tile"
            tabIndex={-1}
            style={{ "--a": `${(i / COUNT) * 360}deg` } as React.CSSProperties}
          >
            <Image
              src={item.image}
              alt=""
              fill
              /* The tile steps 140 → 170 → 200px at its breakpoints. */
              sizes="200px"
              className="wq-ring-img"
              style={{ objectFit: "cover" }}
            />
            {/* Counter-turned so the caption reads level while the tile sits at
                its angle. The tile itself stays turned, as the reference has
                it — that tilt is most of the effect. */}
            <span className="wq-ring-label">
              <span className="wq-ring-name">{item.name}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
