"use client";

import { useEffect } from "react";

import { SECTORS, sectorLabel, sectorLabelAr } from "@/lib/sectors";

/**
 * Every client-side behaviour the design artifact shipped, ported as-is:
 * the generative network canvas, scroll parallax and progress bar, reveal and
 * count-up animations, the industries tabs, the work filters, the drawer, the
 * magnetic buttons, the language toggle and the prototype controls.
 *
 * The artifact drove all of this through the DOM rather than through state, and
 * that is kept deliberately. The markup is static — React never re-renders it —
 * so direct mutation is safe, and it is the only way the bilingual copy can
 * carry inline markup (`<em>scalable</em>`) in both languages.
 */
export function Behaviour() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const cleanups: Array<() => void> = [];
    const on = <K extends keyof WindowEventMap>(
      t: EventTarget,
      ev: K | string,
      fn: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions
    ) => {
      t.addEventListener(ev, fn, opts);
      cleanups.push(() => t.removeEventListener(ev, fn, opts));
    };

    /* The canvas needs colour strings rather than `var()`, so it reads the
       tokens out of the stylesheet instead of carrying its own copies. The
       fallbacks only apply if colors.css failed to load at all. */
    const token = (name: string, fallback: string) =>
      getComputedStyle(root).getPropertyValue(name).trim() || fallback;

    const LINE = token("--canvas-line", "255 255 255");
    const DOT = token("--canvas-dot", "rgba(255,255,255,.5)");

    /* Read once. The accent no longer changes at runtime now that the
       prototype's colour switcher is gone. */
    const ACCENT = token("--accent", "#1d49e2");

    /* ---- generative network canvas, one per image slot ---- */
    let vizSeed = 97;
    document.querySelectorAll<HTMLCanvasElement>(".viz").forEach((cv) => {
      if (cv.dataset.on) return;
      cv.dataset.on = "1";
      const ctx = cv.getContext("2d");
      const wrap = cv.parentElement;
      if (!ctx || !wrap) return;

      let nodes: Array<{ x: number; y: number; vx: number; vy: number; a: boolean }> = [];
      let raf = 0;
      let vis = true;
      let W = 0;
      let H = 0;
      let s = (vizSeed = (vizSeed * 16807) % 2147483647);
      const rnd = () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
      const size = () => {
        const r = wrap.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = Math.max(1, r.width);
        H = Math.max(1, r.height * 1.16);
        cv.width = Math.round(W * dpr);
        cv.height = Math.round(H * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      const build = () => {
        nodes = [];
        const n = Math.max(12, Math.min(44, Math.round((W * H) / 13000)));
        const acc = Math.max(1, Math.round(n * 0.07));
        for (let i = 0; i < n; i++) {
          nodes.push({ x: rnd() * W, y: rnd() * H, vx: (rnd() - 0.5) * 0.28, vy: (rnd() - 0.5) * 0.28, a: i < acc });
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
              ctx.strokeStyle = `rgb(${LINE} / ${((1 - d / lim) * 0.22).toFixed(3)})`;
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
            ctx.fillStyle = ACCENT;
            ctx.beginPath();
            ctx.arc(q.x, q.y, 3, 0, 7);
            ctx.fill();
            ctx.globalAlpha = 0.22;
            ctx.beginPath();
            ctx.arc(q.x, q.y, 7.5, 0, 7);
            ctx.fill();
            ctx.globalAlpha = 1;
          } else {
            ctx.fillStyle = DOT;
            ctx.beginPath();
            ctx.arc(q.x, q.y, 1.5, 0, 7);
            ctx.fill();
          }
        }
        raf = !reduce && vis ? requestAnimationFrame(frame) : 0;
      };

      size();
      build();
      frame();
      cleanups.push(() => cancelAnimationFrame(raf));

      const io = new IntersectionObserver((es) =>
        es.forEach((e) => {
          vis = e.isIntersecting;
          if (vis && !raf && !reduce) raf = requestAnimationFrame(frame);
        })
      );
      io.observe(wrap);
      const ro = new ResizeObserver(() => {
        size();
        build();
        if (reduce) frame();
      });
      ro.observe(wrap);
      cleanups.push(() => {
        io.disconnect();
        ro.disconnect();
      });
    });

    /* ---- parallax + scroll progress ---- */
    const pxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const progressEl = document.getElementById("progress");
    const onParallax = () => {
      if (reduce || !pxEls.length) return;
      const vh = window.innerHeight;
      pxEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--py", `${(((r.top + r.height / 2 - vh / 2) / vh) * -18).toFixed(1)}px`);
      });
    };
    let pxTick = 0;
    const onScrollFx = () => {
      onParallax();
      if (progressEl && !reduce) {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        progressEl.style.transform = `scaleX(${max > 0 ? Math.min(1, h.scrollTop / max) : 0})`;
      }
    };
    onParallax();
    on(window, "scroll", () => {
      if (pxTick) return;
      pxTick = requestAnimationFrame(() => {
        pxTick = 0;
        onScrollFx();
      });
    }, { passive: true } as AddEventListenerOptions);

    /* ---- reveals ---- */
    const revealEls = document.querySelectorAll(".reveal, .stagger");
    if (reduce) {
      revealEls.forEach((e) => e.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          }),
        { threshold: 0.14 }
      );
      revealEls.forEach((e) => io.observe(e));
      cleanups.push(() => io.disconnect());
    }

    /* ---- count-ups ---- */
    const counts = document.querySelectorAll<HTMLElement>(".count");
    if (reduce) {
      counts.forEach((el) => (el.textContent = el.getAttribute("data-to")));
    } else {
      const countUp = (el: HTMLElement) => {
        const to = Number(el.getAttribute("data-to"));
        let t0: number | null = null;
        const step = (ts: number) => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / 1000, 1);
          el.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * to));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      };
      const io2 = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            const el = e.target as HTMLElement;
            if (e.isIntersecting && !el.dataset.done) {
              el.dataset.done = "1";
              countUp(el);
              io2.unobserve(el);
            }
          }),
        { threshold: 0.6 }
      );
      counts.forEach((el) => {
        el.textContent = "0";
        io2.observe(el);
      });
      cleanups.push(() => io2.disconnect());
    }

    /* ---- magnetic buttons ---- */
    if (!reduce) {
      document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
        if (el.dataset.mag) return;
        el.dataset.mag = "1";
        on(el, "mousemove", ((e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${
            (e.clientY - r.top - r.height / 2) * 0.3
          }px)`;
        }) as EventListener);
        on(el, "mouseleave", () => (el.style.transform = ""));
      });
    }

    /* ---- industries tabs ---- */
    const escape = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    const list = (en: string[], ar: string[]) =>
      en.map((v, i) => `<li data-en="${escape(v)}" data-ar="${escape(ar[i] ?? v)}">${escape(lang === "ar" ? ar[i] ?? v : v)}</li>`).join("");
    const setText = (el: Element | null, en: string, ar: string) => {
      if (!el) return;
      el.setAttribute("data-en", en);
      el.setAttribute("data-ar", ar);
      el.textContent = lang === "ar" ? ar : en;
    };
    document.querySelectorAll<HTMLButtonElement>(".ind .tabs button").forEach((btn) => {
      on(btn, "click", () => {
        const d = SECTORS[Number(btn.getAttribute("data-ind") || 0)];
        const i = SECTORS.indexOf(d);
        document
          .querySelectorAll(".ind .tabs button")
          .forEach((b) => b.setAttribute("aria-selected", String(b === btn)));
        const panel = document.querySelector(".ind .panel");
        if (!panel || !d) return;
        setText(panel.querySelector(".mono:not(.useslab)"), sectorLabel(i), sectorLabelAr(i));
        setText(panel.querySelector("h3"), d.name, d.nameAr);
        setText(panel.querySelector("p"), d.lede, d.ledeAr);
        const uses = panel.querySelector("ul.uses");
        if (uses) uses.innerHTML = list(d.uses, d.usesAr);
        const tags = panel.querySelector("ul.tags");
        if (tags) tags.innerHTML = list(d.tags, d.tagsAr);
      });
    });

    /* ---- work filters (visual only, as in the artifact) ---- */
    document.querySelectorAll<HTMLButtonElement>(".filters button").forEach((b) => {
      on(b, "click", () => {
        b.parentElement?.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      });
    });

    /* ---- buttons that carried the artifact's data-nav ---- */
    const NAV: Record<string, string> = {
      home: "/", industries: "/industries", products: "/products", work: "/work",
      blog: "/blog", article: "/blog", about: "/about", case: "/work", contact: "/contact",
    };
    document.querySelectorAll<HTMLElement>("button[data-nav]").forEach((b) => {
      const to = NAV[b.getAttribute("data-nav") || ""];
      if (to) on(b, "click", () => (window.location.href = to));
    });

    /* ---- language ---- */
    let lang: "en" | "ar" = "en";
    const setLang = (l: "en" | "ar") => {
      lang = l;
      root.setAttribute("lang", l);
      root.setAttribute("dir", l === "ar" ? "rtl" : "ltr");
      document.querySelectorAll("[data-en]").forEach((el) => {
        const v = el.getAttribute(l === "ar" ? "data-ar" : "data-en");
        if (v != null) el.innerHTML = v;
      });
      document.querySelectorAll<HTMLElement>("#langBtn, #langBtn2").forEach((b) => {
        b.textContent = l === "ar" ? "English" : "العربية";
      });
      try {
        localStorage.setItem("wq-lang", l);
      } catch {}
    };
    document.querySelectorAll<HTMLElement>("#langBtn, #langBtn2").forEach((b) =>
      on(b, "click", () => setLang(lang === "en" ? "ar" : "en"))
    );
    try {
      if (localStorage.getItem("wq-lang") === "ar") setLang("ar");
    } catch {}

    /* ---- drawer ---- */
    const drawer = document.getElementById("drawer");
    const burger = document.getElementById("burger");
    const drawerX = document.getElementById("drawerX");
    if (burger && drawer) on(burger, "click", () => drawer.classList.add("open"));
    if (drawerX && drawer) on(drawerX, "click", () => drawer.classList.remove("open"));
    if (drawer) {
      on(drawer, "click", ((e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("a")) drawer.classList.remove("open");
      }) as EventListener);
    }
    on(document, "keydown", ((e: KeyboardEvent) => {
      if (e.key === "Escape") drawer?.classList.remove("open");
    }) as EventListener);

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
