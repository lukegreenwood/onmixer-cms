'use client';

import { Button } from '@soundwaves/components';
import React from 'react';

import { closeAllDrawers, openDrawer } from '@/utils/drawer';

// Example drawer content component
const DrawerContent: React.FC<{ title?: string }> = ({
  title = 'Test Drawer',
}) => {
  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>{title}</h2>
      <p>This is a test drawer content!</p>
      <p>You can put any React component here.</p>
      <Button
        onClick={() => {
          openDrawer(<DrawerContent title="Nested Drawer" />);
        }}
        variant="secondary"
        size="sm"
      >
        Open Nested Drawer
      </Button>
    </div>
  );
};

export const TestDrawer: React.FC = () => {
  const handleOpenDrawer = () => {
    openDrawer(<DrawerContent title="Hello from Drawer!" />);
  };

  const handleOpenComplexDrawer = () => {
    openDrawer(
      <div>
        <h2>Complex JSX Drawer</h2>
        <p>You can pass any JSX directly!</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <Button
          onClick={() => openDrawer(<div>Simple JSX content</div>)}
          variant="secondary"
          size="sm"
        >
          Open Simple JSX Drawer
        </Button>
      </div>,
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Drawer Test - JSX API</h1>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button onClick={handleOpenDrawer} variant="primary">
          Open Component Drawer
        </Button>
        <Button onClick={handleOpenComplexDrawer} variant="primary">
          Open Complex JSX Drawer
        </Button>
        <Button onClick={() => closeAllDrawers()} variant="primary" destructive>
          Close all drawers
        </Button>
      </div>
    </div>
  );
};
