'use client';

import React, { useState } from 'react';
import { formatNaira } from '@/lib/format';
import type { CookDayDish } from '@/lib/homemade';
import { Modal } from '../../components/shop/Modal';
import { unitPrice } from './kitchen-cart';

type Props = { dish: CookDayDish; onClose: () => void; onAdd: (choiceIds: string[]) => void };

/** Picks for a dish with option groups: exactly one per "one" group, any per "any" group. */
export function OptionsSheet({ dish, onClose, onAdd }: Props) {
  const [picked, setPicked] = useState<string[]>([]);
  const ready = dish.option_groups.every((g) => g.type === 'any' || g.choices.some((c) => picked.includes(c.id)));

  const toggle = (groupId: string, choiceId: string) => {
    const group = dish.option_groups.find((g) => g.id === groupId)!;
    setPicked((cur) => {
      if (group.type === 'any') return cur.includes(choiceId) ? cur.filter((id) => id !== choiceId) : [...cur, choiceId];
      const others = group.choices.map((c) => c.id);
      return [...cur.filter((id) => !others.includes(id)), choiceId];
    });
  };

  return (
    <Modal onClose={onClose} label={dish.name} variant="sheet" width={520}>
      <div style={{ overflowY: 'auto', padding: '24px 22px 8px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-.02em' }}>{dish.name}</span>
          {dish.description && <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.45 }}>{dish.description}</span>}
        </div>
        {dish.option_groups.map((g) => (
          <fieldset key={g.id} style={{ border: 0, padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <legend style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
              {g.name} <span style={{ fontWeight: 400, color: 'var(--subtle)' }}>· {g.type === 'one' ? 'choose one' : 'optional'}</span>
            </legend>
            <div style={{ borderRadius: 16, boxShadow: 'inset 0 0 0 1px var(--line)', overflow: 'hidden' }}>
              {g.choices.map((c) => {
                const on = picked.includes(c.id);
                return (
                  <button key={c.id} type="button" className="v-choice-row" style={{ width: '100%' }} onClick={() => toggle(g.id, c.id)} aria-pressed={on}>
                    <span style={{ width: 22, height: 22, borderRadius: g.type === 'one' ? 999 : 6, flexShrink: 0, background: on && g.type === 'any' ? 'var(--blue)' : '#fff', boxShadow: on ? (g.type === 'one' ? 'inset 0 0 0 7px var(--blue)' : 'none') : 'inset 0 0 0 1.5px var(--faint)', color: '#fff', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {on && g.type === 'any' ? '✓' : null}
                    </span>
                    <span style={{ flex: 1, textAlign: 'left', fontSize: 15 }}>{c.name}</span>
                    <span className="v-num" style={{ fontSize: 14, color: 'var(--muted)' }}>
                      {c.price ? `+${formatNaira(c.price)}` : 'Included'}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <div style={{ padding: '14px 22px 22px', boxShadow: 'inset 0 1px 0 var(--line)' }}>
        <button type="button" className="v-btn v-btn--blue v-btn--block" disabled={!ready} onClick={() => onAdd(picked)}>
          Add plate · {formatNaira(unitPrice(dish, picked))}
        </button>
      </div>
    </Modal>
  );
}
