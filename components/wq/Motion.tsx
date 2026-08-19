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
 *   data-parallax      drifts against the scroll, `data-parallax-strength`
 *   data-parallax-scale  its first child grows from 0.7 as the block rises
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
    /** Where the fill starts: the block's top, as a share of the viewport. */
    const START = 0.7;
    /** Where it finishes: the block's *bottom*, same measure. */
    const END = 0.3;

    const fills = Array.from(document.querySelectorAll<HTMLElement>("[data-fill]")).map(
      (el) => ({ el, words: Array.from(el.querySelectorAll<HTMLElement>("[data-w]")) }),
    );
    let raf = 0;

    const paint = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const { el, words } of fills) {
        const r = el.getBoundingClientRect();
        /* Begins when the block's top reaches 80% down the viewport and ends
           when its *bottom* reaches 35%. Measuring the end from the bottom
           rather than from the centre is what stops a tall block finishing
           while half a screen of it is still coming up — the whole paragraph
           has to be read past before the last word lands. */
        const total = vh * (START - END) + r.height;
        const p = Math.min(1, Math.max(0, (vh * START - r.top) / total));
        /* Seeded at exactly one word's ramp, with the remaining travel shared
           out over the rest: the first word is lit the moment the block
           appears, so it reads as a front already moving rather than as dead
           text waiting to be scrolled at.

           Seeding the ramp rather than a whole step matters at the margin. A
           word needs only SOFT of a step to light, so seeding a full step puts
           the second word one hundredth of the window away — near enough that
           a block sitting just inside the start opens on two lit words instead
           of one. */
        const front = SOFT + p * (words.length - 1 + SOFT);
        words.forEach((w, i) => {
          const t = Math.min(1, Math.max(0, front - i) / SOFT);
          /* Eased, so a word settles into place rather than sliding at a
             constant rate and stopping dead. */
          const e = 1 - (1 - t) ** 3;
          /* Opacity only. The reference floats each word up into place as it
             fills, which works there because its statement is one word per
             beat on a short measure. On a full paragraph it puts the unread
             words half a line below the read ones, so every line renders on
             two baselines at once and the block reads as broken rather than
             as filling. */
          w.style.opacity = (DIM + (1 - DIM) * e).toFixed(3);
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
        /* The first paint happens on the fallback face's metrics. When the
           real one arrives every block moves, and without this nothing would
           recompute until the reader scrolled — which is how a statement ends
           up part-filled before it has been reached. */
        document.fonts?.ready.then(onScroll);
        /* Same problem from the other direction: a block that reflows — an
           image landing above it, a filter changing the list length — moves
           without the page scrolling. */
        const ro = new ResizeObserver(onScroll);
        fills.forEach(({ el }) => ro.observe(el));
        cleanups.push(() => {
          ro.disconnect();
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

    /* ---- parallax ----
       Two scroll-linked devices, both with the reference's own numbers.

       `data-parallax` drifts an element against the scroll: the offset is its
       distance from the top of the viewport times a strength, default an
       eighth, overridable per element. The transition is a fifth of a second
       and linear — long enough to smooth the step between frames, short enough
       that the element never appears to lag behind the page.

       `data-parallax-scale` grows a plate from 0.7 to 1 as it rises: the
       inner element is the one that moves, so the frame around it stays put
       and the picture grows inside it. Held to wide screens, as the reference
       holds it, because on a narrow one the plate is most of the viewport and
       a plate that resizes under the reader is a distraction rather than
       depth.

       Both are skipped outright under reduced motion — this is the one kind of
       movement on the page that nothing on it depends on. */
    const DRIFT = 0.125;
    /** Where the plate reaches full size, as a share of the viewport. */
    const SCALE_AT = 0.5;
    const MIN_SCALE = 0.7;

    const drifters = reduced
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")).map((el) => ({
          el,
          strength: Number(el.dataset.parallaxStrength) || DRIFT,
        }));

    const platesWide = window.matchMedia("(min-width: 1025px)").matches;
    const scalers =
      reduced || !platesWide
        ? []
        : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax-scale]"))
            .map((el) => el.firstElementChild as HTMLElement | null)
            .filter((el): el is HTMLElement => el !== null);

    if (drifters.length || scalers.length) {
      let praf = 0;
      const place = () => {
        praf = 0;
        const vh = window.innerHeight;
        drifters.forEach(({ el, strength }) => {
          el.style.transform = `translateY(${(el.getBoundingClientRect().top * strength).toFixed(1)}px)`;
        });
        scalers.forEach((inner) => {
          const top = inner.getBoundingClientRect().top;
          /* Pinned small at the very top of the document: without this a plate
             that starts on screen is already full size and never grows. */
          const raw = window.scrollY === 0 ? MIN_SCALE : 1 - top / vh + SCALE_AT;
          const scale = Math.min(1, Math.max(MIN_SCALE, raw));
          inner.style.transform = `scale(${scale.toFixed(3)})`;
        });
      };
      const onPlace = () => {
        if (!praf) praf = requestAnimationFrame(place);
      };
      drifters.forEach(({ el }) => {
        el.style.transition = "transform .2s linear";
        el.style.willChange = "transform";
      });
      scalers.forEach((inner) => {
        inner.style.transition = `transform .5s ${EASE}`;
        inner.style.willChange = "transform";
      });
      place();
      window.addEventListener("scroll", onPlace, { passive: true });
      window.addEventListener("resize", onPlace);
      cleanups.push(() => {
        window.removeEventListener("scroll", onPlace);
        window.removeEventListener("resize", onPlace);
        if (praf) cancelAnimationFrame(praf);
        [...drifters.map((d) => d.el), ...scalers].forEach((el) => {
          el.style.transform = "";
          el.style.transition = "";
          el.style.willChange = "";
        });
      });
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
