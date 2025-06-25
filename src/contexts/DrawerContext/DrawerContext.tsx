'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

export interface DrawerItem {
  id: string;
  content: React.ReactNode;
}

interface DrawerContextType {
  drawers: DrawerItem[];
  openDrawer: (content: React.ReactNode, options?: { id?: string }) => string;
  closeDrawer: (id: string) => void;
  closeAllDrawers: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [drawers, setDrawers] = useState<DrawerItem[]>([]);

  const openDrawer = useCallback(
    (content: React.ReactNode, options?: { id?: string }): string => {
      const id = options?.id || crypto.randomUUID();

      setDrawers((prev) => [
        ...prev,
        {
          id,
          content,
        },
      ]);

      return id;
    },
    [],
  );

  const closeDrawer = useCallback((id: string) => {
    setDrawers((prev) => prev.filter((drawer) => drawer.id !== id));
  }, []);

  const closeAllDrawers = useCallback(() => {
    setDrawers([]);
  }, []);

  return (
    <DrawerContext.Provider
      value={{
        drawers,
        openDrawer,
        closeDrawer,
        closeAllDrawers,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};

// Imperative API functions that can be used anywhere
let globalDrawerContext: DrawerContextType | null = null;

export const setGlobalDrawerContext = (context: DrawerContextType) => {
  globalDrawerContext = context;
};

export const openDrawer = (
  content: React.ReactNode,
  options?: { id?: string },
): string => {
  if (!globalDrawerContext) {
    throw new Error(
      'Drawer system not initialized. Make sure DrawerProvider is mounted.',
    );
  }
  return globalDrawerContext.openDrawer(content, options);
};

export const closeDrawer = (id: string): void => {
  if (!globalDrawerContext) {
    throw new Error(
      'Drawer system not initialized. Make sure DrawerProvider is mounted.',
    );
  }
  globalDrawerContext.closeDrawer(id);
};

export const closeAllDrawers = (): void => {
  if (!globalDrawerContext) {
    throw new Error(
      'Drawer system not initialized. Make sure DrawerProvider is mounted.',
    );
  }
  globalDrawerContext.closeAllDrawers();
};
