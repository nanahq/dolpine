import React, { FC, PropsWithChildren, useMemo, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Analytics from '@/components/analytics';


interface Page {
  seo?: {
    description?: string;
    title?: string;
  };
}
interface PagewrapperProps {
  location?: string;
  defaultTitle?: string;
  page?: Page;
}
export const PageWrapper: FC<PropsWithChildren<PagewrapperProps>> = ({
  defaultTitle,
  page,
  children,
}) => {
  const router = useRouter();
  const routePath = useMemo(() => router.asPath, [router.asPath]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const title = defaultTitle ?? 'Nana';
  const description =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    page?.meta?.seo?.description ??
    'Order food from your mobile phone and get it delivered in Minutes!. Browse our diverse menu featuring African dishes, jollof rice, and more from your favourite restaurants near you';

  const image = '/thumbnail.png';
  const domain = 'https://www.trynanaapp.com';
  return (
    <div className="overflow-hidden">
      <Head>
        <title>{`${title} - Food Delivery`}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={`${title}`} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          name="ogUrl"
          property="og:url"
          content={`${domain}${routePath}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={`${title} - Food Delivery`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${domain}${image}`} />
        <meta property="twitter:url" content={`${domain}${routePath}`} />
        <meta property="twitter:title" content={`${title} - Food Delivery`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={`${domain}${image}`} />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <div className="md:container lg:py-5 pb-20">
        <Header />
        <main>{children}</main>
      </div>
      <Footer />
      <Analytics />
    </div>
  );
};
