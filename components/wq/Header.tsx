"use client";

import Image from "next/image";
import { LocaleLink } from "@/components/wq/LocaleLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BurgerIcon, CloseIcon } from "@/components/wq/Icons";
import { LangSwitch } from "@/components/wq/LangSwitch";
import type { Dictionary } from "@/lib/dictionaries/en";
import { SoundToggle, ThemeToggle } from "@/components/wq/Toggles";
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
export function Header({ labels }: { labels: Dictionary["actions"] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  /* Which tab's panel is showing, by href. Null is closed. */
  const [mega, setMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
        <LocaleLink href="/" className="wq-logo" aria-label="WalQalum home" data-magnetic="4">
          <Image
            src="/brand/walqalum-eagle.png"
            alt=""
            width={430}
            height={167}
            priority
          />
          <span>WALQALUM</span>
        </LocaleLink>

        <nav
          className="wq-nav wq-desktop"
          aria-label="Primary"
          onMouseLeave={() => closeMega()}
        >
          {NAV.map((item) => (
            <LocaleLink
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
            </LocaleLink>
          ))}
        </nav>

        <div className="wq-actions">
          <SoundToggle />
          <ThemeToggle />

          <LangSwitch label={labels.switchLanguage} />

          <LocaleLink href="/contact" className="wq-cta wq-desktop" data-magnetic="6">
            {labels.startProject}
          </LocaleLink>

          <button
            type="button"
            className="wq-icon-btn wq-mobile"
            onClick={() => {
              sound.menu();
              setMenu((v) => !v);
            }}
            aria-label={menu ? labels.closeMenu : labels.openMenu}
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
                      <LocaleLink key={entry.href} href={entry.href}>
                        <span className="wq-mega-name">{entry.name}</span>
                        <span className="wq-mega-desc">{entry.desc}</span>
                      </LocaleLink>
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
            <LocaleLink key={item.href} href={item.href}>
              {item.label}
            </LocaleLink>
          ))}
        </nav>
        <LocaleLink href="/contact" className="wq-cta">
          {labels.startProject}
        </LocaleLink>
      </div>
    </header>
  );
}

/** A stable id per tab, so aria-controls points at the right panel. */
function panelId(href: string) {
  return `wq-mega-${href === "/" ? "home" : href.replace(/\W+/g, "-").replace(/^-|-$/g, "")}`;
}

