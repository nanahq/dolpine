import { PageWrapper } from '@/app/components/layout/Wrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Nana | Food Delivery ',
  description:
    'Order food from your mobile phone and get it delivered in Minutes!. Browse our diverse menu featuring African dishes, jollof rice, and more from your favourite restaurants near you',
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
          defaultTitle="Order your food from Nana"
          page={{
            seo: {
              description:
                'Order food from your mobile phone and get it delivered in Minutes!. Browse our diverse menu featuring African dishes, jollof rice, and more from your favourite restaurants near you',
              title: 'About Nana Delivery App',
            },
          }}
        >
          {children}
        </PageWrapper>
      </body>
    </html>
  );
}