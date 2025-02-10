
import { Metadata } from 'next';
import {Suspense} from "react";

export const metadata: Metadata = {
    title: 'Payment - Pay for your order',
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
        <Suspense fallback={<div>.............</div>}>
          <div className="dark:bg-black dark:text-white">
              {children}
          </div>
      </Suspense>
    );
}
