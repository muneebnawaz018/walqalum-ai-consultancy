/**
 * Every colour the site uses, as TypeScript.
 *
 * Values are lifted verbatim from the 2026 design's own theme script in
 * `docs/WalQalum Home (standalone).html`, so this file and the design cannot
 * disagree. Nothing here is estimated or sampled from a screenshot.
 *
 * Two things about that design are worth stating up front, because both invert
 * what the old site assumed:
 *
 *  - **Dark is the default.** The design ships `:root` as the dark palette and
 *    treats light as the override under `[data-theme="light"]`. That ordering
 *    is preserved here rather than "corrected", so a visitor who has never
 *    touched the toggle sees what the designer intended.
 *  - **The palette is twelve tokens, not sixty-three.** Roles are broad on
 *    purpose: one `muted` scale rather than a named grey per component.
 *
 * `LEGACY` below is the old palette, kept only so the outgoing `artifact.css`
 * keeps rendering while pages are moved across. It is scheduled for deletion,
 * not for use — new work reads `DESIGN`.
 */

export type ThemeName = "light" | "dark";

/**
 * The design's dark palette, which is also its default.
 *
 * `rgbInk` and `rgbOverlay` are bare channel triples rather than colours,
 * because the design composes them at varying alpha — hairlines are
 * `rgba(var(--rgb-ink),0.08)`, and `rgb()` cannot take a hex through a
 * custom property.
 */
const designDark = {
  bg: "#0B0B0D",
  ink: "#F5F5F3",
  muted: "#8A8A85",
  muted2: "#C9C9C4",
  muted3: "#5C5C58",
  surface: "#141417",
  accent: "#3D6BFF",
  onAccent: "#F5F5F3",
  success: "#3ECF6E",
  danger: "#E5533D",
  rgbInk: "245,245,243",
  rgbOverlay: "13,13,16",
} satisfies Record<string, string>;

export type DesignToken = keyof typeof designDark;

/**
 * The light palette.
 *
 * The design overrides only eight of the twelve: `accent`, `onAccent`,
 * `success` and `danger` are deliberately shared, so the brand blue is the
 * same `#3D6BFF` in both themes. They are repeated here rather than merged in,
 * because a partial map would let a token silently inherit the wrong end of
 * the scale the day someone edits one of them.
 */
const designLight: Record<DesignToken, string> = {
  bg: "#F7F6F3",
  ink: "#111113",
  muted: "#70706B",
  muted2: "#3A3A36",
  muted3: "#A3A39D",
  surface: "#ECEBE7",
  accent: "#3D6BFF",
  onAccent: "#F5F5F3",
  success: "#3ECF6E",
  danger: "#E5533D",
  rgbInk: "17,17,19",
  rgbOverlay: "250,249,246",
};

export const DESIGN: Record<ThemeName, Record<DesignToken, string>> = {
  dark: designDark,
  light: designLight,
};

/**
 * The tokens that ship as channel triples, and can therefore take an alpha.
 *
 * Only these two. A hex cannot be given an alpha through a custom property —
 * `rgb(var(--ink) / 8%)` does not work when `--ink` is `#F5F5F3` — which is why
 * the design carries `rgbInk` and `rgbOverlay` alongside the solid colours.
 */
export type RgbToken = "ink" | "overlay";

/**
 * A themed colour at partial opacity.
 *
 * Returns a `var()` expression rather than a resolved colour on purpose: custom
 * properties substitute at use time, so one string written here still flips
 * with the theme. That is what lets the alpha layer below be declared once on
 * `:root` instead of twice.
 *
 * @example alpha("ink", 0.08) // "rgba(var(--rgb-ink),0.08)"
 */
export function alpha(token: RgbToken, amount: number): string {
  /* `--rgb-ink` / `--rgb-overlay`: the names `cssVarName` gives `rgbInk` and
     `rgbOverlay` in the palette above. */
  return `rgba(var(--rgb-${token}),${amount})`;
}

/** The same, for mixing a solid token toward transparent. */
export function fade(token: DesignToken, percent: number): string {
  return `color-mix(in srgb, var(${cssVarName(token)}) ${percent}%, transparent)`;
}

