"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, type ThemeName } from "@/lib/theme";
import { NAV } from "@/lib/wq-menu";
import { sound } from "@/lib/wq-sound";

/**
 * How long the panel waits before closing after the pointer leaves.
 *
 * The design's own figure. Without it, the gap between the tab and the panel
 * closes the menu mid-travel, which makes the whole thing feel broken.
 */
const CLOSE_DELAY_MS = 180;

/**
 * The site header.
 *
 * Fixed rather than sticky, 68px tall, and transparent until the page scrolls —
 * the design lets the hero run under it and only draws the hairline once there
 * is content behind it to separate.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME);
  const [menu, setMenu] = useState(false);
  /* Which tab's panel is showing, by href. Null is closed. */
  const [mega, setMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* Starts at the design's default so server and client markup agree; the
     stored preference is read after mount, below. */
  const [soundOn, setSoundOn] = useState(true);

  const openMega = (href: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMega((current) => {
      /* Only sound the first open. Sliding along the nav swaps panels, and a
         click per tab crossed would be noise. */
      if (current === null) sound.menu();
      return href;
    });
  };
  const holdMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const closeMega = (immediate = false) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (immediate) {
      setMega(null);
      return;
    }
    closeTimer.current = setTimeout(() => setMega(null), CLOSE_DELAY_MS);
  };

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  useEffect(() => setSoundOn(sound.restore()), []);

  /* The boot script has already stamped data-theme before paint. Reading it
     back here keeps the button's icon honest without a second source of truth
     and without a hydration mismatch. */
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* A route change should close both; leaving either open would cover the page
     the visitor just asked for. */
  useEffect(() => {
    setMenu(false);
    setMega(null);
  }, [pathname]);

  const swapTheme = () => {
    const next: ThemeName = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Safari in private mode throws on write. The theme still applies for
         this page view; only the memory of it is lost. */
    }
  };

  return (
    <header
      role="banner"
      className="wq-header"
      data-scrolled={scrolled ? "" : undefined}
      /* Escape closes the panel from anywhere inside the header, which is what
         a keyboard user reaches for first. */
      onKeyDown={(e) => {
        if (e.key === "Escape" && mega) closeMega(true);
      }}
      /* Focus leaving the header entirely closes the panel. React's onBlur
         bubbles, so this catches tabbing out of the last panel link. */
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) closeMega(true);
      }}
    >
      <div className="wq-header-in">
        <Link href="/" className="wq-logo" aria-label="WalQalum home" data-magnetic="4">
          <Image
            src="/brand/walqalum-eagle.png"
            alt=""
            width={430}
            height={167}
            priority
          />
          <span>WALQALUM</span>
        </Link>

        <nav
          className="wq-nav wq-desktop"
          aria-label="Primary"
          onMouseLeave={() => closeMega()}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              aria-expanded={mega === item.href}
              aria-controls={panelId(item.href)}
              data-open={mega === item.href ? "" : undefined}
              onMouseEnter={() => openMega(item.href)}
              onFocus={() => openMega(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="wq-actions">
          <button
            type="button"
            className="wq-icon-btn"
            onClick={() => setSoundOn(sound.toggle())}
            aria-label="Toggle interface sound"
            aria-pressed={soundOn}
          >
            {soundOn ? <WaveIcon /> : <MuteIcon />}
          </button>

          <button
            type="button"
            className="wq-icon-btn"
            onClick={swapTheme}
            aria-label="Toggle light and dark theme"
            aria-pressed={theme === "light"}
          >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </button>

          <button type="button" className="wq-lang wq-desktop" aria-label="Switch language">
            EN / AR
          </button>

          <Link href="/contact" className="wq-cta wq-desktop" data-magnetic="6">
            Start a project
          </Link>

          <button
            type="button"
            className="wq-icon-btn wq-mobile"
            onClick={() => {
              sound.menu();
              setMenu((v) => !v);
            }}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="wq-drawer"
          >
            {menu ? <CloseIcon /> : <BurgerIcon />}
          </button>
        </div>
      </div>

      {/* One panel per tab, all mounted so they can transition. Closed panels
          are visibility:hidden, which also keeps their links out of the tab
          order — display:none would kill the animation, opacity alone would
          leave invisible links focusable. */}
      {NAV.map((item) => (
        <div
          key={item.href}
          id={panelId(item.href)}
          className="wq-mega"
          data-open={mega === item.href ? "" : undefined}
          onMouseEnter={holdMega}
          onMouseLeave={() => closeMega()}
        >
          <div className="wq-mega-in" data-cols={item.mega.length}>
            {item.mega.map((group) => (
              <div key={group.label}>
                <p className="wq-mega-label">{group.label}</p>
                <div className="wq-mega-list">
                  {group.items.map((entry) =>
                    entry.external ? (
                      <a key={entry.href} href={entry.href}>
                        <span className="wq-mega-name">{entry.name}</span>
                        <span className="wq-mega-desc">{entry.desc}</span>
                      </a>
                    ) : (
                      <Link key={entry.href} href={entry.href}>
                        <span className="wq-mega-name">{entry.name}</span>
                        <span className="wq-mega-desc">{entry.desc}</span>
                      </Link>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Kept in the DOM and hidden, so the drawer can transition rather than
          appearing instantly, and so its links stay findable. */}
      <div id="wq-drawer" className="wq-drawer" data-open={menu ? "" : undefined} hidden={!menu}>
        <nav aria-label="Primary, mobile">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="wq-cta">
          Start a project
        </Link>
      </div>
    </header>
  );
}

/** A stable id per tab, so aria-controls points at the right panel. */
function panelId(href: string) {
  return `wq-mega-${href === "/" ? "home" : href.replace(/\W+/g, "-").replace(/^-|-$/g, "")}`;
}

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

/* The design's own waveform, six bars rising and falling. */
const WaveIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M1 7 L1 7 M4 4.5 L4 9.5 M7 2 L7 12 M10 4 L10 10 M13 6 L13 8 M16 5 L16 9" />
  </svg>
);

/* Muted collapses the waveform to a single flat line. */
const MuteIcon = () => (
  <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M1 7 L16 7" />
  </svg>
);

const BurgerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);
