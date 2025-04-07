/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** DateTime custom scalar type that expects ISO format strings */
  DateTime: { input: string; output: string; }
  /** DayOfWeek custom scalar type that expects a valid day of the week */
  DayOfWeek: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type ActionOutput = {
  __typename?: 'ActionOutput';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ApplyAssignedDefaultScheduleInput = {
  /** Days of week will be sorted by order of the days starting with Monday */
  assignedTo: Array<Scalars['DayOfWeek']['input']>;
  /** Will ignore time and use midnight, date must match the day of week for first given day */
  date: Scalars['DateTime']['input'];
  networkId: Scalars['ID']['input'];
};

export type ApplyDefaultScheduleInput = {
  /** Will ignore time and use midnight */
  date: Scalars['DateTime']['input'];
  defaultSchedule: Scalars['ID']['input'];
};

export type AssignDefaultScheduleToNetworkInput = {
  days: Array<Scalars['DayOfWeek']['input']>;
  defaultScheduleId: Scalars['ID']['input'];
  networkId: Scalars['ID']['input'];
};

export type Broadcast = {
  __typename?: 'Broadcast';
  end: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  start: Scalars['DateTime']['output'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type CreateDefaultScheduleInput = {
  name: Scalars['String']['input'];
  networks: Array<Scalars['ID']['input']>;
};

export type CreateDefaultScheduleItemInput = {
  defaultSchedule: Scalars['ID']['input'];
  end: Scalars['String']['input'];
  endsNextDay: Scalars['Boolean']['input'];
  episodeDesc?: InputMaybe<Scalars['String']['input']>;
  episodeName?: InputMaybe<Scalars['String']['input']>;
  existingEpisode?: InputMaybe<Scalars['ID']['input']>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  media?: InputMaybe<Scalars['ID']['input']>;
  networks?: InputMaybe<Array<Scalars['ID']['input']>>;
  presenters?: InputMaybe<Array<Scalars['ID']['input']>>;
  repeatOf?: InputMaybe<Scalars['ID']['input']>;
  series?: InputMaybe<Scalars['ID']['input']>;
  show: Scalars['ID']['input'];
  start: Scalars['String']['input'];
};

export type CreateEpisodeInput = {
  /** Falls back to the show description if not provided */
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  extraData?: InputMaybe<Scalars['String']['input']>;
  /** Id of the featured image media object falls back to show featured image if not provided */
  featuredImage?: InputMaybe<Scalars['ID']['input']>;
  name: Scalars['String']['input'];
  /** Falls back to the show networks if not provided */
  networks?: InputMaybe<Array<Scalars['ID']['input']>>;
  /**  Falls back to the show presenters if not provided */
  presenters?: InputMaybe<Array<Scalars['ID']['input']>>;
  series?: InputMaybe<Scalars['ID']['input']>;
  show: Scalars['ID']['input'];
};

export type CreateMediaInput = {
  type: MediaType;
};

export type CreatePresenterInput = {
  bio: Scalars['String']['input'];
  hero?: InputMaybe<Scalars['String']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  networks: Array<Scalars['ID']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  shortBio: Scalars['String']['input'];
};

export type CreateScheduleItemInput = {
  end: Scalars['DateTime']['input'];
  episode: Scalars['ID']['input'];
  /** Falls back to the episode networks if not provided */
  networks?: InputMaybe<Array<Scalars['ID']['input']>>;
  start: Scalars['DateTime']['input'];
};

export type CreateSeriesInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  /** falls back to the show featured image if not provided */
  featuredImage?: InputMaybe<Scalars['ID']['input']>;
  fullDesc: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  network: Scalars['ID']['input'];
  shortDesc: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
  show: Scalars['ID']['input'];
};

export type CreateShowInput = {
  extraData?: InputMaybe<Scalars['String']['input']>;
  /** Id of the featured image media object */
  featuredImage: Scalars['ID']['input'];
  fullDesc: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  /** An array of network IDs */
  networks: Array<Scalars['ID']['input']>;
  /** An array of presenter IDs */
  presenters: Array<Scalars['ID']['input']>;
  shortDesc: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
};

export type Debug = {
  __typename?: 'Debug';
  id: Scalars['ID']['output'];
  randomShow: Show;
  status: Scalars['String']['output'];
};

export type DefaultSchedule = {
  __typename?: 'DefaultSchedule';
  assignedTo?: Maybe<Array<Scalars['DayOfWeek']['output']>>;
  id: Scalars['Int']['output'];
  items: Array<DefaultScheduleItem>;
  name: Scalars['String']['output'];
  networks: Array<Network>;
};

export type DefaultScheduleFilter = {
  field: DefaultScheduleFilterField;
  operator?: InputMaybe<OperatorType>;
  type: FilterType;
  value: Scalars['String']['input'];
};

export enum DefaultScheduleFilterField {
  AssignedTo = 'assignedTo',
  Id = 'id',
  Name = 'name',
  Networks = 'networks'
}

export type DefaultScheduleItem = {
  __typename?: 'DefaultScheduleItem';
  defaultSchedule?: Maybe<DefaultSchedule>;
  end: Scalars['String']['output'];
  endsNextDay: Scalars['Boolean']['output'];
  episodeDesc?: Maybe<Scalars['String']['output']>;
  episodeName?: Maybe<Scalars['String']['output']>;
  existingEpisode?: Maybe<Episode>;
  featuredImage?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  media?: Maybe<Media>;
  networks?: Maybe<Array<Network>>;
  presenters?: Maybe<Array<Presenter>>;
  repeatOf?: Maybe<DefaultScheduleItem>;
  series?: Maybe<Series>;
  show: Show;
  start: Scalars['String']['output'];
};

export type DefaultScheduleItemMutationOutput = {
  __typename?: 'DefaultScheduleItemMutationOutput';
  defaultScheduleItem: DefaultScheduleItem;
};

export type DefaultScheduleList = ItemList & {
  __typename?: 'DefaultScheduleList';
  items: Array<DefaultSchedule>;
  total: Scalars['Int']['output'];
};

export type DefaultScheduleListInput = {
  filter?: InputMaybe<Array<DefaultScheduleFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<DefaultScheduleOrder>>;
};

export type DefaultScheduleMutationOutput = {
  __typename?: 'DefaultScheduleMutationOutput';
  defaultSchedule: DefaultSchedule;
};

export type DefaultScheduleOrder = {
  direction: OrderDirection;
  field: DefaultScheduleOrderField;
};

export enum DefaultScheduleOrderField {
  Id = 'id',
  Name = 'name'
}

export type DeleteDefaultScheduleInput = {
  id: Scalars['ID']['input'];
};

export type DeleteDefaultScheduleItemInput = {
  id: Scalars['ID']['input'];
};

export type DeleteEpisodeInput = {
  id: Scalars['ID']['input'];
};

export type DeleteMediaInput = {
  id: Scalars['ID']['input'];
};

export type DeleteMediaObjectInput = {
  id: Scalars['ID']['input'];
};

export type DeletePresenterInput = {
  id: Scalars['ID']['input'];
};

export type DeleteScheduleItemInput = {
  id: Scalars['ID']['input'];
};

export type DeleteSeriesInput = {
  id: Scalars['ID']['input'];
};

export type DeleteShowInput = {
  id: Scalars['ID']['input'];
};

export type DuplicateDefaultScheduleInput = {
  id: Scalars['ID']['input'];
};

export type Episode = {
  __typename?: 'Episode';
  broadcasts: Array<Broadcast>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  duration: Scalars['Int']['output'];
  extraData?: Maybe<Scalars['String']['output']>;
  featuredImage: Media;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  networks: Array<Network>;
  presenters: Array<Presenter>;
  /** @deprecated Use featuredImage object instead */
  promoImage?: Maybe<Scalars['String']['output']>;
  series?: Maybe<Series>;
  shortId: Scalars['String']['output'];
  show: Show;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type EpisodeFilter = {
  field: EpisodeFilterField;
  operator?: InputMaybe<OperatorType>;
  type: FilterType;
  value: Scalars['String']['input'];
};

export enum EpisodeFilterField {
  Broadcasts = 'broadcasts',
  Id = 'id',
  Name = 'name',
  Networks = 'networks',
  Presenters = 'presenters',
  Series = 'series',
  ShortId = 'shortId',
  Show = 'show',
  ShowName = 'showName'
}

export type EpisodeList = ItemList & {
  __typename?: 'EpisodeList';
  items: Array<Episode>;
  total: Scalars['Int']['output'];
};

export type EpisodeListInput = {
  filter?: InputMaybe<Array<EpisodeFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EpisodeOrder>>;
};

export type EpisodeMutationOutput = {
  __typename?: 'EpisodeMutationOutput';
  episode: Episode;
};

export type EpisodeOrder = {
  direction: OrderDirection;
  field: EpisodeOrderField;
};

export enum EpisodeOrderField {
  Id = 'id',
  Name = 'name',
  Show = 'show'
}

export enum FilterType {
  Contains = 'CONTAINS',
  Equal = 'EQUAL',
  List = 'LIST',
  NotEqual = 'NOT_EQUAL'
}

export type ItemList = {
  total: Scalars['Int']['output'];
};

export type Media = {
  __typename?: 'Media';
  createdAt: Scalars['DateTime']['output'];
  fileSize?: Maybe<MediaFileSize>;
  id: Scalars['Int']['output'];
  key: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  type: MediaType;
  updatedAt: Scalars['DateTime']['output'];
  urls: MediaUrls;
};

export type MediaFileSize = {
  __typename?: 'MediaFileSize';
  label: Scalars['String']['output'];
  raw: Scalars['Int']['output'];
};

export type MediaFilter = {
  field: MediaFilterField;
  operator?: InputMaybe<OperatorType>;
  type: FilterType;
  value: Scalars['String']['input'];
};

export enum MediaFilterField {
  CreatedAt = 'createdAt',
  Id = 'id',
  Key = 'key',
  Type = 'type'
}

export type MediaList = ItemList & {
  __typename?: 'MediaList';
  items: Array<Media>;
  total: Scalars['Int']['output'];
};

export type MediaListInput = {
  filter?: InputMaybe<Array<MediaFilter>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<MediaOrder>>;
};

export type MediaMutationOutput = {
  __typename?: 'MediaMutationOutput';
  media: Media;
};

export type MediaOrder = {
  direction: OrderDirection;
  field: MediaOrderField;
};

export enum MediaOrderField {
  CreatedAt = 'createdAt',
  Id = 'id',
  Key = 'key',
  UpdatedAt = 'updatedAt'
}

export enum MediaType {
  ArticleImage = 'ARTICLE_IMAGE',
  FeaturedImage = 'FEATURED_IMAGE',
  General = 'GENERAL',
  Presenter = 'PRESENTER',
  PresenterHero = 'PRESENTER_HERO',
  TrackArt = 'TRACK_ART'
}

export type MediaUrls = {
  __typename?: 'MediaUrls';
  /** Default format is webp */
  custom?: Maybe<Scalars['String']['output']>;
  /** Default format is webp */
  customSquare?: Maybe<Scalars['String']['output']>;
  /** 960x540 */
  large: Scalars['String']['output'];
  /** 480x270 */
  medium: Scalars['String']['output'];
  original: Scalars['String']['output'];
  /** 240x135 */
  small: Scalars['String']['output'];
  /** 500x500 */
  square: Scalars['String']['output'];
  template: Scalars['String']['output'];
  templateSquare: Scalars['String']['output'];
  /** 1920x1080 */
  xlarge: Scalars['String']['output'];
};


export type MediaUrlsCustomArgs = {
  height: Scalars['Int']['input'];
  width: Scalars['Int']['input'];
};


export type MediaUrlsCustomSquareArgs = {
  size: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  applyAssignedDefaultSchedule: ActionOutput;
  applyDefaultSchedule: ActionOutput;
  assignDefaultScheduleToNetwork: ActionOutput;
  createDefaultSchedule: DefaultScheduleMutationOutput;
  createDefaultScheduleItem: DefaultScheduleItemMutationOutput;
  createEpisode: EpisodeMutationOutput;
  createMedia: MediaMutationOutput;
  createPresenter: PresenterMutationOutput;
  createScheduleItem: ScheduleItemMutationOutput;
  createSeries: SeriesMutationOutput;
  createShow: ShowMutationOutput;
  deleteDefaultSchedule: ActionOutput;
  deleteDefaultScheduleItem: ActionOutput;
  deleteEpisode: ActionOutput;
  deleteMedia: ActionOutput;
  deleteMediaObject: ActionOutput;
  deletePresenter: ActionOutput;
  deleteScheduleItem: ActionOutput;
  deleteSeries: ActionOutput;
  deleteShow: ActionOutput;
  duplicateDefaultSchedule: DefaultScheduleMutationOutput;
  unassignDefaultScheduleFromNetwork: ActionOutput;
  updateDefaultSchedule: DefaultScheduleMutationOutput;
  updateDefaultScheduleItem: DefaultScheduleItemMutationOutput;
  updateEpisode: EpisodeMutationOutput;
  updateMedia: MediaMutationOutput;
  updatePresenter: PresenterMutationOutput;
  updateScheduleItem: ScheduleItemMutationOutput;
  updateSeries: SeriesMutationOutput;
  updateShow: ShowMutationOutput;
};


export type MutationApplyAssignedDefaultScheduleArgs = {
  input: ApplyAssignedDefaultScheduleInput;
};


export type MutationApplyDefaultScheduleArgs = {
  input: ApplyDefaultScheduleInput;
};


export type MutationAssignDefaultScheduleToNetworkArgs = {
  input: AssignDefaultScheduleToNetworkInput;
};


export type MutationCreateDefaultScheduleArgs = {
  input: CreateDefaultScheduleInput;
};


export type MutationCreateDefaultScheduleItemArgs = {
  input: CreateDefaultScheduleItemInput;
};


export type MutationCreateEpisodeArgs = {
  input: CreateEpisodeInput;
};


export type MutationCreateMediaArgs = {
  file: Scalars['Upload']['input'];
  input: CreateMediaInput;
};


export type MutationCreatePresenterArgs = {
  input: CreatePresenterInput;
};


export type MutationCreateScheduleItemArgs = {
  input: CreateScheduleItemInput;
};


export type MutationCreateSeriesArgs = {
  input: CreateSeriesInput;
};


export type MutationCreateShowArgs = {
  input: CreateShowInput;
};


export type MutationDeleteDefaultScheduleArgs = {
  input: DeleteDefaultScheduleInput;
};


export type MutationDeleteDefaultScheduleItemArgs = {
  input: DeleteDefaultScheduleItemInput;
};


export type MutationDeleteEpisodeArgs = {
  input: DeleteEpisodeInput;
};


export type MutationDeleteMediaArgs = {
  input: DeleteMediaInput;
};


export type MutationDeleteMediaObjectArgs = {
  input: DeleteMediaObjectInput;
};


export type MutationDeletePresenterArgs = {
  input: DeletePresenterInput;
};


export type MutationDeleteScheduleItemArgs = {
  input: DeleteScheduleItemInput;
};


export type MutationDeleteSeriesArgs = {
  input: DeleteSeriesInput;
};


export type MutationDeleteShowArgs = {
  input: DeleteShowInput;
};


export type MutationDuplicateDefaultScheduleArgs = {
  input: DuplicateDefaultScheduleInput;
};


export type MutationUnassignDefaultScheduleFromNetworkArgs = {
  input: UnassignDefaultScheduleFromNetworkInput;
};


export type MutationUpdateDefaultScheduleArgs = {
  input: UpdateDefaultScheduleInput;
};


export type MutationUpdateDefaultScheduleItemArgs = {
  input: UpdateDefaultScheduleItemInput;
};


export type MutationUpdateEpisodeArgs = {
  input: UpdateEpisodeInput;
};


export type MutationUpdateMediaArgs = {
  input: UpdateMediaInput;
};


export type MutationUpdatePresenterArgs = {
  input: UpdatePresenterInput;
};


export type MutationUpdateScheduleItemArgs = {
  input: UpdateScheduleItemInput;
};


export type MutationUpdateSeriesArgs = {
  input: UpdateSeriesInput;
};


export type MutationUpdateShowArgs = {
  input: UpdateShowInput;
};

export type Network = {
  __typename?: 'Network';
  baseUrl: Scalars['String']['output'];
  code: Scalars['String']['output'];
  /** URL for the sites CSS file */
  cssUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  imagesUrl: Scalars['String']['output'];
  logoSvg: Scalars['String']['output'];
  logoSvgCircular?: Maybe<Scalars['String']['output']>;
  logoSvgColor?: Maybe<Scalars['String']['output']>;
  logoSvgIcon: Scalars['String']['output'];
  name: Scalars['String']['output'];
  /** Type of network */
  networkType: NetworkType;
  /** Format of the live streaming audio as type */
  playFormat?: Maybe<Scalars['String']['output']>;
  /** Url to the live streaming audio for the site */
  playUrl?: Maybe<Scalars['String']['output']>;
};

export enum NetworkType {
  Internal = 'INTERNAL',
  Playlist = 'PLAYLIST',
  Station = 'STATION',
  Stream = 'STREAM'
}

export enum OperatorType {
  And = 'AND',
  Or = 'OR'
}

export enum OrderDirection {
  Ascending = 'ASCENDING',
  Descending = 'DESCENDING'
}

export type Presenter = {
  __typename?: 'Presenter';
  bio: Scalars['String']['output'];
  episodes: EpisodeList;
  hero?: Maybe<Scalars['String']['output']>;
  hidden: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  networks: Array<Network>;
  picture?: Maybe<Scalars['String']['output']>;
  shortBio: Scalars['String']['output'];
  shortId: Scalars['String']['output'];
  shows: ShowList;
};


export type PresenterEpisodesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EpisodeOrder>>;
};


export type PresenterShowsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ShowOrder>>;
};

export type PresenterFilter = {
  field: PresenterFilterField;
  operator?: InputMaybe<OperatorType>;
  type: FilterType;
  value: Scalars['String']['input'];
};

export enum PresenterFilterField {
  Id = 'id',
  Name = 'name',
  Networks = 'networks',
  ShortBio = 'shortBio',
  ShortId = 'shortId'
}

export type PresenterList = ItemList & {
  __typename?: 'PresenterList';
  items: Array<Presenter>;
  total: Scalars['Int']['output'];
};

export type PresenterListInput = {
  filter?: InputMaybe<Array<PresenterFilter>>;
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PresenterOrder>>;
};

export type PresenterMutationOutput = {
  __typename?: 'PresenterMutationOutput';
  presenter: Presenter;
};

export type PresenterOrder = {
  direction: OrderDirection;
  field: PresenterOrderField;
};

export enum PresenterOrderField {
  Id = 'id',
  Name = 'name'
}

export type Query = {
  __typename?: 'Query';
  debug?: Maybe<Debug>;
  defaultSchedule?: Maybe<DefaultSchedule>;
  defaultSchedules: DefaultScheduleList;
  episode?: Maybe<Episode>;
  episodes: EpisodeList;
  /** ID or key of the media object */
  media: Media;
  mediaList: MediaList;
  network: Network;
  networks: Array<Network>;
  /** Get the current on air programme for a network */
  onairProgramme?: Maybe<ScheduleItem>;
  presenter?: Maybe<Presenter>;
  presenters: PresenterList;
  schedule: ScheduleList;
  /** Get the scheduled programme for a network at a specific date and time */
  scheduledProgramme?: Maybe<ScheduleItem>;
  series: Series;
  seriesList: SeriesList;
  show?: Maybe<Show>;
  shows: ShowList;
};


export type QueryDefaultScheduleArgs = {
  assignedTo?: InputMaybe<Scalars['DayOfWeek']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryDefaultSchedulesArgs = {
  filters?: InputMaybe<DefaultScheduleListInput>;
};


export type QueryEpisodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEpisodesArgs = {
  filters?: InputMaybe<EpisodeListInput>;
};


export type QueryMediaArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMediaListArgs = {
  filters?: InputMaybe<MediaListInput>;
};


export type QueryNetworkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOnairProgrammeArgs = {
  networkId: Scalars['ID']['input'];
};


export type QueryPresenterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPresentersArgs = {
  filters?: InputMaybe<PresenterListInput>;
};


export type QueryScheduleArgs = {
  filters?: InputMaybe<ScheduleListInput>;
};


export type QueryScheduledProgrammeArgs = {
  dateTime: Scalars['DateTime']['input'];
  networkId: Scalars['ID']['input'];
};


export type QuerySeriesArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySeriesListArgs = {
  filters?: InputMaybe<SeriesListInput>;
};


export type QueryShowArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShowsArgs = {
  filters?: InputMaybe<ShowListInput>;
};

export type ScheduleItem = {
  __typename?: 'ScheduleItem';
  end: Scalars['DateTime']['output'];
  episode: Episode;
  id: Scalars['Int']['output'];
  networks: Array<Network>;
  start: Scalars['DateTime']['output'];
};

export type ScheduleItemMutationOutput = {
  __typename?: 'ScheduleItemMutationOutput';
  scheduleItem: ScheduleItem;
};

export type ScheduleList = ItemList & {
  __typename?: 'ScheduleList';
  items: Array<ScheduleItem>;
  total: Scalars['Int']['output'];
};

export type ScheduleListInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  from: Scalars['DateTime']['input'];
  networkId: Scalars['ID']['input'];
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Series = {
  __typename?: 'Series';
  archived: Scalars['Boolean']['output'];
  episodes: EpisodeList;
  featuredImage: Media;
  fullDesc: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  network: Network;
  /** @deprecated Use featuredImage object instead */
  promoImage?: Maybe<Scalars['String']['output']>;
  shortDesc: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  show: Show;
  url: Scalars['String']['output'];
};


export type SeriesEpisodesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EpisodeOrder>>;
};

export type SeriesFilter = {
  field: SeriesFilterField;
  operator?: InputMaybe<OperatorType>;
  type: FilterType;
  value: Scalars['String']['input'];
};

export enum SeriesFilterField {
  Archived = 'archived',
  FullName = 'fullName',
  Id = 'id',
  NetworkId = 'networkId',
  ShortId = 'shortId',
  ShortName = 'shortName',
  ShowId = 'showId'
}

export type SeriesList = ItemList & {
  __typename?: 'SeriesList';
  items: Array<Series>;
  total: Scalars['Int']['output'];
};

export type SeriesListInput = {
  filter?: InputMaybe<Array<SeriesFilter>>;
  includeArchived?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SeriesOrder>>;
};

export type SeriesMutationOutput = {
  __typename?: 'SeriesMutationOutput';
  series: Series;
};

export type SeriesOrder = {
  direction: OrderDirection;
  field: SeriesOrderField;
};

export enum SeriesOrderField {
  Archived = 'archived',
  Id = 'id',
  ShortName = 'shortName',
  ShowId = 'showId'
}

export type Show = {
  __typename?: 'Show';
  backgroundImage?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  episodes: EpisodeList;
  extraData?: Maybe<Scalars['String']['output']>;
  featuredImage: Media;
  fullDesc: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  hidden: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  latestEpisode?: Maybe<Episode>;
  networks: Array<Network>;
  presenters: Array<Presenter>;
  /** @deprecated Use featuredImage object instead */
  promoImage?: Maybe<Scalars['String']['output']>;
  series: SeriesList;
  shortDesc: Scalars['String']['output'];
  shortId: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  /** @deprecated Use episodes -> total instead */
  totalEpisodes: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};


export type ShowEpisodesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EpisodeOrder>>;
};


