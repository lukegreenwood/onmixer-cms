'use client';

import { useNetwork } from '@/hooks';

export default function NetworkPage() {
  const { currentNetwork } = useNetwork();

  if (!currentNetwork) {
    return <div>Loading network...</div>;
  }

  return (
    <div>
      <h1>{currentNetwork.name}</h1>
      <p>{currentNetwork.code}</p>

      <div>
        <h2>Network Content</h2>
        <p>Network ID: {currentNetwork.id}</p>
        <p>Code: {currentNetwork.code}</p>
      </div>
    </div>
  );
}
