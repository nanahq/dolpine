/* eslint-disable @next/next/no-img-element -- merchant images come from several CDNs; plain <img> avoids remotePatterns upkeep */
import React from 'react';

type Props = {
  src: string | null;
  name: string;
  style?: React.CSSProperties;
  glyphSize?: number;
  children?: React.ReactNode;
};

/** A product photo, or the design's grey tile with the first letter when there isn't one. */
export function ProductImage({ src, name, style, glyphSize = 60, children }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 18,
        background: 'var(--fill)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        ...style,
      }}
    >
      {src ? (
        <img src={src} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span className="v-display v-display--black" style={{ fontSize: glyphSize, color: '#D4D9DD' }}>
          {name.trim()[0] ?? '·'}
        </span>
      )}
      {children}
    </div>
  );
}
