"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Whether the visitor has asked for less motion.
 *
 * A media query is external state, so it is read through
 * `useSyncExternalStore` rather than copied into React state by an effect. The
 * difference is not stylistic: an effect that calls `setState` in its body
 * renders once with the wrong answer and then again with the right one, which
 * is exactly the cascade `react-hooks/set-state-in-effect` exists to stop. It
 * also picks up a visitor who changes the setting mid-visit, which the effect
 * version never did.
 */
function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const read = () => window.matchMedia(QUERY).matches;

/* The server cannot know the setting, so it renders the same markup for
   everyone and `useSyncExternalStore` swaps in the real value on hydration —
   which is a designed handover, not a mismatch. */
const readServer = () => false;

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, read, readServer);
}
