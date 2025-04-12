'use client';

import { useQuery } from '@apollo/client';
import { Badge, Input, Loading } from '@soundwaves/components';
import { useDebouncer } from '@tanstack/react-pacer';
import { useState } from 'react';

import {
  EpisodeFilterField,
  FilterType,
  OperatorType,
  ScheduleQuery,
} from '@/graphql/__generated__/graphql';
import { SEARCH_EPISODES } from '@/graphql/queries/episodes';
import { useNetwork } from '@/hooks';

import { SearchIcon } from '../../icons';
import { ItemSelector } from '../../ItemSelector';
import { PrimarySecondary } from '../../PrimarySecondary';

type EpisodeSelectorProps = {
  episode: ScheduleQuery['schedule']['items'][0]['episode'];
  onSelect: (episodeId: string) => void;
};

export const EpisodeSelector = ({
  episode,
  onSelect,
}: EpisodeSelectorProps) => {
  const { currentNetwork } = useNetwork();
  const [open, setOpen] = useState(false);

  const { data, loading, refetch } = useQuery(SEARCH_EPISODES, {
    variables: {
      filters: {
        filter: [
          {
            field: EpisodeFilterField.Networks,
            value: currentNetwork?.id ?? '',
            type: FilterType.List,
          },
        ],
      },
    },
  });

  const handleSearch = (value: string) => {
    refetch({
      filters: {
        filter: [
          {
            field: EpisodeFilterField.Networks,
            value: currentNetwork?.id ?? '',
            type: FilterType.List,
            operator: OperatorType.And,
          },
          {
            group: [
              {
                field: EpisodeFilterField.Name,
                value,
                type: FilterType.Contains,
              },
              {
                field: EpisodeFilterField.Id,
                value,
                type: FilterType.Contains,
              },
            ],
            operator: OperatorType.Or,
          },
        ],
      },
    }).catch((error) => {
      console.error('Refetch error:', error);
    });
  };

  const debouncedHandleSearch = useDebouncer(handleSearch, { wait: 500 });

  const resetResults = () => {
    refetch({
      filters: {
        filter: [
          {
            field: EpisodeFilterField.Networks,
            value: currentNetwork?.id ?? '',
            type: FilterType.List,
          },
        ],
      },
    });
  };

  return (
    <ItemSelector
      primaryText={episode.name}
      secondaryText={episode.show.shortName}
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (open) {
          resetResults();
        }
      }}
      content={
        <div className="popover searchable-list">
          <Input
            placeholder="Search for episode"
            before={<SearchIcon />}
            after={loading ? <Loading /> : undefined}
            onChange={(event) =>
              debouncedHandleSearch.maybeExecute(
                (event.target as HTMLInputElement).value,
              )
            }
          />
          <ul className="searchable-list__list">
            {data?.episodes?.items && data?.episodes?.items.length > 0 ? (
              data?.episodes.items.map((episode) => (
                <li key={episode.id}>
                  <button
                    className="searchable-list__item"
                    key={episode.id}
                    onClick={() => {
                      onSelect(episode.id);
                      setOpen(false);
                    }}
                  >
                    <PrimarySecondary
                      secondary={episode.show.shortName}
                      primary={episode.name}
                    />
                    <Badge color="orange" shape="pill" size="sm">
                      #{episode.id}
                    </Badge>
                  </button>
                </li>
              ))
            ) : (
              <li className="searchable-list__item searchable-list__item--empty">
                No episodes found
              </li>
            )}
          </ul>
        </div>
      }
    />
  );
};
