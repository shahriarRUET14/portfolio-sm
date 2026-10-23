const monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function parseMonth(isoMonth: string) {
  const [year = 0, month = 1] = isoMonth.split('-').map(Number);
  return { year, month };
}

/** Whole years elapsed since a YYYY-MM month, e.g. "2020-03" → 6 in Oct 2026. */
export function yearsSince(isoMonth: string, now = new Date()) {
  const { year, month } = parseMonth(isoMonth);
  const months =
    (now.getUTCFullYear() - year) * 12 + (now.getUTCMonth() + 1 - month);
  return Math.max(0, Math.floor(months / 12));
}

/** "2020-03" → "Mar 2020" */
export function formatMonth(isoMonth: string) {
  const { year, month } = parseMonth(isoMonth);
  return monthFormatter.format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatRange(start: string, end?: string) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`;
}
