type SectionHeadingProps = {
  id?: string;
  title: string;
  subtitle?: string;
  className?: string;
};

export default function SectionHeading({
  id,
  title,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <h2
        id={id}
        className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-2 text-base text-slate-600">{subtitle}</p>
      ) : null}
    </div>
  );
}
