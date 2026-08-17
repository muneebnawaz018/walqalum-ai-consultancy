/**
 * The site's own words, in English.
 *
 * This file is the source of truth for the interface chrome — the strings that
 * are the same on every page. Page and section prose still lives in
 * `wq-content.ts` and `wq-pages.ts`; those are the next thing to move here, and
 * are deliberately not half-moved, because copy split across two systems is
 * worse than copy in one place that has not been translated yet.
 *
 * `ar.ts` is typed against this, so adding a key here without adding it there
 * is a type error rather than a blank space on the Arabic site.
 */

/* No `as const`: the literal types it produces would make every Arabic
   string a type error against its English original. */
export const en = {
  nav: {
    home: "Home",
    about: "About",
    industries: "Industries",
    work: "Work",
    insights: "Insights",
    contact: "Contact",
  },
  actions: {
    startProject: "Start a project",
    allWork: "All work",
    allInsights: "All insights",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    toggleSound: "Toggle interface sound",
    toggleTheme: "Toggle light and dark theme",
    switchLanguage: "Switch language",
  },
  footer: {
    about:
      "An AI consultancy and engineering agency. Fifteen years of production software under everything we ship.",
    links: "LINKS",
    explore: "EXPLORE",
    contact: "CONTACT",
    available: "Available for new projects",
    rights: "All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
  },
};

/** The shape every other locale has to satisfy. */
export type Dictionary = typeof en;
