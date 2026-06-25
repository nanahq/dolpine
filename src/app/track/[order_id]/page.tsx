'use client';

export const dynamic = 'force-dynamic';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { CheckCircle, Phone, RotateCw, X } from 'lucide-react';

const API_BASE = 'https://api.trynanaapp.com/api/v1';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.nanaeats.nana_app';
const APP_STORE_URL = 'https://apps.apple.com/us/app/nana-delivery-more/id6499050428';

// ─── Types ─────────────────────────────────────────────────────────────────────

type OrderStatus =
  | 'pending' | 'confirmed' | 'preparing' | 'ready_for_pickup'
  | 'picked_up' | 'in_transit' | 'delivered' | 'cancelled' | 'refunded';

type OrderType = 'food' | 'grocery' | 'parcel' | 'pharmacy';

interface TrackingOrder {
  id: string;
  order_number: string;
  type: OrderType;
  status: OrderStatus;
  pickup_address: any;
  dropoff_address: any;
  estimated_delivery_time: string | null;
  actual_delivery_time: string | null;
  total_amount: string;
  created_at: string;
  updated_at: string;
  merchant: { business_name: string; logo_url: string | null } | null;
  driver: { full_name: string | null; phone_number: string | null } | null;
  status_history: Array<{ status: OrderStatus; created_at: string; notes: string | null }>;
}

// ─── Step definitions ───────────────────────────────────────────────────────────

const FOOD_STEPS: Array<{ status: OrderStatus; label: string }> = [
  { status: 'pending',          label: 'Placed'    },
  { status: 'confirmed',        label: 'Confirmed' },
  { status: 'preparing',        label: 'Preparing' },
  { status: 'ready_for_pickup', label: 'Ready'     },
  { status: 'picked_up',        label: 'Picked up' },
  { status: 'in_transit',       label: 'En route'  },
  { status: 'delivered',        label: 'Delivered' },
];

const PARCEL_STEPS: Array<{ status: OrderStatus; label: string }> = [
  { status: 'pending',    label: 'Placed'    },
  { status: 'confirmed',  label: 'Confirmed' },
  { status: 'picked_up',  label: 'Collected' },
  { status: 'in_transit', label: 'En route'  },
  { status: 'delivered',  label: 'Delivered' },
];

const ACTIVE_STATUSES = new Set<OrderStatus>([
  'pending', 'confirmed', 'preparing', 'ready_for_pickup', 'picked_up', 'in_transit',
]);

function getSteps(type: OrderType) {
  return type === 'parcel' ? PARCEL_STEPS : FOOD_STEPS;
}

const STATUS_HEADLINE: Record<OrderStatus, string> = {
  pending:          'Order received',
  confirmed:        'Order confirmed',
  preparing:        'Being prepared',
  ready_for_pickup: 'Ready for pickup',
  picked_up:        'Rider is on the way',
  in_transit:       'On the way to you',
  delivered:        'Order delivered',
  cancelled:        'Order cancelled',
  refunded:         'Order refunded',
};

// ─── Helpers ────────────────────────────────────────────────────────────────────

function fmt(iso: string | null | undefined, mode: 'time' | 'datetime' = 'time'): string {
  if (!iso) return '—';
  return mode === 'time'
    ? new Date(iso).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true })
    : new Date(iso).toLocaleString('en-NG', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true });
}

function addrLine(addr: any): string {
  if (!addr) return '—';
  let a = addr;
  if (typeof a === 'string') {
    try { a = JSON.parse(a); } catch { return addr; }
  }
  const parts = [a.address_line_1, a.city, a.state].filter(Boolean);
  return parts.length ? parts.join(', ') : '—';
}

