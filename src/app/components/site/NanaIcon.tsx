import React from 'react';
import { ICONS, type IconName } from '@/lib/icons';

type Props = {
  name: IconName;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
};

/** The design system's icon set, inlined as SVG so it renders on the server. */
export function NanaIcon({ name, size = 24, style, className }: Props) {
  const icon = ICONS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox={icon.viewBox}
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', flexShrink: 0, overflow: 'visible', ...style }}
      dangerouslySetInnerHTML={{ __html: icon.body }}
    />
  );
}

/** The design uses one chevron rotated four ways. */
export function Chevron({ dir = 'down', size = 12, style }: { dir?: 'down' | 'up' | 'left' | 'right'; size?: number; style?: React.CSSProperties }) {
  const deg = { down: 0, up: 180, left: 90, right: -90 }[dir];
  return <NanaIcon name="ArrowDownVariantsLinear" size={size} style={{ transform: `rotate(${deg}deg)`, ...style }} />;
}
