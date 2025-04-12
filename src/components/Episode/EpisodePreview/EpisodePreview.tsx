'use client';

import { useQuery } from '@apollo/client';
import { Alert, Avatar, Badge, Button, Loading } from '@soundwaves/components';
import Link from 'next/link';

import { GET_EPISODE_DETAILS } from '@/graphql/queries/episodes';
import { BroadcastsIcon } from '@/icons';
import { getRoutePath } from '@/lib';
import { pluralize } from '@/utils';

interface EpisodePreviewProps {
  episodeId: string;
}

interface Network {
  id: string;
  logoSvgIcon: string;
}

export const EpisodePreview = ({ episodeId }: EpisodePreviewProps) => {
  const { data, loading } = useQuery(GET_EPISODE_DETAILS, {
    variables: { id: episodeId },
    fetchPolicy: 'cache-first',
  });

  if (loading) {
    return (
      <div className="item-preview item-preview--loading">
        <Loading />
      </div>
    );
  }

  if (!data?.episode) {
    return (
      <div className="item-preview item-preview--loading">
        <Alert variant="inline" color="error">
          Episode not found
        </Alert>
      </div>
    );
  }

  const { episode } = data;

  return (
    <div className="item-preview">
      <div className="item-preview__meta">
        <div className="item-preview__image">
          <img
            src={
              episode.featuredImage.urls.customSquare ??
              episode.featuredImage.urls.square
            }
            alt={episode.name}
          />
        </div>
        <div className="item-preview__meta-items">
          <Badge
            color="pink"
            shape="pill"
            size="sm"
            before={<BroadcastsIcon size={16} />}
          >
            {episode.broadcasts.length}{' '}
            {pluralize(episode.broadcasts.length, 'Broadcast')}
          </Badge>
          {episode.networks.map((network: Network) => (
            <Avatar key={network.id} size="sm">
              <Avatar.Fallback
                dangerouslySetInnerHTML={{
                  __html: network.logoSvgIcon,
                }}
              />
            </Avatar>
          ))}
        </div>
      </div>
      <div className="item-preview__detail">{episode.show.shortName}</div>
      <div className="item-preview__title">{episode.name}</div>
      <div className="item-preview__footer">
        <div className="item-preview__description">{episode.description}</div>
        <Button variant="tertiary" size="sm" asChild>
          <Link href={getRoutePath('episodesEdit', [episode.id])}>Edit</Link>
        </Button>
      </div>
    </div>
  );
};
