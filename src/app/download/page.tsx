import type { Metadata } from 'next';
import { DownloadView } from '../components/download/DownloadView';

export const metadata: Metadata = {
  title: { absolute: 'Get the Nana App — Food, Grocery & Errand Delivery in Kano' },
  description: 'Download Nana for Android or iPhone. Order food, groceries and errands across Kano and track your rider live.',
  alternates: { canonical: '/download' },
};

export default function DownloadPage() {
  return <DownloadView />;
}
