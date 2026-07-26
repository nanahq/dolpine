import type { ApiMerchantDetail, ApiReview } from './types';

/**
 * Static fallback used by the featured `/merchant` page when the API returns
 * nothing (e.g. unreachable at build time). Mirrors the original design mock so
 * the page always renders the full layout. Real stores render live data.
 */
export const SAMPLE_MERCHANT_DETAIL: ApiMerchantDetail = {
  id: 'sample',
  business_name: "Mama Rukky's Kitchen",
  merchant_type: 'restaurant',
  logo_url: null,
  banner_url: null,
  rating: 4.8,
  total_reviews: 312,
  delivery_fee: 500,
  minimum_order: 0,
  preparation_time: 20,
  is_open: true,
  cuisine_types: ['Nigerian', 'Rice', 'Grills'],
  address: {
    id: 'sample-addr',
    address_line_1: '12 Zoo Road, opposite the water board gate',
    city: 'Kano',
    state: 'Kano',
    country: 'Nigeria',
  },
  operating_hours: [0, 1, 2, 3, 4, 5, 6].map((d) => ({
    id: `oh-${d}`,
    day_of_week: d,
    open_time: '09:00',
    close_time: '23:00',
    is_closed: false,
  })),
  category: [
    {
      id: 'signatures',
      name: 'Signatures',
      sort_order: 0,
      products: [
        { id: 'p1', name: 'Party jollof with chicken', description: 'Smoky party rice, grilled chicken quarter, fried plantain.', base_price: 4500, image_url: null, is_available: true, sort_order: 0 },
        { id: 'p2', name: 'Suya platter (medium)', description: 'Beef suya, yaji spice, onions and tomato on the side.', base_price: 3800, image_url: null, is_available: true, sort_order: 1 },
        { id: 'p3', name: 'Miyan kuka & tuwo', description: 'Baobab leaf soup with beef, served with tuwo shinkafa.', base_price: 3200, image_url: null, is_available: true, sort_order: 2 },
        { id: 'p4', name: 'Masa & miyan taushe', description: 'Rice cakes with pumpkin and groundnut stew.', base_price: 2400, image_url: null, is_available: true, sort_order: 3 },
      ],
    },
    {
      id: 'rice',
      name: 'Rice & swallow',
      sort_order: 1,
      products: [
        { id: 'r1', name: 'Jollof rice (plate)', description: 'Add protein at checkout in the app.', base_price: 2200, image_url: null, is_available: true, sort_order: 0 },
        { id: 'r2', name: 'Fried rice & coleslaw', description: 'Vegetable fried rice, fresh slaw, one drumstick.', base_price: 3600, image_url: null, is_available: true, sort_order: 1 },
        { id: 'r3', name: 'Tuwo shinkafa & miyan taushe', description: 'Pounded rice with pumpkin stew and goat meat.', base_price: 3400, image_url: null, is_available: true, sort_order: 2 },
        { id: 'r4', name: 'Semo & egusi', description: 'Melon seed soup with assorted meat and bitterleaf.', base_price: 3500, image_url: null, is_available: true, sort_order: 3 },
      ],
    },
    {
      id: 'grills',
      name: 'Grills & suya',
      sort_order: 2,
      products: [
        { id: 'g1', name: 'Balangu (goat)', description: 'Slow-grilled goat, salt and pepper only. Sold by wrap.', base_price: 5000, image_url: null, is_available: true, sort_order: 0 },
        { id: 'g2', name: 'Grilled tilapia', description: 'Whole fish, pepper sauce, roasted plantain.', base_price: 6200, image_url: null, is_available: true, sort_order: 1 },
        { id: 'g3', name: 'Chicken suya wrap', description: 'Spiced chicken, yaji, onions in warm flatbread.', base_price: 2800, image_url: null, is_available: true, sort_order: 2 },
      ],
    },
    {
      id: 'sides',
      name: 'Sides & drinks',
      sort_order: 3,
      products: [
        { id: 's1', name: 'Fried plantain', description: 'Six pieces, ripe and sweet.', base_price: 900, image_url: null, is_available: true, sort_order: 0 },
        { id: 's2', name: 'Zobo (chilled)', description: 'Hibiscus drink with ginger and pineapple. 50cl.', base_price: 700, image_url: null, is_available: true, sort_order: 1 },
        { id: 's3', name: 'Kunun gyada', description: 'Groundnut millet drink, served warm or cold.', base_price: 800, image_url: null, is_available: true, sort_order: 2 },
      ],
    },
  ],
};

export const SAMPLE_REVIEWS: ApiReview[] = [
  { id: 'sr1', rating: 5, comment: 'The party rice tastes like an actual owambe. Packaged well, nothing spilled.', created_at: new Date(Date.now() - 2 * 86400000).toISOString(), author: { id: 'a1', full_name: 'Fatima A.' } },
  { id: 'sr2', rating: 4, comment: "Good portions and fast. I'd like more yaji on the side next time.", created_at: new Date(Date.now() - 7 * 86400000).toISOString(), author: { id: 'a2', full_name: 'Ibrahim M.' } },
  { id: 'sr3', rating: 5, comment: 'Soup was still steaming when it arrived. This is my Sunday order now.', created_at: new Date(Date.now() - 14 * 86400000).toISOString(), author: { id: 'a3', full_name: 'Zainab K.' } },
];
