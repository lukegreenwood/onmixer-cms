import { GetMusicClockQuery } from '@/graphql/__generated__/graphql';

export type QueryMusicClock = NonNullable<GetMusicClockQuery['musicClock']>;
export type QueryMusicClockItem = QueryMusicClock['items'][number];
