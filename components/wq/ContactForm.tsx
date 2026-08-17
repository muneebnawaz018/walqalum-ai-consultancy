"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";

type State = "idle" | "sending" | "sent" | "error";

/**
 * The enquiry form.
 *
 * Posts the same payload shape `/api/enquiries` already validates, so the
 * endpoint and its zod schema are untouched by the redesign.
 *
 * Validation is left to the browser's own constraints plus the server's schema
 * rather than duplicated in a third place — the server is the one that decides,
 * and a client-side copy only drifts.
 */
export function ContactForm({ t }: { t: Dictionary["form"] }) {
  const [state, setState] = useState<State>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setState("sending");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(f.get("name") || ""),
          email: String(f.get("email") || ""),
          company: String(f.get("company") || ""),
          message: String(f.get("message") || ""),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState("sent");
      form.reset();
    } catch {
      setState("error");
    }
  }

  /* Once sent, the form is replaced rather than cleared and left sitting there:
     an empty form after submitting reads as though nothing happened. */
  if (state === "sent") {
    return (
      <div className="wq-form-done" role="status">
        <h2>{t.doneTitle}</h2>
        <p>{t.doneBody}</p>
      </div>
    );
  }

  return (
    <form className="wq-form" onSubmit={onSubmit} noValidate={false}>
      <div className="wq-field">
        <label htmlFor="name">{t.name}</label>
        <input id="name" name="name" required maxLength={160} autoComplete="name" />
      </div>
      <div className="wq-field">
        <label htmlFor="email">{t.email}</label>
        <input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="wq-field">
        <label htmlFor="company">{t.company}</label>
        <input id="company" name="company" maxLength={160} autoComplete="organization" />
      </div>
      <div className="wq-field">
        <label htmlFor="message">{t.message}</label>
        <textarea id="message" name="message" rows={5} maxLength={5000} />
      </div>

      <div className="wq-form-foot">
        <button type="submit" className="wq-cta wq-cta-lg" disabled={state === "sending"}>
          {state === "sending" ? t.sending : t.submit}
        </button>
        {/* Announced when it appears, so a screen-reader user is told the send
            failed rather than left waiting on a button that stopped saying
            "Sending". */}
        {state === "error" ? (
          <p className="wq-form-error" role="alert">
            {t.error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
