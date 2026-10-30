import React from 'react';
import type { InvestorSnapshot, MarketplaceMonth, MonthlyMoney } from '@/lib/api/investor-metrics';
import { Panel, Section, Stat } from './charts';
import { change, int, monthLabel, naira, pct } from './fmt';

const CAC_MONTHS = 3;

const signedPct = (v: number) => `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(0)}%`;
const minutes = (v: number) => (v ? `${Math.round(v)} min` : '—');

/**
 * The eighteen headline metrics, each for the last full month. `cmPerOrder` is the
 * unit-economics window's contribution per order, which LTV is built on.
 */
export function Scorecard({ s, last, prev, cmPerOrder }: { s: InvestorSnapshot; last: MonthlyMoney; prev?: MonthlyMoney; cmPerOrder: number }) {
  const thisMonth = s.as_of.slice(0, 7);
  const mk = s.marketplace.monthly.filter((m) => m.month !== thisMonth);
  const cur = mk.find((m) => m.month === last.period);
  const label = monthLabel(last.period);
  const vsPrev = (a: number | undefined, b: number) => (prev && a !== undefined ? `${change(a, b) || '—'} vs ${monthLabel(prev.period)}` : undefined);

  // The newest first-order month that has had a full 30 days to reorder.
  const repeat = [...mk].reverse().find((m) => m.repeat_eligible > 0);

  // CAC over a few months: one month's spend and sign-ups rarely line up.
  const cacWindow = mk.slice(-CAC_MONTHS);
  const spend = cacWindow.reduce((a, m) => a + m.acquisition_spend, 0);
  const acquired = cacWindow.reduce((a, m) => a + m.new_customers, 0);
  const cac = acquired ? spend / acquired : null;

  const { ltv } = s.marketplace;
  const ltvValue = ltv.customers ? ltv.orders_per_customer * cmPerOrder : null;
  const ltvCac = ltvValue !== null && cac ? ltvValue / cac : null;

  const tiles: Array<{ tag: string; label: string; value: string; note?: string }> = [
    { tag: 'Marketplace traction', label: `Monthly GMV · ${label}`, value: naira(last.gmv), note: vsPrev(prev?.gmv, last.gmv) },
    { tag: 'Transaction volume', label: `Completed orders · ${label}`, value: int(last.orders), note: vsPrev(prev?.orders, last.orders) },
    { tag: 'Monetisation', label: `Monthly revenue · ${label}`, value: naira(last.gross_revenue), note: vsPrev(prev?.gross_revenue, last.gross_revenue) },
    {
      tag: 'Growth trajectory',
      label: 'MoM GMV growth',
      value: prev?.gmv ? signedPct(((last.gmv - prev.gmv) / prev.gmv) * 100) : '—',
      note: prev ? `${monthLabel(prev.period)} → ${label}` : undefined,
    },
    { tag: 'Actual demand', label: 'Active transacting customers', value: cur ? int(cur.active_customers) : '—', note: `Ordered at least once in ${label}` },
    {
      tag: 'Retention',
      label: '30-day repeat purchase rate',
      value: repeat ? pct(repeat.repeat_30d_pct) : '—',
      note: repeat ? `${int(repeat.repeat_30d)} of ${int(repeat.repeat_eligible)} first-time customers from ${monthLabel(repeat.month)}` : undefined,
    },
    { tag: 'Customer frequency', label: 'Orders per customer', value: cur ? cur.orders_per_customer.toFixed(1) : '—', note: `Per active customer, ${label}` },
    { tag: 'Transaction value', label: 'Average order value', value: last.orders ? naira(last.gmv / last.orders) : '—', note: label },
    { tag: 'Monetisation efficiency', label: 'Take rate', value: last.gmv ? pct((last.gross_revenue / last.gmv) * 100, 1) : '—', note: `Nana revenue ÷ GMV, ${label}` },
    { tag: 'Unit economics', label: 'Contribution / order', value: naira(last.contribution_per_order), note: `${pct(last.contribution_margin_pct)} of Nana revenue, ${label}` },
    {
      tag: 'Acquisition efficiency',
      label: 'CAC',
      value: cac === null ? '—' : naira(cac),
      note: cacWindow.length ? `${naira(spend)} on marketing and ambassadors ÷ ${int(acquired)} new customers, ${monthLabel(cacWindow[0].month)} – ${monthLabel(cacWindow[cacWindow.length - 1].month)}` : undefined,
    },
    {
      tag: 'Long-term economics',
      label: 'LTV / CAC',
      value: ltvCac === null ? '—' : `${ltvCac < 0 ? '−' : ''}${Math.abs(ltvCac).toFixed(1)}×`,
      note: ltvValue === null ? undefined : `${ltv.window_days}-day LTV ${naira(ltvValue)}: ${ltv.orders_per_customer.toFixed(1)} orders × ${naira(cmPerOrder)} contribution`,
    },
    { tag: 'Operational reliability', label: 'On-time delivery rate', value: cur?.on_time_scored ? pct(cur.on_time_pct) : '—', note: cur ? `${int(cur.on_time)} of ${int(cur.on_time_scored)} delivered by the promised time` : undefined },
    { tag: 'Delivery promise', label: 'Average fulfilment time', value: minutes(cur?.fulfilment_avg_minutes ?? 0), note: cur ? `Payment to doorstep · median ${minutes(cur.fulfilment_median_minutes)}` : undefined },
    { tag: 'Supply density', label: 'Active merchants', value: cur ? int(cur.active_merchants) : '—', note: `With a delivered order in ${label}` },
    { tag: 'Marketplace productivity', label: 'Orders per active merchant', value: cur ? cur.orders_per_merchant.toFixed(1) : '—', note: label },
    { tag: 'Sustainable growth', label: 'Organic acquisition', value: cur?.new_customers ? pct(cur.organic_pct) : '—', note: cur ? `${int(cur.organic_new_customers)} of ${int(cur.new_customers)} new customers had no referral or ambassador code` : undefined },
    { tag: 'Operational quality', label: 'Cancellation rate', value: cur ? pct(cur.cancellation_pct, 1) : '—', note: cur ? `${int(cur.cancelled)} paid orders cancelled in ${label}` : undefined },
  ];

  return (
    <div className="im-grid">
      {tiles.map((t) => (
        <Stat key={t.label} tag={t.tag} label={t.label} value={t.value} note={t.note} />
      ))}
    </div>
  );
}

