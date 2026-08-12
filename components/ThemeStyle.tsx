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
      <style
        // eslint-disable-next-line react/no-danger -- generated from a typed
        // token map in this repo, never from user input.
        dangerouslySetInnerHTML={{ __html: themeCss() }}
      />
      <script
        // eslint-disable-next-line react/no-danger -- same, and it must run
        // before first paint to avoid a flash of the wrong theme.
        dangerouslySetInnerHTML={{ __html: themeBootScript }}
      />
    </>
  );
}
