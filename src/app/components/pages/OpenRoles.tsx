'use client';

import React, { useState } from 'react';
import { CAREERS_EMAIL } from '@/lib/site';
import { Chips } from './PageParts';

export interface Role {
  title: string;
  team: string;
  location: string;
  description: string;
}

/** Team filter plus an accordion of roles, each with a pre-filled application email. */
export function OpenRoles({ roles }: { roles: Role[] }) {
  const teams = ['All', ...Array.from(new Set(roles.map((r) => r.team)))];
  const [team, setTeam] = useState('All');
  const [open, setOpen] = useState<string | null>(null);
  const shown = roles.filter((r) => team === 'All' || r.team === team);

  return (
    <section className="v-wrap" style={{ paddingTop: 60, paddingBottom: 140, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
        <h2 className="v-h2">Open roles</h2>
        <span className="v-num" style={{ fontSize: 15, color: 'var(--muted)' }}>
          {shown.length} open {shown.length === 1 ? 'role' : 'roles'}
        </span>
      </div>
      <Chips
        options={teams}
        value={team}
        onChange={(t) => {
          setTeam(t);
          setOpen(null);
        }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', boxShadow: 'inset 0 1px 0 var(--line)' }}>
        {shown.map((r) => {
          const isOpen = open === r.title;
          return (
            <div key={r.title} style={{ boxShadow: 'inset 0 -1px 0 var(--line)' }}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : r.title)}
                className="v-tap v-role-btn"
                style={{ width: '100%', padding: '26px 4px', display: 'flex', alignItems: 'center', gap: 20 }}
              >
                <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                  <span style={{ fontSize: 'clamp(20px,2.2vw,26px)', fontWeight: 600, letterSpacing: '-.015em' }}>{r.title}</span>
                  <span style={{ fontSize: 15, color: 'var(--muted)' }}>
                    {r.team} · {r.location} · Full-time
                  </span>
                </span>
                <span style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--fill)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen && (
                <div className="v-rise" style={{ padding: '0 4px 28px', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-start', animationDuration: '.4s' }}>
                  <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, maxWidth: 720 }}>{r.description}</p>
                  <a href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(`Application: ${r.title}`)}`} className="v-btn v-btn--blue" style={{ height: 50 }}>
                    Apply for this role
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p style={{ margin: 0, fontSize: 15, color: 'var(--muted)' }}>
        Don’t see your role? Write to <a href={`mailto:${CAREERS_EMAIL}`}>{CAREERS_EMAIL}</a>.
      </p>
    </section>
  );
}
