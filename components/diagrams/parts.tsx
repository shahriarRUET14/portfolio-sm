import type { ReactNode } from 'react';
import { ArrowDown } from '../icons';

export function DiagramFrame({
  title,
  caption,
  children,
  className = '',
}: {
  title: string;
  caption: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`border border-line bg-surface ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
        <span className="label">{title}</span>
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-1.5 w-1.5 bg-line-strong" />
          <span className="h-1.5 w-1.5 bg-line-strong" />
          <span className="h-1.5 w-1.5 bg-accent" />
        </span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
      <figcaption className="border-t border-line px-4 py-3 text-xs leading-relaxed text-muted sm:px-5">
        {caption}
      </figcaption>
    </figure>
  );
}

export function Layer({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="label mb-2 text-[0.6875rem] text-subtle">{label}</p>
      {children}
    </div>
  );
}

export function Node({
  children,
  emphasis = false,
  className = '',
}: {
  children: ReactNode;
  emphasis?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex min-h-[44px] items-center border px-3 py-2 text-[13px] leading-snug ${
        emphasis
          ? 'border-accent-ink/50 bg-accent/10 text-fg'
          : 'border-line-strong/70 bg-bg text-fg'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function Connector() {
  return (
    <div aria-hidden="true" className="flex justify-center py-2 text-subtle">
      <ArrowDown size={14} />
    </div>
  );
}
