import { API_BASE } from './config';
import { INVESTOR_PASSWORD } from '../investor-access';

/** Mirrors nana-v2 `InvestorSnapshot` (controllers/investor-metrics). */
export type VolumePoint = {
  period: string;
  orders: number;
  gmv: number;
  b2b_orders: number;
  b2b_gmv: number;
};

export type MonthlyMoney = VolumePoint & {
  gross_revenue: number;
  direct_cost: number;
  contribution_margin: number;
  contribution_per_order: number;
  contribution_margin_pct: number;
  opex: number;
  net_profit: number;
  late_refund_total: number;
  late_refund_count: number;
};

export type InvestorSnapshot = {
  as_of: string;
  monthly: MonthlyMoney[];
  weekly: VolumePoint[];
  unit_economics: {
    from: string;
    to: string;
    orders: number;
    lines: Array<{ account_code: string; account_name: string; type: 'revenue' | 'cost'; amount: number; per_order: number }>;
  };
  customers: {
    registered: number;
    ordered: number;
    repeat: number;
    ordered_pct: number;
    repeat_pct: number;
    monthly: Array<{ month: string; active_customers: number; new_customers: number }>;
  };
  retention: Array<{ cohort: string; size: number; retained_pct: Array<number | null> }>;
  conversion: Array<{
    month: string;
    signups: number;
    ordered: number;
    ordered_30d: number;
    ordered_pct: number;
    ordered_30d_pct: number;
  }>;
  riders: Array<{
    month: string;
    active_riders: number;
    active_rider_days: number;
    drops: number;
    drops_per_active_rider_day: number;
    wage_days: number;
    wage_day_drops: number;
    idle_wage_days: number;
    drops_per_wage_day: number;
  }>;
};

/** Server-only. Null when the API is down — the page says so. */
export async function getInvestorSnapshot(): Promise<InvestorSnapshot | null> {
  try {
    const res = await fetch(`${API_BASE}/investor-metrics`, {
      headers: { accept: 'application/json', 'x-investor-key': INVESTOR_PASSWORD },
      next: { revalidate: 600 },
    });
    if (!res.ok) {
      console.warn(`[nana-api] ${res.status} for /investor-metrics`);
      return null;
    }
    return (await res.json()) as InvestorSnapshot;
  } catch (err) {
    console.warn('[nana-api] request failed for /investor-metrics:', err);
    return null;
  }
}
