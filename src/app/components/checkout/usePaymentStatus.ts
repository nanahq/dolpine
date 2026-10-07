'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ApiError } from '@/lib/api/client';
import { trackOrder } from '@/lib/checkout/api';

export type PaymentStatus = 'waiting' | 'paid' | 'expired';

const POLL_MS = 5000;

/**
 * Watches an order until the gateway's webhook confirms payment. An order sits
 * at `pending` until then; unpaid orders are deleted after 30 minutes, which
 * shows up here as a 404.
 */
export function usePaymentStatus(orderId: string | null) {
  const [status, setStatus] = useState<PaymentStatus>('waiting');
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);
  const done = useRef(false);

  const check = useCallback(async () => {
    if (!orderId || done.current) return;
    setChecking(true);
    try {
      const o = await trackOrder(orderId);
      setOrderNumber(o.order_number ?? null);
      if (o.status === 'cancelled') {
        done.current = true;
        setStatus('expired');
      } else if (o.status !== 'pending') {
        done.current = true;
        setStatus('paid');
      }
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) {
        done.current = true;
        setStatus('expired');
      }
      // Anything else is a blip; the next poll tries again.
    } finally {
      setChecking(false);
    }
  }, [orderId]);

  useEffect(() => {
    done.current = false;
    setStatus('waiting');
    if (!orderId) return;
    void check();
    const t = setInterval(() => void check(), POLL_MS);
    return () => clearInterval(t);
  }, [orderId, check]);

  return { status, orderNumber, checking, checkNow: check };
}
