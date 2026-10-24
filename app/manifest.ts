import type { MetadataRoute } from 'next';
import { profile } from '@/content/profile';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.name,
    description: profile.positioning,
    start_url: '/',
    display: 'browser',
    background_color: '#f4f2ec',
    theme_color: '#f4f2ec',
    icons: [
      { src: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  };
}
