import { AppProps, NextWebVitalsMetric } from 'next/app';
import Head from 'next/head';
import { NextPage } from 'next/types';
import { ReactElement, ReactNode } from 'react';

import './index.css';
import jsonPackage from '../../../package.json';
import { ErrorBoundary } from '../src/components/ErrorBoundary/ErrorBoundary';

// See https://nextjs.org/docs/basic-features/layouts
export type NextPageWithLayout = NextPage & {
  // TODO: add type CommonProps instead pageProps: any
  getLayout?: (page: ReactElement, pageProps: any) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Used to expose data to analitycs (experimental)
// See https://nextjs.org/docs/advanced-features/measuring-performance
export const reportWebVitals = (metric: NextWebVitalsMetric) => {
  if (metric.label === 'web-vital') {
    window._webmetric ??= [];
    window._webmetric.push(metric);
  }
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page, _) => page);

  return (
    <>
      <Head>
        <meta name="version" content={jsonPackage.version} />
        <meta
          key="viewport-height"
          name="viewport"
          content="height=device-height, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
        />
        <meta
          key="viewport-width"
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ErrorBoundary>{getLayout(<Component {...pageProps} />, pageProps)}</ErrorBoundary>
    </>
  );
}

export default CustomApp;
