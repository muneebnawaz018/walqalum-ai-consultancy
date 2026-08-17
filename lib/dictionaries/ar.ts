/**
 * The Arabic dictionary.
 *
 * The annotation is the whole job. `ar.json` is checked against the English
 * shape at build time, so a key that exists in `en.json` and not here is a type
 * error rather than a blank space on the live site — and a key renamed in
 * English fails loudly here instead of silently falling back.
 *
 * What is *not* enforced is whether a value has actually been translated: a key
 * carrying its English text still type-checks, deliberately, so the site never
 * renders an empty string while translation is in progress. Run
 * `npm run i18n:coverage` to see which keys are still English.
 */

import type { Dictionary } from "./en";
import arabic from "./ar.json";

export const ar: Dictionary = arabic;
