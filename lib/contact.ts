// Shared by the contact form (instant feedback) and the server action
// (the real check — anything sent to the server is untrusted).

export type ContactField = 'name' | 'email' | 'message';
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactResult =
  | { ok: true }
  | { ok: false; reason: 'invalid'; errors: ContactErrors }
  | { ok: false; reason: 'rate-limited' | 'busy' | 'unavailable' };

export const CONTACT_LIMITS = { name: 100, email: 254, message: 5000 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (values.name.length < 2) errors.name = 'Please enter your name.';
  else if (values.name.length > CONTACT_LIMITS.name)
    errors.name = `Please keep your name under ${CONTACT_LIMITS.name} characters.`;

  if (
    values.email.length > CONTACT_LIMITS.email ||
    !EMAIL_PATTERN.test(values.email)
  )
    errors.email = 'Please enter a valid email address so I can reply.';

  if (values.message.length < 20)
    errors.message = 'A little more detail helps — at least 20 characters.';
  else if (values.message.length > CONTACT_LIMITS.message)
    errors.message = `Please keep it under ${CONTACT_LIMITS.message} characters.`;

  return errors;
}
