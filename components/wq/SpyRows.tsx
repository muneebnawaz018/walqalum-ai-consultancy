"use client";

import { useEffect, useRef, useState } from "react";

type Row = {
  num: string;
  name: string;
  desc: string;
  /** Optional one-line summary, set in the mono face above the paragraph. */
  blurb?: string;
  slug?: string;
};

/**
 * A numbered list beside a sticky index that tracks it.
 *
 * The big number in the left column follows whichever row is nearest the middle
 * of the viewport, and the rows that are not current sit back at a third
 * opacity. It is the home page's Capabilities device, generalised so the inner
 * pages get the same behaviour rather than a second implementation of it.
 *
 * The design polled this on a timer. An IntersectionObserver decides when the
 * list is on screen at all, and only then does the scroll handler run — the
 * measurement itself has to happen on scroll, because "nearest the middle" is a
 * question about position, not visibility.
 */
export function SpyRows({
  rows,
  label,
  note,
}: {
  rows: Row[];
  /** Optional: omitted where the section already carries a heading of its own,
      so the sticky column is just the running number. */
  label?: string;
  note?: string;
}) {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const pick = () => {
      const middle = window.innerHeight / 2;
      let best = -1;
      let bestDist = Infinity;
      items.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const d = Math.abs(r.top + r.height / 2 - middle);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      if (best !== -1) setActive(best);
    };

    let listening = false;
    const attach = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", pick, { passive: true });
      window.addEventListener("resize", pick, { passive: true });
    };
    const detach = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", pick);
      window.removeEventListener("resize", pick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          attach();
          pick();
        } else {
          detach();
        }
      },
      { rootMargin: "0px" },
    );
    const first = items.current[0];
    const last = items.current[items.current.length - 1];
    if (first) io.observe(first);
    if (last) io.observe(last);
    pick();

    return () => {
      io.disconnect();
      detach();
    };
  }, []);

  return (
    <section className="wq-wrap wq-sec-b">
      <div className="wq-grid2 wq-grid2-wide wq-grid2-start">
        <div className="wq-sticky-col">
          {label ? <p className="wq-eyebrow">{label}</p> : null}
          <div className="wq-bignum" aria-hidden="true">
            {String(active + 1).padStart(2, "0")}
            <span>.</span>
          </div>
          {note ? <p className="wq-side-note">{note}</p> : null}
        </div>
        <div>
          {rows.map((row, i) => (
            <div
              key={row.num}
              id={row.slug}
              ref={(el) => {
                items.current[i] = el;
              }}
              className="wq-cap"
              data-on={i === active ? "" : undefined}
            >
              <span className="wq-cap-num">{row.num}</span>
              <div>
                <h3>{row.name}</h3>
                {row.blurb ? <p className="wq-cap-blurb">{row.blurb}</p> : null}
                <p>{row.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
