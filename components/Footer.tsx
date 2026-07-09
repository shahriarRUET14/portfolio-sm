import { greetings, socialLinks } from '../portfolio';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="section-container flex flex-col items-center justify-between gap-4 py-10 sm:flex-row">
        <p className="text-sm text-slate-600">
          © {year} {greetings.name}. Built with Next.js.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.github ? (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-blue-700"
            >
              GitHub
            </a>
          ) : null}
          {socialLinks.linkedin ? (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-slate-600 hover:text-blue-700"
            >
              LinkedIn
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
