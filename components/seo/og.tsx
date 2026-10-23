import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

const colors = {
  bg: '#0B0C0B',
  line: '#1E211E',
  fg: '#EDEBE6',
  muted: '#A0A39D',
  accent: '#C6F24E',
};

export function renderOgImage({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: colors.bg,
          backgroundImage: `linear-gradient(to right, ${colors.line} 1px, transparent 1px)`,
          backgroundSize: '100px 100%',
          color: colors.fg,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 22, height: 22, background: colors.accent }} />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: colors.muted,
            }}
          >
            {eyebrow}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 60 ? 60 : 72,
            lineHeight: 1.05,
            letterSpacing: -2,
            fontWeight: 600,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: `2px solid ${colors.accent}`,
            paddingTop: 24,
            fontSize: 24,
            color: colors.muted,
          }}
        >
          <div style={{ display: 'flex' }}>{footer}</div>
        </div>
      </div>
    ),
    ogSize
  );
}
