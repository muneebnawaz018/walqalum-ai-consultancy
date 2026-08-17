import { themeBootScript, themeCss } from "@/lib/theme";

/**
 * The colour layer, for the <head> of every root layout.
 *
 * Both pieces have to be inline and both have to be here rather than in a
 * stylesheet or a deferred script. The CSS is generated from `lib/theme.ts` so
 * tokens cannot drift between code and stylesheet. The script reads the stored
 * choice and stamps `data-theme` before the browser paints — deferred, it would
 * run after a visitor who chose dark had already been shown a light page.
 */
export function ThemeStyle() {
  return (
    <>
      {/* Generated from the typed token map in `lib/theme.ts`, never from user
          input — there is no interpolation path a visitor can reach. */}
      <style dangerouslySetInnerHTML={{ __html: themeCss() }} />
      {/* Same source, and it has to run before first paint or a visitor who
          chose dark is shown a light page first. */}
      <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
    </>
  );
}
