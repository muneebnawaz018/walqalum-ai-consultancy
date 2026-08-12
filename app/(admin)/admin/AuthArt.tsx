"use client";

import { useEffect, useRef } from "react";
import { DESIGN } from "@/lib/theme";

/**
 * The site's generative network, redrawn for the sign-in panel.
 *
 * The public site draws this from Behaviour, which also owns the drawer, the
 * language toggle and the nav. None of that markup exists here, so this carries
 * just the canvas rather than dragging the whole behaviour layer into the admin.
 */
export function AuthArt() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const wrap = cv?.parentElement;
    const ctx = cv?.getContext("2d");
    if (!cv || !wrap || !ctx) return;

    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    /* Canvas cannot take a `var()`, so the custom properties are resolved once
       here. The fallbacks come from the same palette that emitted them, so a
       missing stylesheet degrades to the right colours instead of invented
       ones. */
    const token = (name: string, fallback: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;

    const accent = token("--accent", DESIGN.dark.accent);
    /* The ink channels, so the constellation is drawn in whatever colour the
       running theme uses for text. It was literal white, which was only ever
       legible because the panel behind it could not be anything but near-black.
       Now the panel follows the theme, so the drawing has to as well. */
    const line = token("--rgb-ink", DESIGN.dark.rgbInk).replace(/,/g, " ");

    let nodes: Array<{ x: number; y: number; vx: number; vy: number; a: boolean }> = [];
    let raf = 0;
    let W = 0;
    let H = 0;
    let s = 104729;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };

    const size = () => {
      const r = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const build = () => {
      nodes = [];
      const n = Math.max(16, Math.min(52, Math.round((W * H) / 13000)));
      const acc = Math.max(1, Math.round(n * 0.08));
      for (let i = 0; i < n; i++) {
        nodes.push({ x: rnd() * W, y: rnd() * H, vx: (rnd() - 0.5) * 0.26, vy: (rnd() - 0.5) * 0.26, a: i < acc });
      }
    };

    const frame = () => {
      ctx.clearRect(0, 0, W, H);
      const lim = Math.min(W, H) * 0.36;
      for (const p of nodes) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < lim) {
            ctx.strokeStyle = `rgb(${line} / ${((1 - d / lim) * 0.2).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const q of nodes) {
        if (q.a) {
          ctx.fillStyle = accent;
          ctx.beginPath();
          ctx.arc(q.x, q.y, 3, 0, 7);
          ctx.fill();
          ctx.globalAlpha = 0.22;
          ctx.beginPath();
          ctx.arc(q.x, q.y, 7.5, 0, 7);
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = `rgb(${line} / 0.45)`;
          ctx.beginPath();
          ctx.arc(q.x, q.y, 1.5, 0, 7);
          ctx.fill();
        }
      }
      raf = reduce ? 0 : requestAnimationFrame(frame);
    };

    size();
    build();
    frame();

    const ro = new ResizeObserver(() => {
      size();
      build();
      if (reduce) frame();
    });
    ro.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas className="auth-viz" ref={ref} aria-hidden="true" />;
}
