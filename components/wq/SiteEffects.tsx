"use client";

import { useEffect } from "react";
import { sound } from "@/lib/wq-sound";

/** What counts as interactive, for both the cursor swell and the hover tick. */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';

/**
 * The cursor, the interface sounds and the magnetic pull.
 *
 * All three are pointer affordances, so all three are gated on a fine pointer
 * and on the visitor not having asked for reduced motion. On a touch screen or
 * with reduced motion the component mounts and does nothing, leaving the real
 * cursor and a silent page.
 */
export function SiteEffects() {
  useEffect(() => {
    sound.restore();

    /* Sound is wired regardless of pointer type — it is not motion, and a
       keyboard user clicking a link should hear the same feedback. */
    const unlock = () => sound.unlock();
    const onOver = (e: Event) => {
      const t = (e.target as Element | null)?.closest?.(INTERACTIVE);
      if (t) sound.tick();
    };
    const onClick = (e: Event) => {
      sound.unlock();
      const t = (e.target as Element | null)?.closest?.(INTERACTIVE);
      /* The toggles make their own noise, so skip the generic click for them
         and let their handlers decide. */
      if (!t || t.hasAttribute("data-sound-toggle")) return;
      sound.click();
    };

    document.addEventListener("pointerdown", unlock, true);
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("click", onClick, true);

    /* --- the reading progress bar ---
       A two-pixel accent rule across the very top, scaled to how far down the
       document you are. Values are the design's own, down to the transform
       origin flipping for RTL so the bar fills from the right.

       It is created here rather than rendered in the header for the same reason
       the design does it in script: it belongs to the document's scroll, not to
       any component, and building it from JS keeps it out of the markup for
       anyone who has scripting off, where it could only ever sit at zero. */
    const bar = document.createElement("div");
    bar.id = "wq-topbar";
    bar.setAttribute("aria-hidden", "true");
    if (document.documentElement.dir === "rtl") bar.style.transformOrigin = "100% 50%";
    document.body.appendChild(bar);

    let barFrame = 0;
    const drawBar = () => {
      barFrame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      bar.style.transform = `scaleX(${progress.toFixed(4)})`;
    };
    /* Coalesced to one write per frame: scroll fires far more often than the
       screen refreshes, and each write here is a layer transform. */
    const onScroll = () => {
      if (!barFrame) barFrame = requestAnimationFrame(drawBar);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", drawBar);
    drawBar();

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanupPointer: (() => void) | undefined;

    if (fine && !reduced) {
      /* --- the cursor ---
         Two elements: a dot pinned exactly to the pointer, and a ring that
         trails it. The ring lagging behind is the whole effect — a ring locked
         to the pointer reads as a bigger cursor, not as weight. */
      const dot = document.createElement("div");
      const ring = document.createElement("div");
      /* The ring carries the label, so the text scales and moves with it
         rather than being a third element chasing the same coordinates. */
      const label = document.createElement("span");
      dot.className = "wq-cursor-dot";
      ring.className = "wq-cursor-ring";
      label.className = "wq-cursor-label";
      ring.append(label);
      dot.setAttribute("aria-hidden", "true");
      ring.setAttribute("aria-hidden", "true");
      document.body.append(dot, ring);
      document.documentElement.classList.add("wq-has-cursor");

      let mx = -100;
      let my = -100;
      let rx = -100;
      let ry = -100;
      let target = 1;
      let scale = 1;
      let seen = false;
      let raf = 0;
      /* The reference waits out its own move transition before writing the
         letters, so the ring is already at size when they arrive rather than
         growing around them. */
      const LABEL_DELAY = 150;
      let labelTimer: ReturnType<typeof setTimeout> | undefined;
      let labelled: Element | null = null;

      /** Writes the label one letter at a time, as the reference does. */
      const setLabel = (text: string) => {
        label.textContent = "";
        [...text].forEach((ch, i) => {
          const span = document.createElement("span");
          /* A space collapses to nothing inside an inline-block, so it is
             carried as a non-breaking one and the words stay apart. */
          span.textContent = ch === " " ? "\u00a0" : ch;
          /* The same 0.05s per letter the reference staggers by. */
          span.style.transitionDelay = `${i * 0.05}s`;
          label.append(span);
        });
        /* Next frame, so the letters have been laid out at zero opacity before
           the class that fades them in is added — otherwise there is no
           transition to run. */
        requestAnimationFrame(() => label.classList.add("wq-cursor-label-on"));
      };

      const clearLabel = () => {
        clearTimeout(labelTimer);
        labelled = null;
        label.classList.remove("wq-cursor-label-on");
        label.textContent = "";
      };

      const onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        if (!seen) {
          /* First sighting: drop the ring straight onto the pointer instead of
             letting it fly in from the corner. */
          seen = true;
          rx = mx;
          ry = my;
          dot.style.opacity = "1";
          ring.style.opacity = "1";
        }
        const el = e.target as Element | null;
        const labelHost = el?.closest?.("[data-cursor-label]") ?? null;
        const text = labelHost?.getAttribute("data-cursor-label") ?? "";

        if (labelHost && text) {
          /* Three sizes: at rest, over anything interactive, and over
             something that has a word to say. The last one only has to hold
             four mono characters — at 3.6 the ring was a hole in the page. */
          target = 2.2;
          if (labelHost !== labelled) {
            labelled = labelHost;
            clearTimeout(labelTimer);
            label.classList.remove("wq-cursor-label-on");
            labelTimer = setTimeout(() => setLabel(text), LABEL_DELAY);
          }
          return;
        }

        if (labelled) clearLabel();
        target = el?.closest?.(INTERACTIVE) ? 1.8 : 1;
      };

      const onOut = (e: MouseEvent) => {
        /* No relatedTarget means the pointer left the window entirely. */
        if (!e.relatedTarget) {
          dot.style.opacity = "0";
          ring.style.opacity = "0";
          seen = false;
          clearLabel();
          target = 1;
        }
      };

      const loop = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        scale += (target - scale) * 0.14;
        /* Hidden while the ring is carrying a word: the dot sits at the exact
           centre of the ring, which is where the label is, and it was landing
           in the middle of the text. */
        dot.style.opacity = labelled ? "0" : seen ? "1" : "0";
        dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
        ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px) scale(${scale.toFixed(3)})`;
        /* Countered against the ring's own scale so the letters stay one size
           whatever the ring is doing. */
        label.style.transform = `scale(${(1 / scale).toFixed(3)})`;
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseout", onOut);

      /* --- magnetic pull ---
         Delegated rather than bound per element, so buttons rendered later
         (the drawer, any future section) are covered without re-wiring. */
      const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
      const onMagnetMove = (e: MouseEvent) => {
        const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]");
        if (!el) return;
        const strength = parseFloat(el.dataset.magnetic || "") || 6;
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
        const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
        el.style.transition = `transform .15s ${EASE}`;
        el.style.transform = `translate(${(dx * strength).toFixed(1)}px, ${(dy * strength).toFixed(1)}px)`;
      };
      const onMagnetOut = (e: MouseEvent) => {
        const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-magnetic]");
        if (!el) return;
        el.style.transition = `transform .45s ${EASE}`;
        el.style.transform = "translate(0, 0)";
      };
      document.addEventListener("mousemove", onMagnetMove, { passive: true });
      document.addEventListener("mouseout", onMagnetOut, true);

      cleanupPointer = () => {
        cancelAnimationFrame(raf);
        clearTimeout(labelTimer);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseout", onOut);
        document.removeEventListener("mousemove", onMagnetMove);
        document.removeEventListener("mouseout", onMagnetOut, true);
        dot.remove();
        ring.remove();
        document.documentElement.classList.remove("wq-has-cursor");
      };
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", drawBar);
      if (barFrame) cancelAnimationFrame(barFrame);
      bar.remove();
      document.removeEventListener("pointerdown", unlock, true);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("click", onClick, true);
      cleanupPointer?.();
    };
  }, []);

  return null;
}
