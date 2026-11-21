'use client';

import React, { useEffect, useState } from 'react';
import { formatNaira } from '@/lib/format';
import type { CookDay, CookDayDish, KitchenPage } from '@/lib/homemade';
import type { WebSession } from '@/lib/checkout/session';
import { OptionsSheet } from './OptionsSheet';
import { NotifyCard } from './NotifyCard';
import { cutoffLabel, dayLabels, lineKey, platesOf, priceCart, type KitchenCart } from './kitchen-cart';

type Props = {
  data: KitchenPage;
  cart: KitchenCart | null;
  setCart: (c: KitchenCart | null) => void;
  priced: ReturnType<typeof priceCart>;
  onContinue: () => void;
  session: WebSession | null;
  setSession: (s: WebSession | null) => void;
  onFollowChange: () => void;
};

export function KitchenMenu({ data, cart, setCart, priced, onContinue, session, setSession, onFollowChange }: Props) {
  const { kitchen, fees } = data;
  const days = data.cook_days;
  const [tabId, setTabId] = useState(() => cart?.dayId ?? days.find((d) => d.status === 'open')?.id ?? days[0]?.id);
  const [optionsFor, setOptionsFor] = useState<CookDayDish | null>(null);
  const now = useNow();
  const tab = days.find((d) => d.id === tabId) ?? days[0];
  const cook = kitchen.cook_name ?? kitchen.name;

  useEffect(() => {
    if (cart?.dayId && days.some((d) => d.id === cart.dayId)) setTabId(cart.dayId);
    // Only when a saved cart first loads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart?.dayId]);

  const cartDay = days.find((d) => d.id === cart?.dayId);
  const clash = !!cart && !!tab && cart.dayId !== tab.id && priced.plates > 0;

  // Adding from a different cook day replaces the order; the banner above the dishes says so first.
  const add = (dish: CookDayDish, choiceIds: string[]) => {
    if (!tab) return;
    const base = cart && cart.dayId === tab.id ? cart.lines : [];
    const k = lineKey({ dishId: dish.id, choiceIds });
    const hit = base.find((l) => lineKey(l) === k);
    const lines = hit ? base.map((l) => (l === hit ? { ...l, qty: l.qty + 1 } : l)) : [...base, { dishId: dish.id, choiceIds, qty: 1 }];
    setCart({ dayId: tab.id, lines });
  };

  const removeOne = (dish: CookDayDish) => {
    if (!cart) return;
    const idx = cart.lines.map((l) => l.dishId).lastIndexOf(dish.id);
    if (idx < 0) return;
    const lines = cart.lines.map((l, i) => (i === idx ? { ...l, qty: l.qty - 1 } : l)).filter((l) => l.qty > 0);
    setCart({ dayId: cart.dayId, lines });
  };

  const tapAdd = (dish: CookDayDish) => (dish.option_groups.length ? setOptionsFor(dish) : add(dish, []));

  return (
    <>
      <section style={{ background: 'var(--yellow)' }}>
        <div className="k-hero">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <CookAvatar name={cook} logo={kitchen.logo_url} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>Cooked by {cook}</span>
                <span style={{ fontSize: 14 }}>
                  {[kitchen.area, kitchen.plates_served >= 20 ? `${Math.floor(kitchen.plates_served / 10) * 10}+ plates served` : null].filter(Boolean).join(' · ')}
                </span>
              </div>
            </div>
            <h1 className="k-title">{kitchen.name}</h1>
            {kitchen.bio && <span style={{ fontSize: 16 }}>{kitchen.bio}</span>}
          </div>
          <div className="k-hero__chips">
            <span className="k-chip" style={{ background: 'var(--ink)', color: '#fff' }}>
              {fees.delivery_fee_flat
                ? `${formatNaira(fees.delivery_fee)} delivery within ${fees.max_distance_km} km`
                : `Delivery from ${formatNaira(fees.delivery_fee)} · within ${fees.max_distance_km} km`}
            </span>
            {!fees.service_fee_enabled && (
              <span className="k-chip" style={{ background: '#fff', color: 'var(--green)' }}>
                No service fee
              </span>
            )}
          </div>
        </div>
      </section>

      {!tab ? (
        <div className="k-body" style={{ gridTemplateColumns: 'minmax(0,1fr)' }}>
          <NotCooking data={data} session={session} setSession={setSession} onFollowChange={onFollowChange} />
        </div>
      ) : (
        <div className="k-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 0 }}>
            <div className="k-tabs v-rail" role="tablist">
              {days.map((d) => {
                const on = d.id === tab.id;
                const l = dayLabels(d);
                return (
                  <button key={d.id} type="button" role="tab" aria-selected={on} onClick={() => setTabId(d.id)} className="k-tab" style={{ background: on ? 'var(--text)' : '#fff', color: on ? '#fff' : 'var(--text)', boxShadow: on ? 'none' : 'inset 0 0 0 1px var(--line-strong)' }}>
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{l.label}</span>
                    <span style={{ fontSize: 13, opacity: 0.8 }}>{l.window}</span>
                  </button>
                );
              })}
            </div>
            <DayMeta day={tab} now={now} cook={cook} />
            {clash && cartDay && (
              <div style={{ borderRadius: 14, background: '#FFF4C2', padding: '12px 16px', fontSize: 14, lineHeight: 1.45 }}>
                Your {priced.plates} plate{priced.plates === 1 ? ' is' : 's are'} for {dayLabels(cartDay).label}. Adding from {dayLabels(tab).label} starts a new order and clears them.
              </div>
            )}
            <div className="k-dishes">
              {tab.dishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  qty={cart?.dayId === tab.id ? platesOf(cart, dish.id) : 0}
                  closed={cutoffLabel(tab, now).closed}
                  onAdd={() => tapAdd(dish)}
                  onRemove={() => removeOne(dish)}
                />
              ))}
            </div>
          </div>

          <aside className="k-card">
            <span style={{ fontSize: 18, fontWeight: 600 }}>Your order</span>
            {priced.plates === 0 || !cartDay ? (
              <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 }}>Add plates from one cook day. Delivered in the window shown.</span>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue-ink)' }}>
                  {dayLabels(cartDay).full} · {dayLabels(cartDay).window}
                </span>
                <Lines priced={priced} />
                <div style={{ height: 1, background: 'var(--line)' }} />
                <Row label="Plates" value={formatNaira(priced.subtotal)} />
                <Row label={fees.delivery_fee_flat ? 'Delivery' : 'Delivery from'} value={formatNaira(fees.delivery_fee)} />
                {fees.service_fee_enabled && <Row label="Service fee" value="At checkout" />}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 15, fontWeight: 600 }}>{fees.delivery_fee_flat ? 'Total' : 'Total from'}</span>
                  <span className="v-num" style={{ fontSize: 22, fontWeight: 600 }}>
                    {formatNaira(Math.round((priced.subtotal + fees.delivery_fee) / 10) * 10)}
                  </span>
                </div>
              </div>
            )}
            <button type="button" className="v-btn v-btn--blue v-btn--block" style={{ height: 52 }} disabled={!priced.plates || !cartDay} onClick={onContinue}>
              {priced.plates && cartDay ? `Continue · ${priced.plates} plate${priced.plates === 1 ? '' : 's'} · ${formatNaira(priced.subtotal)}` : 'Add a plate to continue'}
            </button>
          </aside>

          {priced.plates > 0 && cartDay && (
            <div className="k-mobile-bar">
              <span style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
                {dayLabels(cartDay).full} · {dayLabels(cartDay).windowShort}
              </span>
              <button type="button" className="k-continue" onClick={onContinue}>
                <span>Continue</span>
                <span className="k-continue__pill v-num">
                  {priced.plates} plate{priced.plates === 1 ? '' : 's'} · {formatNaira(priced.subtotal)}
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {optionsFor && (
        <OptionsSheet
          dish={optionsFor}
          onClose={() => setOptionsFor(null)}
          onAdd={(ids) => {
            add(optionsFor, ids);
            setOptionsFor(null);
          }}
        />
      )}
    </>
  );
}

