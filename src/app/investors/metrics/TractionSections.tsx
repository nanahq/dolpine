import React from 'react';
import type { InvestorSnapshot } from '@/lib/api/investor-metrics';
import { BarChart, Panel, Section, Stat, heat } from './charts';
import { int, monthLabel, pct } from './fmt';

export function TractionSections({ s }: { s: InvestorSnapshot }) {
  const thisMonth = s.as_of.slice(0, 7);
  const offsets = s.retention[0]?.retained_pct.length ?? 0;
  const ceiling = Math.max(30, ...s.retention.flatMap((c) => c.retained_pct.filter((v): v is number => v !== null)));
  const c = s.customers;

  return (
    <>
      <Section title="Customers" sub="A customer counts once they have a delivered order. Registered means signed up in the app.">
        <div className="im-grid">
          <Stat label="Registered" value={int(c.registered)} />
          <Stat label="Ever ordered" value={int(c.ordered)} note={`${pct(c.ordered_pct)} of registered`} />
          <Stat label="Ordered 2+ times" value={int(c.repeat)} note={`${pct(c.repeat_pct)} of those who ordered`} />
        </div>
        <div className="im-grid im-grid--2">
          <Panel title="Active customers by month" sub="Customers with at least one delivered order that month">
            <BarChart
              bars={c.monthly.map((m) => ({
                label: monthLabel(m.month),
                value: m.active_customers,
                partial: m.month === thisMonth,
                tip: `${monthLabel(m.month)}: ${int(m.active_customers)} active, ${int(m.new_customers)} new`,
              }))}
            />
          </Panel>
          <Panel title="Sign-up to first order" sub="Of each month's sign-ups, how many have had an order delivered">
            <div className="im-scroll">
              <table className="im-table">
                <thead>
                  <tr><th>Signed up</th><th>Sign-ups</th><th>Within 30 days</th><th>Ever</th></tr>
                </thead>
                <tbody>
                  {s.conversion.map((m) => (
                    <tr key={m.month}>
                      <td>{monthLabel(m.month)}</td>
                      <td>{int(m.signups)}</td>
                      <td>{pct(m.ordered_30d_pct)} <span style={{ color: 'var(--subtle)' }}>({int(m.ordered_30d)})</span></td>
                      <td>{pct(m.ordered_pct)} <span style={{ color: 'var(--subtle)' }}>({int(m.ordered)})</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </Section>

      <Section
        title="Retention"
        sub="Customers grouped by the month of their first order. Each cell is the share of that group who ordered again in a later month. The latest column for each group is a month still in progress."
      >
        <Panel title="Monthly retention by first-order cohort">
          <div className="im-scroll">
            <table className="im-table" style={{ borderCollapse: 'separate', borderSpacing: 2 }}>
              <thead>
                <tr>
                  <th>First order</th><th>Customers</th>
                  {Array.from({ length: offsets }, (_, i) => <th key={i} style={{ textAlign: 'center' }}>M+{i + 1}</th>)}
                </tr>
              </thead>
              <tbody>
                {s.retention.map((row) => (
                  <tr key={row.cohort}>
                    <td style={{ border: 0 }}>{monthLabel(row.cohort)}</td>
                    <td style={{ border: 0 }}>{int(row.size)}</td>
                    {row.retained_pct.map((v, i) => (
                      <td key={i} style={{ border: 0, padding: 0 }}>
                        {v === null ? null : <div className="im-cell" style={heat(v, ceiling)}>{pct(v)}</div>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </Section>

      <Section
        title="Rider density"
        sub="Drops per rider-day. Paid days are days Nana paid a salaried rider's daily wage, whether or not they delivered. Idle paid days are the cost of capacity running ahead of demand."
      >
        <div className="im-grid im-grid--2">
          <Panel title="Drops per paid rider-day" sub="The number that has to rise for unit economics to hold as we grow">
            <BarChart
              bars={s.riders.map((r) => ({
                label: monthLabel(r.month),
                value: r.drops_per_wage_day,
                partial: r.month === thisMonth,
                tip: `${monthLabel(r.month)}: ${r.drops_per_wage_day.toFixed(1)} drops/paid day · ${int(r.idle_wage_days)} idle of ${int(r.wage_days)} paid days`,
              }))}
            />
          </Panel>
          <Panel title="Riders by month">
            <div className="im-scroll">
              <table className="im-table">
                <thead>
                  <tr><th>Month</th><th>Riders</th><th>Drops</th><th>Per active day</th><th>Paid days</th><th>Per paid day</th><th>Idle paid</th></tr>
                </thead>
                <tbody>
                  {s.riders.map((r) => (
                    <tr key={r.month}>
                      <td>{monthLabel(r.month)}{r.month === thisMonth ? ' (MTD)' : ''}</td>
                      <td>{int(r.active_riders)}</td>
                      <td>{int(r.drops)}</td>
                      <td>{r.drops_per_active_rider_day.toFixed(1)}</td>
                      <td>{int(r.wage_days)}</td>
                      <td>{r.wage_days ? r.drops_per_wage_day.toFixed(1) : '—'}</td>
                      <td>{r.wage_days ? pct((r.idle_wage_days / r.wage_days) * 100) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </Section>

      <Section title="How to read these numbers">
        <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, color: 'var(--muted)', fontSize: 15, lineHeight: 1.55, maxWidth: 820 }}>
          <li>Money comes from Nana&apos;s double-entry ledger, the same books finance closes. Orders and GMV are counted when the order is delivered.</li>
          <li>Payment-gateway fees before August 2026 are incomplete in the ledger, so contribution in earlier months is slightly overstated.</li>
          <li>All figures are Kano. Zone-level splits are not shown yet because zones are not formally defined.</li>
          <li>Rider online hours aren&apos;t recorded reliably, so density is measured per rider-day, not per hour.</li>
        </ul>
      </Section>
    </>
  );
}
