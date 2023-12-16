import React, { FC, PropsWithChildren, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

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
    children
}) => {
  const router = useRouter();
  const routePath = useMemo(() => router.asPath, [router.asPath]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const title = defaultTitle ?? "Nana";
  const description =
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    page?.meta?.seo?.description ??
    'Discover local flavors with Nana. Browse our diverse menu featuring African dishes, jollof rice, and more. Enjoy the convenience of our reliable restaurant delivery service, bringing your favorite meals to your doorstep. Order now and savor the taste of home comfort.';

  const image = "/thumbnail.jpg";
  const domain = "https://trynanaapp.com";
  return (
    <div className="overflow-hidden">
      <Head>
        <title>{`${title} - Food Delivery From Your Favourites`}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={`${title} - Food Delivery From Your Favourites`} />
        <meta property="og:type" content="website" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          name="ogUrl"
          property="og:url"
          content={`${domain}${routePath}`}
        />
        <meta property="og:title" content={`${title} - Food Delivery From Your Favourites`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="twitter:url" content={`${domain}${routePath}`} />
        <meta property="twitter:title" content={`${title} - Food Delivery From Your Favourites`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={image} />
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
      <main>{children}</main>
    </div>
  );
};