function DayMeta({ day, now, cook }: { day: CookDay; now: number; cook: string }) {
  const c = cutoffLabel(day, now);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      <span className="k-chip v-num" style={{ height: 28, fontSize: 13, fontWeight: 700, background: c.urgent ? '#FDE8E4' : 'var(--fill)', color: c.urgent ? 'var(--danger)' : 'var(--text)' }}>
        {c.text}
      </span>
      {day.note && (
        <span style={{ fontSize: 14 }}>
          <b>From {cook}:</b> {day.note}
        </span>
      )}
    </div>
  );
}

function DishCard({ dish, qty, closed, onAdd, onRemove }: { dish: CookDayDish; qty: number; closed: boolean; onAdd: () => void; onRemove: () => void }) {
  const soldOut = dish.sold_out;
  const maxed = qty >= dish.plates_left;
  const from = dish.option_groups.length ? 'from ' : '';
  return (
    <div className="k-dish" style={{ opacity: soldOut ? 0.45 : 1 }}>
      <div className="k-dish__photo">
        {/* eslint-disable-next-line @next/next/no-img-element -- vendor photos come from any S3 host */}
        {dish.photo_url && <img src={dish.photo_url} alt="" loading="lazy" />}
      </div>
      <div className="k-dish__body">
        <span className="k-dish__name">{dish.name}</span>
        {dish.description && <span className="k-dish__desc">{dish.description}</span>}
        <div className="k-dish__foot">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span className="v-num k-dish__price">
              {from}
              {formatNaira(dish.price)}
            </span>
            {!soldOut && dish.plates_left <= 10 && (
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--danger)' }}>
                {dish.plates_left} plate{dish.plates_left === 1 ? '' : 's'} left
              </span>
            )}
          </div>
          {soldOut ? (
            <span className="k-chip" style={{ background: 'var(--fill)', color: 'var(--muted)', fontSize: 13, fontWeight: 700 }}>
              Sold out
            </span>
          ) : closed ? null : qty === 0 ? (
            <button type="button" className="k-add" onClick={onAdd} aria-label={`Add a plate of ${dish.name}`}>
              <span className="k-add__text">Add plate</span>
              <span className="k-add__plus">+</span>
            </button>
          ) : (
            <div className="k-stepper">
              <button type="button" onClick={onRemove} aria-label="Remove a plate">
                −
              </button>
              <span className="v-num">{qty}</span>
              <button type="button" onClick={onAdd} disabled={maxed} aria-label="Add a plate">
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NotCooking({ data, session, setSession, onFollowChange }: Pick<Props, 'data' | 'session' | 'setSession' | 'onFollowChange'>) {
  const cook = data.kitchen.cook_name ?? data.kitchen.name;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 760 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-.02em' }}>{data.kitchen.taking_orders ? `${cook} isn’t cooking right now` : 'This kitchen is taking a break'}</span>
        <span style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.5 }}>Get a WhatsApp message the moment the next cook day opens.</span>
      </div>
      <NotifyCard slug={data.kitchen.slug} cook={cook} following={data.following} session={session} setSession={setSession} onChange={onFollowChange} />
      {data.past_dishes.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--subtle)' }}>Cooked before</span>
          <div className="k-dishes">
            {data.past_dishes.map((d) => (
              <div key={d.id} className="k-dish">
                <div className="k-dish__photo">
                  {/* eslint-disable-next-line @next/next/no-img-element -- vendor photos come from any S3 host */}
                  {d.photo_url && <img src={d.photo_url} alt="" loading="lazy" />}
                </div>
                <div className="k-dish__body">
                  <span className="k-dish__name">{d.name}</span>
                  <span className="v-num k-dish__price">{formatNaira(d.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function CookAvatar({ name, logo, size = 64 }: { name: string; logo: string | null; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: 999, background: 'var(--ink)', boxShadow: '0 0 0 4px #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- vendor logos come from any S3 host
        <img src={logo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <span style={{ fontSize: size * 0.34, fontWeight: 700, color: 'var(--yellow)' }}>{name.trim().charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}

export function Lines({ priced }: { priced: ReturnType<typeof priceCart> }) {
  return (
    <>
      {priced.lines.map((l) => (
        <div key={l.key} style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
          <span style={{ fontSize: 14, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <span>
              {l.qty} × {l.name}
            </span>
            {l.extras && <span style={{ fontSize: 13, color: 'var(--muted)' }}>{l.extras}</span>}
          </span>
          <span className="v-num" style={{ fontSize: 14, whiteSpace: 'nowrap' }}>
            {formatNaira(l.total)}
          </span>
        </div>
      ))}
    </>
  );
}

export function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ fontSize: 14, color: 'var(--muted)' }}>{label}</span>
      <span className="v-num" style={{ fontSize: 14 }}>
        {value}
      </span>
    </div>
  );
}

function useNow(): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);
  return now;
}
