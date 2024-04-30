import './globals.css';
import { PageWrapper } from './components/layout/Wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Nana | Food Delivery ',
    template: '%s | Nana Food Delivery',
  },
  description:
    'Order food from your mobile phone and get it delivered in Minutes!. Browse our diverse menu featuring African dishes, jollof rice, and more from your favourite restaurants near you',
  openGraph: {
    url: 'https://trynanaapp.com',
    type: 'website',
    title:
      'Order food from your mobile phone and get it delivered in Minutes!.',
    images: [
      {
        url: '/opengraph-image.png',
        height: '630',
        width: '1200',
      },
    ],
  },
  keywords:
    'Food delivery, food delivery driver kano, Food, delivery, order food online',
  twitter: {
    title:
      'Nana Delivery App - Order food from your mobile phone and get it delivered in minutes!. Browse our diverse menu featuring African dishes, jollof rice, and more from your favourite restaurants near you',
    card: 'summary_large_image',
    site: 'trynanaapp.com',
    creator: '@nana_app_hq',
    images: ['/twitter-image.png']
  },
  appLinks: {
    android: {
      package: 'com.nanaeats.nana_app',
      url: 'https://play.google.com/store/apps/details?id=com.nanaeats.nana_app',
    },
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-black dark:text-white">
        <PageWrapper
        >
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
