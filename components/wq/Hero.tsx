"use client";

import { LocaleLink } from "@/components/wq/LocaleLink";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";

const INTERVAL_MS = 2600;

/**
 * The home hero.
 *
 * Full viewport height, headline set very tight, and one word of it on a timer.
 * The cycler is measured against the longest word rather than sized to the
 * current one, so the line below never jumps as the word changes.
 *
 * The rotating words come from the dictionary as a list, so a language is free
 * to use a different number of them — the timer and the ghost sizer both read
 * the array's own length rather than a fixed four.
 */
export function Hero({
  t,
  actions,
  aria,
}: {
  t: Dictionary["home"];
  actions: Dictionary["actions"];
  aria: string;
}) {
  const CYCLE = t.heroCycle;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    /* A rotating word is motion. Someone who has asked for less of it gets the
       first word and no timer at all. */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % CYCLE.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, CYCLE.length]);

  /* Pause while the tab is hidden: an unseen timer is wasted work, and the
     word would otherwise have moved on several times before the visitor
     looks back. */
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <section className="wq-hero" aria-label={aria}>
      <div className="wq-hero-in">
        <p className="wq-eyebrow wq-hero-eyebrow">{t.heroEyebrow}</p>

        <h1 className="wq-hero-h1">
          <span className="wq-hero-line">{t.heroLine1}</span>
          <span className="wq-hero-line">
            {t.heroLine2}{" "}
            {/* The live region is off: this is decoration, and announcing a new
                word every few seconds would talk over the rest of the page. The
                full sentence is still readable because every word is in the DOM. */}
            <span className="wq-cycle" aria-hidden="true">
              {/* Sizes the box to the longest word so the layout cannot shift. */}
              <span className="wq-cycle-ghost">
                {CYCLE.reduce((a, b) => (b.length > a.length ? b : a))}
              </span>
              {CYCLE.map((word, n) => (
                <span
                  key={word}
                  className="wq-cycle-item"
                  data-on={n === i ? "" : undefined}
                >
                  {word}
                </span>
              ))}
            </span>
            <span className="wq-sr">{CYCLE[0]}</span>
          </span>
        </h1>

        <p className="wq-hero-lede">{t.heroLede}</p>

        <div className="wq-hero-cta">
          <LocaleLink href="/contact" className="wq-cta wq-cta-lg">
            {actions.startProject}
          </LocaleLink>
          <LocaleLink href="/work" className="wq-link">
            {actions.seeWork}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M3 9L9 3M4.5 3H9v4.5" />
            </svg>
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
