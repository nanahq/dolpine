'use client';
import React, { useState } from 'react';
import { Placeholder } from './Placeholder';

export interface MenuItemVM {
  id: string;
  name: string;
  desc?: string;
  price: string;
  imageUrl?: string | null;
}
export interface MenuGroupVM {
  id: string;
  name: string;
  items: MenuItemVM[];
}

/** Category tabs + dish grid for a store menu. Client-side for the tab state. */
export function MenuTabs({ groups }: { groups: MenuGroupVM[] }) {
  const [active, setActive] = useState(groups[0]?.id ?? '');
  const current = groups.find((g) => g.id === active) ?? groups[0];

  if (!groups.length) {
    return (
      <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>
        This store hasn&apos;t published its menu yet.
      </p>
    );
  }

  return (
    <>
      <div className="no-scrollbar" style={{ display: 'flex', gap: 9, overflowX: 'auto', paddingBottom: 6, marginBottom: 24 }}>
        {groups.map((g) => {
          const selected = g.id === current?.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(g.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: 38,
                padding: '0 16px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                fontSize: 14,
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                cursor: 'pointer',
                border: selected ? '1.5px solid var(--color-primary)' : '1.5px solid var(--border-subtle)',
                background: selected ? 'var(--color-primary)' : '#fff',
                color: selected ? '#fff' : 'var(--text-body)',
                transition: 'all 160ms var(--ease-standard)',
              }}
            >
              {g.name}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(304px,1fr))', gap: 16 }}>
        {current?.items.map((item) => (
          <div key={item.id} style={{ display: 'flex', gap: 16, background: '#fff', borderRadius: 18, padding: 14, boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ flex: 'none', width: 96, height: 96, borderRadius: 14, overflow: 'hidden', background: 'var(--stone-100)' }}>
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Placeholder label="Dish" />
              )}
            </span>
            <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-strong)' }}>{item.name}</div>
              {item.desc ? (
                <p style={{ margin: '5px 0 0', fontSize: 13.5, lineHeight: 1.4, color: 'var(--text-muted)' }}>{item.desc}</p>
              ) : null}
              <div style={{ marginTop: 9, fontSize: 15, fontWeight: 700, color: 'var(--text-strong)' }}>{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
