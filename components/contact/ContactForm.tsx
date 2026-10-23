'use client';

import { type FormEvent, useId, useRef, useState } from 'react';
import { emailJsConfig } from '@/lib/contact';
import { ArrowRight } from '../icons';

type Field = 'name' | 'email' | 'message';
type Errors = Partial<Record<Field, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (values.name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_PATTERN.test(values.email))
    errors.email = 'Please enter a valid email address so I can reply.';
  if (values.message.length < 20)
    errors.message = 'A little more detail helps — at least 20 characters.';
  return errors;
}

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
    // Honeypot: real visitors never see or fill this field.
    if (String(data.get('company') ?? '').trim()) return;

    const values = {
      name: String(data.get('name') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      message: String(data.get('message') ?? '').trim(),
    };
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      form
        .querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)
        ?.focus();
      return;
    }

    setStatus('sending');
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          user_name: values.name,
          user_email: values.email,
          user_message: values.message,
        },
        emailJsConfig.publicKey
      );
      setStatus('sent');
      formRef.current?.reset();
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
          <label htmlFor={`${id}-company`}>Company website</label>
          <input
            id={`${id}-company`}
            name="company"
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
      {status === 'error' ? (
        <p role="alert" className="mt-4 border-l-2 border-danger pl-3 text-sm">
          The message couldn&apos;t be sent. Please email me directly at{' '}
          <a href={`mailto:${fallbackEmail}`} className="link">
            {fallbackEmail}
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
