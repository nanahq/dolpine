'use client';

export const dynamic = 'force-dynamic';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  CheckCircle,
  Clock,
  MapPin,
  Package,
  Phone,
  RotateCw,
  ShoppingBag,
  Truck,
  X,
  ChefHat,
  Bike,
} from 'lucide-react';

const API_BASE = 'https://api.trynanaapp.com/api/v1';

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready_for_pickup'
  | 'picked_up'
  | 'in_transit'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

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

// ─── Status config ────────────────────────────────────────────────────────────

const FOOD_STEPS: Array<{ status: OrderStatus; label: string; icon: React.ReactNode }> = [
  { status: 'pending',          label: 'Order Placed',    icon: <ShoppingBag size={16} /> },
  { status: 'confirmed',        label: 'Confirmed',        icon: <CheckCircle size={16} /> },
  { status: 'preparing',        label: 'Being Prepared',   icon: <ChefHat size={16} /> },
  { status: 'ready_for_pickup', label: 'Ready for Pickup', icon: <Package size={16} /> },
  { status: 'picked_up',        label: 'Rider Picked Up',  icon: <Bike size={16} /> },
  { status: 'in_transit',       label: 'On the Way',       icon: <Truck size={16} /> },
  { status: 'delivered',        label: 'Delivered',        icon: <CheckCircle size={16} /> },
];

const PARCEL_STEPS: Array<{ status: OrderStatus; label: string; icon: React.ReactNode }> = [
  { status: 'pending',    label: 'Order Placed',    icon: <ShoppingBag size={16} /> },
  { status: 'confirmed',  label: 'Confirmed',        icon: <CheckCircle size={16} /> },
  { status: 'picked_up',  label: 'Parcel Collected', icon: <Package size={16} /> },
  { status: 'in_transit', label: 'In Transit',       icon: <Truck size={16} /> },
  { status: 'delivered',  label: 'Delivered',        icon: <CheckCircle size={16} /> },
];

const TERMINAL = new Set<OrderStatus>(['delivered', 'cancelled', 'refunded']);
const ACTIVE_STATUSES = new Set<OrderStatus>(['pending', 'confirmed', 'preparing', 'ready_for_pickup', 'picked_up', 'in_transit']);

function getSteps(type: OrderType) {
  return type === 'parcel' ? PARCEL_STEPS : FOOD_STEPS;
}

function getStepIndex(steps: typeof FOOD_STEPS, status: OrderStatus): number {
  return steps.findIndex((s) => s.status === status);
}

function statusLabel(status: OrderStatus): string {
  const map: Record<OrderStatus, string> = {
    pending:          'Order Placed',
    confirmed:        'Confirmed',
    preparing:        'Preparing',
    ready_for_pickup: 'Ready for Pickup',
    picked_up:        'Picked Up',
    in_transit:       'On the Way',
    delivered:        'Delivered',
    cancelled:        'Cancelled',
    refunded:         'Refunded',
  };
  return map[status] ?? status;
}

function statusColor(status: OrderStatus): string {
  if (status === 'delivered') return '#16a34a';
  if (status === 'cancelled' || status === 'refunded') return '#dc2626';
  return '#469ADC';
}

function formatTime(iso: string | null | undefined): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-NG', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

function addressLine(addr: any): string {
  if (!addr) return '—';
  const parts = [addr.address_line_1, addr.city, addr.state].filter(Boolean);
  return parts.join(', ');
}

// ─── App store links ─────────────────────────────────────────────────────────
const APP_STORE_URL   = 'https://apps.apple.com/app/nana/id123456789';
const PLAY_STORE_URL  = 'https://play.google.com/store/apps/details?id=com.nanaeats.nana_app';

// ─── Conversion components ─────────────────────────────────────────────────────

function AppButtons() {
  return (
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' as const, marginTop: 16 }}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#111', color: '#fff',
          padding: '10px 18px', borderRadius: 10,
          textDecoration: 'none', fontSize: 13, fontWeight: 600,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.29-2.18 3.85.03 3.06 2.68 4.08 2.71 4.09l-.08.18zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        App Store
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#111', color: '#fff',
          padding: '10px 18px', borderRadius: 10,
          textDecoration: 'none', fontSize: 13, fontWeight: 600,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
        </svg>
        Google Play
      </a>
    </div>
  );
}

