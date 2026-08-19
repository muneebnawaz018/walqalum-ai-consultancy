"use client";

import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionaries/en";

type State = "idle" | "sending" | "sent" | "error";

/**
 * One field: an underlined control with its label sitting on the line until
 * there is something to read there.
 *
 * The label floats on focus and stays floated once the field has content. That
 * second half is what makes it a label rather than a placeholder — a
 * placeholder disappears the moment you type, and a filled form with no labels
 * cannot be checked over before sending.
 *
 * The state is CSS, not React: `:focus-within` covers the first case and
 * `:has(:not(:placeholder-shown))` the second, which is why every control
 * carries a single-space placeholder. Nothing to re-render, and it works
 * before hydration.
 */
function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="wq-fc">
      <div className="wq-fc-label">
        <label htmlFor={id}>
          {label}
          {/* Decoration, not information: the control itself carries `required`,
              which is what a screen reader announces. */}
          {required ? <span aria-hidden="true">*</span> : null}
        </label>
      </div>
      <div className="wq-fc-field">{children}</div>
    </div>
  );
}

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
      <div className="wq-fields">
        <Field id="name" label={t.name} required>
          <input
            id="name"
            name="name"
            required
            maxLength={160}
            autoComplete="name"
            placeholder=" "
          />
        </Field>

        <Field id="email" label={t.email} required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder=" "
          />
        </Field>

        <Field id="company" label={t.company}>
          <input
            id="company"
            name="company"
            maxLength={160}
            autoComplete="organization"
            placeholder=" "
          />
        </Field>

        <Field id="message" label={t.message} required>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={5000}
            required
            placeholder=" "
          />
        </Field>
      </div>

      <div className="wq-form-foot">
        <button
          type="submit"
          className="wq-cta wq-cta-lg"
          disabled={state === "sending"}
          data-magnetic="8"
        >
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
