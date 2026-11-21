import './globals.css';
import './site-v2.css';
import { PageWrapper } from './components/layout/Wrapper';
import { Metadata } from 'next';
import { Archivo, Instrument_Sans } from 'next/font/google';
import { KANO_TAGLINE, SITE_URL } from '@/lib/kano';

// Website v2 type: Instrument Sans for text, Archivo's condensed width axis for display.
const instrument = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument', display: 'swap' });
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });

const HOME_TITLE = 'Nana | Food, Grocery & Errand Delivery in Kano';
const HOME_DESCRIPTION = `${KANO_TAGLINE}. Order from Kano restaurants, supermarkets and stores, pay by card or transfer, and track your rider live.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: '%s | Nana Food Delivery',
  },
  description: HOME_DESCRIPTION,
  openGraph: {
    url: SITE_URL,
    type: 'website',
    siteName: 'Nana',
    locale: 'en_NG',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: '/opengraph-image.png',
        height: '630',
        width: '1200',
      },
    ],
  },
  keywords:
    'food delivery Kano, order food online Kano, Kano restaurants, grocery delivery Kano, errand delivery Kano, Nana',
  twitter: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    card: 'summary_large_image',
    site: '@nana_app_hq',
    creator: '@nana_app_hq',
    images: ['/opengraph-image.png']
  },
  itunes: {
    appId: '6499050428',
    appArgument: 'trynanaapp.com'
  },
  appLinks: {
    android: {
      package: 'com.nanaeats.nana_app',
      url: 'https://play.google.com/store/apps/details?id=com.nanaeats.nana_app',
    },
    iphone: {
      app_name:"Nana | Delivery & More",
      app_store_id: '6499050428',
      url: "https://apps.apple.com/us/app/nana-delivery-more/id6499050428"
    },
    ios: {
      app_name:"Nana | Delivery & More",
      app_store_id: '6499050428',
      url: "https://apps.apple.com/us/app/nana-delivery-more/id6499050428"
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className={`${instrument.variable} ${archivo.variable}`}>
      <body>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
