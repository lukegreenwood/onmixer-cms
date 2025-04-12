import { createColumnHelper } from '@tanstack/react-table';

import { NetworksSelectorList, ScheduleItemSelector } from '@/components';
import { ScheduleQuery } from '@/graphql/__generated__/graphql';

import { ActionCell } from './ActionCell';
import { EpisodeCell } from './EpisodeCell';

type ScheduleItem = ScheduleQuery['schedule']['items'][0];
const columnHelper = createColumnHelper<ScheduleItem>();

export const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (props) => <>#{props.getValue()}</>,
  }),
  columnHelper.accessor('episode', {
    header: 'Episode',
    cell: (props) => {
      const episode = props.getValue();
      return (
        <EpisodeCell episode={episode} scheduleItemId={props.row.original.id} />
      );
    },
  }),
  columnHelper.accessor('start', {
    header: 'Broadcast Timings',
    cell: (props) => {
      const scheduleItem = props.row.original;
      return <ScheduleItemSelector item={scheduleItem} />;
    },
  }),
  columnHelper.display({
    id: 'networks',
    header: 'Networks',
    cell: (props) => {
      const networks = props.row.original.networks;
      return (
        <NetworksSelectorList id={props.row.original.id} networks={networks} />
      );
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: (props) => {
      return <ActionCell scheduleItemId={props.row.original.id} />;
    },
  }),
];
