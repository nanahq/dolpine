import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Market place'
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
