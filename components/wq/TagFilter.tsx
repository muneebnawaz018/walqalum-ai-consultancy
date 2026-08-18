"use client";

/**
 * The tag filter bar.
 *
 * One row of tags above a list, taken from the reference's work index: the
 * tags are the taxonomy the projects already carry, so the filter is built
 * from the content rather than maintained beside it. A tag that no item uses
 * cannot appear, and a new tag on a project shows up here on its own.
 *
 * A button rather than a link. Filtering is a view of the same page, and a
 * querystring per tag would put eight near-identical URLs in front of a
 * crawler for one page of content.
 */
export function TagFilter({
  tags,
  active,
  onSelect,
  allLabel,
  label,
}: {
  tags: string[];
  /** `null` is "everything", which is the state the page opens in. */
  active: string | null;
  onSelect: (tag: string | null) => void;
  allLabel: string;
  label: string;
}) {
  return (
    <div className="wq-filter" role="group" aria-label={label}>
      <button
        type="button"
        className="wq-filter-btn"
        aria-pressed={active === null}
        onClick={() => onSelect(null)}
      >
        {allLabel}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className="wq-filter-btn"
          aria-pressed={active === tag}
          onClick={() => onSelect(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
