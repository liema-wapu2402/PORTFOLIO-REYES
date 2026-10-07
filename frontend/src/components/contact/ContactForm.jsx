import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { SITE } from '@/data/site';

/**
 * ContactForm
 * -----------
 * Sends the message to Formspree (SITE.formspreeEndpoint) with fetch(), so the
 * visitor stays on the page and sees a status message instead of being redirected.
 *
 * status: 'idle' | 'sending' | 'success' | 'error'
 *
 * Styling note: every input uses the `.field` class from index.css
 * (rounded border, theme-aware background, visible focus ring).
 * The hidden `_gotcha` input is a honeypot: bots fill it, people never see it,
 * and Formspree discards submissions where it has a value.
 */
export default function ContactForm() {
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');

    try {
      const response = await fetch(SITE.formspreeEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" className="field" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="field" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project or idea"
          className="field resize-y"
        />
      </div>

      {/* Honeypot (see note above) */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === 'sending'} className="btn-solid">
          {status === 'sending' ? (
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

        {/* aria-live announces the result to screen readers when it appears */}
        <p aria-live="polite" className="text-sm">
          {status === 'success' && <span className="text-foreground">Message sent. I will reply as soon as I can.</span>}
          {status === 'error' && (
            <span className="text-destructive">
              The message could not be sent. Please try again or email {SITE.email}.
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