function initials(name: string | null | undefined): string {
  if (!name) return '?';
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

// ─── Download banner ─────────────────────────────────────────────────────────────

function DownloadBanner() {
  return (
    <div style={{
      background: '#111',
      borderRadius: 14,
      padding: '20px 20px 22px',
      marginBottom: 12,
      color: '#fff',
    }}>
      <p style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 700, letterSpacing: -0.2 }}>
        Order on Nana
      </p>
      <p style={{ margin: '0 0 18px', fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
        Free delivery on your first order. Food, groceries &amp; parcels — fast.
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            background: 'rgba(255,255,255,0.1)', color: '#fff',
            padding: '10px 0', borderRadius: 8,
            textDecoration: 'none', fontSize: 13, fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.29-2.18 3.85.03 3.06 2.68 4.08 2.71 4.09l-.08.18zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          App Store
        </a>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
            background: 'rgba(255,255,255,0.1)', color: '#fff',
            padding: '10px 0', borderRadius: 8,
            textDecoration: 'none', fontSize: 13, fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
          </svg>
          Google Play
        </a>
      </div>
    </div>
  );
}

// ─── Shell components ────────────────────────────────────────────────────────────

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <div style={{ maxWidth: 480, margin: '0 auto' }}>{children}</div>
    </div>
  );
}

