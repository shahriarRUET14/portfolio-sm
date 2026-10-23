import { renderOgImage, ogSize } from '@/components/seo/og';
import { profile } from '@/content/profile';

export const alt = `${profile.name} — ${profile.role}`;
export const size = ogSize;
export const contentType = 'image/png';

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: `${profile.name} — ${profile.role}`,
    title: profile.headline,
    footer: 'Backend systems · Distributed architecture · FinTech & SaaS · AI',
  });
}
