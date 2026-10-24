import type { ReactNode } from 'react';
import { profile } from '@/content/profile';
import ContactForm from '../contact/ContactForm';
import CopyEmail from '../contact/CopyEmail';
import LocalTime from '../contact/LocalTime';
import { ArrowUpRight, GitHub, LinkedIn, Mail } from '../icons';

function Channel({
  icon,
  label,
  href,
  value,
  external = false,
  action,
}: {
  icon: ReactNode;
  label: string;
  href: string;
  value: string;
  external?: boolean;
  action?: ReactNode;
}) {
  return (
    <li className="flex items-center gap-3 border-b border-line py-4">
      <span aria-hidden="true" className="text-subtle">
        {icon}
      </span>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="group flex min-h-[44px] flex-1 flex-col justify-center"
      >
        <span className="label text-subtle">{label}</span>
        <span className="mt-0.5 inline-flex items-center gap-1.5 break-all font-medium">
          <span className="link">{value}</span>
          {external ? (
            <ArrowUpRight size={14} className="arrow shrink-0 text-subtle" />
          ) : null}
        </span>
      </a>
      {action}
    </li>
  );
}

export default function Contact() {
  const whatsapp = profile.phone
    ? `https://wa.me/${profile.phone.replace(/\D/g, '')}`
    : null;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden py-20 lg:py-32"
    >
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <p className="label flex items-center gap-3">
            <span className="text-accent-ink">05</span>
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            <span>Contact</span>
          </p>
          <h2
            id="contact-title"
            className="mt-6 font-display text-h2 font-semibold"
          >
            Have a complex engineering problem worth solving?
          </h2>
          <p className="mt-6 max-w-prose text-lead text-muted">
            I&apos;m open to conversations about senior engineering
            opportunities, technically challenging products, and meaningful
            collaborations.
          </p>

          <ul className="mt-10 border-t border-line">
            <Channel
              icon={<Mail size={18} />}
              label="Email"
              href={`mailto:${profile.email}`}
              value={profile.email}
              action={<CopyEmail email={profile.email} />}
            />
            <Channel
              icon={<LinkedIn size={18} />}
              label="LinkedIn"
              href={profile.links.linkedin}
              value="in/shahriar-ruet14"
              external
            />
            <Channel
              icon={<GitHub size={18} />}
              label="GitHub"
              href={profile.links.github}
              value="shahriarRuet14"
              external
            />
            {whatsapp && profile.phone ? (
              <Channel
                icon={<span className="font-mono text-[11px]">WA</span>}
                label="WhatsApp"
                href={whatsapp}
                value={profile.phone}
                external
              />
            ) : null}
          </ul>

          <div className="mt-6">
            <LocalTime
              timeZone={profile.location.timeZone}
              city={profile.location.city}
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-14">
          <ContactForm fallbackEmail={profile.email} />
        </div>
      </div>
    </section>
  );
}
