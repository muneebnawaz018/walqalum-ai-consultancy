"use client";

import { useEffect, useSyncExternalStore } from "react";
import { DEFAULT_THEME, THEME_STORAGE_KEY, type ThemeName } from "@/lib/theme";
import { MoonIcon, MuteIcon, SunIcon, WaveIcon } from "@/components/wq/Icons";
import { sound } from "@/lib/wq-sound";

/**
 * The sound and theme toggles, which the design places in both the header and
 * the footer.
 *
 * Two buttons for one setting each is only safe if neither can go stale: press
 * the footer's theme button and the header's icon has to follow. Rather than
 * lift the state into a provider that wraps every page, each button subscribes
 * to the one place the truth already lives — `data-theme` on `<html>` for the
 * theme, the sound engine itself for sound.
 *
 * Both read through `useSyncExternalStore`, which is what that hook is for: the
 * value is owned outside React, and the server snapshot is the design's default
 * so the first client render matches the markup and hydration stays quiet.
 */

/** Watches the attribute the boot script stamps before first paint. */
function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function readTheme(): ThemeName {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "light" || t === "dark" ? t : DEFAULT_THEME;
}

const serverTheme = () => DEFAULT_THEME;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);

  const swap = () => {
    const next: ThemeName = theme === "dark" ? "light" : "dark";
    /* Writing the attribute is the whole update — every mounted toggle hears it
       through the observer above, so there is no local state to set. */
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* Safari in private mode throws on write. The theme still applies for
         this page view; only the memory of it is lost. */
    }
  };

  return (
    <button
      type="button"
      className="wq-icon-btn"
      onClick={swap}
      aria-label="Toggle light and dark theme"
      aria-pressed={theme === "light"}
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

const subscribeSound = (onChange: () => void) => sound.subscribe(onChange);
const readSound = () => sound.enabled;
const serverSound = () => true;

export function SoundToggle() {
  const on = useSyncExternalStore(subscribeSound, readSound, serverSound);

  /* `sessionStorage` does not exist while rendering, so the stored preference
     is read after mount. `restore` announces the result to subscribers, which
     is what moves the icon — nothing is set here directly. */
  useEffect(() => {
    sound.restore();
  }, []);

  return (
    <button
      type="button"
      className="wq-icon-btn"
      onClick={() => sound.toggle()}
      aria-label="Toggle interface sound"
      aria-pressed={on}
      data-sound-toggle
    >
      {on ? <WaveIcon /> : <MuteIcon />}
    </button>
  );
}
