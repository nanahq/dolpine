import posthog from 'posthog-js';

/**
 * Custom events, and the properties each one carries.
 *
 * Autocapture already records ordinary clicks and internal navigation, so this
 * map stays deliberately small: it covers only what autocapture cannot see —
 * outbound app-store conversions (where the placement is the whole point),
 * outcomes of async work, and input values autocapture masks.
 *
 * No names, phone numbers, emails or addresses go in here.
 */
type EventProperties = {
  app_store_clicked: { platform: 'ios' | 'android'; placement: string };
  vendor_application_submitted: { has_instagram: boolean };
  vendor_application_failed: { reason: 'duplicate' | 'server' | 'network' };
  rider_application_submitted: { vehicle: string; area: string };
  contact_message_sent: { topic: string };
  help_searched: { query: string; results: number };
  order_tracked: { outcome: 'found' | 'not_found' | 'error' };
};

export function track<K extends keyof EventProperties>(
  event: K,
  properties: EventProperties[K],
): void {
  // Missing token (unset env) leaves posthog uninitialised — drop the event
  // rather than warning on every click.
  if (!posthog.__loaded) return;
  posthog.capture(event, properties);
}
