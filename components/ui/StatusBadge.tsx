export default function StatusBadge({ label = 'In progress' }) {
  return (
    <span className="inline-flex items-center gap-2 border border-accent-ink/50 px-2 py-0.5 text-accent-ink">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 bg-accent motion-safe:animate-pulse"
      />
      {label}
    </span>
  );
}