/**
 * The translucent layer, named by the job each one does.
 *
 * The design draws every hairline, wash and veil as the ink or overlay colour
 * at low alpha rather than as a grey of its own — that is what makes them
 * invert with the theme for free. Naming the steps here means a rule in the
 * stylesheet says what it is (`var(--hairline)`) instead of restating an
 * opacity that has to be kept in sync by eye across two dozen places.
 *
 * The design used both 0.07 and 0.08 for borders. They are folded into one
 * here: one percent of alpha is below the threshold of anything visible, and
 * two tokens a hair apart only invite picking the wrong one.
 */
export const SURFACE = {
  /** Hover wash on a row. */
  tint: alpha("ink", 0.05),
  /** The default separator: section edges, header underline, panel borders. */
  hairline: alpha("ink", 0.08),
  /** List rows, where separators repeat and need slightly more weight. */
  hairlineStrong: alpha("ink", 0.1),
  /** Form controls, which have to read as an editable box. */
  fieldBorder: alpha("ink", 0.12),
  /** The rule under a text link. */
  underline: alpha("ink", 0.25),
  /** The trailing cursor ring, drawn over live content. */
  ringBorder: alpha("ink", 0.5),
  /** The mega panel's ground, over whatever it covers. */
  veil: alpha("overlay", 0.92),
  /** The header once the page has scrolled under it. */
  headerVeil: fade("bg", 82),
  /**
   * Drop shadows, which stay black in both themes.
   *
   * The only literal colour outside the two palettes, and deliberate: a shadow
   * is an absence of light, not a tint of the page. Inverting it with the theme
   * would put a white glow under a card on the light ground.
   */
  shadow: "rgba(0,0,0,0.18)",
  shadowStrong: "rgba(0,0,0,0.28)",
} satisfies Record<string, string>;

/** The design's own typefaces. Both ship as woff2 in the bundle. */
export const FONTS = {
  sans: "'Inter Tight', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
} as const;

/** What a visitor sees before they touch the toggle. The design says dark. */
export const DEFAULT_THEME: ThemeName = "dark";

/** Where the choice is remembered. Matches the key the design script uses. */
export const THEME_STORAGE_KEY = "wq-theme";

/**
 * How long a theme swap takes. The design animates background, text and border
 * together so the page turns over as one surface rather than in pieces.
 */
export const THEME_TRANSITION = "0.45s ease";

/**
 * The outgoing palette.
 *
 * Sixty-three role-named tokens that `app/artifact.css` still reads. They are
 * here for one reason: deleting them today would leave every rule in that file
 * pointing at an undefined custom property, and the site would render as
 * unstyled text before a single new page existed to replace it. Delete this
 * map and its emitter in the same commit that deletes `artifact.css`.
 */
