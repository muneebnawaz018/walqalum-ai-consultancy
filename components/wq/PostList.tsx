"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TagFilter } from "@/components/wq/TagFilter";

/**
 * The insights index: one piece set large, the rest as dated rows.
 *
 * A newsroom is read by date, so the date leads every row in its own column
 * rather than sitting inside the headline as a byline. The topic beside it is
 * the same string the filter is built from, so a reader can see why a row
 * survived a filter without being told.
 *
 * The lead piece is the newest, not an editor's pick: there is nothing in the
 * content that marks one as featured, and inventing that flag would mean
 * maintaining it by hand for ever.
 */

export type PostCard = {
  slug: string;
  date: string;
  topic: string;
  title: string;
  href: string;
};

export function PostList({
  posts,
  allLabel,
  filterLabel,
  emptyLabel,
  readLabel,
}: {
  posts: PostCard[];
  allLabel: string;
  filterLabel: string;
  emptyLabel: string;
  /** The word the cursor carries over a headline. */
  readLabel: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const topics = useMemo(() => [...new Set(posts.map((p) => p.topic))], [posts]);
  const shown = active ? posts.filter((p) => p.topic === active) : posts;
  const [lead, ...rest] = shown;

  return (
    <>
      <TagFilter
        tags={topics}
        active={active}
        onSelect={setActive}
        allLabel={allLabel}
        label={filterLabel}
      />

      {lead ? (
        <Link
          href={lead.href}
          className="wq-post-lead"
          key={lead.slug}
          data-reveal=""
          data-cursor-label={readLabel}
        >
          <p className="wq-post-meta">
            <span>{lead.date}</span>
            <span className="wq-post-topic">{lead.topic}</span>
          </p>
          <h2>{lead.title}</h2>
          <span className="wq-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      ) : (
        <p className="wq-lede wq-empty">{emptyLabel}</p>
      )}

      <div className="wq-post-rows" key={active ?? "all"} data-reveal-group="">
        {rest.map((p) => (
          <Link
            key={p.slug}
            href={p.href}
            className="wq-post-row"
            data-cursor-label={readLabel}
          >
            <span className="wq-post-date">{p.date}</span>
            <span className="wq-post-topic">{p.topic}</span>
            <h3>{p.title}</h3>
            <span className="wq-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
