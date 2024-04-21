import './globals.css';
import { PageWrapper } from '@/app/components/layout/Wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nana | Food Delivery ',
  description: 'Deliver Experiences while earning money',
  keywords:
    'Food delivery, food delivery driver kano, Food, delivery, order food online',
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
          defaultTitle="Become a delivery partner"
          page={{
            seo: {
              description: 'Become a partner | Delivery joy and earn money',
              title: 'Nana for riders',
            },
          }}
        >
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}
