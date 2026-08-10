import Image from "next/image";
import type { ReactNode } from "react";

/**
 * A post body, rendered from markdown to React elements rather than to an HTML
 * string. React escapes text nodes on its own, so nothing the newsroom types
 * can become markup — sanitising happens by construction, and the stored text
 * is never rewritten.
 */
const INLINE = /(\*\*.+?\*\*|\[[^\]]+\]\((?:https?:\/\/[^\s)]+|\/[^\s)]*)\))/g;

function inline(text: string, key: string): ReactNode[] {
  return text
    .split(INLINE)
    .filter(Boolean)
    .map((part, i) => {
      const bold = part.match(/^\*\*([\s\S]+)\*\*$/);
      if (bold) return <strong key={`${key}-${i}`}>{bold[1]}</strong>;

      const link = part.match(/^\[([^\]]+)\]\((.+)\)$/);
      if (link) {
        const external = link[2].startsWith("http");
        return (
          <a key={`${key}-${i}`} href={link[2]} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
            {link[1]}
          </a>
        );
      }

      // Single newlines inside a paragraph are line breaks, not new paragraphs.
      return part.split("\n").map((line, j) => (
        <span key={`${key}-${i}-${j}`}>
          {j ? <br /> : null}
          {line}
        </span>
      ));
    });
}

export function PostBody({ markdown }: { markdown: string }) {
  const blocks = markdown.split(/\n{2,}/).filter((b) => b.trim());

  return (
    <>
      {blocks.map((raw, i) => {
        const block = raw.trim();
        const key = `b${i}`;

        const image = block.match(/^!\[([^\]]*)\]\((\/api\/images\/[a-f0-9]{24}|https:\/\/[^\s)]+)\)$/);
        if (image) {
          return (
            <figure className="post-figure" key={key}>
              <Image src={image[2]} alt={image[1]} fill sizes="(max-width: 900px) 100vw, 42rem" />
              {image[1] ? <figcaption>{image[1]}</figcaption> : null}
            </figure>
          );
        }

        const heading = block.match(/^(#{2,4})\s+([\s\S]+)$/);
        if (heading) {
          const Tag = `h${heading[1].length}` as "h2" | "h3" | "h4";
          return <Tag key={key}>{heading[2]}</Tag>;
        }

        if (/^>\s+/.test(block)) return <blockquote key={key}>{block.replace(/^>\s+/gm, "")}</blockquote>;

        if (/^[-*]\s+/.test(block)) {
          return (
            <ul key={key}>
              {block.split("\n").map((line, j) => (
                <li key={`${key}-${j}`}>{inline(line.replace(/^[-*]\s+/, ""), `${key}-${j}`)}</li>
              ))}
            </ul>
          );
        }

        return <p key={key}>{inline(block, key)}</p>;
      })}
    </>
  );
}