function TopBar({ orderNum }: { orderNum?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 0' }}>
      <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5, color: '#111' }}>nana</span>
      {orderNum && (
        <span style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', letterSpacing: 0.5 }}>
          #{orderNum}
        </span>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 0.9s linear infinite' }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <circle cx="12" cy="12" r="9" stroke="#e5e7eb" strokeWidth="2.5" />
      <path d="M12 3a9 9 0 0 1 9 9" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Progress bar ────────────────────────────────────────────────────────────────

function ProgressBar({ steps, currentIdx, isCancelled }: {
  steps: typeof FOOD_STEPS;
  currentIdx: number;
  isCancelled: boolean;
}) {
  if (isCancelled) return null;

  return (
    <div style={{ padding: '0 20px', marginTop: 28 }}>
      {/* Bar */}
      <div style={{ position: 'relative', height: 2, background: '#f1f1f1', borderRadius: 2 }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: 2,
          background: '#111',
          width: steps.length > 1
            ? `${(currentIdx / (steps.length - 1)) * 100}%`
            : '0%',
          transition: 'width 0.4s ease',
        }} />
        {steps.map((_, i) => {
          const done = i <= currentIdx;
          return (
            <div key={i} style={{
              position: 'absolute',
              top: '50%', transform: 'translateY(-50%)',
              left: steps.length > 1 ? `${(i / (steps.length - 1)) * 100}%` : '0%',
              marginLeft: i === 0 ? 0 : i === steps.length - 1 ? -8 : -4,
              width: i === currentIdx ? 8 : 6,
              height: i === currentIdx ? 8 : 6,
              borderRadius: '50%',
              background: done ? '#111' : '#e5e7eb',
              transition: 'all 0.3s',
            }} />
          );
        })}
      </div>
      {/* Labels — only first, current, last */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ fontSize: 11, color: '#9ca3af' }}>{steps[0].label}</span>
        {currentIdx > 0 && currentIdx < steps.length - 1 && (
          <span style={{ fontSize: 11, fontWeight: 600, color: '#111' }}>{steps[currentIdx].label}</span>
        )}
        <span style={{ fontSize: 11, color: currentIdx === steps.length - 1 ? '#111' : '#9ca3af', fontWeight: currentIdx === steps.length - 1 ? 600 : 400 }}>
          {steps[steps.length - 1].label}
        </span>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────────

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params?.order_id as string;

  const [order, setOrder] = useState<TrackingOrder | null>(null);
  const [pageState, setPageState] = useState<'loading' | 'error' | 'not_found' | 'ready'>('loading');
  const [countdown, setCountdown] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadOrder = useCallback(async (silent = false) => {
    if (!orderId) return;
    if (!silent) setPageState('loading');
    else setRefreshing(true);
    try {
      const res = await window.fetch(`${API_BASE}/orders/track/${orderId}`);
      if (res.status === 404) { setPageState('not_found'); return; }
      if (!res.ok) { setPageState('error'); return; }
      setOrder(await res.json());
      setPageState('ready');
    } catch {
      setPageState('error');
    } finally {
      setRefreshing(false);
    }
  }, [orderId]);

  useEffect(() => { loadOrder(); }, [loadOrder]);

  useEffect(() => {
    if (!order || !ACTIVE_STATUSES.has(order.status)) return;
    setCountdown(10);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((c) => { if (c <= 1) { clearInterval(countdownRef.current!); return 0; } return c - 1; });
    }, 1000);
    if (pollRef.current) clearTimeout(pollRef.current);
    pollRef.current = setTimeout(() => loadOrder(true), 10_000);
    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, [order?.status, order?.updated_at, loadOrder]); // eslint-disable-line

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (pageState === 'loading') {
    return (
      <PageShell>
        <TopBar />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 100, gap: 16 }}>
          <Spinner />
          <p style={{ margin: 0, fontSize: 14, color: '#9ca3af' }}>Looking up your order</p>
        </div>
      </PageShell>
    );
  }

  // ── Not found ────────────────────────────────────────────────────────────────
  if (pageState === 'not_found') {
    return (
      <PageShell>
        <TopBar />
        <div style={{ padding: '80px 24px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: '#111' }}>Order not found</p>
          <p style={{ margin: 0, fontSize: 14, color: '#9ca3af', lineHeight: 1.6 }}>
            Double-check the order ID and try again.
          </p>
        </div>
      </PageShell>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────────
  if (pageState === 'error' || !order) {
    return (
      <PageShell>
        <TopBar />
        <div style={{ padding: '80px 24px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: '#111' }}>Something went wrong</p>
          <button
            onClick={() => loadOrder()}
            style={{ marginTop: 20, padding: '10px 24px', background: '#111', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
          >
            Try again
          </button>
        </div>
      </PageShell>
    );
  }

  // ── Delivered ────────────────────────────────────────────────────────────────
  if (order.status === 'delivered') {
    const orderNum = (order.order_number ?? order.id).slice(-8).toUpperCase();
    return (
      <PageShell>
        <TopBar orderNum={orderNum} />
        <div style={{ padding: '56px 24px 48px', textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle size={32} color="#16a34a" strokeWidth={1.8} />
          </div>
          <p style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 800, color: '#111', letterSpacing: -0.4 }}>Delivered</p>
          {order.actual_delivery_time && (
            <p style={{ margin: '4px 0 0', fontSize: 14, color: '#6b7280' }}>at {fmt(order.actual_delivery_time)}</p>
          )}
          {order.merchant && (
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#9ca3af' }}>from {order.merchant.business_name}</p>
          )}

          <div style={{ marginTop: 48 }}>
            <DownloadBanner />
          </div>
        </div>
      </PageShell>
    );
  }

  // ── Active / Cancelled ────────────────────────────────────────────────────────
  const steps = getSteps(order.type);
  const currentIdx = steps.findIndex((s) => s.status === order.status);
  const isCancelled = order.status === 'cancelled' || order.status === 'refunded';
  const isActive = ACTIVE_STATUSES.has(order.status);
  const orderNum = (order.order_number ?? order.id).slice(-8).toUpperCase();

  return (
    <PageShell>
      <TopBar orderNum={orderNum} />

      {/* ── Hero status block ── */}
      <div style={{ padding: '32px 20px 0' }}>
        {isCancelled ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <X size={18} color="#dc2626" strokeWidth={2} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#111', letterSpacing: -0.3 }}>
                {order.status === 'refunded' ? 'Order refunded' : 'Order cancelled'}
              </p>
              <p style={{ margin: '3px 0 0', fontSize: 13, color: '#9ca3af' }}>Contact support if you need help</p>
            </div>
          </div>
        ) : (
          <>
            <p style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 800, color: '#111', letterSpacing: -0.5, lineHeight: 1.2 }}>
              {STATUS_HEADLINE[order.status]}
            </p>
            {order.merchant && (
              <p style={{ margin: '4px 0 0', fontSize: 14, color: '#6b7280' }}>{order.merchant.business_name}</p>
            )}
            {order.estimated_delivery_time && isActive && (
              <p style={{ margin: '10px 0 0', fontSize: 13, color: '#111', fontWeight: 500 }}>
                Estimated arrival — <strong>{fmt(order.estimated_delivery_time)}</strong>
              </p>
            )}
          </>
        )}
      </div>

      {/* ── Progress bar ── */}
      <ProgressBar steps={steps} currentIdx={Math.max(0, currentIdx)} isCancelled={isCancelled} />

      {/* ── Cards ── */}
      <div style={{ padding: '28px 20px 0' }}>

        {/* Rider */}
        {order.driver && (order.status === 'picked_up' || order.status === 'in_transit') && (
          <div style={card}>
            <p style={label}>Your rider</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: '#f1f1f1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13, fontWeight: 700, color: '#374151' }}>
                {initials(order.driver.full_name)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#111' }}>
                  {order.driver.full_name ?? 'Your rider'}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#9ca3af' }}>On the way</p>
              </div>
              {order.driver.phone_number && (
                <a
                  href={`tel:${order.driver.phone_number}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, border: '1.5px solid #e5e7eb', color: '#111', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                >
                  <Phone size={14} strokeWidth={2} />
                  Call
                </a>
              )}
            </div>
          </div>
        )}

        {/* Addresses */}
        <div style={card}>
          <p style={label}>Delivery route</p>
          <div style={{ display: 'flex', gap: 14 }}>
            {/* Dot column */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: '#111', flexShrink: 0 }} />
              <div style={{ width: 1, flex: 1, background: '#e5e7eb', margin: '4px 0', minHeight: 20 }} />
              <div style={{ width: 8, height: 8, borderRadius: 4, border: '2px solid #111', flexShrink: 0, background: '#fff' }} />
            </div>
            {/* Text column */}
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: 16 }}>
                <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 }}>From</p>
                <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{addrLine(order.pickup_address)}</p>
              </div>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: 0.5 }}>To</p>
                <p style={{ margin: 0, fontSize: 13, color: '#374151', lineHeight: 1.5 }}>{addrLine(order.dropoff_address)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div style={card}>
          <p style={label}>Order details</p>
          <Row l="Type" r={order.type.charAt(0).toUpperCase() + order.type.slice(1)} />
          <Row l="Total" r={`₦${Number(order.total_amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`} bold />
          <Row l="Placed" r={fmt(order.created_at, 'datetime')} last />
        </div>

        {/* Download banner */}
        {!isCancelled && <DownloadBanner />}

        {/* Auto-refresh */}
        {isActive && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '4px 0 8px', marginTop: -4 }}>
            {refreshing ? (
              <>
                <Spinner />
                <span style={{ fontSize: 12, color: '#9ca3af' }}>Updating</span>
              </>
            ) : (
              <>
                <RotateCw size={12} color="#c4c4c4" />
                <span style={{ fontSize: 12, color: '#c4c4c4' }}>Updates in {countdown}s</span>
                <button onClick={() => loadOrder(true)} style={{ background: 'none', border: 'none', fontSize: 12, color: '#9ca3af', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                  Refresh
                </button>
              </>
            )}
          </div>
        )}

        <div style={{ height: 40 }} />
      </div>
    </PageShell>
  );
}

// ─── Micro components ─────────────────────────────────────────────────────────

function Row({ l, r, bold, last }: { l: string; r: string; bold?: boolean; last?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: last ? 0 : 12, marginBottom: last ? 0 : 12, borderBottom: last ? 'none' : '1px solid #f7f7f7' }}>
      <span style={{ fontSize: 13, color: '#9ca3af' }}>{l}</span>
      <span style={{ fontSize: 13, color: '#111', fontWeight: bold ? 700 : 500 }}>{r}</span>
    </div>
  );
}

// ─── Shared styles ─────────────────────────────────────────────────────────────

const card: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #f1f1f1',
  borderRadius: 12,
  padding: '16px',
  marginBottom: 12,
};

const label: React.CSSProperties = {
  margin: '0 0 12px',
  fontSize: 11,
  fontWeight: 700,
  color: '#c4c4c4',
  textTransform: 'uppercase',
  letterSpacing: 1,
};

