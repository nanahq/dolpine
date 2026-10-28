import React from 'react';
import type { MonthlyMoney } from '@/lib/api/investor-metrics';
import { BarChart, Panel, Section, Stat } from './charts';
import { change, int, monthLabel, naira } from './fmt';

const MOM_MONTHS = 5;

/** Compounded monthly growth from `from` to `to` over `periods` steps, or null with no base. */
function cmgr(from: number | undefined, to: number | undefined, periods: number): string {
  if (!from || !to || periods < 1) return '—';
  const g = (Math.pow(to / from, 1 / periods) - 1) * 100;
  return `${g >= 0 ? '+' : '−'}${Math.abs(g).toFixed(1)}%`;
}

/** Month-on-month GMV and order growth for the last five full months. */
export function MomGrowth({ full }: { full: MonthlyMoney[] }) {
  // One extra month in front so the first row has something to compare against.
  const window = full.slice(-(MOM_MONTHS + 1));
  const rows = window.slice(1);
  const base = window[0];
  const last = rows[rows.length - 1];
  if (!last) return null;

  return (
    <Section title="Month-on-month growth" sub={`The last ${rows.length} full months, each compared with the month before.`}>
      <div className="im-grid">
        <Stat label="Avg monthly GMV growth" value={cmgr(base?.gmv, last.gmv, rows.length)} note={`Compounded, ${monthLabel(base.period)} → ${monthLabel(last.period)}`} />
        <Stat label="Avg monthly order growth" value={cmgr(base?.orders, last.orders, rows.length)} note={`Compounded, ${monthLabel(base.period)} → ${monthLabel(last.period)}`} />
      </div>
      <div className="im-grid im-grid--2">
        <Panel title="GMV and orders, month on month">
          <div className="im-scroll">
            <table className="im-table">
              <thead>
                <tr><th>Month</th><th>GMV</th><th>MoM</th><th>Orders</th><th>MoM</th></tr>
              </thead>
              <tbody>
                {rows.map((m, i) => (
                  <tr key={m.period}>
                    <td>{monthLabel(m.period)}</td>
                    <td>{naira(m.gmv)}</td>
                    <td>{change(window[i].gmv, m.gmv) || '—'}</td>
                    <td>{int(m.orders)}</td>
                    <td>{change(window[i].orders, m.orders) || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel title="GMV growth vs the month before">
          <BarChart
            bars={rows.map((m, i) => {
              const prev = window[i].gmv;
              const g = prev ? ((m.gmv - prev) / prev) * 100 : 0;
              return {
                label: monthLabel(m.period),
                value: g,
                tip: `${monthLabel(m.period)}: GMV ${change(prev, m.gmv) || '—'}, orders ${change(window[i].orders, m.orders) || '—'}`,
              };
            })}
          />
        </Panel>
      </div>
    </Section>
  );
}

/** Net cash out per month, from the ledger. */
export function CashBurn({ monthly, thisMonth }: { monthly: MonthlyMoney[]; thisMonth: string }) {
  const full = monthly.filter((m) => m.period !== thisMonth);
  const last = full[full.length - 1];
  const recent = full.slice(-3);
  const avg = recent.length ? recent.reduce((a, m) => a + m.net_burn, 0) / recent.length : 0;
  const mtd = monthly.find((m) => m.period === thisMonth);
  if (!last) return null;

  return (
    <Section
      title="Cash burn"
      sub="Net cash out of the business each month: everything Nana spent, including what the founder paid for directly, less the cash it took in. Below zero means cash grew that month."
    >
      <div className="im-grid">
        <Stat label={`Net burn · ${monthLabel(last.period)}`} value={naira(last.net_burn)} />
        <Stat label="3-month average burn" value={naira(avg)} note={`${monthLabel(recent[0].period)} – ${monthLabel(last.period)}`} />
        {mtd && <Stat label={`Net burn · ${monthLabel(mtd.period)} to date`} value={naira(mtd.net_burn)} />}
      </div>
      <Panel title="Net burn by month" sub="The hatched bar is month to date">
        <BarChart
          variant="burn"
          bars={monthly.map((m) => ({
            label: monthLabel(m.period),
            value: m.net_burn,
            partial: m.period === thisMonth,
            tip: m.net_burn >= 0 ? `${monthLabel(m.period)}: ${naira(m.net_burn)} burned` : `${monthLabel(m.period)}: cash grew ${naira(-m.net_burn)}`,
          }))}
        />
      </Panel>
    </Section>
  );
}
