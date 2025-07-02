import { sprintf } from 'sprintf-js';

import {
  ArticleIcon,
  AuditIcon,
  DashboardIcon,
  EpisodesIcon,
  FeedIcon,
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

import { NetworkSelector } from '../components/Navigation/NetworkSelector';

type NavigationItemLink = {
  path: RoutePath;
  label: string;
  icon?: React.ReactNode;
  section?: string;
  items?: NavigationItem[];
};

type NavigationItemComponent = {
  section: string;
  component: React.ReactNode;
};

export type NavigationItem = NavigationItemLink | NavigationItemComponent;

const navigationRoutes = {
  dashboard: '/',
  networks: '/networks',
  audit: '/audit',
  tracks: '/tracks',
  media: '/media',
  schedule: '/schedule',
  shows: '/shows',
  createShow: '/shows/create',
  showEdit: '/shows/%i/edit',
  episodes: '/episodes',
  episodesEdit: '/episodes/%i/edit',
  createEpisode: '/episodes/create',
  series: '/series',
  createSeries: '/series/create',
  seriesEdit: '/series/%i/edit',
  presenters: '/presenters',
  createPresenter: '/presenters/create',
  presenterEdit: '/presenters/%i/edit',
  feed: '/feed',
  modules: '/modules',
  articles: '/articles',
  mixes: '/mixes',
  podcasts: '/podcasts',
  playlists: '/playlists',
  templates: '/templates',
  templateAssignments: '/templates/assignments',
} as const;

export type RouteName = keyof typeof navigationRoutes;
export type RoutePath = (typeof navigationRoutes)[RouteName];

export const navigationItems: Array<NavigationItem> = [
  {
    icon: <DashboardIcon />,
    path: navigationRoutes.dashboard,
    label: 'Dashboard',
  },
  {
    icon: <NetworksIcon />,
    path: navigationRoutes.networks,
    label: 'Networks',
  },
  {
    icon: <AuditIcon />,
    path: navigationRoutes.audit,
    label: 'Audit',
  },
  {
    icon: <TrackIcon />,
    path: navigationRoutes.tracks,
    label: 'Tracks',
  },
  {
    icon: <MediaIcon />,
    path: navigationRoutes.media,
    label: 'Media',
  },

  {
    section: 'Broadcast',
    component: <NetworkSelector />,
  },
  {
    section: 'Broadcast',
    icon: <ScheduleIcon />,
    path: navigationRoutes.schedule,
    label: 'Schedule',
    items: [
      {
        path: navigationRoutes.templates,
        label: 'Templates',
      },
      {
        path: navigationRoutes.templateAssignments,
        label: 'Template Assignments',
      },
    ],
  },
  {
    section: 'Broadcast',
    icon: <ShowsIcon />,
    path: navigationRoutes.shows,
    label: 'Shows',
  },
  {
    section: 'Broadcast',
    icon: <EpisodesIcon />,
    path: navigationRoutes.episodes,
    label: 'Episodes',
  },
  {
    section: 'Broadcast',
    icon: <SeriesIcon />,
    path: navigationRoutes.series,
    label: 'Series',
  },
  {
    section: 'Broadcast',
    icon: <PresentersIcon />,
    path: navigationRoutes.presenters,
    label: 'Presenters',
  },

  {
    section: 'Online',
    icon: <FeedIcon />,
    path: navigationRoutes.feed,
    label: 'Feed',
  },
  {
    section: 'Online',
    icon: <ModulesIcon />,
    path: navigationRoutes.modules,
    label: 'Modules',
  },
  {
    section: 'Online',
    icon: <ArticleIcon />,
    path: navigationRoutes.articles,
    label: 'Articles',
  },

  {
    section: 'Mixer',
    icon: <MixesIcon />,
    path: navigationRoutes.mixes,
    label: 'Mixes',
  },
  {
    section: 'Mixer',
    icon: <PodcastsIcon />,
    path: navigationRoutes.podcasts,
    label: 'Podcasts',
  },
  {
    section: 'Mixer',
    icon: <PlaylistsIcon />,
    path: navigationRoutes.playlists,
    label: 'Playlists',
  },
];

const routeMap = new Map<RouteName, RoutePath>(
  Object.entries(navigationRoutes) as Array<[RouteName, RoutePath]>,
);

export const getRoutePath = (
  label: RouteName,
  replacements: Array<string | number>,
) => {
  const route = routeMap.get(label);

  if (!route) {
    throw new Error(`Route not found: ${label}`);
  }

  return sprintf(route, ...replacements);
};
