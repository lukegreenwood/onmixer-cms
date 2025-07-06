'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useNetwork } from '@/hooks';
import { NavigationItem, navigationItems } from '@/lib';

import { Logo } from '../Logo';

export function Navigation() {
  const pathname = usePathname();
  const { currentNetwork } = useNetwork();

  const isSelected = (path: string, hasChildren: boolean) => {
    const networkPath = currentNetwork
      ? `/networks/${currentNetwork.code}${path}`
      : path;

    if (hasChildren) {
      return pathname === networkPath;
    }

    // For leaf items, check if this is the most specific match
    // by ensuring no child paths come after this one in the URL
    if (pathname.startsWith(networkPath)) {
      const remainingPath = pathname.slice(networkPath.length);
      return !remainingPath || remainingPath === '/';
    }

    return false;
  };

  const getNetworkBasedUrl = (baseUrl: string, parentPath?: string) => {
    const fullPath = parentPath ? `${parentPath}${baseUrl}` : baseUrl;

    if (!currentNetwork) return fullPath;
    return `/networks/${currentNetwork.code}${fullPath}`;
  };

  const groupedNavigation = navigationItems.reduce<
    Record<string, NavigationItem[]>
  >((acc, item) => {
    const section = item.section || 'none';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(item);
    return acc;
  }, {});

  const renderNavigationItems = (
    items: NavigationItem[],
    currentSection: string,
    level = 0,
  ) => {
    return items.map((item) => {
      if ('component' in item) {
        return <li key={item.section}>{item.component}</li>;
      }

      const itemPath = item.path;
      const hasChildren = Boolean(item.items && item.items.length > 0);

      return (
        <li key={itemPath}>
          <Link
            href={
              currentSection === 'Broadcast'
                ? getNetworkBasedUrl(item.path)
                : itemPath
            }
            className={`navigation__menu-item ${
              isSelected(itemPath, hasChildren)
                ? 'navigation__menu-item--selected'
                : ''
            } ${level > 0 ? `navigation__menu-item--level-${level}` : ''}`}
          >
            {item.icon}
            <span className="navigation__menu-item-text">{item.label}</span>
          </Link>
          {item.items && (
            <ul className="navigation__menu">
              {renderNavigationItems(
                item.items,
                currentSection,

                level + 1,
              )}
            </ul>
          )}
        </li>
      );
    });
  };

  return (
    <nav className="navigation">
      <div className="navigation__header">
        <div className="navigation__logo">
          <Logo />
        </div>
      </div>

      <div className="navigation__content">
        {Object.entries(groupedNavigation).map(([section, items], index) => {
          if (items.length === 0) return null;

          return (
            <div key={section}>
              {section !== 'none' && (
                <div className="navigation__menu-label">{section}</div>
              )}
              <ul
                className={`navigation__menu ${
                  index < Object.keys(groupedNavigation).length - 1
                    ? 'navigation__menu--divided'
                    : ''
                }`}
              >
                {renderNavigationItems(items, section)}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="navigation__footer">
        {/* Add your account section here */}
      </div>
    </nav>
  );
}
