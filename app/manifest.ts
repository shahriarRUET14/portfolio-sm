import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.name,
    description: profile.positioning,
    start_url: '/',
    display: 'browser',
    background_color: '#0b0c0b',
    theme_color: '#0b0c0b',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  };
}
