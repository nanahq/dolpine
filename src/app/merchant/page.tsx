import { permanentRedirect } from 'next/navigation';

/** The old single "featured store" page; every store now lives in the marketplace. */
export default function MerchantPage() {
  permanentRedirect('/marketplace');
}