export const LEGACY: Record<string, string> = {
  ink: "#14151a",
  ink2: "#1e2027",
  ink3: "#2b2e37",
  inkBlue: "#1b3a6b",
  bone: "#f6f4ef",
  bone2: "#efeae1",
  bone3: "#e7e1d6",
  paper: "#ffffff",
  white: "#ffffff",
  black: "#000000",
  bodyInk: "#3c3d44",
  bodyInk2: "#33343b",
  bodyInk3: "#4a4b52",
  muted: "#5f6067",
  muted2: "#8b8c93",
  hair: "#e4dfd6",
  hairStrong: "#d5cfc3",
  hairDark: "rgba(255, 255, 255, 0.12)",
  cobalt: "#1d49e2",
  cobaltPress: "#193dc0",
  accent: "var(--cobalt)",
  accentPress: "var(--cobalt-press)",
  accentInk: "var(--white)",
  accentSoft: "color-mix(in srgb, var(--accent) 10%, var(--paper))",
  accentRing: "color-mix(in srgb, var(--accent) 16%, transparent)",
  orange: "#e5462b",
  orangeSoft: "#fdece7",
  orangeDeep: "#b5300f",
  blue: "var(--cobalt)",
  blueSoft: "#e9eeff",
  danger: "#b0281a",
  dangerSoft: "color-mix(in srgb, var(--danger) 34%, transparent)",
  dangerWash: "color-mix(in srgb, var(--danger) 9%, var(--paper))",
  success: "#0e8f5e",
  successInk: "#0b6f49",
  successSoft: "color-mix(in srgb, var(--success) 14%, transparent)",
  onDark: "#ece9e2",
  onDarkSoft: "rgba(236, 233, 226, 0.78)",
  onWhite92: "rgba(255, 255, 255, 0.92)",
  onWhite72: "rgba(255, 255, 255, 0.72)",
  onWhite62: "rgba(255, 255, 255, 0.62)",
  onWhite50: "rgba(255, 255, 255, 0.5)",
  onWhite42: "rgba(255, 255, 255, 0.42)",
  onWhite28: "rgba(255, 255, 255, 0.28)",
  onWhite20: "rgba(255, 255, 255, 0.2)",
  onWhite10: "rgba(255, 255, 255, 0.1)",
  dim: "#c9c6bf",
  dim2: "#b6b3ac",
  dim3: "#a9a49a",
  dim4: "#a5a29b",
  dim5: "#a09c92",
  dim6: "#8b887f",
  veilBone: "rgba(246, 244, 239, 0.86)",
  veilInk60: "rgba(20, 21, 26, 0.6)",
  veilInk55: "rgba(20, 21, 26, 0.55)",
  veilInk50: "rgba(20, 21, 26, 0.5)",
  veilInk40: "rgba(20, 21, 26, 0.4)",
  shadowInk18: "rgba(20, 20, 22, 0.18)",
  shadowInk28: "rgba(20, 20, 22, 0.28)",
  canvasLine: "255 255 255",
  canvasDot: "rgba(255, 255, 255, 0.5)",
  canvasDotDim: "rgba(255, 255, 255, 0.45)",
  serpLink: "#1a0dab",
};

/**
 * `bodyInk` -> `body-ink`, `rgbInk` -> `rgb-ink`, `onWhite92` -> `on-white-92`.
 * Digits start their own segment, so `muted2` reaches CSS as `--muted-2`.
 */
export function cssVarName(token: string): string {
  return (
    "--" +
    token
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/([a-zA-Z])(\d)/g, "$1-$2")
      .toLowerCase()
  );
}

/** A token map as custom-property declarations. */
export function cssVars(tokens: Record<string, string>): string {
  return Object.keys(tokens)
    .map((t) => `${cssVarName(t)}:${tokens[t]}`)
    .join(";");
}

/**
 * The whole colour layer as a stylesheet.
 *
 * Dark sits on `:root` because the design treats it as the base, so a visitor
 * with no stored choice gets it whatever their OS says — matching the design's
 * own script, which reads `localStorage || 'dark'` and never consults
 * `prefers-color-scheme`. Light is the explicit override, and `color-scheme`
 * follows so form controls and scrollbars match the page.
 *
 * The legacy tokens are emitted first and light-only, so the outgoing
 * `artifact.css` keeps its pale ground and is never asked to render its
 * paper-coloured surfaces against the new dark base.
 */
export function themeCss(): string {
  return [
    `:root{${cssVars(LEGACY)}}`,
    `:root{color-scheme:dark;${cssVars(designDark)}}`,
    `:root[data-theme="light"]{color-scheme:light;${cssVars(designLight)}}`,
    /* Declared once, after both palettes. Each value is a `var()` expression
       that resolves against whichever palette is live, so the alpha layer
       needs no per-theme copy. */
    `:root{${cssVars(SURFACE)}}`,
    `body,header,footer,main,a,button,input,textarea,select{transition:background-color ${THEME_TRANSITION},color ${THEME_TRANSITION},border-color ${THEME_TRANSITION}}`,
  ].join("");
}

/**
 * Runs before first paint so the stored choice is applied without a flash.
 * Falls back to the design's default rather than to the OS, deliberately.
 */
export const themeBootScript = `try{var t=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});document.documentElement.setAttribute("data-theme",t==="light"||t==="dark"?t:${JSON.stringify(
  DEFAULT_THEME,
)})}catch(e){}`;
