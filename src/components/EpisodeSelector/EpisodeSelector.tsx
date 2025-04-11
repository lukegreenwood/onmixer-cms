'use client';

import { Badge, Input } from '@soundwaves/components';

import { ScheduleQuery } from '@/graphql/__generated__/graphql';

import { SearchIcon } from '../icons';
import { ItemSelector } from '../ItemSelector';
import { PrimarySecondary } from '../PrimarySecondary';

type EpisodeSelectorProps = {
  episode: ScheduleQuery['schedule']['items'][0]['episode'];
};

export const EpisodeSelector = ({ episode }: EpisodeSelectorProps) => {
  return (
    <ItemSelector
      primaryText={episode.name}
      secondaryText={episode.show.shortName}
      content={
        <div className="popover searchable-list">
          <Input placeholder="Search for episode" before={<SearchIcon />} />
          <ul className="searchable-list__list">
            <li className="searchable-list__item">
              <PrimarySecondary
                secondary={episode.show.shortName}
                primary={episode.name}
              />
              <Badge color="orange" shape="pill" size="sm">
                #{episode.id}
              </Badge>
            </li>
          </ul>
        </div>
      }
    />
  );
};