function ConversionBanner({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '16px',
        marginBottom: 12,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        borderTop: '3px solid #4ADE80',
        textAlign: 'center' as const,
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: '#f0fdf4', color: '#15803d',
          padding: '4px 12px', borderRadius: 100,
          fontSize: 12, fontWeight: 700, marginBottom: 10,
        }}>
          🎁 Free delivery on your first order
        </div>
        <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700, color: '#111' }}>
          New to Nana? Welcome!
        </p>
        <p style={{ margin: '0 0 12px', fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>
          Order food, groceries, and parcels — delivered fast across your city.
        </p>
        <AppButtons />
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #469ADC 0%, #2D7CBF 100%)',
      borderRadius: 20,
      padding: '24px 20px',
      marginBottom: 12,
      textAlign: 'center' as const,
      color: '#fff',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: '#4ADE80', color: '#14532D',
        padding: '5px 14px', borderRadius: 100,
        fontSize: 12, fontWeight: 800, marginBottom: 16,
        letterSpacing: 0.3,
      }}>
        🎁 FREE DELIVERY on your first order
      </div>
      <p style={{ margin: '0 0 6px', fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>
        Download Nana
      </p>
      <p style={{ margin: '0 0 20px', fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
        Food, groceries & parcels — delivered fast.<br />
        Trusted by thousands across Kaduna.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 18, fontSize: 13, color: 'rgba(255,255,255,0.9)' }}>
        {['🍔 Food', '🛒 Groceries', '📦 Parcels'].map((item) => (
          <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{item}</span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' as const }}>
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            padding: '10px 18px', borderRadius: 10,
            textDecoration: 'none', fontSize: 13, fontWeight: 600,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.29-2.18 3.85.03 3.06 2.68 4.08 2.71 4.09l-.08.18zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          App Store
        </a>
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.3)',
            color: '#fff',
            padding: '10px 18px', borderRadius: 10,
            textDecoration: 'none', fontSize: 13, fontWeight: 600,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
          </svg>
          Google Play
        </a>
      </div>
    </div>
  );
}

// ─── Primitive components ─────────────────────────────────────────────────────

function NanaLogo() {
  return (
    <span style={{ fontSize: 22, fontWeight: 900, color: '#469ADC', letterSpacing: -0.5 }}>
      nana
    </span>
  );
}

function Spinner({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24" fill="none"
      style={{ animation: 'spin 1s linear infinite' }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <circle cx="12" cy="12" r="10" stroke="#e2e8f0" strokeWidth="3" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="#469ADC" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TrackOrderPage() {
  const params = useParams();
  const orderId = params?.order_id as string;

  const [order, setOrder] = useState<TrackingOrder | null>(null);
  const [state, setState] = useState<'loading' | 'error' | 'not_found' | 'ready'>('loading');
  const [countdown, setCountdown] = useState(10);
  const [refreshing, setRefreshing] = useState(false);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetch = useCallback(async (silent = false) => {
    if (!orderId) return;
    if (!silent) setState('loading');
    else setRefreshing(true);

    try {
      const res = await window.fetch(`${API_BASE}/orders/track/${orderId}`);
      if (res.status === 404) { setState('not_found'); return; }
      if (!res.ok) { setState('error'); return; }
      const data: TrackingOrder = await res.json();
      setOrder(data);
      setState('ready');
    } catch {
      setState('error');
    } finally {
      setRefreshing(false);
    }
  }, [orderId]);

  // Initial fetch
  useEffect(() => { fetch(); }, [fetch]);

  // Polling for active orders
  useEffect(() => {
    if (!order || TERMINAL.has(order.status)) return;

    setCountdown(10);

    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) { clearInterval(countdownRef.current!); return 0; }
        return c - 1;
      });
    }, 1000);

    if (pollRef.current) clearTimeout(pollRef.current);
    pollRef.current = setTimeout(() => { fetch(true); }, 10_000);

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, [order?.status, order?.updated_at, fetch]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Loading ────────────────────────────────────────────────────────────────
  if (state === 'loading') {
    return (
      <div style={styles.fullCenter}>
        <NanaLogo />
        <div style={{ marginTop: 32 }}><Spinner size={36} /></div>
        <p style={styles.subtext}>Looking up your order…</p>
      </div>
    );
  }

  // ── Not found ──────────────────────────────────────────────────────────────
  if (state === 'not_found') {
    return (
      <div style={styles.fullCenter}>
        <NanaLogo />
        <div style={{ marginTop: 32, fontSize: 48 }}>🔍</div>
        <h2 style={styles.heading}>Order not found</h2>
        <p style={styles.subtext}>
          Check that the order ID is correct and try again.
        </p>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (state === 'error' || !order) {
    return (
      <div style={styles.fullCenter}>
        <NanaLogo />
        <div style={{ marginTop: 32, fontSize: 48 }}>⚠️</div>
        <h2 style={styles.heading}>Something went wrong</h2>
        <button style={styles.btn} onClick={() => fetch()}>Try again</button>
      </div>
    );
  }

  // ── Delivered ─────────────────────────────────────────────────────────────
  if (order.status === 'delivered') {
    const orderNum = order.order_number?.slice(-8).toUpperCase() ?? order.id.slice(-8).toUpperCase();
    return (
      <div style={{ ...styles.page, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 480, padding: '0 16px 48px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center' as const, paddingTop: 48, paddingBottom: 32 }}>
            <NanaLogo />
            <div style={{ marginTop: 28, marginBottom: 20 }}>
              <div style={{
                width: 88, height: 88, borderRadius: 44,
                background: '#f0fdf4', border: '3px solid #16a34a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
              }}>
                <CheckCircle size={44} color="#16a34a" />
              </div>
            </div>
            <h2 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#111', letterSpacing: -0.5 }}>
              Order Delivered!
            </h2>
            <p style={{ margin: '6px 0 0', fontSize: 13, color: '#9ca3af' }}>#{orderNum}</p>
            {order.actual_delivery_time && (
              <p style={{ margin: '10px 0 0', fontSize: 13, color: '#16a34a', fontWeight: 600 }}>
                Delivered at {formatTime(order.actual_delivery_time)}
              </p>
            )}
            {order.merchant && (
              <p style={{ margin: '8px 0 0', fontSize: 13, color: '#6b7280' }}>
                from {order.merchant.business_name}
              </p>
            )}
          </div>

          {/* Conversion banner */}
          <ConversionBanner />
        </div>
      </div>
    );
  }

  // ── Ready ──────────────────────────────────────────────────────────────────
  const steps = getSteps(order.type);
  const currentIdx = getStepIndex(steps, order.status);
  const isCancelled = order.status === 'cancelled' || order.status === 'refunded';
  const isActive = ACTIVE_STATUSES.has(order.status);
  const color = statusColor(order.status);
  const orderNum = order.order_number?.slice(-8).toUpperCase() ?? order.id.slice(-8).toUpperCase();

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={{ ...styles.header, background: isCancelled ? '#1a1a1a' : '#469ADC' }}>
        <div style={styles.headerInner}>
          <NanaLogo />
          <span style={styles.orderNum}>#{orderNum}</span>
        </div>

        {/* Status hero */}
        <div style={styles.statusHero}>
          <div style={styles.statusIconWrap}>
            {isCancelled
              ? <X size={28} color="#fff" />
              : order.status === 'in_transit' || order.status === 'picked_up'
                ? <Bike size={28} color="#fff" />
                : <Clock size={28} color="#fff" />
            }
          </div>
          <h1 style={styles.statusText}>{statusLabel(order.status)}</h1>
          {order.merchant && (
            <p style={styles.merchantName}>{order.merchant.business_name}</p>
          )}
          {order.estimated_delivery_time && isActive && (
            <p style={styles.eta}>
              ETA {formatTime(order.estimated_delivery_time)}
            </p>
          )}
        </div>
      </div>

      <div style={styles.body}>
        {/* Timeline */}
        {!isCancelled && (
          <div style={styles.card}>
            <p style={styles.cardTitle}>Order Progress</p>
            <div style={{ paddingTop: 4 }}>
              {steps.map((step, i) => {
                const done = i < currentIdx;
                const active = i === currentIdx;
                const future = i > currentIdx;
                return (
                  <div key={step.status} style={styles.timelineRow}>
                    {/* Line segment */}
                    <div style={styles.timelineLeft}>
                      <div style={{
                        ...styles.timelineDot,
                        background: done || active ? color : '#e5e7eb',
                        border: active ? `2px solid ${color}` : 'none',
                        boxShadow: active ? `0 0 0 4px ${color}22` : 'none',
                      }}>
                        {done
                          ? <CheckCircle size={12} color="#fff" />
                          : <span style={{ color: active ? '#fff' : '#9ca3af', display: 'flex' }}>{step.icon}</span>
                        }
                      </div>
                      {i < steps.length - 1 && (
                        <div style={{
                          ...styles.timelineLine,
                          background: done ? color : '#e5e7eb',
                        }} />
                      )}
                    </div>
                    {/* Label */}
                    <div style={{ paddingBottom: i < steps.length - 1 ? 20 : 0, paddingLeft: 12, flex: 1 }}>
                      <p style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: active ? 700 : 500,
                        color: future ? '#9ca3af' : active ? '#111' : '#374151',
                      }}>
                        {step.label}
                      </p>
                      {/* Show timestamp if this step is in history */}
                      {(done || active) && (() => {
                        const hist = order.status_history.find((h) => h.status === step.status);
                        return hist ? (
                          <p style={{ margin: '2px 0 0', fontSize: 11, color: '#9ca3af' }}>
                            {formatDateTime(hist.created_at)}
                          </p>
                        ) : null;
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Cancelled message */}
        {isCancelled && (
          <div style={{ ...styles.card, borderLeft: '4px solid #dc2626' }}>
            <p style={{ margin: 0, fontWeight: 700, color: '#dc2626', fontSize: 15 }}>
              {order.status === 'refunded' ? 'Order Refunded' : 'Order Cancelled'}
            </p>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: '#6b7280' }}>
              This order was {order.status}. If you have questions, contact support.
            </p>
          </div>
        )}

        {/* Driver */}
        {order.driver && (order.status === 'picked_up' || order.status === 'in_transit') && (
          <div style={styles.card}>
            <p style={styles.cardTitle}>Your Rider</p>
            <div style={styles.driverRow}>
              <div style={styles.driverAvatar}>
                <Bike size={22} color="#469ADC" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 15, color: '#111' }}>
                  {order.driver.full_name ?? 'Your Rider'}
                </p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6b7280' }}>On the way to you</p>
              </div>
              {order.driver.phone_number && (
                <a
                  href={`tel:${order.driver.phone_number}`}
                  style={styles.callBtn}
                >
                  <Phone size={16} color="#469ADC" />
                  <span>Call</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Addresses */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Delivery Details</p>
          <div style={styles.addrRow}>
            <div style={styles.addrDot('#469ADC')} />
            <div>
              <p style={styles.addrLabel}>Pickup</p>
              <p style={styles.addrValue}>{addressLine(order.pickup_address)}</p>
            </div>
          </div>
          <div style={styles.addrConnector} />
          <div style={styles.addrRow}>
            <div style={styles.addrDot('#16a34a')} />
            <div>
              <p style={styles.addrLabel}>Delivery</p>
              <p style={styles.addrValue}>{addressLine(order.dropoff_address)}</p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div style={styles.card}>
          <p style={styles.cardTitle}>Order Summary</p>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Type</span>
            <span style={styles.summaryValue}>{order.type.charAt(0).toUpperCase() + order.type.slice(1)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Total</span>
            <span style={{ ...styles.summaryValue, fontWeight: 700 }}>
              ₦{Number(order.total_amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div style={styles.summaryRow}>
            <span style={styles.summaryLabel}>Placed</span>
            <span style={styles.summaryValue}>{formatDateTime(order.created_at)}</span>
          </div>
        </div>

        {/* Conversion — shown on all non-cancelled active orders */}
        {!isCancelled && <ConversionBanner variant="compact" />}

        {/* Refresh indicator */}
        {isActive && (
          <div style={styles.refreshRow}>
            {refreshing
              ? <><Spinner size={14} /><span style={styles.refreshText}>Refreshing…</span></>
              : (
                <>
                  <RotateCw size={13} color="#9ca3af" />
                  <span style={styles.refreshText}>
                    Auto-refreshes in {countdown}s
                  </span>
                  <button
                    onClick={() => fetch(true)}
                    style={styles.refreshBtn}
                    disabled={refreshing}
                  >
                    Refresh now
                  </button>
                </>
              )
            }
          </div>
        )}

        <div style={{ height: 32 }} />
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f3f4f6',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  } as React.CSSProperties,

  fullCenter: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    background: '#f3f4f6',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  } as React.CSSProperties,

  heading: {
    margin: '16px 0 8px',
    fontSize: 20,
    fontWeight: 700,
    color: '#111',
    textAlign: 'center' as const,
  } as React.CSSProperties,

  subtext: {
    margin: '8px 0 0',
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center' as const,
    maxWidth: 280,
  } as React.CSSProperties,

  btn: {
    marginTop: 24,
    padding: '12px 28px',
    background: '#469ADC',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
  } as React.CSSProperties,

  // Header
  header: {
    padding: '0 0 28px',
  } as React.CSSProperties,

  headerInner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px 20px',
  } as React.CSSProperties,

  orderNum: {
    fontSize: 13,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 1,
    background: 'rgba(255,255,255,0.15)',
    padding: '4px 10px',
    borderRadius: 8,
  } as React.CSSProperties,

  statusHero: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '8px 24px 0',
  } as React.CSSProperties,

  statusIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    background: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  } as React.CSSProperties,

  statusText: {
    margin: 0,
    fontSize: 26,
    fontWeight: 800,
    color: '#fff',
    textAlign: 'center' as const,
    letterSpacing: -0.5,
  } as React.CSSProperties,

  merchantName: {
    margin: '6px 0 0',
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 500,
    textAlign: 'center' as const,
  } as React.CSSProperties,

  eta: {
    margin: '6px 0 0',
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    background: 'rgba(255,255,255,0.15)',
    padding: '4px 14px',
    borderRadius: 100,
    fontWeight: 600,
  } as React.CSSProperties,

  // Body
  body: {
    maxWidth: 480,
    margin: '0 auto',
    padding: '0 16px',
    transform: 'translateY(-16px)',
  } as React.CSSProperties,

  card: {
    background: '#fff',
    borderRadius: 16,
    padding: '18px 16px',
    marginBottom: 12,
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  } as React.CSSProperties,

  cardTitle: {
    margin: '0 0 14px',
    fontSize: 12,
    fontWeight: 700,
    color: '#6b7280',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.8,
  } as React.CSSProperties,

  // Timeline
  timelineRow: {
    display: 'flex',
    alignItems: 'flex-start',
  } as React.CSSProperties,

  timelineLeft: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    width: 28,
    flexShrink: 0,
  } as React.CSSProperties,

  timelineDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.3s',
  } as React.CSSProperties,

  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 18,
    borderRadius: 1,
    marginTop: 2,
  } as React.CSSProperties,

  // Driver
  driverRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  } as React.CSSProperties,

  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    background: '#eff6ff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  } as React.CSSProperties,

  callBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 14px',
    borderRadius: 10,
    border: '1.5px solid #469ADC',
    color: '#469ADC',
    fontSize: 13,
    fontWeight: 600,
    textDecoration: 'none',
    flexShrink: 0,
  } as React.CSSProperties,

  // Addresses
  addrRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  } as React.CSSProperties,

  addrDot: (color: string) => ({
    width: 10,
    height: 10,
    borderRadius: 5,
    background: color,
    marginTop: 4,
    flexShrink: 0,
  } as React.CSSProperties),

  addrConnector: {
    width: 1,
    height: 14,
    background: '#e5e7eb',
    marginLeft: 4,
    margin: '3px 0 3px 4px',
  } as React.CSSProperties,

  addrLabel: {
    margin: 0,
    fontSize: 11,
    color: '#9ca3af',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
  } as React.CSSProperties,

  addrValue: {
    margin: '2px 0 0',
    fontSize: 13,
    color: '#374151',
    fontWeight: 500,
    lineHeight: 1.4,
  } as React.CSSProperties,

  // Summary
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottom: '1px solid #f3f4f6',
  } as React.CSSProperties,

  summaryLabel: {
    fontSize: 13,
    color: '#6b7280',
  } as React.CSSProperties,

  summaryValue: {
    fontSize: 13,
    color: '#111',
    fontWeight: 500,
  } as React.CSSProperties,

  // Refresh
  refreshRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    padding: '10px 0',
  } as React.CSSProperties,

  refreshText: {
    fontSize: 12,
    color: '#9ca3af',
  } as React.CSSProperties,

  refreshBtn: {
    background: 'none',
    border: 'none',
    fontSize: 12,
    color: '#469ADC',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '0 4px',
  } as React.CSSProperties,
} as const;
