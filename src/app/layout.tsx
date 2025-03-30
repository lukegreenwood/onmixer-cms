import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Navigation } from '@/components/Navigation';
import { NetworkProvider } from '@/contexts';
import { ApolloWrapper } from '@/lib';

import '@/style/Chords.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OnMixer CMS',
  description: 'Manage your networks with ease',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        <ApolloWrapper>
          <NetworkProvider>
            <div className="layout">
              <Navigation />
              <main>{children}</main>
            </div>
          </NetworkProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
