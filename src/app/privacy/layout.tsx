import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description:
        'How Nana Logistics collects, uses and protects personal information in the Nana, Nana Vendor and Nana Rider apps.',
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
        <div className="dark:bg-black dark:text-white">
            {children}
        </div>
    );
}
