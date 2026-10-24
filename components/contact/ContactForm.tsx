'use client';

import { type FormEvent, useId, useRef, useState } from 'react';
import { sendContactMessage } from '@/app/actions/contact';
import {
  CONTACT_LIMITS,
  type ContactErrors,
  type ContactField,
  validateContact,
} from '@/lib/contact';
import { ArrowRight } from '../icons';

type Field = ContactField;
type Errors = ContactErrors;
type Status = 'idle' | 'sending' | 'sent' | 'rate-limited' | 'busy' | 'error';

const failureMessages: Partial<Record<Status, string>> = {
  'rate-limited':
    'Several messages were just sent from your network, so the form is paused for a few minutes.',
  busy: 'The form is receiving more messages than usual and is paused for now.',
  error: 'The message couldn’t be sent.',
};

const inputClass =
  'mt-2 block w-full border bg-bg px-3.5 py-3 text-[15px] text-fg placeholder:text-subtle transition-colors focus:border-accent-ink focus:outline-none focus:ring-1 focus:ring-accent-ink focus-visible:outline-none';

export default function ContactForm({
  fallbackEmail,
}: {
  fallbackEmail: string;
}) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const fieldId = (field: Field) => `${id}-${field}`;
  const errorId = (field: Field) => `${id}-${field}-error`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    };

    const focusFirstInvalid = (found: Errors) => {
      const first = (Object.keys(found) as Field[])[0];
      if (!first) return false;
      form
        .querySelector<HTMLElement>(`#${CSS.escape(fieldId(first))}`)
        ?.focus();
      return true;
    };

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    if (focusFirstInvalid(nextErrors)) return;

    setStatus('sending');
    try {
      // The server validates again and sends the email through Resend.
      const result = await sendContactMessage({
        ...values,
        hp_confirm: String(data.get('hp_confirm') ?? ''),
      });
      if (result.ok) {
        setStatus('sent');
        formRef.current?.reset();
      } else if (result.reason === 'invalid') {
        setStatus('idle');
        setErrors(result.errors);
        focusFirstInvalid(result.errors);
      } else {
        setStatus(result.reason === 'unavailable' ? 'error' : result.reason);
      }
    } catch {
      setStatus('error');
    }
  }

  const describedBy = (field: Field) =>
    errors[field] ? errorId(field) : undefined;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${id}-title`}
      className="relative border border-line bg-surface p-5 sm:p-8"
    >
      <h3 id={`${id}-title`} className="font-display text-xl font-semibold">
        Send a message
      </h3>
      <p className="mt-1 text-sm text-muted">
        It goes straight to my inbox. I reply by email.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId('name')} className="text-sm font-medium">
            Name
          </label>
          <input
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={CONTACT_LIMITS.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            className={`${inputClass} ${
              errors.name ? 'border-danger' : 'border-line-strong'
            }`}
          />
          {errors.name ? (
            <p id={errorId('name')} className="mt-2 text-sm text-danger">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor={fieldId('email')} className="text-sm font-medium">
            Email
          </label>
          <input
            id={fieldId('email')}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={CONTACT_LIMITS.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={`${inputClass} ${
              errors.email ? 'border-danger' : 'border-line-strong'
            }`}
          />
          {errors.email ? (
            <p id={errorId('email')} className="mt-2 text-sm text-danger">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={fieldId('message')} className="text-sm font-medium">
            What are you working on?
          </label>
          <textarea
            id={fieldId('message')}
            name="message"
            rows={5}
            required
            maxLength={CONTACT_LIMITS.message}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message')}
            className={`${inputClass} resize-y ${
              errors.message ? 'border-danger' : 'border-line-strong'
            }`}
          />
          {errors.message ? (
            <p id={errorId('message')} className="mt-2 text-sm text-danger">
              {errors.message}
            </p>
          ) : null}
        </div>
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px overflow-hidden"
        >
          {/* A name and label that browser autofill doesn't recognise, so
              only bots fill this in. */}
          <label htmlFor={`${id}-hp`}>Leave this field empty</label>
          <input
            id={`${id}-hp`}
            name="hp_confirm"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
          {status === 'sending' ? null : <ArrowRight className="arrow" />}
        </button>
        <div aria-live="polite" className="text-sm">
          {status === 'sent' ? (
            <p role="status" className="text-accent-ink">
              Thanks — your message was sent. I&apos;ll reply by email.
            </p>
          ) : null}
        </div>
      </div>
      {failureMessages[status] ? (
        <p role="alert" className="mt-4 border-l-2 border-danger pl-3 text-sm">
          {failureMessages[status]} Please email me directly at{' '}
          <a href={`mailto:${fallbackEmail}`} className="link">
            {fallbackEmail}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
