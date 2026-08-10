"use client";

import { useState } from "react";

/**
 * The parts the editor repeats: a labelled field with help text and a counter,
 * a tag input, and a markdown toolbar. Kept here so the three tabs stay
 * readable as forms rather than as walls of markup.
 */

export function Field({
  label,
  help,
  required,
  count,
  max,
  children,
}: {
  label: string;
  help?: string;
  required?: boolean;
  count?: number;
  max?: number;
  children: React.ReactNode;
}) {
  /* Amber before the limit rather than red at it: these are search-engine
     guidelines, not validation, and the editor should say so quietly. */
  const state = count != null && max ? (count > max ? "over" : count > max * 0.92 ? "near" : "") : "";

  return (
    <div className="fld">
      <div className="fld-top">
        <label className="fld-label">
          {label}
          {required ? <b aria-hidden="true">*</b> : null}
        </label>
        {count != null && max ? (
          <span className={`fld-count ${state}`}>
            {count}/{max}
          </span>
        ) : null}
      </div>
      {help ? <p className="fld-help">{help}</p> : null}
      {children}
    </div>
  );
}

/** English and Arabic side by side, so a pair is never half-filled unnoticed. */
export function Pair({
  label,
  help,
  required,
  max,
  value,
  onChange,
  textarea,
  rows,
  placeholder,
}: {
  label: string;
  help?: string;
  required?: boolean;
  max?: number;
  value: { en: string; ar: string };
  onChange: (lang: "en" | "ar", v: string) => void;
  textarea?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const Input = textarea ? "textarea" : "input";
  return (
    <Field label={label} help={help} required={required} count={max ? value.en.length : undefined} max={max}>
      <div className="fld-pair">
        <div>
          <span className="fld-lang">English</span>
          <Input
            value={value.en}
            rows={rows}
            placeholder={placeholder}
            onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => onChange("en", e.target.value)}
          />
        </div>
        <div>
          <span className="fld-lang">
            Arabic <em>optional</em>
          </span>
          <Input
            dir="rtl"
            value={value.ar}
            rows={rows}
            onChange={(e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => onChange("ar", e.target.value)}
          />
        </div>
      </div>
    </Field>
  );
}

/** Enter commits, Backspace on an empty box removes the last one. */
export function TagInput({
  label,
  help,
  value,
  onChange,
  placeholder = "Type and press Enter",
  max = 15,
  maxLength = 40,
}: {
  label: string;
  help?: string;
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  max?: number;
  maxLength?: number;
}) {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const v = draft.trim();
    if (!v) return;
    // Case-insensitive, so "AI" and "ai" do not both end up on the post.
    if (value.length < max && !value.some((t) => t.toLowerCase() === v.toLowerCase())) {
      onChange([...value, v.slice(0, maxLength)]);
    }
    setDraft("");
  };

  return (
    <Field label={label} help={help} count={value.length} max={max}>
      <div className="tagbox">
        {value.map((tag) => (
          <span className="tagchip" key={tag}>
            {tag}
            <button type="button" onClick={() => onChange(value.filter((t) => t !== tag))} aria-label={`Remove ${tag}`}>
              &times;
            </button>
          </span>
        ))}
        <input
          value={draft}
          maxLength={maxLength}
          placeholder={value.length >= max ? `${max} is the limit` : placeholder}
          disabled={value.length >= max}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              commit();
            } else if (e.key === "Backspace" && !draft && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
        />
      </div>
    </Field>
  );
}

type Wrap = { before: string; after: string; block?: boolean };

const MARKS: Array<{ key: string; label: string; title: string; wrap: Wrap }> = [
  { key: "b", label: "B", title: "Bold", wrap: { before: "**", after: "**" } },
  { key: "i", label: "I", title: "Italic", wrap: { before: "_", after: "_" } },
  { key: "h2", label: "H2", title: "Heading 2", wrap: { before: "## ", after: "", block: true } },
  { key: "h3", label: "H3", title: "Heading 3", wrap: { before: "### ", after: "", block: true } },
  { key: "ul", label: "•", title: "Bulleted list", wrap: { before: "- ", after: "", block: true } },
  { key: "ol", label: "1.", title: "Numbered list", wrap: { before: "1. ", after: "", block: true } },
  { key: "quote", label: "❝", title: "Quote", wrap: { before: "> ", after: "", block: true } },
  { key: "link", label: "↗", title: "Link", wrap: { before: "[", after: "](https://)" } },
];

/**
 * Wraps the selection in markdown. The stored format stays markdown rather than
 * HTML, because the public renderer escapes everything it is given and only
 * lets markdown through: a rich-text editor that stored HTML would either lose
 * that guarantee or have its output escaped into visible tags.
 */
export function MarkdownToolbar({
  target,
  value,
  onChange,
}: {
  target: React.RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (v: string) => void;
}) {
  const apply = (wrap: Wrap) => {
    const el = target.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = value.slice(start, end);

    let next: string;
    let caret: number;
    if (wrap.block) {
      // Prefix every line of the selection, and start on a fresh line.
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const chunk = value.slice(lineStart, end) || "";
      const prefixed = (chunk || "").split("\n").map((l) => wrap.before + l).join("\n");
      next = value.slice(0, lineStart) + prefixed + value.slice(end);
      caret = lineStart + prefixed.length;
    } else {
      next = value.slice(0, start) + wrap.before + selected + wrap.after + value.slice(end);
      caret = start + wrap.before.length + selected.length;
    }

    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(caret, caret);
    });
  };

  return (
    <div className="mdbar">
      {MARKS.map((m) => (
        <button key={m.key} type="button" title={m.title} aria-label={m.title} onClick={() => apply(m.wrap)}>
          {m.label}
        </button>
      ))}
    </div>
  );
}
