'use server';

import { headers } from 'next/headers';
import { Resend } from 'resend';
import { profile } from '@/content/profile';
import {
  type ContactResult,
  type ContactValues,
  validateContact,
} from '@/lib/contact';

// Resend's shared test sender works until a domain is verified in Resend;
// it can only deliver to the email address that owns the Resend account.
const DEFAULT_FROM = 'Portfolio Contact <onboarding@resend.dev>';

const WINDOW_MS = 10 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_PER_CLIENT = 5; // per client, per 10 minutes
const MAX_BURST = 20; // whole site, per 10 minutes
// Keeps one instance under Resend's free plan (100 emails a day).
const MAX_PER_DAY = 50;
// Best-effort and per server instance: serverless instances don't share
// memory, and the client key comes from X-Forwarded-For, which a client can
// forge when no trusted proxy sets it. The site-wide caps bound that.
const recentByClient = new Map<string, number[]>();
let recentSiteWide: number[] = [];

function checkRateLimit(clientKey: string): 'client' | 'site' | null {
  const now = Date.now();
  const since = (ms: number, times: number[]) =>
    times.filter((time) => now - time < ms);

  // Drop idle clients so forged keys can't grow the map without bound.
  if (recentByClient.size > 1000) {
    for (const [client, times] of recentByClient) {
      if (since(WINDOW_MS, times).length === 0) recentByClient.delete(client);
    }
  }

  recentSiteWide = since(DAY_MS, recentSiteWide);
  if (
    recentSiteWide.length >= MAX_PER_DAY ||
    since(WINDOW_MS, recentSiteWide).length >= MAX_BURST
  ) {
    return 'site';
  }

  const recent = since(WINDOW_MS, recentByClient.get(clientKey) ?? []);
  if (recent.length >= MAX_PER_CLIENT) {
    recentByClient.set(clientKey, recent);
    return 'client';
  }
  recent.push(now);
  recentByClient.set(clientKey, recent);
  recentSiteWide.push(now);
  return null;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const singleLine = (value: string) => value.replace(/[\r\n]+/g, ' ');

type ContactInput = Partial<
  Record<keyof ContactValues | 'hp_confirm', unknown>
>;

export async function sendContactMessage(
  input: ContactInput
): Promise<ContactResult> {
  // Anyone can call this endpoint directly, so don't assume the shape.
  const data: ContactInput = input && typeof input === 'object' ? input : {};

  // Honeypot: the field is hidden from people, so only bots fill it in.
  if (String(data.hp_confirm ?? '').trim()) {
    return { ok: false, reason: 'unavailable' };
  }

  const values: ContactValues = {
    name: singleLine(String(data.name ?? '').trim()),
    email: String(data.email ?? '').trim(),
    message: String(data.message ?? '').trim(),
  };
  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { ok: false, reason: 'invalid', errors };
  }

  const requestHeaders = await headers();
  const clientIp =
    requestHeaders.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    requestHeaders.get('x-real-ip') ||
    'unknown';
  const limited = checkRateLimit(clientIp);
  if (limited) {
    return {
      ok: false,
      reason: limited === 'client' ? 'rate-limited' : 'busy',
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not set');
    return { ok: false, reason: 'unavailable' };
  }

  const { name, email, message } = values;
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
      to: process.env.CONTACT_TO_EMAIL || profile.email,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n— ${name} <${email}>`,
      html: `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>
<p>— ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
<p style="color:#666;font-size:12px">Sent from the contact form on your portfolio. Reply to this email to answer ${escapeHtml(
        name
      )} directly.</p>`,
    });
    if (error) {
      console.error(
        '[contact] Resend rejected the message:',
        error.name,
        error.message
      );
      return { ok: false, reason: 'unavailable' };
    }
    return { ok: true };
  } catch (err) {
    console.error('[contact] Could not reach Resend:', err);
    return { ok: false, reason: 'unavailable' };
  }
}
