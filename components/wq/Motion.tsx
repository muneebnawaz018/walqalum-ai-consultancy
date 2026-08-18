"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The motion layer.
 *
 * Every value here — the easing, the distances, the durations, the stagger, the
 * observer thresholds — is lifted from the design's own runtime rather than
 * invented, so the pages built on it move exactly like the home page does.
 *
 * Three effects, applied by attribute:
 *
 *   data-reveal        rise and fade in when scrolled to
 *   data-reveal-group  the same, staggered across the element's children
 *   data-lines         each [data-line] wipes up from behind its own edge
 *   data-tilt          a slight parallax tilt toward the pointer
 *
 * The starting states are set from script, not CSS, and that is deliberate: if
 * the JavaScript never runs, nothing was ever hidden, so the page reads
 * normally instead of being blank. It is also why this is safe to leave on
 * every page — with no attributes present it wires nothing.
 */

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

/** Marks an element as already wired, so a re-scan cannot double-bind it. */
const WIRED = "wqMotion";

export function Motion() {
  /* Client navigation swaps the tree without remounting the layout, so the
     scan has to run again per route or the new page arrives unwired. */
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cleanups: (() => void)[] = [];
    /* Everything this pass wired, so the markers can be lifted on teardown.
       Without that, React's development double-invoke leaves the page blank:
       the first pass hides the elements and schedules the reveal, the cleanup
       cancels those timers, and the second pass skips every element because it
       is already marked — so the opacity:0 it set is never undone. */
    const wired: HTMLElement[] = [];

    /* Already on screen at scan time — the observer would still fire, but this
       avoids a frame of hidden content on a page loaded mid-scroll. */
    const inView = (el: Element) => {
      const r = el.getBoundingClientRect();
      return r.bottom > -200 && r.top < window.innerHeight + 200;
    };

    /* ---- rise and fade ---- */
    const revealNow = (el: HTMLElement) => {
      const kids = el.hasAttribute("data-reveal-group")
        ? (Array.from(el.children) as HTMLElement[])
        : [el];
      kids.forEach((kid, i) => {
        const show = () => {
          kid.style.opacity = "1";
          kid.style.transform = kid.dataset.wqScale ? "scale(1)" : "translateY(0)";
        };
        if (reduced) show();
        else timers.push(setTimeout(show, i * 60));
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          revealNow(entry.target as HTMLElement);
        }
      },
      /* Fires a little before the element is fully in view, so the movement is
         finishing as it arrives rather than starting. */
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    /* ---- line wipe ---- */
    const revealLinesNow = (el: HTMLElement) => {
      el.querySelectorAll<HTMLElement>("[data-line]").forEach((line, i) => {
        const show = () => {
          line.style.transform = "translateY(0)";
          line.style.opacity = "1";
        };
        if (reduced) show();
        else timers.push(setTimeout(show, 90 + i * 110));
      });
    };

    const ioLines = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          ioLines.unobserve(entry.target);
          revealLinesNow(entry.target as HTMLElement);
        }
      },
      { threshold: 0.2 },
    );

    /* The reference fires its heading wipes at `top 80%` — a fifth of the way
       up from the bottom edge, well before the heading is centred. */
    const clipTargets = new Map<Element, () => void>();
    const ioClip = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          ioClip.unobserve(entry.target);
          clipTargets.get(entry.target)?.();
        }
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0 },
    );

    /* ---- wiring ---- */
    document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-group]").forEach((el) => {
      if (el.dataset[WIRED]) return;
      el.dataset[WIRED] = "1";
      wired.push(el);
      const kids = el.hasAttribute("data-reveal-group")
        ? (Array.from(el.children) as HTMLElement[])
        : [el];
      const scale = el.hasAttribute("data-reveal-scale");
      kids.forEach((kid) => {
        if (scale) kid.dataset.wqScale = "1";
        if (!reduced) {
          kid.style.opacity = "0";
          kid.style.transform = scale ? "scale(0.92)" : "translateY(20px)";
        }
        kid.style.transition = `opacity .6s ${EASE}, transform .6s ${EASE}`;
      });
      if (document.hidden || inView(el)) revealNow(el);
      else io.observe(el);
    });

    document.querySelectorAll<HTMLElement>("[data-lines]").forEach((el) => {
      if (el.dataset[WIRED]) return;
      el.dataset[WIRED] = "1";
      wired.push(el);
      el.querySelectorAll<HTMLElement>("[data-line]").forEach((line) => {
        const wrap = line.parentElement;
        if (wrap) {
          /* The mask the line slides out from behind. */
          wrap.style.overflow = "hidden";
          wrap.style.display = "block";
        }
        if (!reduced) {
          line.style.transform = "translateY(110%)";
          /* Not zero: a fully transparent line is dropped from the paint tree
             by some browsers, which costs the first frame of the transition. */
          line.style.opacity = "0.001";
        }
        line.style.display = "block";
        line.style.transition = `transform .7s ${EASE}, opacity .5s ${EASE}`;
        line.style.willChange = "transform";
      });
      if (document.hidden || inView(el)) revealLinesNow(el);
      else ioLines.observe(el);
    });

    /* ---- clipped heading wipe ----
       The reference's treatment for its oversized stacked headings: each line
       is revealed from its own top edge rather than sliding out from behind a
       mask. `power4.out` in GSAP is (1-x)^4, which is nearly all of its travel
       in the first third — the line arrives fast and eases a long way into
       place. Its cubic-bezier equivalent is below.

       Distinct from `data-lines`, which slides a whole line up from underneath.
       Both exist because the reference uses both. */
    const CLIP_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
    document.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
      if (el.dataset[WIRED]) return;
      el.dataset[WIRED] = "1";
      wired.push(el);
      const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-clip-line]"));
      lines.forEach((line) => {
        if (!reduced) {
          line.style.clipPath = "inset(0 0 100% 0)";
          line.style.transform = "translateY(20px)";
          line.style.opacity = "0";
        }
        line.style.transition = `clip-path 1.2s ${CLIP_EASE}, transform 1.2s ${CLIP_EASE}, opacity 1.2s ${CLIP_EASE}`;
      });
      const showClip = () =>
        lines.forEach((line, i) => {
          const show = () => {
            line.style.clipPath = "inset(0 0 0% 0)";
            line.style.transform = "translateY(0)";
            line.style.opacity = "1";
          };
          if (reduced) show();
          else timers.push(setTimeout(show, i * 200));
        });
      if (document.hidden || inView(el)) showClip();
      else {
        clipTargets.set(el, showClip);
        ioClip.observe(el);
      }
    });

    /* ---- scroll fill ----
       The front tracks the scroll position rather than a timeline, so it runs
       backwards when the page does, and it advances through the words in
       document order — which is reading order — rather than down the box. */

    /**
     * How much of a word's step is spent moving.
     *
     * The reference stages these a whole step apart and gives each one half a
     * step to travel, so a word finishes before the next one starts and there
     * is a beat of stillness between them. That gap is what makes it read as
     * word by word rather than as a wash crossing the line — so the value is
     * below 1 on purpose, not as a fade to be widened.
     */
    const SOFT = 0.5;
    /** Where an unread word sits. Matches the reference's 25% ink. */
    const DIM = 0.25;
    /** How far an unread word sits below its line, as a share of its size. */
    const RISE = 0.5;

    const fills = Array.from(document.querySelectorAll<HTMLElement>("[data-fill]")).map(
      (el) => ({ el, words: Array.from(el.querySelectorAll<HTMLElement>("[data-w]")) }),
    );
    let raf = 0;

    const paint = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const { el, words } of fills) {
        const r = el.getBoundingClientRect();
        /* The reference's window: begins when the block's top reaches 75% down
           the viewport, ends when its centre reaches 40% — so the last word
           lands while the reader is still looking at it, not after it has
           travelled off the top. */
        const total = vh * 0.35 + r.height / 2;
        const p = Math.min(1, Math.max(0, (vh * 0.75 - r.top) / total));
        /* Overshoot by the ramp so the last word lands rather than stopping
           part-way up. */
        const front = p * (words.length + SOFT);
        words.forEach((w, i) => {
          const t = Math.min(1, Math.max(0, front - i) / SOFT);
          /* Eased, so a word settles into place rather than sliding at a
             constant rate and stopping dead. */
          const e = 1 - (1 - t) ** 3;
          w.style.opacity = (DIM + (1 - DIM) * e).toFixed(3);
          w.style.transform = `translateY(${((1 - e) * RISE).toFixed(4)}em)`;
        });
      }
    };

    if (fills.length) {
      if (reduced) {
        /* Held still this is only low-contrast text, so without the scroll to
           animate it there is nothing worth dimming for. */
        fills.forEach(({ words }) =>
          words.forEach((w) => {
            w.style.opacity = "1";
            w.style.transform = "none";
          }),
        );
      } else {
        const onScroll = () => {
          /* Coalesced to one paint per frame: scroll fires far more often than
             the screen refreshes, and each pass here reads layout. */
          if (!raf) raf = requestAnimationFrame(paint);
        };
        paint();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        cleanups.push(() => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          if (raf) cancelAnimationFrame(raf);
          fills.forEach(({ words }) =>
            words.forEach((w) => {
              w.style.opacity = "";
              w.style.transform = "";
            }),
          );
        });
      }
    }

    /* ---- spin only while watched ----
       The ring turns from CSS, so it needs no help to animate; this only parks
       it while it is off screen, which is what the reference does. Marked idle
       rather than active so the default — script never runs — is a ring that
       turns. */
    const spinners = Array.from(document.querySelectorAll<HTMLElement>("[data-spin-in-view]"));
    if (spinners.length) {
      const ioSpin = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) delete el.dataset.spinIdle;
            else el.dataset.spinIdle = "1";
          }
        },
        { threshold: 0 },
      );
      spinners.forEach((el) => ioSpin.observe(el));
      cleanups.push(() => {
        ioSpin.disconnect();
        spinners.forEach((el) => delete el.dataset.spinIdle);
      });
    }

    if (fine && !reduced) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        if (el.dataset[WIRED]) return;
        el.dataset[WIRED] = "1";
        wired.push(el);
        const inner = el.querySelector<HTMLElement>("[data-tilt-inner]") ?? el;
        el.style.transformStyle = "preserve-3d";
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          inner.style.transition = "transform .1s linear";
          inner.style.transform = `perspective(800px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg) scale(1.02)`;
        };
        const onLeave = () => {
          inner.style.transition = `transform .5s ${EASE}`;
          inner.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => {
      io.disconnect();
      ioLines.disconnect();
      ioClip.disconnect();
      timers.forEach(clearTimeout);
      cleanups.forEach((fn) => fn());
      wired.forEach((el) => delete el.dataset[WIRED]);
    };
  }, [pathname]);

  return null;
}
