type ChipProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Chip({ children, className = '' }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ${className}`}
    >
      {children}
    </span>
  );
}
