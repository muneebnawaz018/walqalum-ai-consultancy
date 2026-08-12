"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/wq-content";

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
export function Stats() {
  const band = useRef<HTMLElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = band.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="stats" aria-label="Stats" ref={band} className="wq-stats">
      <div className="wq-grid4 wq-wrap-inner">
        {STATS.map((s) => (
          <div key={s.label} className="wq-stat">
            <div className="wq-stat-num">
              <Counter to={s.n} suffix={s.suffix} run={run} />
            </div>
            <p className="wq-stat-label">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Counter({ to, suffix, run }: { to: number; suffix: string; run: boolean }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
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

  return (
    <>
      <span aria-hidden="true">
        {n}
        {suffix}
      </span>
      <span className="wq-sr">
        {to}
        {suffix}
      </span>
    </>
  );
}
