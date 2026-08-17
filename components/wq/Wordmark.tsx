"use client";

import { useEffect, useRef } from "react";

const LETTERS = [..."WALQALUM"];

/** The design measures at this size, then scales the result. */
const MEASURE_PX = 300;
/** How far past the container width the wordmark is allowed to bleed. */
const OVERSHOOT = 1.1;
/** Visible height as a fraction of the font size — the design crops the descender space. */
const CROP = 0.62;
/** Per-letter stagger. */
const STEP_MS = 55;
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * The oversized WALQALUM that closes the page.
 *
 * It is sized in script rather than with `vw` units because the design fits it
 * to the *container*, not the viewport — with a scrollbar or a max-width in
 * play those two differ, and a `vw` value overflows by exactly the scrollbar's
 * width. The letters are measured once at a known size and the result scaled,
 * which is one reflow instead of a loop that guesses.
 *
 * Decorative, and marked so: the site's name is already in the footer above it
 * and in the header, so a screen reader announcing it a third time is noise.
 */
export function Wordmark() {
  const frame = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);

  /* --- sizing --- */
  useEffect(() => {
    const box = frame.current;
    const row = inner.current;
    if (!box || !row) return;

    /* Only the width matters, and `fit` writes the height — without this the
       observer below would re-enter on its own write. */
    let lastWidth = -1;

    const fit = (force = false) => {
      const target = box.getBoundingClientRect().width || window.innerWidth;
      if (!force && target === lastWidth) return;
      lastWidth = target;

      row.style.fontSize = `${MEASURE_PX}px`;
      const natural = row.scrollWidth;
      /* Zero while the webfont is still loading. Bail rather than divide by it
         and paint a wordmark the height of the document. */
      if (!natural) return;
      const size = (MEASURE_PX * (target * OVERSHOOT)) / natural;
      row.style.fontSize = `${size}px`;
      box.style.height = `${size * CROP}px`;
    };

    fit(true);

    /* Inter Tight is a webfont: the first fit runs against the fallback metrics
       and would leave the wordmark visibly the wrong size once the real face
       arrives. Re-fit when it does — forced, because the width has not changed
       but the letters' own measurements have. */
    document.fonts?.ready.then(() => fit(true)).catch(() => {});

    /* ResizeObserver rather than a window resize listener, because the box also
       changes width when a scrollbar appears, which `resize` does not fire for. */
    const ro = new ResizeObserver(() => fit());
    ro.observe(box);
    return () => ro.disconnect();
  }, []);

  /* --- reveal ---
     The flag is written straight to the DOM rather than held in state. It is
     read by nothing but CSS, it never turns back off, and routing it through a
     render would only mean re-rendering eight spans to set one attribute. */
  useEffect(() => {
    const box = frame.current;
    if (!box) return;
    const show = () => {
      box.dataset.shown = "";
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={frame} className="wq-wm" aria-hidden="true">
      <div ref={inner} className="wq-wm-row">
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="wq-wm-letter"
            /* Stagger as an inline delay: eight letters, and a CSS rule per
               index would be eight rules that mean one thing. */
            style={{ transitionDelay: `${i * STEP_MS}ms`, transitionTimingFunction: EASE }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
