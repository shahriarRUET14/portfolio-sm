'use client';

import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  const timer = window.setInterval(callback, 30_000);
  return () => window.clearInterval(timer);
}

export default function LocalTime({
  timeZone,
  city,
}: {
  timeZone: string;
  city: string;
}) {
  const time = useSyncExternalStore(
    subscribe,
    () =>
      new Intl.DateTimeFormat('en', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone,
      }).format(new Date()),
    () => null
  );

  if (!time) return null;

  return (
    <p className="label text-subtle">
      Local time in {city}: <span className="text-fg">{time}</span>
    </p>
  );
}
