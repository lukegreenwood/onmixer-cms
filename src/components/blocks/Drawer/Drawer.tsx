'use client';

import { Button, CloseIcon } from '@soundwaves/components';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect } from 'react';

import { useDrawer, setGlobalDrawerContext } from '@/contexts/DrawerContext';

interface DrawerProps {
  id: string;
  content: React.ReactNode;
  index: number;
  onClose: () => void;
}

const DrawerItem: React.FC<DrawerProps> = ({ content, index, onClose }) => {
  const slideVariants = {
    initial: { x: '100%' },
    animate: { x: 0 },
    exit: { x: '100%' },
  };

  const DrawerContent = (
    <>
      <div className="drawer__close-wrapper">
        <Button
          onClick={onClose}
          variant="transparent"
          size="sm"
          className="drawer__close"
          isIconOnly
        >
          <CloseIcon />
        </Button>
      </div>
      <div className="drawer__body">{content}</div>
    </>
  );

  if (index === 0) {
    return (
      <div
        className={clsx('drawer', `drawer--${index}`)}
        style={
          {
            '--drawer-index': index,
          } as React.CSSProperties
        }
      >
        {DrawerContent}
      </div>
    );
  }

  return (
    <motion.div
      className={clsx('drawer', `drawer--${index}`)}
      style={
        {
          '--drawer-index': index,
        } as React.CSSProperties
      }
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.3,
      }}
    >
      {DrawerContent}
    </motion.div>
  );
};

export const DrawerContainer: React.FC = () => {
  const { drawers, closeDrawer, ...drawerContext } = useDrawer();

  // Set global drawer context for imperative API
  useEffect(() => {
    setGlobalDrawerContext({ drawers, closeDrawer, ...drawerContext });
  }, [drawers, closeDrawer, drawerContext]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && drawers.length > 0) {
        const topDrawer = drawers[drawers.length - 1];
        closeDrawer(topDrawer.id);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [drawers, closeDrawer]);

  return (
    <AnimatePresence>
      {drawers.map((drawer, index) => (
        <DrawerItem
          key={drawer.id}
          id={drawer.id}
          content={drawer.content}
          index={index}
          onClose={() => closeDrawer(drawer.id)}
        />
      ))}
    </AnimatePresence>
  );
};

export const Drawer = DrawerContainer;
