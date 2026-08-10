"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * The shell the editor opens in when you arrive from the post list.
 *
 * It is a real <dialog>, so the browser handles the top layer, the backdrop and
 * the focus trap rather than a div pretending. Closing goes through
 * router.back(), which is what makes the URL, the back button and a refresh all
 * agree: the modal is the intercepted route, so reloading on /admin/posts/<id>
 * lands on the full editor page instead of a modal with nothing behind it.
 */
export function EditorModal({ title, children }: { title: string; children: React.ReactNode }) {
  const router = useRouter();
  const ref = useRef<HTMLDialogElement>(null);

  const close = useCallback(() => router.back(), [router]);

  useEffect(() => {
    const el = ref.current;
    if (el && !el.open) el.showModal();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Esc fires `cancel`; preventing the default close keeps the dialog and the
    // history entry from parting ways.
    const onCancel = (e: Event) => {
      e.preventDefault();
      close();
    };
    el.addEventListener("cancel", onCancel);
    return () => el.removeEventListener("cancel", onCancel);
  }, [close]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-label={title}
      onClick={(e) => {
        // A click on the dialog element itself is a click on the backdrop; the
        // panel inside stops its own from reaching here.
        if (e.target === ref.current) close();
      }}
    >
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <header className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="modal-x" onClick={close} aria-label="Close">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </dialog>
  );
}
