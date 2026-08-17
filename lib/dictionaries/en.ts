/**
 * The English dictionary, and the shape every other locale has to match.
 *
 * The words themselves live in `en.json`. This file exists only to give them a
 * type: a JSON import widens its values to `string`, so `typeof en` describes
 * the *shape* — every key, nested exactly as written — without pinning any key
 * to its English text. That is what makes `ar.json` checkable against it.
 *
 * Keeping the content as JSON rather than TypeScript is the point of the split.
 * A translator, or a translation service, can open `ar.json`; nobody should have
 * to edit a `.ts` file to change a sentence, and nobody editing a sentence
 * should be able to break the build with a stray bracket in code.
 */

import en from "./en.json";

export { en };

/** The shape every other locale has to satisfy. */
export type Dictionary = typeof en;
