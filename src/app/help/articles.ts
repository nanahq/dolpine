/**
 * Help-centre article content.
 *
 * These are authored as structured blocks for now. When markdown-based article
 * generation lands, this map is the single seam to replace: keep the same
 * `Article` shape (or render markdown into these block types) and the
 * `[slug]` route keeps working unchanged.
 */

export type Block =
  | { type: 'p'; text: string }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; tone: 'blue' | 'amber'; text: string }
  | { type: 'cards'; items: { title: string; copy: string }[] }
  | { type: 'rows'; items: { label: string; value: string }[] };

export interface Article {
  slug: string;
  category: string;
  title: string;
  meta: string;
  blocks: Block[];
  related: { label: string; href: string }[];
}

export const ARTICLES: Record<string, Article> = {
  'track-order': {
    slug: 'track-order',
    category: 'Orders & delivery',
    title: 'How to track your order',
    meta: 'Updated July 2026 · 1 min read',
    blocks: [
      { type: 'p', text: "Every order gets a live map from the moment the kitchen accepts it. Here's where to find it." },
      {
        type: 'ol',
        items: [
          'Open the Nana app and tap **Orders** in the bottom bar.',
          'Select the order marked **In progress**.',
          "The map shows your rider's position and the current ETA. It refreshes every few seconds.",
          'Tap the phone icon to call the rider, or the chat icon to reach support.',
        ],
      },
      { type: 'callout', tone: 'blue', text: 'If the map stops moving for more than five minutes, message support — we can reassign a rider without you losing your place.' },
    ],
    related: [
      { label: 'Saving an address with a landmark', href: '/help/landmark-address' },
      { label: 'Refunds and missing items', href: '/help/refunds' },
    ],
  },
  'schedule-order': {
    slug: 'schedule-order',
    category: 'Orders & delivery',
    title: 'How to schedule an order for later',
    meta: 'Updated July 2026 · 1 min read',
    blocks: [
      { type: 'p', text: "Useful for breakfast, iftar or a meeting you don't want to interrupt. You can schedule up to two days ahead." },
      {
        type: 'ol',
        items: [
          'Fill your basket as normal and go to checkout.',
          'Tap **Deliver now** and switch it to **Schedule**.',
          'Choose a day and a 30-minute window.',
          'Confirm and pay. We hold the order and send it to the kitchen at the right time.',
        ],
      },
      { type: 'callout', tone: 'amber', text: 'Scheduled orders can be cancelled free of charge up to 30 minutes before the window opens.' },
    ],
    related: [
      { label: 'How to track your order', href: '/help/track-order' },
      { label: 'Ways to pay on Nana', href: '/help/payment-methods' },
    ],
  },
  'landmark-address': {
    slug: 'landmark-address',
    category: 'Orders & delivery',
    title: 'Saving an address with a landmark',
    meta: 'Updated July 2026 · 2 min read',
    blocks: [
      { type: 'p', text: "Street numbers don't always help. A good landmark cuts several minutes off every delivery to your door." },
      {
        type: 'ol',
        items: [
          'Go to **Account → Addresses → Add address**.',
          'Drag the pin onto your gate, not the middle of the street.',
          'In **Landmark**, write what a stranger would see: "second gate after the blue mosque, green door".',
          'Add your floor or shop number in **Directions for the rider**.',
          'Name it (Home, Office) and save.',
        ],
      },
      { type: 'callout', tone: 'blue', text: 'Riders see your landmark before they set off, so they route to the right junction from the start.' },
    ],
    related: [{ label: 'How to track your order', href: '/help/track-order' }],
  },
  'payment-methods': {
    slug: 'payment-methods',
    category: 'Payments & refunds',
    title: 'Ways to pay on Nana',
    meta: 'Updated July 2026 · 1 min read',
    blocks: [
      { type: 'p', text: 'Four options, chosen at checkout. Whatever you pick, the total you see is the total you pay.' },
      {
        type: 'cards',
        items: [
          { title: 'Card', copy: 'Verve, Mastercard and Visa. Save it once for one-tap checkout.' },
          { title: 'Bank transfer', copy: 'We generate a one-time account number that confirms in seconds.' },
          { title: 'Nana wallet', copy: 'Top up in advance; refunds land here first. Fastest at checkout.' },
          { title: 'Cash on delivery', copy: 'Pay the rider on arrival. Please have close to the exact amount.' },
        ],
      },
    ],
    related: [{ label: 'Refunds and missing items', href: '/help/refunds' }],
  },
  refunds: {
    slug: 'refunds',
    category: 'Payments & refunds',
    title: 'Refunds and missing items',
    meta: 'Updated July 2026 · 2 min read',
    blocks: [
      { type: 'p', text: "If something is missing, wrong or arrived cold, tell us within 24 hours and we'll make it right." },
      {
        type: 'ol',
        items: [
          'Open **Orders** and select the affected order.',
          'Tap **Report a problem** and choose what went wrong.',
          'Add a photo if you can — it settles most cases immediately.',
          'Submit. An agent reviews it, usually within the hour.',
        ],
      },
      { type: 'p', text: 'Approved refunds go to your Nana wallet the same day. Ask for it back on your card instead and it takes 3–5 working days, depending on your bank.' },
      { type: 'callout', tone: 'blue', text: "Cancelled before the kitchen starts cooking? You're refunded in full, automatically." },
    ],
    related: [
      { label: 'Ways to pay on Nana', href: '/help/payment-methods' },
      { label: 'Contact support', href: '/contact' },
    ],
  },
  'vendor-payouts': {
    slug: 'vendor-payouts',
    category: 'Vendors & riders',
    title: 'When vendors get paid',
    meta: 'Updated July 2026 · 2 min read',
    blocks: [
      { type: 'p', text: 'Payouts run weekly, and every naira is traceable in your vendor dashboard.' },
      {
        type: 'rows',
        items: [
          { label: 'Payout day', value: 'Every Tuesday' },
          { label: 'Covers', value: 'Mon–Sun before' },
          { label: 'Commission', value: 'Per your contract' },
        ],
      },
      { type: 'p', text: 'Open **Payouts** in the vendor dashboard for a statement listing every order, its commission and any refunds deducted. If a payout hasn\'t landed by Wednesday evening, message your partner manager with the statement reference.' },
    ],
    related: [{ label: 'Apply to sell on Nana', href: '/vendors' }],
  },
};

export const ARTICLE_SLUGS = Object.keys(ARTICLES);
