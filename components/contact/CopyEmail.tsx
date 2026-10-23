'use client';

import { useEffect, useState } from 'react';
import { Check, Copy } from '../icons';

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard access can be blocked; the mailto link next to this button still works.
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-line-strong text-muted transition-colors hover:border-fg hover:text-fg"
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
        title="Copy email address"
      >
        {copied ? <Check className="text-accent-ink" /> : <Copy />}
      </button>
      <span role="status" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </>
  );
}
