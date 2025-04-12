import { useMutation } from '@apollo/client';
import { Badge, HoverCard } from '@soundwaves/components';

import { EpisodePreview, EpisodeSelector } from '@/components';
import { ScheduleQuery } from '@/graphql/__generated__/graphql';
import { UPDATE_SCHEDULE_ITEM } from '@/graphql/mutations/updateScheduleItem';

interface EpisodeCellProps {
  episode: ScheduleQuery['schedule']['items'][0]['episode'];
  scheduleItemId: string;
}

export const EpisodeCell = ({ episode, scheduleItemId }: EpisodeCellProps) => {
  const [updateScheduleItem] = useMutation(UPDATE_SCHEDULE_ITEM);

  const handleSelect = (episodeId: string) => {
    updateScheduleItem({
      variables: {
        input: {
          id: scheduleItemId,
          episode: episodeId,
        },
      },
    });
  };

  return (
    <div className="flex flex--row flex--justify-between">
      <EpisodeSelector episode={episode} onSelect={handleSelect} />
      <HoverCard>
        <HoverCard.Trigger asChild>
          <Badge color="gray" shape="rounded" size="md">
            {episode.id}
          </Badge>
        </HoverCard.Trigger>
        <HoverCard.Content>
          <EpisodePreview episodeId={episode.id} />
          <HoverCard.Arrow />
        </HoverCard.Content>
      </HoverCard>
    </div>
  );
};
