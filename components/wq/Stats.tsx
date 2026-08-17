"use client";

import { useEffect, useRef, useState } from "react";
import type { Stat } from "@/lib/wq-content";
import { useReducedMotion } from "@/lib/wq-motion";

const DURATION_MS = 1400;

/**
 * 05 / Stats.
 *
 * Four figures that count up once, the first time the band comes into view.
 * They count once rather than on every pass: a number that re-rolls each time
 * you scroll past reads as a gimmick rather than a fact.
 *
 * The real figure is always in the DOM for assistive tech and for anyone with
 * JavaScript off — the animation only replaces what is painted.
 */
export function Stats({ rows, aria }: { rows: Stat[]; aria: string }) {
  const band = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  /* Set from the observer's callback, which is a genuine external event —
     unlike writing it straight into the effect body. */
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = band.current;
    if (!el) return;
    /* With motion reduced the figures are shown at their final value from the
       first paint, so there is no arrival worth watching for. */
    if (reduced) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section id="stats" aria-label={aria} ref={band} className="wq-stats">
      <div className="wq-grid4 wq-wrap-inner">
        {rows.map((s) => (
          <div key={s.label} className="wq-stat">
            <div className="wq-stat-num">
              <Counter to={s.n} suffix={s.suffix} run={seen} reduced={reduced} />
            </div>
            <p className="wq-stat-label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Counter({
  to,
  suffix,
  run,
  reduced,
}: {
  to: number;
  suffix: string;
  run: boolean;
  reduced: boolean;
}) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const p = Math.min(1, (t - start) / DURATION_MS);
      /* Ease out: fast at first, settling onto the figure rather than stopping
         dead on it. */
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);

  /* Derived rather than written: with motion reduced the painted figure simply
     *is* the real figure, so no effect has to put it there. */
  const shown = reduced ? to : n;

  return (
    <>
      <span aria-hidden="true">
        {shown}
        {suffix}
      </span>
      <span className="wq-sr">
        {to}
        {suffix}
      </span>
    </>
  );
}
