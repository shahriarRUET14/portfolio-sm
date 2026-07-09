import { socialLinks } from '../portfolio';
import Button from './ui/Button';

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      {socialLinks.resume ? (
        <Button href={socialLinks.resume} variant="ghost" target="_blank" rel="noopener noreferrer">
          Resume
        </Button>
      ) : null}
      {socialLinks.linkedin ? (
        <Button href={socialLinks.linkedin} variant="ghost" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </Button>
      ) : null}
      {socialLinks.github ? (
        <Button href={socialLinks.github} variant="ghost" target="_blank" rel="noopener noreferrer">
          GitHub
        </Button>
      ) : null}
    </div>
  );
}
