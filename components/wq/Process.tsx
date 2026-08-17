"use client";

import { useEffect, useRef, useState } from "react";
import type { Step } from "@/lib/wq-content";

/**
 * 03 / How we work.
 *
 * A rule above the four steps that fills as the section crosses the viewport,
 * so the reader's progress through the process mirrors the process itself.
 */
export function Process({
  rows,
  eyebrow,
  title,
  aria,
}: {
  rows: Step[];
  eyebrow: string;
  title: string;
  aria: string;
}) {
  const section = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = section.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      if (!r.height) return;
      /* Starts filling once the section's top passes 80% of the viewport and
         completes as it leaves — the design's own easing window. */
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.8 - r.top) / (r.height + vh * 0.3)));
      setProgress(p);
    };

    let queued = false;
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        update();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    /* Web fonts land after first paint and change the section's height, so the
       bar has to be recomputed once they do or it sits at the wrong fill. */
    document.fonts?.ready.then(update).catch(() => {});

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="process" aria-label={aria} ref={section} className="wq-wrap wq-sec-b">
      <p className="wq-eyebrow">{eyebrow}</p>
      <h2 className="wq-h2-lg wq-process-h2">{title}</h2>
      <div className="wq-progress" aria-hidden="true">
        <div className="wq-progress-bar" style={{ transform: `scaleX(${progress})` }} />
      </div>
      <div className="wq-grid4">
        {rows.map((s) => (
          <div key={s.num}>
            <div className="wq-step-num">{s.num}</div>
            <h3 className="wq-step-name">{s.name}</h3>
            <p className="wq-step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
