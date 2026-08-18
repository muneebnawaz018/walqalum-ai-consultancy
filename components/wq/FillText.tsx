import React from "react";

/**
 * Text prepared for the scroll fill.
 *
 * The fill runs in reading order — along a line, then down to the next — so it
 * cannot be a gradient over the block: a gradient only knows how far down a
 * word sits, not how far through the sentence it is. Each word therefore gets
 * its own box, and the motion layer floats them in sequence.
 *
 * The split happens here rather than in the effect on purpose. React owns this
 * subtree, and rewriting its text nodes from an effect would be undone by any
 * re-render — quietly, and only on the renders that happen to hit it.
 *
 * Spaces stay as bare text between the boxes. That is what still breaks the
 * lines: a word box is an inline-block, and a run of those would otherwise be
 * free to break anywhere.
 */

/** Recursively wraps every word, preserving the element structure. */
function split(node: React.ReactNode, key: string): React.ReactNode {
  if (typeof node === "string") {
    /* The capturing group keeps the runs of whitespace in the output, so the
       spacing between words survives the split unchanged. */
    return node.split(/(\s+)/).map((word, i) =>
      word === "" || /\s/.test(word) ? (
        word
      ) : (
        <span key={`${key}.${i}`} data-w="">
          {word}
        </span>
      ),
    );
  }
  if (Array.isArray(node)) return node.map((child, i) => split(child, `${key}.${i}`));
  if (React.isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return React.cloneElement(el, { key: el.key ?? key }, split(el.props.children, `${key}c`));
  }
  return node;
}

export function FillText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className} data-fill="">
      {split(children, "f")}
    </div>
  );
}