/** The new marketplace series by month, so each headline tile can be read as a trend. */
export function MarketplaceHealth({ monthly, thisMonth }: { monthly: MarketplaceMonth[]; thisMonth: string }) {
  if (!monthly.length) return null;
  return (
    <Section
      title="Marketplace health"
      sub="Consumer orders only for customers, repeat and fulfilment; merchants and cancellations include B2B. 30-day repeat is grouped by the month of a customer's first order and only counts customers who have had 30 days since. Organic means the new customer redeemed no referral or ambassador code."
    >
      <Panel title="By month">
        <div className="im-scroll">
          <table className="im-table">
            <thead>
              <tr>
                <th>Month</th><th>Active customers</th><th>Orders / customer</th><th>30-day repeat</th><th>On time</th>
                <th>Avg fulfilment</th><th>Median</th><th>Merchants</th><th>Orders / merchant</th><th>New customers</th>
                <th>Organic</th><th>Cancelled</th><th>Acquisition spend</th><th>CAC</th>
              </tr>
            </thead>
            <tbody>
              {monthly.map((m) => (
                <tr key={m.month}>
                  <td>{monthLabel(m.month)}{m.month === thisMonth ? ' (MTD)' : ''}</td>
                  <td>{int(m.active_customers)}</td>
                  <td>{m.orders_per_customer.toFixed(1)}</td>
                  <td>{m.repeat_eligible ? pct(m.repeat_30d_pct) : '—'}</td>
                  <td>{m.on_time_scored ? pct(m.on_time_pct) : '—'}</td>
                  <td>{minutes(m.fulfilment_avg_minutes)}</td>
                  <td>{minutes(m.fulfilment_median_minutes)}</td>
                  <td>{int(m.active_merchants)}</td>
                  <td>{m.orders_per_merchant.toFixed(1)}</td>
                  <td>{int(m.new_customers)}</td>
                  <td>{m.new_customers ? pct(m.organic_pct) : '—'}</td>
                  <td>{pct(m.cancellation_pct, 1)}</td>
                  <td>{naira(m.acquisition_spend)}</td>
                  <td>{m.new_customers ? naira(m.cac) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </Section>
  );
}
