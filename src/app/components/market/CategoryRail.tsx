import React from 'react';
import type { IconName } from '@/lib/icons';
import { NanaIcon } from '../site/NanaIcon';

export type CatFilter = 'all' | 'food' | 'grocery' | 'pharmacy' | 'retail' | 'fast';

export const CATEGORIES: { key: CatFilter; label: string; icon?: IconName; glyph?: string; tint: string; ink: string }[] = [
  { key: 'all', label: 'All', icon: 'Grid01', tint: '#F4F5F6', ink: '#14181B' },
  { key: 'food', label: 'Restaurants', glyph: '♨\uFE0E', tint: '#EAF3FB', ink: '#1C6CA8' },
  { key: 'grocery', label: 'Groceries', icon: 'TabBarIconsIconsGrocery', tint: '#E7F5EC', ink: '#17703C' },
  { key: 'pharmacy', label: 'Pharmacy', glyph: '+', tint: '#FDECEC', ink: '#B42318' },
  { key: 'retail', label: 'Stores', icon: 'BagVariantsLinear', tint: '#F2ECFA', ink: '#6B3FA0' },
  { key: 'fast', label: 'Fastest', icon: 'IconsansBoldTimer', tint: '#E8F0F6', ink: '#14559A' },
];

type Props = {
  value: CatFilter;
  available: CatFilter[];
  onChange: (c: CatFilter) => void;
};

/** Round-cornered category tiles; the selected one gets the ink outline. */
export function CategoryRail({ value, available, onChange }: Props) {
  return (
    <div className="v-rail v-rise" style={{ gap: 10, paddingTop: 4, paddingBottom: 6, marginTop: -4, animationDelay: '.1s' }} role="tablist" aria-label="Categories">
      {CATEGORIES.filter((c) => available.includes(c.key)).map((c) => {
        const on = c.key === value;
        return (
          <button
            key={c.key}
            type="button"
            role="tab"
            aria-selected={on}
            onClick={() => onChange(c.key)}
            className="v-tap v-category"
            style={{ width: 'clamp(70px,18vw,84px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
          >
            <span
              className="v-category__tile"
              style={{
                width: 'clamp(62px,16vw,76px)',
                height: 'clamp(62px,16vw,76px)',
                borderRadius: 'clamp(18px,5vw,24px)',
                background: c.tint,
                color: c.ink,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: on ? 'inset 0 0 0 2.5px var(--ink)' : undefined,
              }}
            >
              {c.icon ? <NanaIcon name={c.icon} size={30} /> : <span style={{ fontSize: 38, fontWeight: 600, lineHeight: 1 }}>{c.glyph}</span>}
            </span>
            <span style={{ fontSize: 13, fontWeight: on ? 700 : 500, color: 'var(--text)', textAlign: 'center', lineHeight: 1.2 }}>{c.label}</span>
          </button>
        );
      })}
    </div>
  );
}
