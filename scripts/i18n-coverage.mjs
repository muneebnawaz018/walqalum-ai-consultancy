/**
 * Translation coverage for `lib/dictionaries/*.json`.
 *
 * TypeScript already guarantees that every locale has every key — `ar.ts`
 * annotates the JSON as `Dictionary`, so a missing one is a build error. What
 * it cannot see is whether a key has actually been *translated*: a value still
 * carrying its English text type-checks perfectly, which is deliberate, because
 * a half-translated site should show English rather than a blank.
 *
 * So that is what this measures. A leaf whose value is byte-identical to the
 * English one is treated as untranslated. That is a heuristic, and it has one
 * known false positive: strings that are genuinely the same in both languages —
 * proper nouns, product names, technical tags. Those are listed in IDENTICAL_OK
 * below rather than silently excused, so the exception stays visible and has to
 * be argued for once.
 *
 * Exits non-zero only on a structural problem (a key present in one file and
 * not the other). Untranslated keys are reported, not failed: translation is
 * work in progress by definition, and a build that goes red because a sentence
 * has not been written yet is a build people learn to ignore.
 *
 *   node scripts/i18n-coverage.mjs
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const dict = (name) =>
  JSON.parse(readFileSync(join(here, "..", "lib", "dictionaries", name), "utf8"));

/**
 * Keys whose value is the same in every language on purpose.
 *
 * Empty for now, deliberately. Everything currently identical is identical
 * because nobody has translated it yet — including the project names and the
 * technical tags, which are a judgement call for the client rather than an
 * obvious no-op.
 */
const IDENTICAL_OK = new Set([]);

/** Flattens to `a.b.c` paths, so arrays report per index. */
function flatten(node, prefix = "", out = new Map()) {
  if (node === null || typeof node !== "object") {
    out.set(prefix, node);
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
    return out;
  }
  for (const [k, v] of Object.entries(node)) {
    flatten(v, prefix ? `${prefix}.${k}` : k, out);
  }
  return out;
}

const base = flatten(dict("en.json"));
const locales = ["ar"];

let structural = 0;

for (const locale of locales) {
  const other = flatten(dict(`${locale}.json`));

  const missing = [...base.keys()].filter((k) => !other.has(k));
  const extra = [...other.keys()].filter((k) => !base.has(k));

  const shared = [...base.keys()].filter((k) => other.has(k));
  const untranslated = shared.filter(
    (k) => !IDENTICAL_OK.has(k) && other.get(k) === base.get(k),
  );

  const done = shared.length - untranslated.length;
  const pct = shared.length ? Math.round((done / shared.length) * 100) : 0;

  console.log(`\n${locale.toUpperCase()}  ${done}/${shared.length} keys translated (${pct}%)`);

  if (missing.length) {
    structural += missing.length;
    console.log(`\n  MISSING (${missing.length}) — present in en.json, absent here:`);
    for (const k of missing) console.log(`    ${k}`);
  }
  if (extra.length) {
    structural += extra.length;
    console.log(`\n  EXTRA (${extra.length}) — present here, absent from en.json:`);
    for (const k of extra) console.log(`    ${k}`);
  }

  if (untranslated.length) {
    /* Grouped by top-level section: the useful question is "which part of the
       site is still English", not "which of 200 keys". */
    const bySection = new Map();
    for (const k of untranslated) {
      const section = k.split(/[.[]/)[0];
      if (!bySection.has(section)) bySection.set(section, []);
      bySection.get(section).push(k);
    }
    console.log(`\n  STILL ENGLISH (${untranslated.length}):`);
    for (const [section, keys] of [...bySection].sort()) {
      console.log(`    ${section} — ${keys.length}`);
      for (const k of keys) console.log(`        ${k}`);
    }
  } else {
    console.log("  Nothing left in English.");
  }
}

if (structural) {
  console.error(`\nFAIL: ${structural} structural mismatch(es). Fix before shipping.`);
  process.exit(1);
}
console.log("\nShape matches English in every locale.");
