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
  /** DateTime custom scalar type that expects an ISO 8601 string */
  DateTime: { input: string; output: string; }
  /** DayOfWeek custom scalar type that expects a valid day of the week */
  DayOfWeek: { input: any; output: any; }
  JSON: { input: any; output: any; }
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

export enum BooleanFilterOperator {
  Is = 'IS',
  IsNot = 'IS_NOT'
}

export type Broadcast = {
  __typename?: 'Broadcast';
  end: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  start: Scalars['DateTime']['output'];
};

export type BulkDownloadJobItem = {
  autoEnrich?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  subCategory: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};

export type BulkDownloadJobsInput = {
  downloads: Array<BulkDownloadJobItem>;
};

export type BulkDownloadJobsResponse = {
  __typename?: 'BulkDownloadJobsResponse';
  failedJobs: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  results: Array<DownloadJobResult>;
  success: Scalars['Boolean']['output'];
  successfulJobs: Scalars['Int']['output'];
  totalJobs: Scalars['Int']['output'];
};

export type BulkSearchMusicBrainzInput = {
  searches: Array<MusicBrainzBulkSearchItem>;
};

export type BulkSearchMusicBrainzResponse = {
  __typename?: 'BulkSearchMusicBrainzResponse';
  failedSearches: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  results: Array<MusicBrainzBulkSearchResult>;
  success: Scalars['Boolean']['output'];
  successfulSearches: Scalars['Int']['output'];
  totalSearches: Scalars['Int']['output'];
};

export type BulkSearchYouTubeInput = {
  queries: Array<Scalars['String']['input']>;
};

