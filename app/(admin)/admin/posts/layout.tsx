/**
 * Holds the @modal slot alongside the page.
 *
 * The editor is one component with two ways in: opened from the list it renders
 * into the slot as a dialog over the grid, and opened by URL or a refresh it
 * renders as its own page. Neither is a copy of the other.
 */
export default function PostsLayout({ children, modal }: LayoutProps<"/admin/posts">) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
