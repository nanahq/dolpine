import React from 'react';
import type { InvestorSnapshot } from '@/lib/api/investor-metrics';
import { BarChart, Panel, Section } from './charts';
import { dayLabel, int, monthLabel, naira, pct } from './fmt';
import { MarketplaceHealth, Scorecard } from './Scorecard';
import { TractionSections } from './TractionSections';
import { CashBurn, MomGrowth } from './GrowthAndBurn';

export function Dashboard({ s }: { s: InvestorSnapshot }) {
  const thisMonth = s.as_of.slice(0, 7);
  const full = s.monthly.filter((m) => m.period !== thisMonth);
  const last = full[full.length - 1];
  const prev = full[full.length - 2];

  const ue = s.unit_economics;
  const revenue = ue.lines.filter((l) => l.type === 'revenue');
  const costs = ue.lines.filter((l) => l.type === 'cost');
  const sum = (ls: typeof ue.lines) => ls.reduce((a, l) => a + l.per_order, 0);
  const cmPerOrder = sum(revenue) - sum(costs);

  return (
    <>
      {last && <Scorecard s={s} last={last} prev={prev} cmPerOrder={cmPerOrder} />}

      <Section title="Growth" sub="Delivered orders only. Unpaid orders never reach these numbers. B2B is deliveries Nana runs for restaurants that pay Nana directly.">
        <div className="im-grid im-grid--2">
          <Panel title="Weekly orders" sub={`Last ${s.weekly.length} weeks; the hatched bar is the current week, still running`}>
            <BarChart
              bars={s.weekly.map((w, i) => ({
                label: dayLabel(w.period),
                value: w.orders,
                partial: i === s.weekly.length - 1,
                tip: `Week of ${dayLabel(w.period)}: ${int(w.orders)} orders (${int(w.b2b_orders)} B2B), ${naira(w.gmv)}`,
              }))}
            />
          </Panel>
          <Panel title="Monthly GMV" sub="The hatched bar is month to date">
            <BarChart
              bars={s.monthly.map((m) => ({
                label: monthLabel(m.period),
                value: m.gmv,
                partial: m.period === thisMonth,
                tip: `${monthLabel(m.period)}: ${naira(m.gmv)} from ${int(m.orders)} orders (B2B ${naira(m.b2b_gmv)})`,
              }))}
            />
          </Panel>
        </div>
      </Section>

      <MomGrowth full={full} />

      <Section
        title="Unit economics"
        sub="From Nana's double-entry ledger. Contribution is Nana's revenue minus every direct cost of fulfilling the order: rider pay and wages, fuel, payment fees, discounts, refunds and late-delivery credits. Overheads (salaries, rent, software) sit below this line."
      >
        <div className="im-grid im-grid--2">
          <Panel title="Contribution per order, by month" sub="Below zero means fulfilling orders cost more than they earned that month">
            <BarChart
              bars={s.monthly.map((m) => ({
                label: monthLabel(m.period),
                value: m.contribution_per_order,
                partial: m.period === thisMonth,
                tip: `${monthLabel(m.period)}: ${naira(m.contribution_per_order)}/order · revenue ${naira(m.gross_revenue)}, direct cost ${naira(m.direct_cost)}`,
              }))}
            />
          </Panel>
          <Panel title="Where an average order's money goes" sub={`${monthLabel(ue.from.slice(0, 7))} – ${monthLabel(ue.to.slice(0, 7))}, ${int(ue.orders)} orders`}>
            <div className="im-scroll">
              <table className="im-table">
                <thead>
                  <tr><th>Per order</th><th>₦</th><th>Total</th></tr>
                </thead>
                <tbody>
                  {revenue.map((l) => (
                    <tr key={l.account_code}><td>{l.account_name}</td><td>{naira(l.per_order)}</td><td>{naira(l.amount)}</td></tr>
                  ))}
                  <tr className="im-total"><td>Nana revenue</td><td>{naira(sum(revenue))}</td><td>{naira(revenue.reduce((a, l) => a + l.amount, 0))}</td></tr>
                  {costs.map((l) => (
                    <tr key={l.account_code}><td>− {l.account_name}</td><td>{naira(-l.per_order)}</td><td>{naira(-l.amount)}</td></tr>
                  ))}
                  <tr className="im-total"><td>Contribution</td><td>{naira(cmPerOrder)}</td><td>{naira(cmPerOrder * ue.orders)}</td></tr>
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        <Panel title="Monthly P&L" sub="Late credits: customers get 80% of the delivery fee back in their wallet when an order arrives after its promised time.">
          <div className="im-scroll">
            <table className="im-table">
              <thead>
                <tr>
                  <th>Month</th><th>Orders</th><th>GMV</th><th>Revenue</th><th>Take rate</th><th>Direct cost</th><th>Contribution</th><th>Per order</th><th>Late credits</th><th>Overheads</th><th>Net</th>
                </tr>
              </thead>
              <tbody>
                {s.monthly.map((m) => (
                  <tr key={m.period}>
                    <td>{monthLabel(m.period)}{m.period === thisMonth ? ' (MTD)' : ''}</td>
                    <td>{int(m.orders)}</td>
                    <td>{naira(m.gmv)}</td>
                    <td>{naira(m.gross_revenue)}</td>
                    <td>{m.gmv ? pct((m.gross_revenue / m.gmv) * 100, 1) : '—'}</td>
                    <td>{naira(m.direct_cost)}</td>
                    <td>{naira(m.contribution_margin)}</td>
                    <td>{naira(m.contribution_per_order)}</td>
                    <td>{m.late_refund_count ? `${naira(m.late_refund_total)} (${int(m.late_refund_count)})` : '—'}</td>
                    <td>{naira(m.opex)}</td>
                    <td>{naira(m.net_profit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </Section>

      <MarketplaceHealth monthly={s.marketplace.monthly} thisMonth={thisMonth} />

      <CashBurn monthly={s.monthly} thisMonth={thisMonth} />

      <TractionSections s={s} />
    </>
  );
}
