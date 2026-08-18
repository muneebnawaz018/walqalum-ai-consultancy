"use client";

/* eslint-disable @next/next/no-img-element --
   The plates are local static SVGs. next/image refuses SVG unless the project
   turns on `dangerouslyAllowSVG`, which would let any future remote SVG render
   as markup — too much surface to open for placeholder art. There is nothing
   for an optimiser to do to a 1KB vector anyway. */

import { useCallback, useState } from "react";

/**
 * The services index.
 *
 * Three columns: the bullets for whatever is selected, a plate that crossfades
 * with it, and the list of titles. Pointing at a title selects it — the
 * reference switches on hover and on click both, so it works with a mouse
 * without needing one.
 *
 * Selection is state rather than a scroll position, which is what separates
 * this from the sticky index on the capabilities section: that one follows the
 * reader down the page, this one answers the pointer.
 */

export type Service = {
  id: string;
  number: string;
  title: string;
  bullets: string[];
  image: string;
};

export function ServiceIndex({
  services,
  eyebrow,
}: {
  services: Service[];
  eyebrow: string;
}) {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active) ?? services[0];

  /* Both handlers, as the reference has it: hover is the fast path, click is
     the one that works on a trackpad tap or a keyboard focus. */
  const select = useCallback((id: string) => setActive(id), []);

  return (
    <div className="wq-svc">
      <div className="wq-svc-detail">
        <p className="wq-eyebrow">{eyebrow}</p>
        {/* Keyed on the selection so the bullets remount and re-run their
            entrance, rather than swapping text under a static list. */}
        <ul className="wq-svc-bullets" key={current.id} data-reveal-group="">
          {current.bullets.map((b) => (
            <li key={b}>
              <span aria-hidden="true">•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Every plate is mounted and only opacity changes, so the crossfade has
          nothing to load at the moment of switching. */}
      <div className="wq-svc-plate" aria-hidden="true">
        {services.map((s) => (
          <img
            key={s.id}
            src={s.image}
            alt=""
            loading="lazy"
            style={{ opacity: s.id === current.id ? 1 : 0 }}
          />
        ))}
      </div>

      <div className="wq-svc-list">
        {services.map((s) => (
          <button
            key={s.id}
            type="button"
            className="wq-svc-row"
            aria-pressed={s.id === current.id}
            onMouseEnter={() => select(s.id)}
            onFocus={() => select(s.id)}
            onClick={() => select(s.id)}
          >
            <span className="wq-svc-num">{s.number}.</span>
            <span className="wq-svc-title">{s.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
