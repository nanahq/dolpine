import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Nana is a Kano delivery company bringing food, groceries and errands to your door, working with local kitchens, markets and riders.',
  alternates: { canonical: '/about' },
  appLinks: {
    android: {
      package: 'com.nanaeats.nana_app',
      url: 'https://play.google.com/store/apps/details?id=com.nanaeats.nana_app',
    },
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
