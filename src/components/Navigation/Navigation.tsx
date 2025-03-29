'use client';

import { useNetwork } from '@/hooks';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ArticleIcon,
  AuditIcon,
  DashboardIcon,
  EpisodesIcon,
  FeedIcon,
  Logo,
  MediaIcon,
  MixesIcon,
  ModulesIcon,
  NetworksIcon,
  PlaylistsIcon,
  PodcastsIcon,
  PresentersIcon,
  ScheduleIcon,
  SeriesIcon,
  ShowsIcon,
  TrackIcon,
} from '@/components';
import { Popover } from '@soundwaves/components';
import { useSuspenseQuery } from '@apollo/client';
import { GET_NETWORKS } from '@/graphql/queries/networks';

interface NavigationItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
  section?: string;
  items?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  {
    icon: <DashboardIcon />,
    path: '/dashboard',
    label: 'Dashboard',
  },
  {
    icon: <NetworksIcon />,
    path: '/networks',
    label: 'Networks',
  },
  {
    icon: <AuditIcon />,
    path: '/audit',
    label: 'Audit',
  },
  {
    icon: <TrackIcon />,
    path: '/tracks',
    label: 'Tracks',
  },
  {
    icon: <MediaIcon />,
    path: '/media',
    label: 'Media',
  },
  {
    section: 'Network',
    icon: <ScheduleIcon />,
    path: '/schedule',
    label: 'Schedule',
    items: [
      {
        path: '/templates',
        label: 'Templates',
      },
      {
        path: '/templates/assignments',
        label: 'Template Assignments',
      },
    ],
  },
  {
    section: 'Network',
    icon: <ShowsIcon />,
    path: '/shows',
    label: 'Shows',
  },
  {
    section: 'Network',
    icon: <EpisodesIcon />,
    path: '/episodes',
    label: 'Episodes',
  },
  {
    section: 'Network',
    icon: <SeriesIcon />,
    path: '/series',
    label: 'Series',
  },
  {
    section: 'Network',
    icon: <PresentersIcon />,
    path: '/presenters',
    label: 'Presenters',
  },
  {
    section: 'Online',
    icon: <FeedIcon />,
    path: '/feed',
    label: 'Feed',
  },
  {
    section: 'Online',
    icon: <ModulesIcon />,
    path: '/modules',
    label: 'Modules',
  },
  {
    section: 'Online',
    icon: <ArticleIcon />,
    path: '/articles',
    label: 'Articles',
  },
  {
    section: 'Mixer',
    icon: <MixesIcon />,
    path: '/mixes',
    label: 'Mixes',
  },
  {
    section: 'Mixer',
    icon: <PodcastsIcon />,
    path: '/podcasts',
    label: 'Podcasts',
  },
  {
    section: 'Mixer',
    icon: <PlaylistsIcon />,
    path: '/playlists',
    label: 'Playlists',
  },
];

export function Navigation() {
  const pathname = usePathname();
  const { currentNetwork } = useNetwork();
  const { data } = useSuspenseQuery(GET_NETWORKS);

  const networks = data?.networks || [];

  const isSelected = (path: string) => {
    return pathname.includes(path);
  };

  const getNetworkBasedUrl = (baseUrl: string) => {
    if (!currentNetwork) return baseUrl;
    return `/networks/${currentNetwork.code}${baseUrl}`;
  };

  const groupedNavigation = navigation.reduce<Record<string, NavigationItem[]>>(
    (acc, item) => {
      const section = item.section || 'none';
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(item);
      return acc;
    },
    {},
  );

  const renderNavigationItems = (
    items: NavigationItem[],
    currentSection: string,
    level = 0,
  ) => {
    return items.map((item) => (
      <li key={item.path}>
        <Link
          href={
            currentSection === 'Network'
              ? item.path
              : getNetworkBasedUrl(item.path)
          }
          className={`navigation__menu-item ${
            isSelected(getNetworkBasedUrl(item.path))
              ? 'navigation__menu-item--selected'
              : ''
          } ${level > 0 ? `navigation__menu-item--level-${level}` : ''}`}
        >
          {item.icon}
          <span className="navigation__menu-item-text">{item.label}</span>
        </Link>
        {item.items && (
          <ul className="navigation__menu">
            {renderNavigationItems(item.items, currentSection, level + 1)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <nav className="navigation">
      <div className="navigation__logo">
        <Logo />
      </div>

      <Popover>
        <Popover.Trigger>
          <button className="navigation__menu-item">
            <span className="navigation__menu-item-text">
              {currentNetwork ? currentNetwork.name : 'Select Network'}
            </span>
          </button>
        </Popover.Trigger>
        <Popover.Content>
          <div className="dropdown-menu">
            {networks.map((network) => (
              <Link
                key={network.id}
                href={`/networks/${network.code}`}
                className="dropdown-menu__item"
              >
                {network.name}
              </Link>
            ))}
          </div>
        </Popover.Content>
      </Popover>

      {Object.entries(groupedNavigation).map(([section, items], index) => (
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
      ))}
    </nav>
  );
}
