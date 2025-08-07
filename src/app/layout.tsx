import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { Toaster } from 'sonner';

import {
  Navigation,
  InfoIcon,
  Drawer,
  ErrorBoundary,
  LoadingFallback,
} from '@/components';
import { NetworkProvider, DrawerProvider } from '@/contexts';
import { ApolloWrapper } from '@/lib';

import type { Metadata } from 'next';

import '@/style/Chords.scss';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  title: 'OnMixer CMS',
  description: 'Manage your networks with ease',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestCookies = await cookies();
  const cookieString = requestCookies.toString();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        <ApolloWrapper cookieString={cookieString}>
          <NetworkProvider>
            <DrawerProvider>
              <ErrorBoundary>
                <Toaster
                  position="top-right"
                  expand
                  className="toaster"
                  icons={{
                    success: <InfoIcon />,
                    error: <InfoIcon />,
                    warning: <InfoIcon />,
                    info: <InfoIcon />,
                  }}
                />
                <div className="layout">
                  <ErrorBoundary>
                    <Suspense
                      fallback={
                        <LoadingFallback message="Loading navigation..." />
                      }
                    >
                      <Navigation />
                    </Suspense>
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <main>{children}</main>
                  </ErrorBoundary>
                  <ErrorBoundary>
                    <Suspense
                      fallback={<LoadingFallback message="Loading drawer..." />}
                    >
                      <Drawer />
                    </Suspense>
                  </ErrorBoundary>
                </div>
              </ErrorBoundary>
            </DrawerProvider>
          </NetworkProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
