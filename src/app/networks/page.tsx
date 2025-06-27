import { NetworksPage } from '@/components';

export const metadata = {
  title: 'Networks',
};

export default async function NetworksPageRoot() {
  return <NetworksPage />;
}

export const dynamic = 'force-dynamic';
