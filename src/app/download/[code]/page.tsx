import type { Metadata } from 'next';
import { getAmbassadorInvite } from '../../../lib/api/ambassadors';
import { DownloadView } from '../../components/download/DownloadView';

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  const invite = await getAmbassadorInvite(params.code);
  const title = invite?.first_name ? `${invite.first_name} invited you to Nana` : 'Get Nana';
  const description = invite?.free_delivery
    ? `Use code ${invite.code} for free delivery on your first order. Food, groceries and packages, delivered.`
    : 'Food, groceries and packages, delivered.';
  return {
    title,
    description,
    robots: { index: false },
    openGraph: { title, description, images: ['/opengraph-image.png'] },
  };
}

/** An ambassador's link. Same as /download, plus their code. */
export default async function AmbassadorDownloadPage({ params }: { params: { code: string } }) {
  const invite = await getAmbassadorInvite(params.code);
  return <DownloadView invite={invite} />;
}
