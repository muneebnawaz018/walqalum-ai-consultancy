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
      dot.className = "wq-cursor-dot";
      ring.className = "wq-cursor-ring";
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
        target = (e.target as Element | null)?.closest?.(INTERACTIVE) ? 1.8 : 1;
      };

      const onOut = (e: MouseEvent) => {
        /* No relatedTarget means the pointer left the window entirely. */
        if (!e.relatedTarget) {
          dot.style.opacity = "0";
          ring.style.opacity = "0";
          seen = false;
        }
      };

      const loop = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        scale += (target - scale) * 0.14;
        dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
        ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px) scale(${scale.toFixed(3)})`;
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
      document.removeEventListener("pointerdown", unlock, true);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("click", onClick, true);
      cleanupPointer?.();
    };
  }, []);

  return null;
}
