import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { SITE } from "@/data/site";

/**
 * ContactForm
 * -----------
 * Sends the message to Formspree (SITE.formspreeEndpoint) with fetch(), so the
 * visitor stays on the page and sees a status message instead of being redirected.
 *
 * status: 'idle' | 'sending' | 'success' | 'error'
 *
 * - Every input uses the `.field` class from index.css.
 * - `_gotcha` is a honeypot: bots fill it, people never see it, and Formspree
 *   discards submissions where it has a value.
 * - `_subject` sets the subject line of the email Formspree sends to you.
 * - Editing the form after a success/error message clears that message.
 */
export default function ContactForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");

    try {
      const response = await fetch(SITE.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error("Request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const clearStatus = () => {
    if (status === "success" || status === "error") setStatus("idle");
  };

  return (
    <form onSubmit={handleSubmit} onChange={clearStatus} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Juan Dela Cruz"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell me about your project, opportunity, or question"
          className="field min-h-36 resize-y"
        />
      </div>

      {/* Hidden fields (see note above) */}
      <input
        type="hidden"
        name="_subject"
        value="New message from my portfolio"
      />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn-solid w-full justify-center sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send message
              <Send className="size-4" />
            </>
          )}
        </button>

        {/* role="status" + aria-live announce the result to screen readers */}
        <div role="status" aria-live="polite" className="text-sm sm:flex-1">
          {status === "success" && (
            <p className="flex items-start gap-2 text-foreground">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
              Message sent. I will reply as soon as I can.
            </p>
          )}
          {status === "error" && (
            <p className="flex items-start gap-2 text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>
                The message could not be sent. Please try again or email{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline underline-offset-2"
                >
                  {SITE.email}
                </a>
                .
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