export type BulkSearchYouTubeResponse = {
  __typename?: 'BulkSearchYouTubeResponse';
  failedQueries: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  results: Array<YouTubeBulkSearchResult>;
  success: Scalars['Boolean']['output'];
  successfulQueries: Scalars['Int']['output'];
  totalQueries: Scalars['Int']['output'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subcategories: Array<Subcategory>;
};

export type CategoryListInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

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
  /** falls back to the first show network if not provided */
  network?: InputMaybe<Scalars['ID']['input']>;
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

export enum DateFilterOperator {
  Is = 'IS',
  IsAfter = 'IS_AFTER',
  IsBefore = 'IS_BEFORE',
  IsBetween = 'IS_BETWEEN',
  IsNot = 'IS_NOT',
  IsNotBetween = 'IS_NOT_BETWEEN',
  IsOnOrAfter = 'IS_ON_OR_AFTER',
  IsOnOrBefore = 'IS_ON_OR_BEFORE'
}

export type Debug = {
  __typename?: 'Debug';
  id: Scalars['ID']['output'];
  randomShow: Show;
  status: Scalars['String']['output'];
};

export type DefaultSchedule = {
  __typename?: 'DefaultSchedule';
  assignedTo?: Maybe<Array<Scalars['DayOfWeek']['output']>>;
  id: Scalars['ID']['output'];
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
  id: Scalars['ID']['output'];
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

export type DownloadJobInput = {
  autoEnrich?: InputMaybe<Scalars['Boolean']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  subCategory?: InputMaybe<Scalars['Int']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DownloadJobResult = {
  __typename?: 'DownloadJobResult';
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  jobId?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  url: Scalars['String']['output'];
};

export type DuplicateDefaultScheduleInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type EnrichPendingJobInput = {
  jobId: Scalars['String']['input'];
  musicbrainzReleaseId: Scalars['String']['input'];
};

export type EnrichmentJobInput = {
  musicbrainzReleaseId: Scalars['String']['input'];
  songId: Scalars['Int']['input'];
};

export type Episode = {
  __typename?: 'Episode';
  broadcasts: Array<Broadcast>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  duration: EpisodeDuration;
  extraData?: Maybe<Scalars['String']['output']>;
  featuredImage: Media;
  id: Scalars['ID']['output'];
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

export type EpisodeBooleanFilter = {
  field: EpisodeBooleanFilterField;
  operator: BooleanFilterOperator;
  value: Scalars['Boolean']['input'];
};

export enum EpisodeBooleanFilterField {
  HasSeries = 'hasSeries'
}

export type EpisodeDateFilter = {
  field: EpisodeDateFilterField;
  operator: DateFilterOperator;
  value?: InputMaybe<Scalars['DateTime']['input']>;
  values?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export enum EpisodeDateFilterField {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export type EpisodeDuration = {
  __typename?: 'EpisodeDuration';
  formatted: Scalars['String']['output'];
  raw: Scalars['Int']['output'];
};

export type EpisodeFilter = {
  field?: InputMaybe<EpisodeFilterField>;
  group?: InputMaybe<Array<EpisodeFilter>>;
  operator?: InputMaybe<OperatorType>;
  type?: InputMaybe<FilterType>;
  value?: InputMaybe<Scalars['String']['input']>;
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

export type EpisodeFilterGroup = {
  filters?: InputMaybe<Array<EpisodeFilterInput>>;
  groups?: InputMaybe<Array<EpisodeFilterGroup>>;
  operator: OperatorType;
};

export type EpisodeFilterInput = {
  booleanFilter?: InputMaybe<EpisodeBooleanFilter>;
  dateFilter?: InputMaybe<EpisodeDateFilter>;
  multiOptionFilter?: InputMaybe<EpisodeMultiOptionFilter>;
  numberFilter?: InputMaybe<EpisodeNumberFilter>;
  optionFilter?: InputMaybe<EpisodeOptionFilter>;
  textFilter?: InputMaybe<EpisodeTextFilter>;
  type: EpisodeFilterType;
};

export enum EpisodeFilterType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  MultiOption = 'MULTI_OPTION',
  Number = 'NUMBER',
  Option = 'OPTION',
  Text = 'TEXT'
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

export type EpisodeListInputV2 = {
  filterGroup?: InputMaybe<EpisodeFilterGroup>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EpisodeOrder>>;
};

export type EpisodeMultiOptionFilter = {
  field: EpisodeMultiOptionFilterField;
  operator: MultiOptionFilterOperator;
  values: Array<Scalars['ID']['input']>;
};

export enum EpisodeMultiOptionFilterField {
  Networks = 'networks',
  Presenters = 'presenters',
  Shows = 'shows'
}

export type EpisodeMutationOutput = {
  __typename?: 'EpisodeMutationOutput';
  episode: Episode;
};

export type EpisodeNumberFilter = {
  field: EpisodeNumberFilterField;
  operator: NumberFilterOperator;
  value?: InputMaybe<Scalars['Int']['input']>;
  values?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum EpisodeNumberFilterField {
  Duration = 'duration'
}

export type EpisodeOptionFilter = {
  field: EpisodeOptionFilterField;
  operator: OptionFilterOperator;
  value?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum EpisodeOptionFilterField {
  Id = 'id',
  Series = 'series',
  Show = 'show'
}

export type EpisodeOrder = {
  direction: OrderDirection;
  field: EpisodeOrderField;
};

export enum EpisodeOrderField {
  Id = 'id',
  Name = 'name',
  Show = 'show'
}

export type EpisodeTextFilter = {
  field: EpisodeTextFilterField;
  operator: TextFilterOperator;
  value: Scalars['String']['input'];
};

export enum EpisodeTextFilterField {
  Description = 'description',
  ExtraData = 'extraData',
  Name = 'name',
  ShortId = 'shortId'
}

export enum FilterType {
  Contains = 'CONTAINS',
  Equal = 'EQUAL',
  List = 'LIST',
  NotEqual = 'NOT_EQUAL'
}

export type Genre = {
  __typename?: 'Genre';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tracks: Array<Track>;
};

export type History = {
  __typename?: 'History';
  album: Scalars['String']['output'];
  artist: Scalars['String']['output'];
  composer: Scalars['String']['output'];
  copyright: Scalars['String']['output'];
  datePlayed?: Maybe<Scalars['DateTime']['output']>;
  discNo: Scalars['Int']['output'];
  duration: TrackDuration;
  genre: Genre;
  id: Scalars['ID']['output'];
  isrc: Scalars['String']['output'];
  label: Scalars['String']['output'];
  listeners?: Maybe<Scalars['Int']['output']>;
  networks?: Maybe<Scalars['String']['output']>;
  originalArtist: Scalars['String']['output'];
  publisher: Scalars['String']['output'];
  subcategory: Subcategory;
  title: Scalars['String']['output'];
  track: Track;
  trackNo: Scalars['Int']['output'];
  year: Scalars['String']['output'];
};

export type HistoryList = ItemList & {
  __typename?: 'HistoryList';
  items: Array<History>;
  total: Scalars['Int']['output'];
};

export type HistoryListInput = {
  from?: InputMaybe<Scalars['DateTime']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<HistoryOrder>>;
  to?: InputMaybe<Scalars['DateTime']['input']>;
};

export type HistoryOrder = {
  direction: OrderDirection;
  field: HistoryOrderField;
};

export enum HistoryOrderField {
  Artist = 'artist',
  DatePlayed = 'datePlayed',
  Id = 'id',
  Title = 'title'
}

export type ItemList = {
  total: Scalars['Int']['output'];
};

export type Job = {
  __typename?: 'Job';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  errorMessage?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  progress?: Maybe<Scalars['JSON']['output']>;
  searchQuery?: Maybe<Scalars['String']['output']>;
  songId?: Maybe<Scalars['Int']['output']>;
  sourceUrl?: Maybe<Scalars['String']['output']>;
  status: JobStatus;
  type: JobType;
  updatedAt: Scalars['DateTime']['output'];
  userInputs?: Maybe<Scalars['JSON']['output']>;
};

export enum JobStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  /** Song downloaded successfully but requires manual metadata enrichment */
  PendingEnrichment = 'PENDING_ENRICHMENT',
  Processing = 'PROCESSING'
}

export enum JobType {
  Download = 'DOWNLOAD',
  Enrichment = 'ENRICHMENT'
}

export type Media = {
  __typename?: 'Media';
  createdAt: Scalars['DateTime']['output'];
  fileSize?: Maybe<MediaFileSize>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
  type: MediaType;
  updatedAt: Scalars['DateTime']['output'];
  urls: MediaUrls;
};

export type MediaBooleanFilter = {
  field: MediaBooleanFilterField;
  operator: BooleanFilterOperator;
  value: Scalars['Boolean']['input'];
};

export enum MediaBooleanFilterField {
  NoFieldsAvailable = '_NO_FIELDS_AVAILABLE'
}

export type MediaDateFilter = {
  field: MediaDateFilterField;
  operator: DateFilterOperator;
  value?: InputMaybe<Scalars['DateTime']['input']>;
  values?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export enum MediaDateFilterField {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

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

export type MediaFilterGroup = {
  filters?: InputMaybe<Array<MediaFilterInput>>;
  groups?: InputMaybe<Array<MediaFilterGroup>>;
  operator: OperatorType;
};

export type MediaFilterInput = {
  booleanFilter?: InputMaybe<MediaBooleanFilter>;
  dateFilter?: InputMaybe<MediaDateFilter>;
  multiOptionFilter?: InputMaybe<MediaMultiOptionFilter>;
  numberFilter?: InputMaybe<MediaNumberFilter>;
  optionFilter?: InputMaybe<MediaOptionFilter>;
  textFilter?: InputMaybe<MediaTextFilter>;
  type: MediaFilterType;
};

export enum MediaFilterType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  MultiOption = 'MULTI_OPTION',
  Number = 'NUMBER',
  Option = 'OPTION',
  Text = 'TEXT'
}

export type MediaList = ItemList & {
  __typename?: 'MediaList';
  items: Array<Media>;
  total: Scalars['Int']['output'];
};

export type MediaListInput = {
  filterGroup?: InputMaybe<MediaFilterGroup>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<MediaOrder>>;
};

export type MediaMultiOptionFilter = {
  field: MediaMultiOptionFilterField;
  operator: MultiOptionFilterOperator;
  values: Array<Scalars['ID']['input']>;
};

export enum MediaMultiOptionFilterField {
  Episodes = 'episodes',
  Presenters = 'presenters',
  Series = 'series',
  Shows = 'shows'
}

export type MediaMutationOutput = {
  __typename?: 'MediaMutationOutput';
  media: Media;
};

export type MediaNumberFilter = {
  field: MediaNumberFilterField;
  operator: NumberFilterOperator;
  value?: InputMaybe<Scalars['Int']['input']>;
  values?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum MediaNumberFilterField {
  NoFieldsAvailable = '_NO_FIELDS_AVAILABLE'
}

export type MediaOptionFilter = {
  field: MediaOptionFilterField;
  operator: OptionFilterOperator;
  value?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum MediaOptionFilterField {
  Id = 'id',
  Type = 'type'
}

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

export type MediaTextFilter = {
  field: MediaTextFilterField;
  operator: TextFilterOperator;
  value: Scalars['String']['input'];
};

export enum MediaTextFilterField {
  Key = 'key'
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

export enum MultiOptionFilterOperator {
  Exclude = 'EXCLUDE',
  ExcludeIfAllOf = 'EXCLUDE_IF_ALL_OF',
  ExcludeIfAnyOf = 'EXCLUDE_IF_ANY_OF',
  Include = 'INCLUDE',
  IncludeAllOf = 'INCLUDE_ALL_OF',
  IncludeAnyOf = 'INCLUDE_ANY_OF'
}

export type MusicBrainzBulkSearchItem = {
  album?: InputMaybe<Scalars['String']['input']>;
  artist: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type MusicBrainzBulkSearchResult = {
  __typename?: 'MusicBrainzBulkSearchResult';
  error?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  query: MusicBrainzSearchQuery;
  results: Array<MusicBrainzSearchResult>;
};

export type MusicBrainzSearchQuery = {
  __typename?: 'MusicBrainzSearchQuery';
  album?: Maybe<Scalars['String']['output']>;
  artist: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type MusicBrainzSearchResult = {
  __typename?: 'MusicBrainzSearchResult';
  album?: Maybe<Scalars['String']['output']>;
  artist: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isrc?: Maybe<Scalars['String']['output']>;
  score: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  year?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  applyAssignedDefaultSchedule: ActionOutput;
  applyDefaultSchedule: ActionOutput;
  assignDefaultScheduleToNetwork: ActionOutput;
  bulkSearchMusicBrainz: BulkSearchMusicBrainzResponse;
  bulkSearchYouTube: BulkSearchYouTubeResponse;
  cancelJob: Scalars['Boolean']['output'];
  createBulkDownloadJobs: BulkDownloadJobsResponse;
  createDefaultSchedule: DefaultScheduleMutationOutput;
  createDefaultScheduleItem: DefaultScheduleItemMutationOutput;
  createDownloadJob: Job;
  createEnrichmentJob: Job;
  createEpisode: EpisodeMutationOutput;
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
  enrichPendingJob: Job;
  retryJob: Job;
  searchMusicBrainz: Array<MusicBrainzSearchResult>;
  searchYouTube: Array<YouTubeSearchResult>;
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


export type MutationBulkSearchMusicBrainzArgs = {
  input: BulkSearchMusicBrainzInput;
};


export type MutationBulkSearchYouTubeArgs = {
  input: BulkSearchYouTubeInput;
};


export type MutationCancelJobArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateBulkDownloadJobsArgs = {
  input: BulkDownloadJobsInput;
};


export type MutationCreateDefaultScheduleArgs = {
  input: CreateDefaultScheduleInput;
};


export type MutationCreateDefaultScheduleItemArgs = {
  input: CreateDefaultScheduleItemInput;
};


export type MutationCreateDownloadJobArgs = {
  input: DownloadJobInput;
};


export type MutationCreateEnrichmentJobArgs = {
  input: EnrichmentJobInput;
};


export type MutationCreateEpisodeArgs = {
  input: CreateEpisodeInput;
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


export type MutationEnrichPendingJobArgs = {
  input: EnrichPendingJobInput;
};


export type MutationRetryJobArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSearchMusicBrainzArgs = {
  artist: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationSearchYouTubeArgs = {
  query: Scalars['String']['input'];
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
  id: Scalars['ID']['output'];
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

export enum NumberFilterOperator {
  Is = 'IS',
  IsBetween = 'IS_BETWEEN',
  IsGreaterThan = 'IS_GREATER_THAN',
  IsGreaterThanOrEqualTo = 'IS_GREATER_THAN_OR_EQUAL_TO',
  IsLessThan = 'IS_LESS_THAN',
  IsLessThanOrEqualTo = 'IS_LESS_THAN_OR_EQUAL_TO',
  IsNot = 'IS_NOT',
  IsNotBetween = 'IS_NOT_BETWEEN'
}

export enum OperatorType {
  And = 'AND',
  Or = 'OR'
}

export enum OptionFilterOperator {
  Is = 'IS',
  IsAnyOf = 'IS_ANY_OF',
  IsNoneOf = 'IS_NONE_OF',
  IsNot = 'IS_NOT'
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
  id: Scalars['ID']['output'];
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

export type PresenterBooleanFilter = {
  field: PresenterBooleanFilterField;
  operator: BooleanFilterOperator;
  value: Scalars['Boolean']['input'];
};

export enum PresenterBooleanFilterField {
  Hidden = 'hidden'
}

export type PresenterDateFilter = {
  field: PresenterDateFilterField;
  operator: DateFilterOperator;
  value?: InputMaybe<Scalars['DateTime']['input']>;
  values?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export enum PresenterDateFilterField {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

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

export type PresenterFilterGroup = {
  filters?: InputMaybe<Array<PresenterFilterInput>>;
  groups?: InputMaybe<Array<PresenterFilterGroup>>;
  operator: OperatorType;
};

export type PresenterFilterInput = {
  booleanFilter?: InputMaybe<PresenterBooleanFilter>;
  dateFilter?: InputMaybe<PresenterDateFilter>;
  multiOptionFilter?: InputMaybe<PresenterMultiOptionFilter>;
  numberFilter?: InputMaybe<PresenterNumberFilter>;
  optionFilter?: InputMaybe<PresenterOptionFilter>;
  textFilter?: InputMaybe<PresenterTextFilter>;
  type: PresenterFilterType;
};

export enum PresenterFilterType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  MultiOption = 'MULTI_OPTION',
  Number = 'NUMBER',
  Option = 'OPTION',
  Text = 'TEXT'
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

export type PresenterListInputV2 = {
  filterGroup?: InputMaybe<PresenterFilterGroup>;
  includeHidden?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<PresenterOrder>>;
};

export type PresenterMultiOptionFilter = {
  field: PresenterMultiOptionFilterField;
  operator: MultiOptionFilterOperator;
  values: Array<Scalars['ID']['input']>;
};

export enum PresenterMultiOptionFilterField {
  Networks = 'networks',
  Shows = 'shows'
}

export type PresenterMutationOutput = {
  __typename?: 'PresenterMutationOutput';
  presenter: Presenter;
};

export type PresenterNumberFilter = {
  field: PresenterNumberFilterField;
  operator: NumberFilterOperator;
  value?: InputMaybe<Scalars['Int']['input']>;
  values?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum PresenterNumberFilterField {
  NoFieldsAvailable = '_NO_FIELDS_AVAILABLE'
}

export type PresenterOptionFilter = {
  field: PresenterOptionFilterField;
  operator: OptionFilterOperator;
  value?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum PresenterOptionFilterField {
  Hidden = 'hidden',
  Id = 'id'
}

export type PresenterOrder = {
  direction: OrderDirection;
  field: PresenterOrderField;
};

export enum PresenterOrderField {
  Id = 'id',
  Name = 'name'
}

export type PresenterTextFilter = {
  field: PresenterTextFilterField;
  operator: TextFilterOperator;
  value: Scalars['String']['input'];
};

export enum PresenterTextFilterField {
  Bio = 'bio',
  Name = 'name',
  ShortBio = 'shortBio',
  ShortId = 'shortId'
}

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category?: Maybe<Category>;
  debug?: Maybe<Debug>;
  defaultSchedule?: Maybe<DefaultSchedule>;
  defaultSchedules: DefaultScheduleList;
  episode?: Maybe<Episode>;
  episodes: EpisodeList;
  episodesV2: EpisodeList;
  genres: Array<Genre>;
  history: HistoryList;
  job?: Maybe<Job>;
  jobs: Array<Job>;
  /** ID or key of the media object */
  media: Media;
  mediaList: MediaList;
  network: Network;
  networks: Array<Network>;
  /** Get the current on air programme for a network */
  onairProgramme?: Maybe<ScheduleItem>;
  presenter?: Maybe<Presenter>;
  presenters: PresenterList;
  presentersV2: PresenterList;
  schedule: ScheduleList;
  /** Get the scheduled programme for a network at a specific date and time */
  scheduledProgramme?: Maybe<ScheduleItem>;
  series: Series;
  seriesList: SeriesList;
  seriesListV2: SeriesList;
  show?: Maybe<Show>;
  shows: ShowList;
  showsV2: ShowList;
  subcategories: Array<Subcategory>;
  subcategory?: Maybe<Subcategory>;
  track?: Maybe<Track>;
  tracks: TrackList;
  tracksV2: TrackList;
};


export type QueryCategoriesArgs = {
  filters?: InputMaybe<CategoryListInput>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
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


export type QueryEpisodesV2Args = {
  filters?: InputMaybe<EpisodeListInputV2>;
};


export type QueryHistoryArgs = {
  filters?: InputMaybe<HistoryListInput>;
};


export type QueryJobArgs = {
  id: Scalars['ID']['input'];
};


export type QueryJobsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<JobStatus>;
  type?: InputMaybe<JobType>;
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


export type QueryPresentersV2Args = {
  filters?: InputMaybe<PresenterListInputV2>;
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


export type QuerySeriesListV2Args = {
  filters?: InputMaybe<SeriesListInputV2>;
};


export type QueryShowArgs = {
  id: Scalars['ID']['input'];
};


export type QueryShowsArgs = {
  filters?: InputMaybe<ShowListInput>;
};


export type QueryShowsV2Args = {
  filters?: InputMaybe<ShowListInputV2>;
};


export type QuerySubcategoriesArgs = {
  filters?: InputMaybe<SubcategoryListInput>;
};


export type QuerySubcategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTrackArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTracksArgs = {
  filters?: InputMaybe<TrackListInput>;
};


export type QueryTracksV2Args = {
  filters?: InputMaybe<TrackListInputV2>;
};

export type Request = {
  __typename?: 'Request';
  id: Scalars['ID']['output'];
  message?: Maybe<Scalars['String']['output']>;
  played: Scalars['Boolean']['output'];
  requested: Scalars['DateTime']['output'];
  track: Track;
  userIp: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type ScheduleItem = {
  __typename?: 'ScheduleItem';
  end: Scalars['DateTime']['output'];
  episode: Episode;
  id: Scalars['ID']['output'];
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
  id: Scalars['ID']['output'];
  network: Network;
  /** @deprecated Use featuredImage object instead */
  promoImage?: Maybe<Scalars['String']['output']>;
  shortDesc: Scalars['String']['output'];
  shortId: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
  show: Show;
  url: Scalars['String']['output'];
};


export type SeriesEpisodesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<EpisodeOrder>>;
};

export type SeriesBooleanFilter = {
  field: SeriesBooleanFilterField;
  operator: BooleanFilterOperator;
  value: Scalars['Boolean']['input'];
};

export enum SeriesBooleanFilterField {
  Archived = 'archived'
}

export type SeriesDateFilter = {
  field: SeriesDateFilterField;
  operator: DateFilterOperator;
  value?: InputMaybe<Scalars['DateTime']['input']>;
  values?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export enum SeriesDateFilterField {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

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

export type SeriesFilterGroup = {
  filters?: InputMaybe<Array<SeriesFilterInput>>;
  groups?: InputMaybe<Array<SeriesFilterGroup>>;
  operator: OperatorType;
};

export type SeriesFilterInput = {
  booleanFilter?: InputMaybe<SeriesBooleanFilter>;
  dateFilter?: InputMaybe<SeriesDateFilter>;
  multiOptionFilter?: InputMaybe<SeriesMultiOptionFilter>;
  numberFilter?: InputMaybe<SeriesNumberFilter>;
  optionFilter?: InputMaybe<SeriesOptionFilter>;
  textFilter?: InputMaybe<SeriesTextFilter>;
  type: SeriesFilterType;
};

export enum SeriesFilterType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  MultiOption = 'MULTI_OPTION',
  Number = 'NUMBER',
  Option = 'OPTION',
  Text = 'TEXT'
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

export type SeriesListInputV2 = {
  filterGroup?: InputMaybe<SeriesFilterGroup>;
  includeArchived?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<SeriesOrder>>;
};

export type SeriesMultiOptionFilter = {
  field: SeriesMultiOptionFilterField;
  operator: MultiOptionFilterOperator;
  values: Array<Scalars['ID']['input']>;
};

export enum SeriesMultiOptionFilterField {
  Networks = 'networks',
  Shows = 'shows'
}

export type SeriesMutationOutput = {
  __typename?: 'SeriesMutationOutput';
  series: Series;
};

export type SeriesNumberFilter = {
  field: SeriesNumberFilterField;
  operator: NumberFilterOperator;
  value?: InputMaybe<Scalars['Int']['input']>;
  values?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum SeriesNumberFilterField {
  NoFieldsAvailable = '_NO_FIELDS_AVAILABLE'
}

export type SeriesOptionFilter = {
  field: SeriesOptionFilterField;
  operator: OptionFilterOperator;
  value?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum SeriesOptionFilterField {
  Archived = 'archived',
  Id = 'id',
  Network = 'network',
  Show = 'show'
}

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

export type SeriesTextFilter = {
  field: SeriesTextFilterField;
  operator: TextFilterOperator;
  value: Scalars['String']['input'];
};

export enum SeriesTextFilterField {
  FullDesc = 'fullDesc',
  FullName = 'fullName',
  ShortDesc = 'shortDesc',
  ShortId = 'shortId',
  ShortName = 'shortName'
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
  id: Scalars['ID']['output'];
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

export type ShowBooleanFilter = {
  field: ShowBooleanFilterField;
  operator: BooleanFilterOperator;
  value: Scalars['Boolean']['input'];
};

export enum ShowBooleanFilterField {
  Hidden = 'hidden'
}

export type ShowDateFilter = {
  field: ShowDateFilterField;
  operator: DateFilterOperator;
  value?: InputMaybe<Scalars['DateTime']['input']>;
  values?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export enum ShowDateFilterField {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

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

export type ShowFilterGroup = {
  filters?: InputMaybe<Array<ShowFilterInput>>;
  groups?: InputMaybe<Array<ShowFilterGroup>>;
  operator: OperatorType;
};

export type ShowFilterInput = {
  booleanFilter?: InputMaybe<ShowBooleanFilter>;
  dateFilter?: InputMaybe<ShowDateFilter>;
  multiOptionFilter?: InputMaybe<ShowMultiOptionFilter>;
  numberFilter?: InputMaybe<ShowNumberFilter>;
  optionFilter?: InputMaybe<ShowOptionFilter>;
  textFilter?: InputMaybe<ShowTextFilter>;
  type: ShowFilterType;
};

export enum ShowFilterType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  MultiOption = 'MULTI_OPTION',
  Number = 'NUMBER',
  Option = 'OPTION',
  Text = 'TEXT'
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

export type ShowListInputV2 = {
  filterGroup?: InputMaybe<ShowFilterGroup>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<ShowOrder>>;
};

export type ShowMultiOptionFilter = {
  field: ShowMultiOptionFilterField;
  operator: MultiOptionFilterOperator;
  values: Array<Scalars['ID']['input']>;
};

export enum ShowMultiOptionFilterField {
  Networks = 'networks',
  Presenters = 'presenters'
}

export type ShowMutationOutput = {
  __typename?: 'ShowMutationOutput';
  show: Show;
};

export type ShowNumberFilter = {
  field: ShowNumberFilterField;
  operator: NumberFilterOperator;
  value?: InputMaybe<Scalars['Int']['input']>;
  values?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum ShowNumberFilterField {
  NoFieldsAvailable = '_NO_FIELDS_AVAILABLE'
}

export type ShowOptionFilter = {
  field: ShowOptionFilterField;
  operator: OptionFilterOperator;
  value?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum ShowOptionFilterField {
  Hidden = 'hidden',
  Id = 'id'
}

export type ShowOrder = {
  direction: OrderDirection;
  field: ShowFilterField;
};

export type ShowTextFilter = {
  field: ShowTextFilterField;
  operator: TextFilterOperator;
  value: Scalars['String']['input'];
};

export enum ShowTextFilterField {
  ExtraData = 'extraData',
  FullDesc = 'fullDesc',
  FullName = 'fullName',
  ShortDesc = 'shortDesc',
  ShortId = 'shortId',
  ShortName = 'shortName'
}

export type Subcategory = {
  __typename?: 'Subcategory';
  category: Category;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tracks: Array<Track>;
};

export type SubcategoryListInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export enum TextFilterOperator {
  Contains = 'CONTAINS',
  DoesNotContain = 'DOES_NOT_CONTAIN',
  DoesNotEqual = 'DOES_NOT_EQUAL',
  EndsWith = 'ENDS_WITH',
  Equals = 'EQUALS',
  IsEmpty = 'IS_EMPTY',
  IsNotEmpty = 'IS_NOT_EMPTY',
  StartsWith = 'STARTS_WITH'
}

export type Track = {
  __typename?: 'Track';
  album: Scalars['String']['output'];
  artist: Scalars['String']['output'];
  associatedArtists: Scalars['String']['output'];
  bpm: Scalars['Float']['output'];
  buyLink: Scalars['String']['output'];
  comments?: Maybe<Scalars['String']['output']>;
  composer: Scalars['String']['output'];
  copyright: Scalars['String']['output'];
  countPlayed: Scalars['Int']['output'];
  dateAdded?: Maybe<Scalars['DateTime']['output']>;
  dateModified?: Maybe<Scalars['DateTime']['output']>;
  datePlayed?: Maybe<Scalars['DateTime']['output']>;
  discNo: Scalars['Int']['output'];
  duration: TrackDuration;
  enabled: Scalars['Boolean']['output'];
  gender: Scalars['String']['output'];
  genre?: Maybe<Genre>;
  history: Array<History>;
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  isrc: Scalars['String']['output'];
  label: Scalars['String']['output'];
  lang: Scalars['String']['output'];
  metadata: Array<TrackMetadata>;
  mood: Scalars['String']['output'];
  originalArtist: Scalars['String']['output'];
  path: Scalars['String']['output'];
  publisher: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  requests: Array<Request>;
  subcategory?: Maybe<Subcategory>;
  title: Scalars['String']['output'];
  trackNo: Scalars['Int']['output'];
  url1: Scalars['String']['output'];
  url2: Scalars['String']['output'];
  uuid?: Maybe<Scalars['String']['output']>;
  year: Scalars['String']['output'];
};

export type TrackBooleanFilter = {
  field: TrackBooleanFilterField;
  operator: BooleanFilterOperator;
  value: Scalars['Boolean']['input'];
};

export enum TrackBooleanFilterField {
  Enabled = 'enabled',
  Overlay = 'overlay',
  PreciseCue = 'preciseCue'
}

export type TrackDateFilter = {
  field: TrackDateFilterField;
  operator: DateFilterOperator;
  value: Scalars['DateTime']['input'];
};

export enum TrackDateFilterField {
  DateAdded = 'dateAdded',
  DateModified = 'dateModified',
  DatePlayed = 'datePlayed',
  EndDate = 'endDate',
  StartDate = 'startDate'
}

export type TrackDuration = {
  __typename?: 'TrackDuration';
  formatted: Scalars['String']['output'];
  raw: Scalars['Float']['output'];
};

export type TrackFilterGroup = {
  filters?: InputMaybe<Array<TrackFilterInput>>;
  groups?: InputMaybe<Array<TrackFilterGroup>>;
  operator: OperatorType;
};

export type TrackFilterInput = {
  booleanFilter?: InputMaybe<TrackBooleanFilter>;
  dateFilter?: InputMaybe<TrackDateFilter>;
  multiOptionFilter?: InputMaybe<TrackMultiOptionFilter>;
  numberFilter?: InputMaybe<TrackNumberFilter>;
  optionFilter?: InputMaybe<TrackOptionFilter>;
  textFilter?: InputMaybe<TrackTextFilter>;
  type: TrackFilterType;
};

export enum TrackFilterType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  MultiOption = 'MULTI_OPTION',
  Number = 'NUMBER',
  Option = 'OPTION',
  Text = 'TEXT'
}

export type TrackList = ItemList & {
  __typename?: 'TrackList';
  items: Array<Track>;
  total: Scalars['Int']['output'];
};

export type TrackListInput = {
  categoryId?: InputMaybe<Scalars['ID']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  genreId?: InputMaybe<Scalars['ID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TrackOrder>>;
  subcategoryId?: InputMaybe<Scalars['ID']['input']>;
};

export type TrackListInputV2 = {
  filterGroup?: InputMaybe<TrackFilterGroup>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TrackOrder>>;
};

export type TrackMetadata = {
  __typename?: 'TrackMetadata';
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  value?: Maybe<Scalars['String']['output']>;
};

export type TrackMultiOptionFilter = {
  field: TrackMultiOptionFilterField;
  operator: MultiOptionFilterOperator;
  values: Array<Scalars['String']['input']>;
};

export enum TrackMultiOptionFilterField {
  Genres = 'genres',
  Subcategories = 'subcategories'
}

export type TrackNumberFilter = {
  field: TrackNumberFilterField;
  operator: NumberFilterOperator;
  value: Scalars['Float']['input'];
};

export enum TrackNumberFilterField {
  Bpm = 'bpm',
  CountPlayed = 'countPlayed',
  DiscNo = 'discNo',
  Duration = 'duration',
  Id = 'id',
  PlayLimit = 'playLimit',
  Rating = 'rating',
  TrackNo = 'trackNo',
  Weight = 'weight',
  Year = 'year'
}

export type TrackOptionFilter = {
  field: TrackOptionFilterField;
  operator: OptionFilterOperator;
  value: Scalars['String']['input'];
};

export enum TrackOptionFilterField {
  EndType = 'endType',
  FadeType = 'fadeType',
  Genre = 'genre',
  MixType = 'mixType',
  SongType = 'songType',
  StartType = 'startType',
  Subcategory = 'subcategory'
}

export type TrackOrder = {
  direction: OrderDirection;
  field: TrackOrderField;
};

export enum TrackOrderField {
  Album = 'album',
  Artist = 'artist',
  CountPlayed = 'countPlayed',
  DatePlayed = 'datePlayed',
  Duration = 'duration',
  Id = 'id',
  Title = 'title',
  Year = 'year'
}

export type TrackTextFilter = {
  field: TrackTextFilterField;
  operator: TextFilterOperator;
  value: Scalars['String']['input'];
};

export enum TrackTextFilterField {
  Album = 'album',
  Artist = 'artist',
  Comments = 'comments',
  Composer = 'composer',
  Copyright = 'copyright',
  Gender = 'gender',
  Isrc = 'isrc',
  Label = 'label',
  Lang = 'lang',
  Mood = 'mood',
  Path = 'path',
  Publisher = 'publisher',
  Title = 'title'
}

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

export type YouTubeBulkSearchResult = {
  __typename?: 'YouTubeBulkSearchResult';
  error?: Maybe<Scalars['String']['output']>;
  query: Scalars['String']['output'];
  results: Array<YouTubeSearchResult>;
};

export type YouTubeSearchResult = {
  __typename?: 'YouTubeSearchResult';
  artist: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ApplyAssignedDefaultScheduleMutationVariables = Exact<{
  networkId: Scalars['ID']['input'];
  date: Scalars['DateTime']['input'];
  assignedTo: Array<Scalars['DayOfWeek']['input']> | Scalars['DayOfWeek']['input'];
}>;


export type ApplyAssignedDefaultScheduleMutation = { __typename?: 'Mutation', applyAssignedDefaultSchedule: { __typename?: 'ActionOutput', success: boolean, message?: string | null } };

export type ApplyDefaultScheduleMutationVariables = Exact<{
  defaultScheduleId: Scalars['ID']['input'];
  date: Scalars['DateTime']['input'];
}>;


export type ApplyDefaultScheduleMutation = { __typename?: 'Mutation', applyDefaultSchedule: { __typename?: 'ActionOutput', success: boolean, message?: string | null } };

export type CreateEpisodeMutationVariables = Exact<{
  input: CreateEpisodeInput;
}>;


export type CreateEpisodeMutation = { __typename?: 'Mutation', createEpisode: { __typename?: 'EpisodeMutationOutput', episode: { __typename?: 'Episode', id: string, name: string, description: string, extraData?: string | null, shortId: string, createdAt: string, updatedAt: string, url: string, duration: { __typename?: 'EpisodeDuration', formatted: string, raw: number }, featuredImage: { __typename?: 'Media', id: string, key: string, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, show: { __typename?: 'Show', id: string, shortName: string, fullName: string }, series?: { __typename?: 'Series', id: string, fullName: string } | null, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }> } } };

export type CreatePresenterMutationVariables = Exact<{
  input: CreatePresenterInput;
}>;


export type CreatePresenterMutation = { __typename?: 'Mutation', createPresenter: { __typename?: 'PresenterMutationOutput', presenter: { __typename?: 'Presenter', id: string, name: string, bio: string, shortBio: string, hidden: boolean, hero?: string | null, picture?: string | null, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }> } } };

export type CreateScheduleItemMutationVariables = Exact<{
  input: CreateScheduleItemInput;
}>;


export type CreateScheduleItemMutation = { __typename?: 'Mutation', createScheduleItem: { __typename?: 'ScheduleItemMutationOutput', scheduleItem: { __typename?: 'ScheduleItem', id: string, end: string, start: string, networks: Array<{ __typename?: 'Network', id: string, name: string }>, episode: { __typename?: 'Episode', id: string, name: string, description: string, show: { __typename?: 'Show', shortName: string }, broadcasts: Array<{ __typename?: 'Broadcast', id: string, start: string, end: string }>, featuredImage: { __typename?: 'Media', urls: { __typename?: 'MediaUrls', square: string, customSquare?: string | null } }, networks: Array<{ __typename?: 'Network', id: string, logoSvgIcon: string }> } } } };

export type CreateScheduleTemplateMutationVariables = Exact<{
  input: CreateDefaultScheduleInput;
}>;


export type CreateScheduleTemplateMutation = { __typename?: 'Mutation', createDefaultSchedule: { __typename?: 'DefaultScheduleMutationOutput', defaultSchedule: { __typename?: 'DefaultSchedule', id: string, name: string, assignedTo?: Array<any> | null, networks: Array<{ __typename?: 'Network', id: string, name: string, code: string }> } } };

export type CreateSeriesMutationVariables = Exact<{
  input: CreateSeriesInput;
}>;


export type CreateSeriesMutation = { __typename?: 'Mutation', createSeries: { __typename?: 'SeriesMutationOutput', series: { __typename?: 'Series', id: string, fullName: string, shortName: string, fullDesc: string, shortDesc: string, archived: boolean, featuredImage: { __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, show: { __typename?: 'Show', id: string, shortName: string, fullName: string }, network: { __typename?: 'Network', id: string, name: string } } } };

export type CreateShowMutationVariables = Exact<{
  input: CreateShowInput;
}>;


export type CreateShowMutation = { __typename?: 'Mutation', createShow: { __typename?: 'ShowMutationOutput', show: { __typename?: 'Show', id: string, fullName: string, shortName: string, fullDesc: string, shortDesc: string, hidden: boolean, extraData?: string | null, totalEpisodes: number, createdAt: string, updatedAt: string, url: string, featuredImage: { __typename?: 'Media', id: string, key: string, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }>, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, series: { __typename?: 'SeriesList', items: Array<{ __typename?: 'Series', id: string, fullName: string }> } } } };

export type DeleteEpisodeMutationVariables = Exact<{
  input: DeleteEpisodeInput;
}>;


export type DeleteEpisodeMutation = { __typename?: 'Mutation', deleteEpisode: { __typename?: 'ActionOutput', success: boolean, message?: string | null } };

export type DeleteMediaMutationVariables = Exact<{
  input: DeleteMediaInput;
}>;


export type DeleteMediaMutation = { __typename?: 'Mutation', deleteMedia: { __typename?: 'ActionOutput', success: boolean, message?: string | null } };

export type DeletePresenterMutationVariables = Exact<{
  input: DeletePresenterInput;
}>;


export type DeletePresenterMutation = { __typename?: 'Mutation', deletePresenter: { __typename?: 'ActionOutput', success: boolean, message?: string | null } };

export type DeleteScheduleItemMutationVariables = Exact<{
  input: DeleteScheduleItemInput;
}>;


export type DeleteScheduleItemMutation = { __typename?: 'Mutation', deleteScheduleItem: { __typename?: 'ActionOutput', success: boolean } };

export type DeleteScheduleTemplateMutationVariables = Exact<{
  input: DeleteDefaultScheduleInput;
}>;


export type DeleteScheduleTemplateMutation = { __typename?: 'Mutation', deleteDefaultSchedule: { __typename?: 'ActionOutput', success: boolean, message?: string | null } };

export type DeleteSeriesMutationVariables = Exact<{
  input: DeleteSeriesInput;
}>;


export type DeleteSeriesMutation = { __typename?: 'Mutation', deleteSeries: { __typename?: 'ActionOutput', success: boolean, message?: string | null } };

export type DeleteShowMutationVariables = Exact<{
  input: DeleteShowInput;
}>;


export type DeleteShowMutation = { __typename?: 'Mutation', deleteShow: { __typename?: 'ActionOutput', success: boolean, message?: string | null } };

export type CreateDownloadJobMutationVariables = Exact<{
  input: DownloadJobInput;
}>;


export type CreateDownloadJobMutation = { __typename?: 'Mutation', createDownloadJob: { __typename?: 'Job', id: string, status: JobStatus, sourceUrl?: string | null, searchQuery?: string | null, createdAt: string } };

export type CreateBulkDownloadJobsMutationVariables = Exact<{
  input: BulkDownloadJobsInput;
}>;


export type CreateBulkDownloadJobsMutation = { __typename?: 'Mutation', createBulkDownloadJobs: { __typename?: 'BulkDownloadJobsResponse', success: boolean, message: string, totalJobs: number, successfulJobs: number, failedJobs: number, results: Array<{ __typename?: 'DownloadJobResult', id?: string | null, url: string, jobId?: string | null, success: boolean, error?: string | null }> } };

export type CancelJobMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CancelJobMutation = { __typename?: 'Mutation', cancelJob: boolean };

export type DuplicateScheduleTemplateMutationVariables = Exact<{
  input: DuplicateDefaultScheduleInput;
}>;


export type DuplicateScheduleTemplateMutation = { __typename?: 'Mutation', duplicateDefaultSchedule: { __typename?: 'DefaultScheduleMutationOutput', defaultSchedule: { __typename?: 'DefaultSchedule', id: string, name: string, assignedTo?: Array<any> | null, networks: Array<{ __typename?: 'Network', id: string, name: string, code: string }> } } };

export type CreateEnrichmentJobMutationVariables = Exact<{
  input: EnrichmentJobInput;
}>;


export type CreateEnrichmentJobMutation = { __typename?: 'Mutation', createEnrichmentJob: { __typename?: 'Job', id: string, status: JobStatus, progress?: any | null, createdAt: string } };

export type EnrichPendingJobMutationVariables = Exact<{
  input: EnrichPendingJobInput;
}>;


export type EnrichPendingJobMutation = { __typename?: 'Mutation', enrichPendingJob: { __typename?: 'Job', id: string, status: JobStatus, progress?: any | null, updatedAt: string } };

export type RetryJobMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RetryJobMutation = { __typename?: 'Mutation', retryJob: { __typename?: 'Job', id: string, status: JobStatus, progress?: any | null, updatedAt: string } };

export type UpdateEpisodeMutationVariables = Exact<{
  input: UpdateEpisodeInput;
}>;


export type UpdateEpisodeMutation = { __typename?: 'Mutation', updateEpisode: { __typename?: 'EpisodeMutationOutput', episode: { __typename?: 'Episode', id: string, name: string, description: string, extraData?: string | null, shortId: string, createdAt: string, updatedAt: string, url: string, duration: { __typename?: 'EpisodeDuration', formatted: string, raw: number }, featuredImage: { __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, show: { __typename?: 'Show', id: string, shortName: string }, series?: { __typename?: 'Series', id: string, shortName: string } | null, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }> } } };

export type UpdatePresenterMutationVariables = Exact<{
  input: UpdatePresenterInput;
}>;


export type UpdatePresenterMutation = { __typename?: 'Mutation', updatePresenter: { __typename?: 'PresenterMutationOutput', presenter: { __typename?: 'Presenter', id: string, name: string, bio: string, shortBio: string, hidden: boolean, hero?: string | null, picture?: string | null, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }> } } };

export type UpdateScheduleItemMutationVariables = Exact<{
  input: UpdateScheduleItemInput;
}>;


export type UpdateScheduleItemMutation = { __typename?: 'Mutation', updateScheduleItem: { __typename?: 'ScheduleItemMutationOutput', scheduleItem: { __typename?: 'ScheduleItem', id: string, end: string, start: string, networks: Array<{ __typename?: 'Network', id: string, name: string }>, episode: { __typename?: 'Episode', id: string, name: string, description: string, show: { __typename?: 'Show', shortName: string }, broadcasts: Array<{ __typename?: 'Broadcast', id: string, start: string, end: string }>, featuredImage: { __typename?: 'Media', urls: { __typename?: 'MediaUrls', square: string, customSquare?: string | null } }, networks: Array<{ __typename?: 'Network', id: string, logoSvgIcon: string }> } } } };

export type UpdateScheduleTemplateMutationVariables = Exact<{
  input: UpdateDefaultScheduleInput;
}>;


export type UpdateScheduleTemplateMutation = { __typename?: 'Mutation', updateDefaultSchedule: { __typename?: 'DefaultScheduleMutationOutput', defaultSchedule: { __typename?: 'DefaultSchedule', id: string, name: string, assignedTo?: Array<any> | null, networks: Array<{ __typename?: 'Network', id: string, name: string, code: string }> } } };

export type UpdateSeriesMutationVariables = Exact<{
  input: UpdateSeriesInput;
}>;


export type UpdateSeriesMutation = { __typename?: 'Mutation', updateSeries: { __typename?: 'SeriesMutationOutput', series: { __typename?: 'Series', id: string, fullName: string, shortName: string, fullDesc: string, shortDesc: string, archived: boolean, featuredImage: { __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, show: { __typename?: 'Show', id: string, shortName: string, fullName: string }, network: { __typename?: 'Network', id: string, name: string } } } };

export type UpdateShowMutationVariables = Exact<{
  input: UpdateShowInput;
}>;


export type UpdateShowMutation = { __typename?: 'Mutation', updateShow: { __typename?: 'ShowMutationOutput', show: { __typename?: 'Show', id: string, fullName: string, shortName: string, fullDesc: string, shortDesc: string, hidden: boolean, extraData?: string | null, totalEpisodes: number, createdAt: string, updatedAt: string, url: string, featuredImage: { __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }>, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, series: { __typename?: 'SeriesList', items: Array<{ __typename?: 'Series', id: string, fullName: string }> } } } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, subcategories: Array<{ __typename?: 'Subcategory', id: string, name: string }> }> };

export type DebugQueryVariables = Exact<{ [key: string]: never; }>;


export type DebugQuery = { __typename?: 'Query', debug?: { __typename?: 'Debug', id: string, status: string, randomShow: { __typename?: 'Show', id: string, shortName: string, episodes: { __typename?: 'EpisodeList', total: number } } } | null };

export type SearchDefaultScheduleQueryVariables = Exact<{
  filters: DefaultScheduleListInput;
}>;


export type SearchDefaultScheduleQuery = { __typename?: 'Query', defaultSchedules: { __typename?: 'DefaultScheduleList', total: number, items: Array<{ __typename?: 'DefaultSchedule', id: string, assignedTo?: Array<any> | null, name: string, networks: Array<{ __typename?: 'Network', id: string, name: string }> }> } };

export type GetDefaultSchedulesQueryVariables = Exact<{
  filters: DefaultScheduleListInput;
}>;


export type GetDefaultSchedulesQuery = { __typename?: 'Query', defaultSchedules: { __typename?: 'DefaultScheduleList', total: number, items: Array<{ __typename?: 'DefaultSchedule', id: string, name: string, assignedTo?: Array<any> | null, networks: Array<{ __typename?: 'Network', id: string, name: string, code: string, logoSvgIcon: string }> }> } };

export type GetDefaultScheduleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetDefaultScheduleQuery = { __typename?: 'Query', defaultSchedule?: { __typename?: 'DefaultSchedule', id: string, name: string, assignedTo?: Array<any> | null, networks: Array<{ __typename?: 'Network', id: string, name: string, code: string }>, items: Array<{ __typename?: 'DefaultScheduleItem', id: string, start: string, end: string, endsNextDay: boolean, episodeName?: string | null, episodeDesc?: string | null, show: { __typename?: 'Show', id: string, fullName: string, shortName: string, featuredImage: { __typename?: 'Media', urls: { __typename?: 'MediaUrls', customSquare?: string | null } } }, series?: { __typename?: 'Series', id: string, fullName: string, shortName: string } | null, presenters?: Array<{ __typename?: 'Presenter', id: string, name: string }> | null, media?: { __typename?: 'Media', id: string, key: string, urls: { __typename?: 'MediaUrls', medium: string, original: string } } | null, networks?: Array<{ __typename?: 'Network', id: string, name: string, code: string, logoSvgIcon: string }> | null, existingEpisode?: { __typename?: 'Episode', id: string, name: string, description: string } | null, repeatOf?: { __typename?: 'DefaultScheduleItem', id: string, episodeName?: string | null } | null }> } | null };

export type SearchEpisodesQueryVariables = Exact<{
  filters?: InputMaybe<EpisodeListInput>;
}>;


export type SearchEpisodesQuery = { __typename?: 'Query', episodes: { __typename?: 'EpisodeList', items: Array<{ __typename?: 'Episode', id: string, name: string, show: { __typename?: 'Show', id: string, shortName: string } }> } };

export type SearchEpisodesV2QueryVariables = Exact<{
  filters?: InputMaybe<EpisodeListInputV2>;
}>;


export type SearchEpisodesV2Query = { __typename?: 'Query', episodesV2: { __typename?: 'EpisodeList', total: number, items: Array<{ __typename?: 'Episode', id: string, shortId: string, name: string, description: string, createdAt: string, updatedAt: string, duration: { __typename?: 'EpisodeDuration', formatted: string, raw: number }, featuredImage: { __typename?: 'Media', urls: { __typename?: 'MediaUrls', square: string } }, show: { __typename?: 'Show', id: string, shortName: string, shortId: string }, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }>, series?: { __typename?: 'Series', id: string, shortName: string } | null, broadcasts: Array<{ __typename?: 'Broadcast', id: string, start: string, end: string }> }> } };

export type GetEpisodeQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEpisodeQuery = { __typename?: 'Query', episode?: { __typename?: 'Episode', id: string, name: string, description: string, extraData?: string | null, shortId: string, createdAt: string, updatedAt: string, url: string, duration: { __typename?: 'EpisodeDuration', formatted: string, raw: number }, featuredImage: { __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, show: { __typename?: 'Show', id: string, shortName: string }, series?: { __typename?: 'Series', id: string, shortName: string } | null, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }> } | null };

export type GetEpisodeDetailsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetEpisodeDetailsQuery = { __typename?: 'Query', episode?: { __typename?: 'Episode', id: string, name: string, description: string, show: { __typename?: 'Show', id: string, shortName: string }, broadcasts: Array<{ __typename?: 'Broadcast', id: string }>, featuredImage: { __typename?: 'Media', urls: { __typename?: 'MediaUrls', square: string, customSquare?: string | null } }, networks: Array<{ __typename?: 'Network', id: string, logoSvgIcon: string }> } | null };

export type GetJobsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<JobStatus>;
  type?: InputMaybe<JobType>;
}>;


export type GetJobsQuery = { __typename?: 'Query', jobs: Array<{ __typename?: 'Job', id: string, type: JobType, status: JobStatus, sourceUrl?: string | null, searchQuery?: string | null, progress?: any | null, errorMessage?: string | null, songId?: number | null, createdAt: string, updatedAt: string, completedAt?: string | null }> };

export type GetJobQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetJobQuery = { __typename?: 'Query', job?: { __typename?: 'Job', id: string, type: JobType, status: JobStatus, sourceUrl?: string | null, searchQuery?: string | null, progress?: any | null, errorMessage?: string | null, songId?: number | null, createdAt: string, updatedAt: string, completedAt?: string | null } | null };

export type GetMediaQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMediaQuery = { __typename?: 'Query', media: { __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } } };

export type SearchMediaQueryVariables = Exact<{
  filters?: InputMaybe<MediaListInput>;
}>;


export type SearchMediaQuery = { __typename?: 'Query', mediaList: { __typename?: 'MediaList', total: number, items: Array<{ __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } }> } };

export type GetNetworksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNetworksQuery = { __typename?: 'Query', networks: Array<{ __typename?: 'Network', id: string, name: string, code: string, networkType: NetworkType, baseUrl: string, logoSvgIcon: string, logoSvgCircular?: string | null }> };

export type GetNetworkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetNetworkQuery = { __typename?: 'Query', network: { __typename?: 'Network', id: string, name: string, code: string, networkType: NetworkType, logoSvgIcon: string } };

export type GetPresentersQueryVariables = Exact<{
  filters?: InputMaybe<PresenterListInputV2>;
}>;


export type GetPresentersQuery = { __typename?: 'Query', presentersV2: { __typename?: 'PresenterList', total: number, items: Array<{ __typename?: 'Presenter', id: string, name: string, picture?: string | null, hidden: boolean, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }> }> } };

export type GetPresenterQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPresenterQuery = { __typename?: 'Query', presenter?: { __typename?: 'Presenter', id: string, name: string, bio: string, hero?: string | null, hidden: boolean, shortBio: string, picture?: string | null, shows: { __typename?: 'ShowList', total: number }, episodes: { __typename?: 'EpisodeList', total: number }, networks: Array<{ __typename?: 'Network', id: string }> } | null };

export type ScheduleQueryVariables = Exact<{
  from: Scalars['DateTime']['input'];
  network: Scalars['ID']['input'];
  to?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type ScheduleQuery = { __typename?: 'Query', schedule: { __typename?: 'ScheduleList', total: number, items: Array<{ __typename?: 'ScheduleItem', id: string, start: string, end: string, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }>, episode: { __typename?: 'Episode', id: string, name: string, description: string, show: { __typename?: 'Show', id: string, shortName: string }, broadcasts: Array<{ __typename?: 'Broadcast', id: string }>, featuredImage: { __typename?: 'Media', urls: { __typename?: 'MediaUrls', square: string, customSquare?: string | null } }, networks: Array<{ __typename?: 'Network', id: string, logoSvgIcon: string }> } }> } };

export type SearchSeriesQueryVariables = Exact<{
  filters?: InputMaybe<SeriesListInputV2>;
}>;


export type SearchSeriesQuery = { __typename?: 'Query', seriesListV2: { __typename?: 'SeriesList', total: number, items: Array<{ __typename?: 'Series', id: string, shortName: string, fullName: string, archived: boolean, show: { __typename?: 'Show', id: string, shortName: string }, network: { __typename?: 'Network', id: string, name: string, logoSvgIcon: string } }> } };

export type GetSeriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSeriesQuery = { __typename?: 'Query', series: { __typename?: 'Series', id: string, shortName: string, fullName: string, shortDesc: string, fullDesc: string, archived: boolean, show: { __typename?: 'Show', id: string, shortName: string, fullName: string }, network: { __typename?: 'Network', id: string, name: string }, featuredImage: { __typename?: 'Media', id: string, key: string, urls: { __typename?: 'MediaUrls', medium: string, square: string } } } };

export type SearchShowsQueryVariables = Exact<{
  filters?: InputMaybe<ShowListInputV2>;
}>;


export type SearchShowsQuery = { __typename?: 'Query', showsV2: { __typename?: 'ShowList', total: number, items: Array<{ __typename?: 'Show', id: string, shortId: string, shortName: string, fullName: string, hidden: boolean, featuredImage: { __typename?: 'Media', urls: { __typename?: 'MediaUrls', square: string } }, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }> }> } };

export type GetShowQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetShowQuery = { __typename?: 'Query', show?: { __typename?: 'Show', createdAt: string, extraData?: string | null, fullDesc: string, fullName: string, hidden: boolean, id: string, shortDesc: string, shortId: string, shortName: string, totalEpisodes: number, updatedAt: string, url: string, featuredImage: { __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }>, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, series: { __typename?: 'SeriesList', items: Array<{ __typename?: 'Series', id: string, fullName: string }> } } | null };

export type SearchTracksQueryVariables = Exact<{
  filters?: InputMaybe<TrackListInput>;
}>;


export type SearchTracksQuery = { __typename?: 'Query', tracks: { __typename?: 'TrackList', total: number, items: Array<{ __typename?: 'Track', id: string, artist: string, title: string, album: string, path: string, enabled: boolean, year: string, isrc: string, bpm: number, dateAdded?: string | null, dateModified?: string | null, duration: { __typename?: 'TrackDuration', formatted: string, raw: number }, genre?: { __typename?: 'Genre', name: string } | null }> } };

export type SearchTracksV2QueryVariables = Exact<{
  filters?: InputMaybe<TrackListInputV2>;
}>;


export type SearchTracksV2Query = { __typename?: 'Query', tracksV2: { __typename?: 'TrackList', total: number, items: Array<{ __typename?: 'Track', id: string, artist: string, title: string, album: string, path: string, enabled: boolean, year: string, isrc: string, bpm: number, dateAdded?: string | null, dateModified?: string | null, duration: { __typename?: 'TrackDuration', formatted: string, raw: number }, genre?: { __typename?: 'Genre', id: string, name: string } | null }> } };

export type GetTrackQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTrackQuery = { __typename?: 'Query', track?: { __typename?: 'Track', id: string, artist: string, title: string, album: string, path: string, enabled: boolean, year: string, isrc: string, bpm: number, dateAdded?: string | null, dateModified?: string | null, duration: { __typename?: 'TrackDuration', formatted: string, raw: number }, genre?: { __typename?: 'Genre', name: string } | null } | null };

export type SearchYouTubeMutationVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchYouTubeMutation = { __typename?: 'Mutation', searchYouTube: Array<{ __typename?: 'YouTubeSearchResult', url: string, title: string, artist: string, duration: number, thumbnail?: string | null, description?: string | null }> };

export type BulkSearchYouTubeMutationVariables = Exact<{
  input: BulkSearchYouTubeInput;
}>;


export type BulkSearchYouTubeMutation = { __typename?: 'Mutation', bulkSearchYouTube: { __typename?: 'BulkSearchYouTubeResponse', success: boolean, message: string, totalQueries: number, successfulQueries: number, failedQueries: number, results: Array<{ __typename?: 'YouTubeBulkSearchResult', query: string, error?: string | null, results: Array<{ __typename?: 'YouTubeSearchResult', url: string, title: string, artist: string, duration: number, thumbnail?: string | null, description?: string | null }> }> } };

export type SearchMusicBrainzMutationVariables = Exact<{
  artist: Scalars['String']['input'];
  title: Scalars['String']['input'];
}>;


export type SearchMusicBrainzMutation = { __typename?: 'Mutation', searchMusicBrainz: Array<{ __typename?: 'MusicBrainzSearchResult', id: string, title: string, artist: string, score: number }> };

export type BulkSearchMusicBrainzMutationVariables = Exact<{
  input: BulkSearchMusicBrainzInput;
}>;


export type BulkSearchMusicBrainzMutation = { __typename?: 'Mutation', bulkSearchMusicBrainz: { __typename?: 'BulkSearchMusicBrainzResponse', success: boolean, message: string, totalSearches: number, successfulSearches: number, failedSearches: number, results: Array<{ __typename?: 'MusicBrainzBulkSearchResult', id?: string | null, error?: string | null, query: { __typename?: 'MusicBrainzSearchQuery', artist: string, title: string, album?: string | null }, results: Array<{ __typename?: 'MusicBrainzSearchResult', id: string, title: string, artist: string, score: number }> }> } };


export const ApplyAssignedDefaultScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyAssignedDefaultSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignedTo"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DayOfWeek"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyAssignedDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"networkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"assignedTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignedTo"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ApplyAssignedDefaultScheduleMutation, ApplyAssignedDefaultScheduleMutationVariables>;
export const ApplyDefaultScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyDefaultSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"defaultScheduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"defaultSchedule"},"value":{"kind":"Variable","name":{"kind":"Name","value":"defaultScheduleId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ApplyDefaultScheduleMutation, ApplyDefaultScheduleMutationVariables>;
export const CreateEpisodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEpisode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEpisodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEpisode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateEpisodeMutation, CreateEpisodeMutationVariables>;
export const CreatePresenterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePresenter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePresenterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPresenter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presenter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"shortBio"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"hero"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreatePresenterMutation, CreatePresenterMutationVariables>;
export const CreateScheduleItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateScheduleItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScheduleItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScheduleItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"broadcasts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}},{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"150"}}]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateScheduleItemMutation, CreateScheduleItemMutationVariables>;
export const CreateScheduleTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateScheduleTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDefaultScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateScheduleTemplateMutation, CreateScheduleTemplateMutationVariables>;
export const CreateSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSeriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSeries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateSeriesMutation, CreateSeriesMutationVariables>;
export const CreateShowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateShow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateShowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createShow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalEpisodes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<CreateShowMutation, CreateShowMutationVariables>;
export const DeleteEpisodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEpisode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteEpisodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEpisode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>;
export const DeleteMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteMediaMutation, DeleteMediaMutationVariables>;
export const DeletePresenterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePresenter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeletePresenterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePresenter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeletePresenterMutation, DeletePresenterMutationVariables>;
export const DeleteScheduleItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteScheduleItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteScheduleItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteScheduleItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteScheduleItemMutation, DeleteScheduleItemMutationVariables>;
export const DeleteScheduleTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteScheduleTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteDefaultScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteScheduleTemplateMutation, DeleteScheduleTemplateMutationVariables>;
export const DeleteSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteSeriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSeries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteSeriesMutation, DeleteSeriesMutationVariables>;
export const DeleteShowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteShow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteShowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteShow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteShowMutation, DeleteShowMutationVariables>;
export const CreateDownloadJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDownloadJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DownloadJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDownloadJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"searchQuery"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateDownloadJobMutation, CreateDownloadJobMutationVariables>;
export const CreateBulkDownloadJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBulkDownloadJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkDownloadJobsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBulkDownloadJobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalJobs"}},{"kind":"Field","name":{"kind":"Name","value":"successfulJobs"}},{"kind":"Field","name":{"kind":"Name","value":"failedJobs"}}]}}]}}]} as unknown as DocumentNode<CreateBulkDownloadJobsMutation, CreateBulkDownloadJobsMutationVariables>;
export const CancelJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<CancelJobMutation, CancelJobMutationVariables>;
export const DuplicateScheduleTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DuplicateScheduleTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DuplicateDefaultScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duplicateDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DuplicateScheduleTemplateMutation, DuplicateScheduleTemplateMutationVariables>;
export const CreateEnrichmentJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEnrichmentJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EnrichmentJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEnrichmentJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateEnrichmentJobMutation, CreateEnrichmentJobMutationVariables>;
export const EnrichPendingJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnrichPendingJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EnrichPendingJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrichPendingJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<EnrichPendingJobMutation, EnrichPendingJobMutationVariables>;
export const RetryJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RetryJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retryJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<RetryJobMutation, RetryJobMutationVariables>;
export const UpdateEpisodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEpisode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEpisodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEpisode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>;
export const UpdatePresenterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePresenter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePresenterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePresenter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presenter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"shortBio"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"hero"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePresenterMutation, UpdatePresenterMutationVariables>;
export const UpdateScheduleItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScheduleItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateScheduleItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateScheduleItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"broadcasts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}},{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"150"}}]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateScheduleItemMutation, UpdateScheduleItemMutationVariables>;
export const UpdateScheduleTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScheduleTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateScheduleTemplateMutation, UpdateScheduleTemplateMutationVariables>;
export const UpdateSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSeriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSeries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSeriesMutation, UpdateSeriesMutationVariables>;
export const UpdateShowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateShowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateShow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalEpisodes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateShowMutation, UpdateShowMutationVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const DebugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Debug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"debug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"randomShow"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DebugQuery, DebugQueryVariables>;
export const SearchDefaultScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchDefaultSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultScheduleListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchDefaultScheduleQuery, SearchDefaultScheduleQueryVariables>;
export const GetDefaultSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDefaultSchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultScheduleListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDefaultSchedulesQuery, GetDefaultSchedulesQueryVariables>;
export const GetDefaultScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDefaultSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"endsNextDay"}},{"kind":"Field","name":{"kind":"Name","value":"episodeName"}},{"kind":"Field","name":{"kind":"Name","value":"episodeDesc"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"120"}}]}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"original"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"existingEpisode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repeatOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"episodeName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDefaultScheduleQuery, GetDefaultScheduleQueryVariables>;
export const SearchEpisodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchEpisodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EpisodeListInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchEpisodesQuery, SearchEpisodesQueryVariables>;
export const SearchEpisodesV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchEpisodesV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EpisodeListInputV2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodesV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"broadcasts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchEpisodesV2Query, SearchEpisodesV2QueryVariables>;
export const GetEpisodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEpisode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]} as unknown as DocumentNode<GetEpisodeQuery, GetEpisodeQueryVariables>;
export const GetEpisodeDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEpisodeDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"broadcasts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}},{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"150"}}]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]} as unknown as DocumentNode<GetEpisodeDetailsQuery, GetEpisodeDetailsQueryVariables>;
export const GetJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"searchQuery"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"songId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]} as unknown as DocumentNode<GetJobsQuery, GetJobsQueryVariables>;
export const GetJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"searchQuery"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"songId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]} as unknown as DocumentNode<GetJobQuery, GetJobQueryVariables>;
export const GetMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}}]}}]} as unknown as DocumentNode<GetMediaQuery, GetMediaQueryVariables>;
export const SearchMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaListInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mediaList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchMediaQuery, SearchMediaQueryVariables>;
export const GetNetworksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNetworks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"networkType"}},{"kind":"Field","name":{"kind":"Name","value":"baseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgCircular"}}]}}]}}]} as unknown as DocumentNode<GetNetworksQuery, GetNetworksQueryVariables>;
export const GetNetworkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNetwork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"network"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"networkType"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]} as unknown as DocumentNode<GetNetworkQuery, GetNetworkQueryVariables>;
export const GetPresentersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPresenters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PresenterListInputV2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presentersV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPresentersQuery, GetPresentersQueryVariables>;
export const GetPresenterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPresenter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presenter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"hero"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"shortBio"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"shows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetPresenterQuery, GetPresenterQueryVariables>;
export const ScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Schedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"network"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"networkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"network"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"amount"},"value":{"kind":"IntValue","value":"200"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"broadcasts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}},{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"150"}}]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ScheduleQuery, ScheduleQueryVariables>;
export const SearchSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesListInputV2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seriesListV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchSeriesQuery, SearchSeriesQueryVariables>;
export const GetSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSeriesQuery, GetSeriesQueryVariables>;
export const SearchShowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchShows"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ShowListInputV2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showsV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}}]}}]}}]}}]} as unknown as DocumentNode<SearchShowsQuery, SearchShowsQueryVariables>;
export const GetShowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"show"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"totalEpisodes"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetShowQuery, GetShowQueryVariables>;
export const SearchTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackListInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tracks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"album"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isrc"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"dateModified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<SearchTracksQuery, SearchTracksQueryVariables>;
export const SearchTracksV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchTracksV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackListInputV2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tracksV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"album"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isrc"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"dateModified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<SearchTracksV2Query, SearchTracksV2QueryVariables>;
export const GetTrackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTrack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"album"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isrc"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"dateModified"}}]}}]}}]} as unknown as DocumentNode<GetTrackQuery, GetTrackQueryVariables>;
export const SearchYouTubeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SearchYouTube"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchYouTube"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<SearchYouTubeMutation, SearchYouTubeMutationVariables>;
export const BulkSearchYouTubeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkSearchYouTube"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkSearchYouTubeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkSearchYouTube"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"query"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalQueries"}},{"kind":"Field","name":{"kind":"Name","value":"successfulQueries"}},{"kind":"Field","name":{"kind":"Name","value":"failedQueries"}}]}}]}}]} as unknown as DocumentNode<BulkSearchYouTubeMutation, BulkSearchYouTubeMutationVariables>;
export const SearchMusicBrainzDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SearchMusicBrainz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artist"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchMusicBrainz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artist"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artist"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}}]}}]} as unknown as DocumentNode<SearchMusicBrainzMutation, SearchMusicBrainzMutationVariables>;
export const BulkSearchMusicBrainzDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkSearchMusicBrainz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkSearchMusicBrainzInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkSearchMusicBrainz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"album"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalSearches"}},{"kind":"Field","name":{"kind":"Name","value":"successfulSearches"}},{"kind":"Field","name":{"kind":"Name","value":"failedSearches"}}]}}]}}]} as unknown as DocumentNode<BulkSearchMusicBrainzMutation, BulkSearchMusicBrainzMutationVariables>;