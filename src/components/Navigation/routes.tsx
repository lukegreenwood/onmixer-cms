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

import { NetworkSelector } from './NetworkSelector';

export type NavigationItem =
  | {
      path: string;
      label: string;
      icon?: React.ReactNode;
      section?: string;
      items?: NavigationItem[];
    }
  | { section: string; component: React.ReactNode };

export const navigation: NavigationItem[] = [
  {
    icon: <DashboardIcon />,
    path: '/',
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
    section: 'Broadcast',
    component: <NetworkSelector />,
  },
  {
    section: 'Broadcast',
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
    section: 'Broadcast',
    icon: <ShowsIcon />,
    path: '/shows',
    label: 'Shows',
  },
  {
    section: 'Broadcast',
    icon: <EpisodesIcon />,
    path: '/episodes',
    label: 'Episodes',
  },
  {
    section: 'Broadcast',
    icon: <SeriesIcon />,
    path: '/series',
    label: 'Series',
  },
  {
    section: 'Broadcast',
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