export type ShowSeriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SeriesOrder>>;
};

export type ShowFilter = {
  field: ShowFilterField;
  operator?: InputMaybe<OperatorType>;
  type: FilterType;
  value: Scalars['String']['input'];
};

export enum ShowFilterField {
  FullName = 'fullName',
  Hidden = 'hidden',
  Id = 'id',
  /** Must be a list operator and provide a list of ids comma separated */
  Networks = 'networks',
  /** Must be a list operator and provide a list of ids comma separated */
  Presenters = 'presenters',
  ShortId = 'shortId',
  ShortName = 'shortName'
}

export type ShowList = ItemList & {
  __typename?: 'ShowList';
  items: Array<Show>;
  total: Scalars['Int']['output'];
};

export type ShowListInput = {
  filter?: InputMaybe<Array<ShowFilter>>;
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ShowOrder>>;
};

export type ShowMutationOutput = {
  __typename?: 'ShowMutationOutput';
  show: Show;
};

export type ShowOrder = {
  direction: OrderDirection;
  field: ShowFilterField;
};

export type UnassignDefaultScheduleFromNetworkInput = {
  days: Array<Scalars['DayOfWeek']['input']>;
  defaultScheduleId: Scalars['ID']['input'];
  networkId: Scalars['ID']['input'];
};

export type UpdateDefaultScheduleInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  networks?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type UpdateDefaultScheduleItemInput = {
  defaultSchedule?: InputMaybe<Scalars['ID']['input']>;
  end?: InputMaybe<Scalars['String']['input']>;
  endsNextDay?: InputMaybe<Scalars['Boolean']['input']>;
  episodeDesc?: InputMaybe<Scalars['String']['input']>;
  episodeName?: InputMaybe<Scalars['String']['input']>;
  existingEpisode?: InputMaybe<Scalars['ID']['input']>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  media?: InputMaybe<Scalars['ID']['input']>;
  networks?: InputMaybe<Array<Scalars['ID']['input']>>;
  presenters?: InputMaybe<Array<Scalars['ID']['input']>>;
  repeatOf?: InputMaybe<Scalars['ID']['input']>;
  series?: InputMaybe<Scalars['ID']['input']>;
  show?: InputMaybe<Scalars['ID']['input']>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEpisodeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  extraData?: InputMaybe<Scalars['String']['input']>;
  /** Id of the featured image media object */
  featuredImage?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  networks?: InputMaybe<Array<Scalars['ID']['input']>>;
  presenters?: InputMaybe<Array<Scalars['ID']['input']>>;
  series?: InputMaybe<Scalars['ID']['input']>;
  show?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateMediaInput = {
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  key?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MediaType>;
};

export type UpdatePresenterInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  hero?: InputMaybe<Scalars['String']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  networks?: InputMaybe<Array<Scalars['ID']['input']>>;
  picture?: InputMaybe<Scalars['String']['input']>;
  shortBio?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateScheduleItemInput = {
  end?: InputMaybe<Scalars['DateTime']['input']>;
  episode?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  networks?: InputMaybe<Array<Scalars['ID']['input']>>;
  start?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateSeriesInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  featuredImage?: InputMaybe<Scalars['ID']['input']>;
  fullDesc?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  network?: InputMaybe<Scalars['ID']['input']>;
  shortDesc?: InputMaybe<Scalars['String']['input']>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  show?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateShowInput = {
  extraData?: InputMaybe<Scalars['String']['input']>;
  /** Id of the featured image media object */
  featuredImage?: InputMaybe<Scalars['ID']['input']>;
  fullDesc?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  hidden?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['ID']['input'];
  /** An array of network IDs, overrides existing networks, empty array removes all networks */
  networks?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** An array of presenter IDs, overrides existing presenters, empty array removes all presenters */
  presenters?: InputMaybe<Array<Scalars['ID']['input']>>;
  shortDesc?: InputMaybe<Scalars['String']['input']>;
  shortName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateScheduleItemMutationVariables = Exact<{
  input: UpdateScheduleItemInput;
}>;


export type UpdateScheduleItemMutation = { __typename?: 'Mutation', updateScheduleItem: { __typename?: 'ScheduleItemMutationOutput', scheduleItem: { __typename?: 'ScheduleItem', id: number, end: string, start: string, networks: Array<{ __typename?: 'Network', id: number, name: string }> } } };

export type DebugQueryVariables = Exact<{ [key: string]: never; }>;


export type DebugQuery = { __typename?: 'Query', debug?: { __typename?: 'Debug', id: string, status: string, randomShow: { __typename?: 'Show', id: number, shortName: string, episodes: { __typename?: 'EpisodeList', total: number } } } | null };

export type GetNetworksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNetworksQuery = { __typename?: 'Query', networks: Array<{ __typename?: 'Network', id: number, name: string, code: string, networkType: NetworkType, logoSvgIcon: string }> };

export type GetNetworkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetNetworkQuery = { __typename?: 'Query', network: { __typename?: 'Network', id: number, name: string, code: string, networkType: NetworkType, logoSvgIcon: string } };

export type ScheduleQueryVariables = Exact<{
  from: Scalars['DateTime']['input'];
  network: Scalars['ID']['input'];
  to?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type ScheduleQuery = { __typename?: 'Query', schedule: { __typename?: 'ScheduleList', total: number, items: Array<{ __typename?: 'ScheduleItem', id: number, start: string, end: string, networks: Array<{ __typename?: 'Network', id: number, name: string, logoSvgIcon: string }>, episode: { __typename?: 'Episode', name: string, show: { __typename?: 'Show', shortName: string }, broadcasts: Array<{ __typename?: 'Broadcast', id: number, start: string, end: string }> } }> } };


export const UpdateScheduleItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScheduleItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateScheduleItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateScheduleItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateScheduleItemMutation, UpdateScheduleItemMutationVariables>;
export const DebugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Debug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"debug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"randomShow"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DebugQuery, DebugQueryVariables>;
export const GetNetworksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNetworks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"networkType"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]} as unknown as DocumentNode<GetNetworksQuery, GetNetworksQueryVariables>;
export const GetNetworkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNetwork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"network"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"networkType"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]} as unknown as DocumentNode<GetNetworkQuery, GetNetworkQueryVariables>;
export const ScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Schedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"network"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"networkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"network"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"amount"},"value":{"kind":"IntValue","value":"200"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"broadcasts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ScheduleQuery, ScheduleQueryVariables>;