import { FormEvent, useEffect, useId, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { contact, socialLinks } from '../portfolio';
import SectionHeading from './ui/SectionHeading';
import Button from './ui/Button';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const phoneDigits = contact.phone.replace(/\D/g, '');
const whatsappUrl = `https://wa.me/${phoneDigits}`;

const inputClassName =
  'mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-colors focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700/20';

export default function ContactUs() {
  const formId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');

  useEffect(() => {
    if (!formOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFormOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [formOpen]);

  const openForm = () => {
    setStatus('idle');
    setFormOpen(true);
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || status === 'sending') return;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setStatus('success');
      formRef.current.reset();
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="section-anchor border-b border-slate-200 bg-white"
    >
      <div className="section-container">
        <SectionHeading
          title="Contact"
          subtitle="Open to senior engineering roles, FinTech platforms, and technical leadership conversations."
        />

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <button
              type="button"
              onClick={openForm}
              className="group flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 text-left transition-colors hover:border-blue-200 hover:bg-blue-50/40"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <MailIcon />
              </span>
              <span>
                <span className="block text-sm font-medium text-slate-500">
                  Email
                </span>
                <span className="mt-1 block text-base font-semibold text-slate-900 group-hover:text-blue-700">
                  {contact.email}
                </span>
              </span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-blue-200 hover:bg-blue-50/40"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <WhatsAppIcon />
              </span>
              <span>
                <span className="block text-sm font-medium text-slate-500">
                  WhatsApp or Phone
                </span>
                <span className="mt-1 block text-base font-semibold text-slate-900 group-hover:text-blue-700">
                  {contact.phone}
                </span>
              </span>
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button type="button" onClick={openForm}>
              Email Me
            </Button>
            {socialLinks.linkedin ? (
              <Button
                href={socialLinks.linkedin}
                variant="secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Button>
            ) : null}
            {socialLinks.github ? (
              <Button
                href={socialLinks.github}
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Button>
            ) : null}
          </div>

          {formOpen ? (
            <div
              className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              role="region"
              aria-labelledby={`${formId}-title`}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h3
                    id={`${formId}-title`}
                    className="text-lg font-semibold text-slate-900"
                  >
                    Send a message
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    Share your details and I&apos;ll get back to you by email.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  aria-label="Close contact form"
                >
                  <CloseIcon />
                </button>
              </div>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                <div>
                  <label
                    htmlFor={`${formId}-name`}
                    className="block text-sm font-medium text-slate-700"
                  >
                    Your name
                  </label>
                  <input
                    id={`${formId}-name`}
                    name="user_name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-email`}
                    className="block text-sm font-medium text-slate-700"
                  >
                    Email address
                  </label>
                  <input
                    id={`${formId}-email`}
                    name="user_email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className={inputClassName}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`${formId}-message`}
                    className="block text-sm font-medium text-slate-700"
                  >
                    Message
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    name="user_message"
                    required
                    rows={4}
                    placeholder="Tell me about the role or opportunity..."
                    className={`${inputClassName} resize-y`}
                  />
                </div>

                {status === 'success' ? (
                  <p
                    className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
                    role="status"
                  >
                    Message sent successfully. I&apos;ll reply soon.
                  </p>
                ) : null}
                {status === 'error' ? (
                  <p
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                    role="alert"
                  >
                    Something went wrong. Please try again or email me directly.
                  </p>
                ) : null}

                <div className="flex flex-wrap gap-3 pt-1">
                  <Button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setFormOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
