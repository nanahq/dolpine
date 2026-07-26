import React from 'react';
import { ImageIcon } from 'lucide-react';

interface PlaceholderProps {
  /** Text shown inside the placeholder — mirrors the design's image-slot placeholder */
  label?: string;
  /** Optional rounding; parents usually clip, so this is only for standalone use */
  radius?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Stand-in for the design's <image-slot>. Real imagery gets dropped in later,
 * so this renders a labelled, on-brand grey tile that fills its container.
 */
export const Placeholder: React.FC<PlaceholderProps> = ({
  label,
  radius,
  className,
  style,
}) => {
  return (
    <div
      className={className}
      aria-label={label ? `Image placeholder: ${label}` : 'Image placeholder'}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 16,
        textAlign: 'center',
        background:
          'repeating-linear-gradient(135deg, var(--stone-100) 0 12px, var(--stone-200) 12px 13px)',
        color: 'var(--text-subtle)',
        borderRadius: radius,
        ...style,
      }}
    >
      <ImageIcon style={{ width: 22, height: 22, opacity: 0.8 }} />
      {label ? (
        <span
          style={{
            fontSize: 12.5,
            fontWeight: 600,
            lineHeight: 1.35,
            maxWidth: '90%',
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
};
