import { AnalyticsBrowser } from "@segment/analytics-next";

export const analytics = AnalyticsBrowser.load({
  writeKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY!,
});
