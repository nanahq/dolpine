import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to Nana in Kano — in-app chat, WhatsApp or phone on 0812 222 9693, email, or visit our hub on Zoo Road.',
  alternates: { canonical: '/contact' },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
