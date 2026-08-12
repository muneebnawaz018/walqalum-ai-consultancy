"use client";

import { useEffect, useRef, useState } from "react";
import { CAPABILITIES } from "@/lib/wq-content";

/**
 * 02 / Capabilities.
 *
 * A sticky left column whose big number tracks whichever item is nearest the
 * middle of the viewport, with the others dimmed. The design polled this on a
 * timer; an IntersectionObserver does the same job without running when the
 * section is off screen.
 */
export function Capabilities() {
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

    /* Only listen to scroll while the section is actually on screen. */
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

    const first = items.current[0];
    const last = items.current[items.current.length - 1];
    const io = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        if (anyVisible) {
          attach();
          pick();
        } else {
          detach();
        }
      },
      { rootMargin: "0px 0px 0px 0px" },
    );
    if (first) io.observe(first);
    if (last) io.observe(last);
    pick();

    return () => {
      io.disconnect();
      detach();
    };
  }, []);

  return (
    <section id="capabilities" aria-label="Capabilities" className="wq-wrap wq-sec-b">
      <div className="wq-grid2 wq-grid2-start">
        <div className="wq-sticky-col">
          <p className="wq-eyebrow">02 / Capabilities</p>
          <div className="wq-bignum">
            {String(active + 1).padStart(2, "0")}
            <span>.</span>
          </div>
          <p className="wq-side-note">
            Six disciplines, one team. Every engagement draws on all of them.
          </p>
        </div>
        <div>
          {CAPABILITIES.map((cap, i) => (
            <div
              key={cap.num}
              ref={(el) => {
                items.current[i] = el;
              }}
              className="wq-cap"
              data-on={i === active ? "" : undefined}
            >
              <span className="wq-cap-num">{cap.num}</span>
              <div>
                <h3>{cap.name}</h3>
                <p>{cap.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
