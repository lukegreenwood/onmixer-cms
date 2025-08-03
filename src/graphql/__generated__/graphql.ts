/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  /** Date custom scalar type that expects a YYYY-MM-DD string */
  Date: { input: string; output: string; }
  /** DateTime custom scalar type that expects an ISO 8601 string */
  DateTime: { input: string; output: string; }
  /** DayOfWeek custom scalar type that expects a valid day of the week */
  DayOfWeek: { input: string; output: string; }
  JSON: { input: any; output: any; }
  /** Time custom scalar type that expects an HH:MM:SS string */
  Time: { input: any; output: any; }
  Upload: { input: File; output: File; }
};

export type AcoustidFingerprintResult = {
  __typename?: 'AcoustidFingerprintResult';
  duration?: Maybe<Scalars['Int']['output']>;
  errorMessage?: Maybe<Scalars['String']['output']>;
  fingerprint?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ActionOutput = {
  __typename?: 'ActionOutput';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdBreakClockItem = ClockItemInterface & {
  __typename?: 'AdBreakClockItem';
  clockId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Int']['output'];
  scheduledStartTime: Scalars['Time']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AddMusicPlaylistItemInput = {
  duration: Scalars['Int']['input'];
  itemType: PlaylistItemType;
  notes?: InputMaybe<Scalars['String']['input']>;
  orderIndex: Scalars['Int']['input'];
  playlistId: Scalars['ID']['input'];
  trackId?: InputMaybe<Scalars['ID']['input']>;
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

export type AssignClockToTemplateInput = {
  clockId: Scalars['ID']['input'];
  dayOfWeek: Scalars['Int']['input'];
  hour: Scalars['Int']['input'];
  templateId: Scalars['ID']['input'];
};

export type AssignDefaultScheduleToNetworkInput = {
  days: Array<Scalars['DayOfWeek']['input']>;
  defaultScheduleId: Scalars['ID']['input'];
  networkId: Scalars['ID']['input'];
};

export type AssignMusicClockInput = {
  clockId: Scalars['ID']['input'];
  dayOfWeek?: InputMaybe<Scalars['DayOfWeek']['input']>;
  hour: Scalars['Int']['input'];
  templateId: Scalars['ID']['input'];
};

export type Block = {
  __typename?: 'Block';
  config: Scalars['JSON']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  network: Network;
  networkId: Scalars['ID']['output'];
  page: Page;
  pageId: Scalars['ID']['output'];
  shortId: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
  type: BlockType;
  updatedAt: Scalars['DateTime']['output'];
};

export type BlockMutationOutput = {
  __typename?: 'BlockMutationOutput';
  block?: Maybe<Block>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum BlockType {
  FeaturedEpisodes = 'FEATURED_EPISODES',
  FeaturedShows = 'FEATURED_SHOWS',
  Image = 'IMAGE',
  ListenToNext = 'LISTEN_TO_NEXT',
  RecentArticles = 'RECENT_ARTICLES',
  RichContent = 'RICH_CONTENT'
}

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

export type BulkDeleteDefaultScheduleItemsInput = {
  ids: Array<Scalars['ID']['input']>;
};

export type BulkDeleteDefaultScheduleItemsOutput = {
  __typename?: 'BulkDeleteDefaultScheduleItemsOutput';
  deletedIds: Array<Scalars['ID']['output']>;
  failedItems: Array<BulkDeleteFailedItem>;
  failureCount: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
  successCount: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
};

export type BulkDeleteFailedItem = {
  __typename?: 'BulkDeleteFailedItem';
  error: Scalars['String']['output'];
  id: Scalars['ID']['output'];
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

export type BulkUpsertDefaultScheduleItemInput = {
  defaultSchedule: Scalars['ID']['input'];
  end: Scalars['String']['input'];
  endsNextDay: Scalars['Boolean']['input'];
  episodeDesc?: InputMaybe<Scalars['String']['input']>;
  episodeName?: InputMaybe<Scalars['String']['input']>;
  existingEpisode?: InputMaybe<Scalars['ID']['input']>;
  featuredImage?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  media?: InputMaybe<Scalars['ID']['input']>;
  networks?: InputMaybe<Array<Scalars['ID']['input']>>;
  presenters?: InputMaybe<Array<Scalars['ID']['input']>>;
  repeatOf?: InputMaybe<Scalars['ID']['input']>;
  series?: InputMaybe<Scalars['ID']['input']>;
  show: Scalars['ID']['input'];
  start: Scalars['String']['input'];
};

export type BulkUpsertDefaultScheduleItemsInput = {
  items: Array<BulkUpsertDefaultScheduleItemInput>;
};

export type BulkUpsertDefaultScheduleItemsOutput = {
  __typename?: 'BulkUpsertDefaultScheduleItemsOutput';
  createdCount: Scalars['Int']['output'];
  failedItems: Array<BulkUpsertFailedItem>;
  failureCount: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
  successCount: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  updatedCount: Scalars['Int']['output'];
  upsertedItems: Array<DefaultScheduleItem>;
};

export type BulkUpsertFailedItem = {
  __typename?: 'BulkUpsertFailedItem';
  error: Scalars['String']['output'];
  id?: Maybe<Scalars['ID']['output']>;
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

export type ClockItemInterface = {
  clockId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CommandClockItem = ClockItemInterface & {
  __typename?: 'CommandClockItem';
  clockId: Scalars['ID']['output'];
  command: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateBlockInput = {
  config: Scalars['JSON']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  networkId: Scalars['ID']['input'];
  pageId: Scalars['ID']['input'];
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  type: BlockType;
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

export type CreateGenreInput = {
  name: Scalars['String']['input'];
};

export type CreateMediaInput = {
  type: MediaType;
};

export type CreateMusicClockInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  items: Array<MusicClockItemInput>;
  name: Scalars['String']['input'];
  networkId: Scalars['ID']['input'];
  targetRuntime?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateMusicClockLibraryItemInput = {
  command?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Int']['input'];
  itemType: MusicClockLibraryItemType;
  label?: InputMaybe<Scalars['String']['input']>;
  networkId: Scalars['ID']['input'];
  scheduledStartTime?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMusicClockTemplateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  networkId: Scalars['ID']['input'];
};

export type CreateMusicRuleInput = {
  breakable: RuleBreakable;
  criteria: MusicRuleCriteriaInput;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  networkId?: InputMaybe<Scalars['ID']['input']>;
  priority: Scalars['Int']['input'];
  ruleType: RuleType;
  unit: RuleUnit;
  value: Scalars['Int']['input'];
};

export type CreateNetworkInput = {
  baseUrl: Scalars['String']['input'];
  code: Scalars['String']['input'];
  imagesUrl: Scalars['String']['input'];
  logoSvg: Scalars['String']['input'];
  logoSvgCircular?: InputMaybe<Scalars['String']['input']>;
  logoSvgColor?: InputMaybe<Scalars['String']['input']>;
  logoSvgIcon: Scalars['String']['input'];
  name: Scalars['String']['input'];
  networkType?: InputMaybe<NetworkType>;
  tagline?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePageInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  networkId: Scalars['ID']['input'];
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
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

export type CreateTrackInput = {
  album?: InputMaybe<Scalars['String']['input']>;
  artist: Scalars['String']['input'];
  composer?: InputMaybe<Scalars['String']['input']>;
  copyright?: InputMaybe<Scalars['String']['input']>;
  duration: Scalars['Int']['input'];
  genre?: InputMaybe<Scalars['String']['input']>;
  isrc?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  path: Scalars['String']['input'];
  publisher?: InputMaybe<Scalars['String']['input']>;
  subCategoryId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  year?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTrackOutput = {
  __typename?: 'CreateTrackOutput';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  track?: Maybe<Track>;
};

export type CreateWeeklyOverrideInput = {
  clockId?: InputMaybe<Scalars['ID']['input']>;
  dayOfWeek: Scalars['Int']['input'];
  hour: Scalars['Int']['input'];
  networkId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
  templateId: Scalars['ID']['input'];
  weekCommencing: Scalars['String']['input'];
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

export type DeleteBlockInput = {
  id: Scalars['ID']['input'];
};

export type DeleteDefaultScheduleInput = {
  id: Scalars['ID']['input'];
};

export type DeleteDefaultScheduleItemInput = {
  id: Scalars['ID']['input'];
};

export type DeleteEpisodeInput = {
  id: Scalars['ID']['input'];
};

export type DeleteGenreInput = {
  id: Scalars['ID']['input'];
};

export type DeleteMediaInput = {
  id: Scalars['ID']['input'];
};

export type DeleteMediaObjectInput = {
  id: Scalars['ID']['input'];
};

export type DeleteMutationOutput = {
  __typename?: 'DeleteMutationOutput';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type DeleteNetworkInput = {
  id: Scalars['ID']['input'];
};

export type DeletePageInput = {
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

export type DeleteTrackInput = {
  id: Scalars['ID']['input'];
};

export type DeleteTrackOutput = {
  __typename?: 'DeleteTrackOutput';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
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

export enum ExportFormat {
  Csv = 'CSV',
  Json = 'JSON',
  M3U = 'M3U',
  Radiodj = 'RADIODJ'
}

export type ExportMusicPlaylistsInput = {
  endDate: Scalars['Date']['input'];
  format: ExportFormat;
  networkId: Scalars['ID']['input'];
  options?: InputMaybe<ExportOptions>;
  startDate: Scalars['Date']['input'];
};

export type ExportOptions = {
  includeMetadata: Scalars['Boolean']['input'];
  includeNotes: Scalars['Boolean']['input'];
  includeTiming: Scalars['Boolean']['input'];
};

export type ExportOutput = {
  __typename?: 'ExportOutput';
  downloadUrl?: Maybe<Scalars['String']['output']>;
  fileSize?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type FeaturedEpisodesConfigInput = {
  episode_ids: Array<Scalars['Int']['input']>;
};

export type FeaturedShowsConfigInput = {
  show_ids: Array<Scalars['Int']['input']>;
};

export enum FilterType {
  Contains = 'CONTAINS',
  Equal = 'EQUAL',
  List = 'LIST',
  NotEqual = 'NOT_EQUAL'
}

export type GenerateAcoustidFingerprintInput = {
  filePath: Scalars['String']['input'];
};

export type Genre = {
  __typename?: 'Genre';
  averageDuration?: Maybe<TrackDuration>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tracks: Array<Track>;
};

export type GenreClockItem = ClockItemInterface & {
  __typename?: 'GenreClockItem';
  clockId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  genre: Genre;
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GenreFilterGroup = {
  filters?: InputMaybe<Array<GenreFilterInput>>;
  groups?: InputMaybe<Array<GenreFilterGroup>>;
  operator: OperatorType;
};

export type GenreFilterInput = {
  multiOptionFilter?: InputMaybe<GenreMultiOptionFilter>;
  optionFilter?: InputMaybe<GenreOptionFilter>;
  textFilter?: InputMaybe<GenreTextFilter>;
  type: GenreFilterType;
};

export enum GenreFilterType {
  MultiOption = 'MULTI_OPTION',
  Option = 'OPTION',
  Text = 'TEXT'
}

export type GenreList = ItemList & {
  __typename?: 'GenreList';
  items: Array<Genre>;
  total: Scalars['Int']['output'];
};

export type GenreListInputV2 = {
  filterGroup?: InputMaybe<GenreFilterGroup>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<GenreOrder>>;
};

export type GenreMultiOptionFilter = {
  field: GenreMultiOptionFilterField;
  operator: MultiOptionFilterOperator;
  values: Array<Scalars['ID']['input']>;
};

export enum GenreMultiOptionFilterField {
  Tracks = 'tracks'
}

export type GenreMutationOutput = {
  __typename?: 'GenreMutationOutput';
  genre?: Maybe<Genre>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type GenreOptionFilter = {
  field: GenreOptionFilterField;
  operator: OptionFilterOperator;
  value?: InputMaybe<Scalars['String']['input']>;
  values?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum GenreOptionFilterField {
  Id = 'id'
}

export type GenreOrder = {
  direction: OrderDirection;
  field: GenreOrderField;
};

export enum GenreOrderField {
  CreatedAt = 'createdAt',
  Id = 'id',
  Name = 'name',
  UpdatedAt = 'updatedAt'
}

export type GenreTextFilter = {
  field: GenreTextFilterField;
  operator: TextFilterOperator;
  value: Scalars['String']['input'];
};

export enum GenreTextFilterField {
  Name = 'name'
}

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

export type ImageConfigInput = {
  alt_text: Scalars['String']['input'];
  caption?: InputMaybe<Scalars['String']['input']>;
  image_id: Scalars['Int']['input'];
};

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

export type JobMutationOutput = {
  __typename?: 'JobMutationOutput';
  job: Job;
};

export enum JobPriority {
  High = 'HIGH',
  Low = 'LOW',
  Normal = 'NORMAL',
  Urgent = 'URGENT'
}

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
  Enrichment = 'ENRICHMENT',
  MusicScheduling = 'MUSIC_SCHEDULING'
}

export type LibraryAdBreakClockItem = ClockItemInterface & {
  __typename?: 'LibraryAdBreakClockItem';
  adBreak: MusicClockLibraryAdBreak;
  clockId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LibraryCommandClockItem = ClockItemInterface & {
  __typename?: 'LibraryCommandClockItem';
  clockId: Scalars['ID']['output'];
  command: MusicClockLibraryCommand;
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LibraryNoteClockItem = ClockItemInterface & {
  __typename?: 'LibraryNoteClockItem';
  clockId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  note: MusicClockLibraryNote;
  orderIndex: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum ListType {
  Ordered = 'ORDERED',
  Unordered = 'UNORDERED'
}

export type ListenToNextConfigInput = {
  placeholder: Scalars['String']['input'];
};

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

export type MetadataInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export enum MultiOptionFilterOperator {
  Exclude = 'EXCLUDE',
  ExcludeIfAllOf = 'EXCLUDE_IF_ALL_OF',
  ExcludeIfAnyOf = 'EXCLUDE_IF_ANY_OF',
  Include = 'INCLUDE',
  IncludeAllOf = 'INCLUDE_ALL_OF',
  IncludeAnyOf = 'INCLUDE_ANY_OF'
}

export type MusicAssignmentFilters = {
  dayOfWeek?: InputMaybe<Scalars['DayOfWeek']['input']>;
  hour?: InputMaybe<Scalars['Int']['input']>;
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MusicAssignmentMutationOutput = {
  __typename?: 'MusicAssignmentMutationOutput';
  assignment?: Maybe<MusicClockAssignment>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type MusicBrainzArtistCredit = {
  __typename?: 'MusicBrainzArtistCredit';
  id?: Maybe<Scalars['String']['output']>;
  joinPhrase?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  sortName?: Maybe<Scalars['String']['output']>;
};

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

export type MusicBrainzMetadataField = {
  __typename?: 'MusicBrainzMetadataField';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type MusicBrainzReleaseResult = {
  __typename?: 'MusicBrainzReleaseResult';
  album: Scalars['String']['output'];
  albumArtistSortOrder?: Maybe<Scalars['String']['output']>;
  barcode?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['String']['output']>;
  discNumber?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  media?: Maybe<Scalars['String']['output']>;
  originalDate?: Maybe<Scalars['String']['output']>;
  releaseArtistId?: Maybe<Scalars['String']['output']>;
  releaseGroupId?: Maybe<Scalars['String']['output']>;
  releaseId: Scalars['String']['output'];
  releaseStatus?: Maybe<Scalars['String']['output']>;
  releaseType?: Maybe<Scalars['String']['output']>;
  score: Scalars['Float']['output'];
  totalDiscs?: Maybe<Scalars['Int']['output']>;
  totalTracks?: Maybe<Scalars['Int']['output']>;
  trackId?: Maybe<Scalars['String']['output']>;
  trackNumber?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type MusicBrainzSearchInput = {
  album?: InputMaybe<Scalars['String']['input']>;
  artist?: InputMaybe<Scalars['String']['input']>;
  barcode?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  includeSecondaryTypes?: InputMaybe<Scalars['Boolean']['input']>;
  isrc?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  preferSingles?: InputMaybe<Scalars['Boolean']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  releaseStatus?: InputMaybe<Scalars['String']['input']>;
  releaseType?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type MusicBrainzSearchQuery = {
  __typename?: 'MusicBrainzSearchQuery';
  album?: Maybe<Scalars['String']['output']>;
  artist: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type MusicBrainzSearchResult = {
  __typename?: 'MusicBrainzSearchResult';
  artist: Scalars['String']['output'];
  artistId?: Maybe<Scalars['String']['output']>;
  artistSortOrder?: Maybe<Scalars['String']['output']>;
  artists: Array<MusicBrainzArtistCredit>;
  dynamicFields: Array<MusicBrainzMetadataField>;
  id: Scalars['String']['output'];
  isrc?: Maybe<Scalars['String']['output']>;
  length?: Maybe<Scalars['Int']['output']>;
  recordingId: Scalars['String']['output'];
  releases: Array<MusicBrainzReleaseResult>;
  score: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type MusicClock = {
  __typename?: 'MusicClock';
  color: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  items: Array<MusicClockItem>;
  name: Scalars['String']['output'];
  network: Network;
  targetRuntime: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MusicClockAssignment = {
  __typename?: 'MusicClockAssignment';
  clock: MusicClock;
  clockId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  dayOfWeek?: Maybe<Scalars['DayOfWeek']['output']>;
  endDate?: Maybe<Scalars['Date']['output']>;
  hour: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isTemplate: Scalars['Boolean']['output'];
  network: Network;
  networkId: Scalars['ID']['output'];
  priority: Scalars['Int']['output'];
  startDate?: Maybe<Scalars['Date']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type MusicClockFilters = {
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MusicClockItem = AdBreakClockItem | CommandClockItem | GenreClockItem | LibraryAdBreakClockItem | LibraryCommandClockItem | LibraryNoteClockItem | NoteClockItem | SubcategoryClockItem | TrackClockItem;

export type MusicClockItemInput = {
  command?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  itemId?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  orderIndex: Scalars['Int']['input'];
  scheduledStartTime?: InputMaybe<Scalars['Time']['input']>;
  type: MusicClockItemType;
};

export type MusicClockItemLibraryList = {
  __typename?: 'MusicClockItemLibraryList';
  items: Array<MusicClockLibraryItem>;
  total: Scalars['Int']['output'];
};

export type MusicClockItemMutationOutput = {
  __typename?: 'MusicClockItemMutationOutput';
  item?: Maybe<MusicClockItem>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum MusicClockItemType {
  AdBreak = 'AD_BREAK',
  Command = 'COMMAND',
  Genre = 'GENRE',
  LibraryAdBreak = 'LIBRARY_AD_BREAK',
  LibraryCommand = 'LIBRARY_COMMAND',
  LibraryNote = 'LIBRARY_NOTE',
  Note = 'NOTE',
  Subcategory = 'SUBCATEGORY',
  Track = 'TRACK'
}

export type MusicClockLibraryAdBreak = MusicClockLibraryItemInterface & {
  __typename?: 'MusicClockLibraryAdBreak';
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  network: Network;
  scheduledStartTime: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MusicClockLibraryCommand = MusicClockLibraryItemInterface & {
  __typename?: 'MusicClockLibraryCommand';
  command: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  network: Network;
  updatedAt: Scalars['DateTime']['output'];
};

export type MusicClockLibraryItem = MusicClockLibraryAdBreak | MusicClockLibraryCommand | MusicClockLibraryNote;

export type MusicClockLibraryItemInterface = {
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  network: Network;
  updatedAt: Scalars['DateTime']['output'];
};

export type MusicClockLibraryItemMutationOutput = {
  __typename?: 'MusicClockLibraryItemMutationOutput';
  item?: Maybe<MusicClockLibraryItem>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum MusicClockLibraryItemType {
  AdBreak = 'AD_BREAK',
  Command = 'COMMAND',
  Note = 'NOTE'
}

export type MusicClockLibraryNote = MusicClockLibraryItemInterface & {
  __typename?: 'MusicClockLibraryNote';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  network: Network;
  updatedAt: Scalars['DateTime']['output'];
};

export type MusicClockMutationOutput = {
  __typename?: 'MusicClockMutationOutput';
  clock?: Maybe<MusicClock>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type MusicClockTemplate = {
  __typename?: 'MusicClockTemplate';
  id: Scalars['ID']['output'];
};

export type MusicClockTemplateAssignment = {
  __typename?: 'MusicClockTemplateAssignment';
  id: Scalars['ID']['output'];
};

export type MusicClockTemplateAssignmentMutationOutput = {
  __typename?: 'MusicClockTemplateAssignmentMutationOutput';
  assignment?: Maybe<MusicClockTemplateAssignment>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type MusicClockTemplateMutationOutput = {
  __typename?: 'MusicClockTemplateMutationOutput';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  template?: Maybe<MusicClockTemplate>;
};

export type MusicClockWeeklyOverride = {
  __typename?: 'MusicClockWeeklyOverride';
  id: Scalars['ID']['output'];
};

export type MusicClockWeeklyOverrideMutationOutput = {
  __typename?: 'MusicClockWeeklyOverrideMutationOutput';
  message?: Maybe<Scalars['String']['output']>;
  override?: Maybe<MusicClockWeeklyOverride>;
  success: Scalars['Boolean']['output'];
};

export type MusicPlaylist = {
  __typename?: 'MusicPlaylist';
  clock: MusicClock;
  clockId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  estimatedDuration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  isLocked: Scalars['Boolean']['output'];
  items: Array<MusicPlaylistItem>;
  lastEditedAt?: Maybe<Scalars['DateTime']['output']>;
  lastEditedBy?: Maybe<Scalars['String']['output']>;
  network: Network;
  networkId: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  ruleViolations: Array<MusicRuleViolation>;
  scheduledAt?: Maybe<Scalars['DateTime']['output']>;
  scheduledDate: Scalars['Date']['output'];
  scheduledHour: Scalars['Int']['output'];
  shortId: Scalars['String']['output'];
  status: PlaylistStatus;
  totalDuration: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MusicPlaylistFilters = {
  endDate?: InputMaybe<Scalars['Date']['input']>;
  hour?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
  status?: InputMaybe<PlaylistStatus>;
};

export type MusicPlaylistItem = {
  __typename?: 'MusicPlaylistItem';
  actualDuration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  isManualEdit: Scalars['Boolean']['output'];
  itemType: PlaylistItemType;
  notes?: Maybe<Scalars['String']['output']>;
  orderIndex: Scalars['Int']['output'];
  playlistId: Scalars['ID']['output'];
  ruleViolations: Array<MusicRuleViolation>;
  scheduledEnd: Scalars['DateTime']['output'];
  scheduledStart: Scalars['DateTime']['output'];
  sourceClockItem: MusicClockItem;
  sourceClockItemId: Scalars['ID']['output'];
  track?: Maybe<Track>;
  trackId?: Maybe<Scalars['ID']['output']>;
};

export type MusicPlaylistItemMutationOutput = {
  __typename?: 'MusicPlaylistItemMutationOutput';
  item?: Maybe<MusicPlaylistItem>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type MusicPlaylistMutationOutput = {
  __typename?: 'MusicPlaylistMutationOutput';
  message?: Maybe<Scalars['String']['output']>;
  playlist?: Maybe<MusicPlaylist>;
  success: Scalars['Boolean']['output'];
};

export type MusicRule = {
  __typename?: 'MusicRule';
  breakable: RuleBreakable;
  createdAt: Scalars['DateTime']['output'];
  criteria: MusicRuleCriteria;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  network?: Maybe<Network>;
  networkId?: Maybe<Scalars['ID']['output']>;
  priority: Scalars['Int']['output'];
  ruleType: RuleType;
  unit: RuleUnit;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['Int']['output'];
};

export type MusicRuleCriteria = {
  __typename?: 'MusicRuleCriteria';
  artists?: Maybe<Array<Scalars['String']['output']>>;
  categories?: Maybe<Array<Scalars['ID']['output']>>;
  customFields?: Maybe<Scalars['JSON']['output']>;
  genres?: Maybe<Array<Scalars['ID']['output']>>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  timeWindows?: Maybe<Array<MusicTimeWindow>>;
};

export type MusicRuleCriteriaInput = {
  artists?: InputMaybe<Array<Scalars['String']['input']>>;
  categories?: InputMaybe<Array<Scalars['ID']['input']>>;
  customFields?: InputMaybe<Scalars['JSON']['input']>;
  genres?: InputMaybe<Array<Scalars['ID']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  timeWindows?: InputMaybe<Array<MusicTimeWindowInput>>;
};

export type MusicRuleFilters = {
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  ruleType?: InputMaybe<RuleType>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type MusicRuleMutationOutput = {
  __typename?: 'MusicRuleMutationOutput';
  message?: Maybe<Scalars['String']['output']>;
  rule?: Maybe<MusicRule>;
  success: Scalars['Boolean']['output'];
};

export type MusicRuleViolation = {
  __typename?: 'MusicRuleViolation';
  affectedItemId: Scalars['ID']['output'];
  autoFixAvailable: Scalars['Boolean']['output'];
  conflictingItemId?: Maybe<Scalars['ID']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  rule: MusicRule;
  ruleId: Scalars['ID']['output'];
  severity: RuleViolationSeverity;
  suggestedFix?: Maybe<Scalars['String']['output']>;
};

export enum MusicRuleViolationResolution {
  ApplyException = 'APPLY_EXCEPTION',
  BreakRule = 'BREAK_RULE',
  Ignore = 'IGNORE',
  ReplaceTrack = 'REPLACE_TRACK'
}

export type MusicSchedule = {
  __typename?: 'MusicSchedule';
  clock: MusicClock;
  clockId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  exportedToRadioDj: Scalars['Boolean']['output'];
  hour: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  items: Array<MusicScheduleItem>;
  network: Network;
  networkId: Scalars['ID']['output'];
  playlistName?: Maybe<Scalars['String']['output']>;
  ruleViolations: Array<RuleViolation>;
  scheduledDate: Scalars['Date']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type MusicScheduleItem = {
  __typename?: 'MusicScheduleItem';
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  itemType: ScheduleItemType;
  noteContent?: Maybe<Scalars['String']['output']>;
  orderIndex: Scalars['Int']['output'];
  ruleViolations: Array<RuleViolation>;
  schedule: MusicSchedule;
  scheduleId: Scalars['ID']['output'];
  startTime: Scalars['Int']['output'];
  track?: Maybe<Track>;
  trackId?: Maybe<Scalars['ID']['output']>;
};

export type MusicSchedulingOptions = {
  dryRun: Scalars['Boolean']['input'];
  priority: JobPriority;
  regenerateExisting: Scalars['Boolean']['input'];
  respectLocks: Scalars['Boolean']['input'];
};

export type MusicTimeWindow = {
  __typename?: 'MusicTimeWindow';
  daysOfWeek?: Maybe<Array<Scalars['DayOfWeek']['output']>>;
  endHour: Scalars['Int']['output'];
  startHour: Scalars['Int']['output'];
};

export type MusicTimeWindowInput = {
  daysOfWeek?: InputMaybe<Array<Scalars['DayOfWeek']['input']>>;
  endHour: Scalars['Int']['input'];
  startHour: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMusicPlaylistItem: MusicPlaylistItemMutationOutput;
  addTracksToRadioDJPlaylist: RadioDjPlaylistActionOutput;
  applyAssignedDefaultSchedule: ActionOutput;
  applyDefaultSchedule: ActionOutput;
  assignClockToTemplate: MusicClockTemplateAssignmentMutationOutput;
  assignDefaultScheduleToNetwork: ActionOutput;
  assignMusicClock: MusicAssignmentMutationOutput;
  bulkDeleteDefaultScheduleItems: BulkDeleteDefaultScheduleItemsOutput;
  bulkSearchMusicBrainz: BulkSearchMusicBrainzResponse;
  bulkSearchYouTube: BulkSearchYouTubeResponse;
  bulkUpsertDefaultScheduleItems: BulkUpsertDefaultScheduleItemsOutput;
  cancelJob: Scalars['Boolean']['output'];
  cancelMusicSchedulingJob: ActionOutput;
  createBlock: BlockMutationOutput;
  createBulkDownloadJobs: BulkDownloadJobsResponse;
  createDefaultSchedule: DefaultScheduleMutationOutput;
  createDefaultScheduleItem: DefaultScheduleItemMutationOutput;
  createDownloadJob: Job;
  createEnrichmentJob: Job;
  createEpisode: EpisodeMutationOutput;
  createGenre: GenreMutationOutput;
  createMusicClock: MusicClockMutationOutput;
  createMusicClockLibraryItem: MusicClockLibraryItemMutationOutput;
  createMusicClockTemplate: MusicClockTemplateMutationOutput;
  createMusicRule: MusicRuleMutationOutput;
  createNetwork: NetworkMutationOutput;
  createPage: PageMutationOutput;
  createPresenter: PresenterMutationOutput;
  createRadioDJPlaylist: RadioDjPlaylistMutationOutput;
  createScheduleItem: ScheduleItemMutationOutput;
  createSeries: SeriesMutationOutput;
  createShow: ShowMutationOutput;
  createTrack: CreateTrackOutput;
  createWeeklyOverride: MusicClockWeeklyOverrideMutationOutput;
  deleteBlock: ActionOutput;
  deleteDefaultSchedule: ActionOutput;
  deleteDefaultScheduleItem: ActionOutput;
  deleteEpisode: ActionOutput;
  deleteGenre: ActionOutput;
  deleteMedia: ActionOutput;
  deleteMediaObject: ActionOutput;
  deleteMusicClock: ActionOutput;
  deleteMusicClockLibraryItem: DeleteMutationOutput;
  deleteMusicClockTemplate: ActionOutput;
  deleteMusicRule: ActionOutput;
  deleteNetwork: ActionOutput;
  deletePage: ActionOutput;
  deletePresenter: ActionOutput;
  deleteScheduleItem: ActionOutput;
  deleteSeries: ActionOutput;
  deleteShow: ActionOutput;
  deleteTrack: DeleteTrackOutput;
  duplicateDefaultSchedule: DefaultScheduleMutationOutput;
  duplicateMusicClock: MusicClockMutationOutput;
  duplicateMusicPlaylist: MusicPlaylistMutationOutput;
  enrichPendingJob: Job;
  exportMusicPlaylists: ExportOutput;
  generateAcoustidFingerprint: AcoustidFingerprintResult;
  lockMusicPlaylist: ActionOutput;
  removeClockFromTemplate: ActionOutput;
  removeMusicAssignment: ActionOutput;
  removeMusicPlaylistItem: ActionOutput;
  removeWeeklyOverride: ActionOutput;
  reorderMusicPlaylistItems: ActionOutput;
  replaceTrackInMusicPlaylist: MusicPlaylistItemMutationOutput;
  resolveMusicRuleViolation: ActionOutput;
  retryJob: Job;
  searchAcoustid: Array<Scalars['String']['output']>;
  searchMusicBrainzByAcoustid?: Maybe<MusicBrainzSearchResult>;
  searchYouTube: Array<YouTubeSearchResult>;
  setDefaultMusicClockTemplate: ActionOutput;
  startMusicSchedulingJob: JobMutationOutput;
  unassignDefaultScheduleFromNetwork: ActionOutput;
  unlockMusicPlaylist: ActionOutput;
  updateBlock: BlockMutationOutput;
  updateDefaultSchedule: DefaultScheduleMutationOutput;
  updateDefaultScheduleItem: DefaultScheduleItemMutationOutput;
  updateEpisode: EpisodeMutationOutput;
  updateGenre: GenreMutationOutput;
  updateJobStatus: Job;
  updateMedia: MediaMutationOutput;
  updateMusicAssignment: MusicAssignmentMutationOutput;
  updateMusicClock: MusicClockMutationOutput;
  updateMusicClockItem: MusicClockItemMutationOutput;
  updateMusicClockLibraryItem: MusicClockLibraryItemMutationOutput;
  updateMusicClockTemplate: MusicClockTemplateMutationOutput;
  updateMusicPlaylist: MusicPlaylistMutationOutput;
  updateMusicPlaylistItem: MusicPlaylistItemMutationOutput;
  updateMusicPlaylistStatus: MusicPlaylistMutationOutput;
  updateMusicRule: MusicRuleMutationOutput;
  updateNetwork: NetworkMutationOutput;
  updatePage: PageMutationOutput;
  updatePresenter: PresenterMutationOutput;
  updateScheduleItem: ScheduleItemMutationOutput;
  updateSeries: SeriesMutationOutput;
  updateShow: ShowMutationOutput;
  updateTrack: UpdateTrackOutput;
  updateTrackMetadata: UpdateTrackMetadataOutput;
  updateWeeklyOverride: MusicClockWeeklyOverrideMutationOutput;
};


export type MutationAddMusicPlaylistItemArgs = {
  input: AddMusicPlaylistItemInput;
};


export type MutationAddTracksToRadioDjPlaylistArgs = {
  items: Array<RadioDjPlaylistItemInput>;
  playlistId: Scalars['Int']['input'];
};


export type MutationApplyAssignedDefaultScheduleArgs = {
  input: ApplyAssignedDefaultScheduleInput;
};


export type MutationApplyDefaultScheduleArgs = {
  input: ApplyDefaultScheduleInput;
};


export type MutationAssignClockToTemplateArgs = {
  input: AssignClockToTemplateInput;
};


export type MutationAssignDefaultScheduleToNetworkArgs = {
  input: AssignDefaultScheduleToNetworkInput;
};


export type MutationAssignMusicClockArgs = {
  input: AssignMusicClockInput;
};


export type MutationBulkDeleteDefaultScheduleItemsArgs = {
  input: BulkDeleteDefaultScheduleItemsInput;
};


export type MutationBulkSearchMusicBrainzArgs = {
  input: BulkSearchMusicBrainzInput;
};


export type MutationBulkSearchYouTubeArgs = {
  input: BulkSearchYouTubeInput;
};


export type MutationBulkUpsertDefaultScheduleItemsArgs = {
  input: BulkUpsertDefaultScheduleItemsInput;
};


export type MutationCancelJobArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCancelMusicSchedulingJobArgs = {
  jobId: Scalars['ID']['input'];
};


export type MutationCreateBlockArgs = {
  input: CreateBlockInput;
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


export type MutationCreateGenreArgs = {
  input: CreateGenreInput;
};


export type MutationCreateMusicClockArgs = {
  input: CreateMusicClockInput;
};


export type MutationCreateMusicClockLibraryItemArgs = {
  input: CreateMusicClockLibraryItemInput;
};


export type MutationCreateMusicClockTemplateArgs = {
  input: CreateMusicClockTemplateInput;
};


export type MutationCreateMusicRuleArgs = {
  input: CreateMusicRuleInput;
};


export type MutationCreateNetworkArgs = {
  input: CreateNetworkInput;
};


export type MutationCreatePageArgs = {
  input: CreatePageInput;
};


export type MutationCreatePresenterArgs = {
  input: CreatePresenterInput;
};


export type MutationCreateRadioDjPlaylistArgs = {
  name: Scalars['String']['input'];
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


export type MutationCreateTrackArgs = {
  input: CreateTrackInput;
};


export type MutationCreateWeeklyOverrideArgs = {
  input: CreateWeeklyOverrideInput;
};


export type MutationDeleteBlockArgs = {
  input: DeleteBlockInput;
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


export type MutationDeleteGenreArgs = {
  input: DeleteGenreInput;
};


export type MutationDeleteMediaArgs = {
  input: DeleteMediaInput;
};


export type MutationDeleteMediaObjectArgs = {
  input: DeleteMediaObjectInput;
};


export type MutationDeleteMusicClockArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMusicClockLibraryItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMusicClockTemplateArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMusicRuleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNetworkArgs = {
  input: DeleteNetworkInput;
};


export type MutationDeletePageArgs = {
  input: DeletePageInput;
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


export type MutationDeleteTrackArgs = {
  input: DeleteTrackInput;
};


export type MutationDuplicateDefaultScheduleArgs = {
  input: DuplicateDefaultScheduleInput;
};


export type MutationDuplicateMusicClockArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDuplicateMusicPlaylistArgs = {
  id: Scalars['ID']['input'];
  targetDate: Scalars['Date']['input'];
  targetHour: Scalars['Int']['input'];
};


export type MutationEnrichPendingJobArgs = {
  input: EnrichPendingJobInput;
};


export type MutationExportMusicPlaylistsArgs = {
  input: ExportMusicPlaylistsInput;
};


export type MutationGenerateAcoustidFingerprintArgs = {
  input: GenerateAcoustidFingerprintInput;
};


export type MutationLockMusicPlaylistArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveClockFromTemplateArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveMusicAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveMusicPlaylistItemArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveWeeklyOverrideArgs = {
  id: Scalars['ID']['input'];
};


export type MutationReorderMusicPlaylistItemsArgs = {
  itemIds: Array<Scalars['ID']['input']>;
  playlistId: Scalars['ID']['input'];
};


export type MutationReplaceTrackInMusicPlaylistArgs = {
  newTrackId: Scalars['ID']['input'];
  playlistItemId: Scalars['ID']['input'];
};


export type MutationResolveMusicRuleViolationArgs = {
  resolution: MusicRuleViolationResolution;
  violationId: Scalars['ID']['input'];
};


export type MutationRetryJobArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSearchAcoustidArgs = {
  input: SearchAcoustidInput;
};


export type MutationSearchMusicBrainzByAcoustidArgs = {
  input: SearchMusicBrainzByAcoustidInput;
};


export type MutationSearchYouTubeArgs = {
  query: Scalars['String']['input'];
};


export type MutationSetDefaultMusicClockTemplateArgs = {
  networkId: Scalars['ID']['input'];
  templateId: Scalars['ID']['input'];
};


export type MutationStartMusicSchedulingJobArgs = {
  input: StartMusicSchedulingJobInput;
};


export type MutationUnassignDefaultScheduleFromNetworkArgs = {
  input: UnassignDefaultScheduleFromNetworkInput;
};


export type MutationUnlockMusicPlaylistArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBlockArgs = {
  input: UpdateBlockInput;
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


export type MutationUpdateGenreArgs = {
  input: UpdateGenreInput;
};


export type MutationUpdateJobStatusArgs = {
  input: UpdateJobStatusInput;
};


export type MutationUpdateMediaArgs = {
  input: UpdateMediaInput;
};


export type MutationUpdateMusicAssignmentArgs = {
  input: UpdateMusicAssignmentInput;
};


export type MutationUpdateMusicClockArgs = {
  input: UpdateMusicClockInput;
};


export type MutationUpdateMusicClockItemArgs = {
  input: UpdateMusicClockItemInput;
};


export type MutationUpdateMusicClockLibraryItemArgs = {
  input: UpdateMusicClockLibraryItemInput;
};


export type MutationUpdateMusicClockTemplateArgs = {
  input: UpdateMusicClockTemplateInput;
};


export type MutationUpdateMusicPlaylistArgs = {
  input: UpdateMusicPlaylistInput;
};


export type MutationUpdateMusicPlaylistItemArgs = {
  input: UpdateMusicPlaylistItemInput;
};


export type MutationUpdateMusicPlaylistStatusArgs = {
  id: Scalars['ID']['input'];
  radioDjPlaylistId?: InputMaybe<Scalars['Int']['input']>;
  status: PlaylistStatus;
};


export type MutationUpdateMusicRuleArgs = {
  input: UpdateMusicRuleInput;
};


export type MutationUpdateNetworkArgs = {
  input: UpdateNetworkInput;
};


export type MutationUpdatePageArgs = {
  input: UpdatePageInput;
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


export type MutationUpdateTrackArgs = {
  input: UpdateTrackInput;
};


export type MutationUpdateTrackMetadataArgs = {
  input: UpdateTrackMetadataInput;
};


export type MutationUpdateWeeklyOverrideArgs = {
  input: UpdateWeeklyOverrideInput;
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
  shortId: Scalars['String']['output'];
  tagline?: Maybe<Scalars['String']['output']>;
};

export type NetworkMutationOutput = {
  __typename?: 'NetworkMutationOutput';
  message?: Maybe<Scalars['String']['output']>;
  network?: Maybe<Network>;
  success: Scalars['Boolean']['output'];
};

export enum NetworkType {
  Internal = 'INTERNAL',
  Playlist = 'PLAYLIST',
  Station = 'STATION',
  Stream = 'STREAM'
}

export type NoteClockItem = ClockItemInterface & {
  __typename?: 'NoteClockItem';
  clockId: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  orderIndex: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

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

export type Page = {
  __typename?: 'Page';
  blocks: Array<Block>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  metaData?: Maybe<Scalars['JSON']['output']>;
  network: Network;
  networkId: Scalars['ID']['output'];
  shortId: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type PageMutationOutput = {
  __typename?: 'PageMutationOutput';
  message?: Maybe<Scalars['String']['output']>;
  page?: Maybe<Page>;
  success: Scalars['Boolean']['output'];
};

export enum PlaylistItemType {
  AdBreak = 'AD_BREAK',
  LiveSegment = 'LIVE_SEGMENT',
  Note = 'NOTE',
  StationIdent = 'STATION_IDENT',
  Track = 'TRACK'
}

export enum PlaylistStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Draft = 'DRAFT',
  Live = 'LIVE',
  Scheduled = 'SCHEDULED'
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
  block?: Maybe<Block>;
  blocks: Array<Block>;
  categories: Array<Category>;
  category?: Maybe<Category>;
  debug?: Maybe<Debug>;
  defaultSchedule?: Maybe<DefaultSchedule>;
  defaultSchedules: DefaultScheduleList;
  episode?: Maybe<Episode>;
  episodes: EpisodeList;
  episodesV2: EpisodeList;
  genres: Array<Genre>;
  genresV2: GenreList;
  globalMusicRules: Array<MusicRule>;
  history: HistoryList;
  job?: Maybe<Job>;
  jobs: Array<Job>;
  /** ID or key of the media object */
  media: Media;
  mediaList: MediaList;
  musicClock?: Maybe<MusicClock>;
  musicClockAssignment?: Maybe<MusicClockAssignment>;
  musicClockAssignments: Array<MusicClockAssignment>;
  musicClockItemLibrary: MusicClockItemLibraryList;
  musicClockWeeklyOverrides: Array<MusicClockWeeklyOverride>;
  musicClocks: Array<MusicClock>;
  musicPlaylist?: Maybe<MusicPlaylist>;
  musicPlaylists: Array<MusicPlaylist>;
  musicRule?: Maybe<MusicRule>;
  musicRuleViolations: Array<MusicRuleViolation>;
  musicRules: Array<MusicRule>;
  musicSchedule?: Maybe<MusicSchedule>;
  musicSchedules: Array<MusicSchedule>;
  musicbrainzRecording?: Maybe<MusicBrainzSearchResult>;
  network: Network;
  networks: Array<Network>;
  /** Get the current on air programme for a network */
  onairProgramme?: Maybe<ScheduleItem>;
  page?: Maybe<Page>;
  pages: Array<Page>;
  playlistForHour?: Maybe<MusicPlaylist>;
  presenter?: Maybe<Presenter>;
  presenters: PresenterList;
  presentersV2: PresenterList;
  schedule: ScheduleList;
  scheduleForHour?: Maybe<MusicSchedule>;
  schedulePreview: Array<SchedulePreviewHour>;
  /** Get the scheduled programme for a network at a specific date and time */
  scheduledProgramme?: Maybe<ScheduleItem>;
  searchMusicBrainz: Array<MusicBrainzSearchResult>;
  series: Series;
  seriesList: SeriesList;
  seriesListV2: SeriesList;
  show?: Maybe<Show>;
  shows: ShowList;
  showsV2: ShowList;
  subcategories: Array<Subcategory>;
  subcategory?: Maybe<Subcategory>;
  track?: Maybe<Track>;
  trackSuggestions: Array<TrackSuggestion>;
  tracks: TrackList;
  tracksV2: TrackList;
};


export type QueryBlockArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBlocksArgs = {
  networkId: Scalars['ID']['input'];
  pageId: Scalars['ID']['input'];
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


export type QueryGenresV2Args = {
  filters?: InputMaybe<GenreListInputV2>;
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


export type QueryMusicClockArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMusicClockAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMusicClockAssignmentsArgs = {
  filters?: InputMaybe<MusicAssignmentFilters>;
  networkId: Scalars['ID']['input'];
};


export type QueryMusicClockItemLibraryArgs = {
  networkId: Scalars['ID']['input'];
  type?: InputMaybe<MusicClockLibraryItemType>;
};


export type QueryMusicClockWeeklyOverridesArgs = {
  networkId: Scalars['ID']['input'];
  templateId?: InputMaybe<Scalars['ID']['input']>;
  weekCommencing?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMusicClocksArgs = {
  filters?: InputMaybe<MusicClockFilters>;
  networkId: Scalars['ID']['input'];
};


export type QueryMusicPlaylistArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMusicPlaylistsArgs = {
  filters: MusicPlaylistFilters;
  networkId: Scalars['ID']['input'];
};


export type QueryMusicRuleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMusicRuleViolationsArgs = {
  playlistId: Scalars['ID']['input'];
};


export type QueryMusicRulesArgs = {
  filters?: InputMaybe<MusicRuleFilters>;
  networkId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryMusicScheduleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMusicSchedulesArgs = {
  endDate: Scalars['Date']['input'];
  networkId: Scalars['ID']['input'];
  startDate: Scalars['Date']['input'];
};


export type QueryMusicbrainzRecordingArgs = {
  id: Scalars['String']['input'];
};


export type QueryNetworkArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOnairProgrammeArgs = {
  networkId: Scalars['ID']['input'];
};


export type QueryPageArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPagesArgs = {
  networkId: Scalars['ID']['input'];
};


export type QueryPlaylistForHourArgs = {
  date: Scalars['Date']['input'];
  hour: Scalars['Int']['input'];
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


export type QueryScheduleForHourArgs = {
  date: Scalars['Date']['input'];
  hour: Scalars['Int']['input'];
  networkId: Scalars['ID']['input'];
};


export type QuerySchedulePreviewArgs = {
  endDate: Scalars['Date']['input'];
  networkId: Scalars['ID']['input'];
  startDate: Scalars['Date']['input'];
};


export type QueryScheduledProgrammeArgs = {
  dateTime: Scalars['DateTime']['input'];
  networkId: Scalars['ID']['input'];
};


export type QuerySearchMusicBrainzArgs = {
  input: MusicBrainzSearchInput;
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


export type QueryTrackSuggestionsArgs = {
  filters?: InputMaybe<TrackSuggestionFilters>;
  playlistItemId: Scalars['ID']['input'];
};


export type QueryTracksArgs = {
  filters?: InputMaybe<TrackListInput>;
};


export type QueryTracksV2Args = {
  filters?: InputMaybe<TrackListInputV2>;
};

export type RadioDjPlaylist = {
  __typename?: 'RadioDJPlaylist';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type RadioDjPlaylistActionOutput = {
  __typename?: 'RadioDJPlaylistActionOutput';
  itemsAdded?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type RadioDjPlaylistItemInput = {
  cend: Scalars['Float']['input'];
  cnext: Scalars['Float']['input'];
  cstart: Scalars['Float']['input'];
  fin: Scalars['Float']['input'];
  fout: Scalars['Float']['input'];
  ord: Scalars['Int']['input'];
  pID: Scalars['Int']['input'];
  sID: Scalars['Int']['input'];
  swID: Scalars['Int']['input'];
  swfirst: Scalars['String']['input'];
  swplay: Scalars['Float']['input'];
  vtID: Scalars['Int']['input'];
  vtplay: Scalars['Float']['input'];
};

export type RadioDjPlaylistMutationOutput = {
  __typename?: 'RadioDJPlaylistMutationOutput';
  id?: Maybe<Scalars['Int']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type RecentArticlesConfigInput = {
  filters: RecentArticlesFilterInput;
  limit: Scalars['Int']['input'];
};

export type RecentArticlesFilterInput = {
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  manual_selection?: InputMaybe<Array<Scalars['Int']['input']>>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
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

export type RichContentConfigInput = {
  elements: Array<RichContentElementInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type RichContentElement = {
  __typename?: 'RichContentElement';
  altText?: Maybe<Scalars['String']['output']>;
  author?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  imageId?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<Scalars['String']['output']>>;
  level?: Maybe<Scalars['Int']['output']>;
  listType?: Maybe<ListType>;
  type: RichContentElementType;
};

export type RichContentElementInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  author?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  imageId?: InputMaybe<Scalars['Int']['input']>;
  items?: InputMaybe<Array<Scalars['String']['input']>>;
  level?: InputMaybe<Scalars['Int']['input']>;
  listType?: InputMaybe<ListType>;
  type: RichContentElementType;
};

export enum RichContentElementType {
  Divider = 'DIVIDER',
  Heading = 'HEADING',
  Image = 'IMAGE',
  List = 'LIST',
  Paragraph = 'PARAGRAPH',
  Quote = 'QUOTE'
}

export enum RuleBreakable {
  Breakable = 'BREAKABLE',
  Unbreakable = 'UNBREAKABLE',
  Warning = 'WARNING'
}

export type RuleCompliance = {
  __typename?: 'RuleCompliance';
  compliant: Scalars['Boolean']['output'];
  details?: Maybe<Scalars['String']['output']>;
  rule: MusicRule;
};

export enum RuleType {
  AudioItemSeparation = 'AUDIO_ITEM_SEPARATION',
  CustomFieldAdjacent = 'CUSTOM_FIELD_ADJACENT',
  CustomFieldFlow = 'CUSTOM_FIELD_FLOW',
  DaypartRotation = 'DAYPART_ROTATION',
  GenreAdjacent = 'GENRE_ADJACENT',
  GenreFlow = 'GENRE_FLOW',
  HourRotation = 'HOUR_ROTATION',
  PrimaryArtistSeparation = 'PRIMARY_ARTIST_SEPARATION',
  RelatedArtistSeparation = 'RELATED_ARTIST_SEPARATION',
  SecondaryArtistSeparation = 'SECONDARY_ARTIST_SEPARATION',
  TagAdjacent = 'TAG_ADJACENT',
  TagFlow = 'TAG_FLOW',
  TempoAdjacent = 'TEMPO_ADJACENT',
  TempoFlow = 'TEMPO_FLOW',
  TitleSeparation = 'TITLE_SEPARATION',
  VocalGenderAdjacent = 'VOCAL_GENDER_ADJACENT',
  YesterdaySameHour = 'YESTERDAY_SAME_HOUR'
}

export enum RuleUnit {
  Days = 'DAYS',
  Hours = 'HOURS',
  Minutes = 'MINUTES',
  Plays = 'PLAYS',
  Tracks = 'TRACKS'
}

export type RuleViolation = {
  __typename?: 'RuleViolation';
  conflictTime?: Maybe<Scalars['String']['output']>;
  conflictTrackId?: Maybe<Scalars['ID']['output']>;
  description: Scalars['String']['output'];
  ruleId: Scalars['ID']['output'];
  ruleName: Scalars['String']['output'];
  ruleType: Scalars['String']['output'];
  severity: RuleBreakable;
};

export enum RuleViolationSeverity {
  Critical = 'CRITICAL',
  Info = 'INFO',
  Warning = 'WARNING'
}

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

export enum ScheduleItemType {
  Note = 'NOTE',
  Track = 'TRACK'
}

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

export type SchedulePreviewHour = {
  __typename?: 'SchedulePreviewHour';
  clock?: Maybe<MusicClock>;
  clockId?: Maybe<Scalars['ID']['output']>;
  date: Scalars['Date']['output'];
  estimatedTracks?: Maybe<Scalars['Int']['output']>;
  hasPlaylist: Scalars['Boolean']['output'];
  hour: Scalars['Int']['output'];
  playlistStatus?: Maybe<PlaylistStatus>;
  potentialIssues: Array<Scalars['String']['output']>;
};

export type SearchAcoustidInput = {
  duration: Scalars['Int']['input'];
  fingerprint: Scalars['String']['input'];
};

export type SearchMusicBrainzByAcoustidInput = {
  recordingIds: Array<Scalars['String']['input']>;
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

export type StartMusicSchedulingJobInput = {
  endDate: Scalars['Date']['input'];
  networkId: Scalars['ID']['input'];
  options?: InputMaybe<MusicSchedulingOptions>;
  startDate: Scalars['Date']['input'];
};

export type Subcategory = {
  __typename?: 'Subcategory';
  averageDuration?: Maybe<TrackDuration>;
  category: Category;
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  tracks: Array<Track>;
};

export type SubcategoryClockItem = ClockItemInterface & {
  __typename?: 'SubcategoryClockItem';
  clockId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Int']['output'];
  subcategory: Subcategory;
  updatedAt: Scalars['DateTime']['output'];
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

export type TrackClockItem = ClockItemInterface & {
  __typename?: 'TrackClockItem';
  clockId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  duration: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Int']['output'];
  track: Track;
  updatedAt: Scalars['DateTime']['output'];
};

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

export type TrackSuggestion = {
  __typename?: 'TrackSuggestion';
  reason: Scalars['String']['output'];
  ruleCompliance: Array<RuleCompliance>;
  score: Scalars['Float']['output'];
  track: Track;
};

export type TrackSuggestionFilters = {
  categories?: InputMaybe<Array<Scalars['ID']['input']>>;
  genres?: InputMaybe<Array<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  maxYear?: InputMaybe<Scalars['Int']['input']>;
  minYear?: InputMaybe<Scalars['Int']['input']>;
};

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

export type UpdateBlockInput = {
  config?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<BlockType>;
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

export type UpdateGenreInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateJobStatusInput = {
  errorMessage?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  progress?: InputMaybe<Scalars['JSON']['input']>;
  songId?: InputMaybe<Scalars['Int']['input']>;
  status: JobStatus;
};

export type UpdateMediaInput = {
  fileSize?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  key?: InputMaybe<Scalars['String']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MediaType>;
};

export type UpdateMusicAssignmentInput = {
  clockId?: InputMaybe<Scalars['ID']['input']>;
  dayOfWeek?: InputMaybe<Scalars['DayOfWeek']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  hour?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type UpdateMusicClockInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  items?: InputMaybe<Array<MusicClockItemInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  targetRuntime?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateMusicClockItemInput = {
  command?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  itemId?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  orderIndex: Scalars['Int']['input'];
  scheduledStartTime?: InputMaybe<Scalars['String']['input']>;
  type: MusicClockItemType;
};

export type UpdateMusicClockLibraryItemInput = {
  command?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  scheduledStartTime?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMusicClockTemplateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMusicPlaylistInput = {
  id: Scalars['ID']['input'];
  isLocked?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMusicPlaylistItemInput = {
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['ID']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Int']['input']>;
  trackId?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateMusicRuleInput = {
  breakable?: InputMaybe<RuleBreakable>;
  criteria?: InputMaybe<MusicRuleCriteriaInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  ruleType?: InputMaybe<RuleType>;
  unit?: InputMaybe<RuleUnit>;
  value?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateNetworkInput = {
  baseUrl?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imagesUrl?: InputMaybe<Scalars['String']['input']>;
  logoSvg?: InputMaybe<Scalars['String']['input']>;
  logoSvgCircular?: InputMaybe<Scalars['String']['input']>;
  logoSvgColor?: InputMaybe<Scalars['String']['input']>;
  logoSvgIcon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  networkType?: InputMaybe<NetworkType>;
  tagline?: InputMaybe<Scalars['String']['input']>;
};

export type UpdatePageInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  metaData?: InputMaybe<Scalars['JSON']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type UpdateTrackInput = {
  album?: InputMaybe<Scalars['String']['input']>;
  artist?: InputMaybe<Scalars['String']['input']>;
  composer?: InputMaybe<Scalars['String']['input']>;
  copyright?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  genre?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  isrc?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  publisher?: InputMaybe<Scalars['String']['input']>;
  subCategory?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTrackMetadataInput = {
  metadata: Array<MetadataInput>;
  trackId: Scalars['ID']['input'];
};

export type UpdateTrackMetadataOutput = {
  __typename?: 'UpdateTrackMetadataOutput';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  track?: Maybe<Track>;
};

export type UpdateTrackOutput = {
  __typename?: 'UpdateTrackOutput';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  track?: Maybe<Track>;
};

export type UpdateWeeklyOverrideInput = {
  clockId?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
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

export type AssignDefaultScheduleToNetworkMutationVariables = Exact<{
  input: AssignDefaultScheduleToNetworkInput;
}>;


export type AssignDefaultScheduleToNetworkMutation = { __typename?: 'Mutation', assignDefaultScheduleToNetwork: { __typename?: 'ActionOutput', success: boolean, message?: string | null } };

export type AssignMusicClockMutationVariables = Exact<{
  input: AssignMusicClockInput;
}>;


export type AssignMusicClockMutation = { __typename?: 'Mutation', assignMusicClock: { __typename?: 'MusicAssignmentMutationOutput', assignment?: { __typename?: 'MusicClockAssignment', id: string, dayOfWeek?: string | null, hour: number, priority: number, isTemplate: boolean, clock: { __typename?: 'MusicClock', id: string, name: string, targetRuntime: number }, network: { __typename?: 'Network', id: string, name: string } } | null } };

export type StartMusicSchedulingJobMutationVariables = Exact<{
  input: StartMusicSchedulingJobInput;
}>;


export type StartMusicSchedulingJobMutation = { __typename?: 'Mutation', startMusicSchedulingJob: { __typename?: 'JobMutationOutput', job: { __typename?: 'Job', id: string, status: JobStatus, type: JobType, progress?: any | null, createdAt: string } } };

export type BulkDeleteDefaultScheduleItemsMutationVariables = Exact<{
  input: BulkDeleteDefaultScheduleItemsInput;
}>;


export type BulkDeleteDefaultScheduleItemsMutation = { __typename?: 'Mutation', bulkDeleteDefaultScheduleItems: { __typename?: 'BulkDeleteDefaultScheduleItemsOutput', success: boolean, successCount: number, failureCount: number, totalItems: number, deletedIds: Array<string>, failedItems: Array<{ __typename?: 'BulkDeleteFailedItem', id: string, error: string }> } };

export type BulkUpsertDefaultScheduleItemsMutationVariables = Exact<{
  input: BulkUpsertDefaultScheduleItemsInput;
}>;


export type BulkUpsertDefaultScheduleItemsMutation = { __typename?: 'Mutation', bulkUpsertDefaultScheduleItems: { __typename?: 'BulkUpsertDefaultScheduleItemsOutput', success: boolean, successCount: number, failureCount: number, totalItems: number, upsertedItems: Array<{ __typename?: 'DefaultScheduleItem', id: string, start: string, end: string, endsNextDay: boolean, episodeName?: string | null, episodeDesc?: string | null, show: { __typename?: 'Show', id: string, shortName: string }, series?: { __typename?: 'Series', id: string, shortName: string } | null, presenters?: Array<{ __typename?: 'Presenter', id: string, name: string }> | null, networks?: Array<{ __typename?: 'Network', id: string, name: string }> | null, existingEpisode?: { __typename?: 'Episode', id: string, name: string } | null, repeatOf?: { __typename?: 'DefaultScheduleItem', id: string } | null }>, failedItems: Array<{ __typename?: 'BulkUpsertFailedItem', id?: string | null, error: string }> } };

export type CreateEpisodeMutationVariables = Exact<{
  input: CreateEpisodeInput;
}>;


export type CreateEpisodeMutation = { __typename?: 'Mutation', createEpisode: { __typename?: 'EpisodeMutationOutput', episode: { __typename?: 'Episode', id: string, name: string, description: string, extraData?: string | null, shortId: string, createdAt: string, updatedAt: string, url: string, duration: { __typename?: 'EpisodeDuration', formatted: string, raw: number }, featuredImage: { __typename?: 'Media', id: string, key: string, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, show: { __typename?: 'Show', id: string, shortName: string, fullName: string }, series?: { __typename?: 'Series', id: string, fullName: string } | null, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }> } } };

export type CreateGenreMutationVariables = Exact<{
  input: CreateGenreInput;
}>;


export type CreateGenreMutation = { __typename?: 'Mutation', createGenre: { __typename?: 'GenreMutationOutput', success: boolean, message?: string | null, genre?: { __typename?: 'Genre', id: string, name: string } | null } };

export type CreateMusicClockMutationVariables = Exact<{
  input: CreateMusicClockInput;
}>;


export type CreateMusicClockMutation = { __typename?: 'Mutation', createMusicClock: { __typename?: 'MusicClockMutationOutput', success: boolean, message?: string | null, clock?: { __typename?: 'MusicClock', id: string, name: string, description?: string | null, color: string, targetRuntime: number, network: { __typename?: 'Network', id: string, name: string }, items: Array<{ __typename?: 'AdBreakClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, scheduledStartTime: any } | { __typename?: 'CommandClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, command: string } | { __typename?: 'GenreClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, genre: { __typename?: 'Genre', id: string, name: string } } | { __typename?: 'LibraryAdBreakClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, adBreak: { __typename?: 'MusicClockLibraryAdBreak', id: string, duration: number, scheduledStartTime: string } } | { __typename?: 'LibraryCommandClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, libraryCommand: { __typename?: 'MusicClockLibraryCommand', id: string, duration: number, command: string } } | { __typename?: 'LibraryNoteClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, note: { __typename?: 'MusicClockLibraryNote', id: string, duration: number, label: string, content: string } } | { __typename?: 'NoteClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, label?: string | null, content: string } | { __typename?: 'SubcategoryClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, subcategory: { __typename?: 'Subcategory', id: string, name: string, category: { __typename?: 'Category', id: string, name: string } } } | { __typename?: 'TrackClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, track: { __typename?: 'Track', id: string, title: string } }> } | null } };

export type CreateMusicRuleMutationVariables = Exact<{
  input: CreateMusicRuleInput;
}>;


export type CreateMusicRuleMutation = { __typename?: 'Mutation', createMusicRule: { __typename?: 'MusicRuleMutationOutput', success: boolean, message?: string | null, rule?: { __typename?: 'MusicRule', id: string, name: string, description?: string | null, ruleType: RuleType, breakable: RuleBreakable, value: number, unit: RuleUnit, priority: number, isActive: boolean, criteria: { __typename?: 'MusicRuleCriteria', categories?: Array<string> | null, genres?: Array<string> | null, artists?: Array<string> | null, tags?: Array<string> | null, timeWindows?: Array<{ __typename?: 'MusicTimeWindow', startHour: number, endHour: number, daysOfWeek?: Array<string> | null }> | null }, network?: { __typename?: 'Network', id: string, name: string } | null } | null } };

export type CreateNetworkMutationVariables = Exact<{
  input: CreateNetworkInput;
}>;


export type CreateNetworkMutation = { __typename?: 'Mutation', createNetwork: { __typename?: 'NetworkMutationOutput', success: boolean, message?: string | null, network?: { __typename?: 'Network', id: string, name: string, code: string, baseUrl: string, imagesUrl: string, logoSvg: string, logoSvgCircular?: string | null, logoSvgColor?: string | null, logoSvgIcon: string, networkType: NetworkType, tagline?: string | null, cssUrl?: string | null, playFormat?: string | null, playUrl?: string | null, shortId: string } | null } };

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


export type CreateScheduleTemplateMutation = { __typename?: 'Mutation', createDefaultSchedule: { __typename?: 'DefaultScheduleMutationOutput', defaultSchedule: { __typename?: 'DefaultSchedule', id: string, name: string, assignedTo?: Array<string> | null, networks: Array<{ __typename?: 'Network', id: string, name: string, code: string }> } } };

export type CreateSeriesMutationVariables = Exact<{
  input: CreateSeriesInput;
}>;


export type CreateSeriesMutation = { __typename?: 'Mutation', createSeries: { __typename?: 'SeriesMutationOutput', series: { __typename?: 'Series', id: string, fullName: string, shortName: string, fullDesc: string, shortDesc: string, archived: boolean, featuredImage: { __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, show: { __typename?: 'Show', id: string, shortName: string, fullName: string }, network: { __typename?: 'Network', id: string, name: string } } } };

export type CreateShowMutationVariables = Exact<{
  input: CreateShowInput;
}>;


export type CreateShowMutation = { __typename?: 'Mutation', createShow: { __typename?: 'ShowMutationOutput', show: { __typename?: 'Show', id: string, fullName: string, shortName: string, fullDesc: string, shortDesc: string, hidden: boolean, extraData?: string | null, totalEpisodes: number, createdAt: string, updatedAt: string, url: string, featuredImage: { __typename?: 'Media', id: string, key: string, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }>, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, series: { __typename?: 'SeriesList', items: Array<{ __typename?: 'Series', id: string, fullName: string }> } } } };

export type DeleteWeeklyOverrideMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteWeeklyOverrideMutation = { __typename?: 'Mutation', removeWeeklyOverride: { __typename?: 'ActionOutput', success: boolean, message?: string | null } };

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

export type DeleteTrackMutationVariables = Exact<{
  input: DeleteTrackInput;
}>;


export type DeleteTrackMutation = { __typename?: 'Mutation', deleteTrack: { __typename?: 'DeleteTrackOutput', success: boolean, message?: string | null } };

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


export type DuplicateScheduleTemplateMutation = { __typename?: 'Mutation', duplicateDefaultSchedule: { __typename?: 'DefaultScheduleMutationOutput', defaultSchedule: { __typename?: 'DefaultSchedule', id: string, name: string, assignedTo?: Array<string> | null, networks: Array<{ __typename?: 'Network', id: string, name: string, code: string }> } } };

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

export type CreateMusicClockLibraryItemMutationVariables = Exact<{
  input: CreateMusicClockLibraryItemInput;
}>;


export type CreateMusicClockLibraryItemMutation = { __typename?: 'Mutation', createMusicClockLibraryItem: { __typename?: 'MusicClockLibraryItemMutationOutput', success: boolean, message?: string | null, item?: { __typename?: 'MusicClockLibraryAdBreak', id: string, duration: number, createdAt: string, updatedAt: string, scheduledStartTime: string } | { __typename?: 'MusicClockLibraryCommand', id: string, duration: number, createdAt: string, updatedAt: string, command: string } | { __typename?: 'MusicClockLibraryNote', id: string, duration: number, createdAt: string, updatedAt: string, label: string, content: string } | null } };

export type UpdateMusicClockLibraryItemMutationVariables = Exact<{
  input: UpdateMusicClockLibraryItemInput;
}>;


export type UpdateMusicClockLibraryItemMutation = { __typename?: 'Mutation', updateMusicClockLibraryItem: { __typename?: 'MusicClockLibraryItemMutationOutput', success: boolean, message?: string | null, item?: { __typename?: 'MusicClockLibraryAdBreak', id: string, duration: number, createdAt: string, updatedAt: string, scheduledStartTime: string } | { __typename?: 'MusicClockLibraryCommand', id: string, duration: number, createdAt: string, updatedAt: string, command: string } | { __typename?: 'MusicClockLibraryNote', id: string, duration: number, createdAt: string, updatedAt: string, label: string, content: string } | null } };

export type DeleteMusicClockLibraryItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteMusicClockLibraryItemMutation = { __typename?: 'Mutation', deleteMusicClockLibraryItem: { __typename?: 'DeleteMutationOutput', success: boolean, message?: string | null } };

export type UpdateEpisodeMutationVariables = Exact<{
  input: UpdateEpisodeInput;
}>;


export type UpdateEpisodeMutation = { __typename?: 'Mutation', updateEpisode: { __typename?: 'EpisodeMutationOutput', episode: { __typename?: 'Episode', id: string, name: string, description: string, extraData?: string | null, shortId: string, createdAt: string, updatedAt: string, url: string, duration: { __typename?: 'EpisodeDuration', formatted: string, raw: number }, featuredImage: { __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, show: { __typename?: 'Show', id: string, shortName: string }, series?: { __typename?: 'Series', id: string, shortName: string } | null, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }> } } };

export type UpdateMusicClockMutationVariables = Exact<{
  input: UpdateMusicClockInput;
}>;


export type UpdateMusicClockMutation = { __typename?: 'Mutation', updateMusicClock: { __typename?: 'MusicClockMutationOutput', success: boolean, message?: string | null, clock?: { __typename?: 'MusicClock', id: string, name: string, description?: string | null, color: string, targetRuntime: number, network: { __typename?: 'Network', id: string, name: string }, items: Array<{ __typename?: 'AdBreakClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, scheduledStartTime: any } | { __typename?: 'CommandClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, command: string } | { __typename?: 'GenreClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, genre: { __typename?: 'Genre', id: string, name: string } } | { __typename?: 'LibraryAdBreakClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, adBreak: { __typename?: 'MusicClockLibraryAdBreak', id: string, duration: number, scheduledStartTime: string } } | { __typename?: 'LibraryCommandClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, libraryCommand: { __typename?: 'MusicClockLibraryCommand', id: string, duration: number, command: string } } | { __typename?: 'LibraryNoteClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, note: { __typename?: 'MusicClockLibraryNote', id: string, duration: number, label: string, content: string } } | { __typename?: 'NoteClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, label?: string | null, content: string } | { __typename?: 'SubcategoryClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, subcategory: { __typename?: 'Subcategory', id: string, name: string, category: { __typename?: 'Category', id: string, name: string } } } | { __typename?: 'TrackClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, track: { __typename?: 'Track', id: string, title: string } }> } | null } };

export type UpdateNetworkMutationVariables = Exact<{
  input: UpdateNetworkInput;
}>;


export type UpdateNetworkMutation = { __typename?: 'Mutation', updateNetwork: { __typename?: 'NetworkMutationOutput', success: boolean, message?: string | null, network?: { __typename?: 'Network', id: string, name: string, code: string, baseUrl: string, imagesUrl: string, logoSvg: string, logoSvgCircular?: string | null, logoSvgColor?: string | null, logoSvgIcon: string, networkType: NetworkType, tagline?: string | null, cssUrl?: string | null, playFormat?: string | null, playUrl?: string | null, shortId: string } | null } };

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


export type UpdateScheduleTemplateMutation = { __typename?: 'Mutation', updateDefaultSchedule: { __typename?: 'DefaultScheduleMutationOutput', defaultSchedule: { __typename?: 'DefaultSchedule', id: string, name: string, assignedTo?: Array<string> | null, networks: Array<{ __typename?: 'Network', id: string, name: string, code: string }> } } };

export type UpdateSeriesMutationVariables = Exact<{
  input: UpdateSeriesInput;
}>;


export type UpdateSeriesMutation = { __typename?: 'Mutation', updateSeries: { __typename?: 'SeriesMutationOutput', series: { __typename?: 'Series', id: string, fullName: string, shortName: string, fullDesc: string, shortDesc: string, archived: boolean, featuredImage: { __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, show: { __typename?: 'Show', id: string, shortName: string, fullName: string }, network: { __typename?: 'Network', id: string, name: string } } } };

export type UpdateShowMutationVariables = Exact<{
  input: UpdateShowInput;
}>;


export type UpdateShowMutation = { __typename?: 'Mutation', updateShow: { __typename?: 'ShowMutationOutput', show: { __typename?: 'Show', id: string, fullName: string, shortName: string, fullDesc: string, shortDesc: string, hidden: boolean, extraData?: string | null, totalEpisodes: number, createdAt: string, updatedAt: string, url: string, featuredImage: { __typename?: 'Media', id: string, key: string, type: MediaType, mimeType: string, fileSize?: { __typename?: 'MediaFileSize', label: string, raw: number } | null, urls: { __typename?: 'MediaUrls', medium: string, square: string } }, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }>, presenters: Array<{ __typename?: 'Presenter', id: string, name: string }>, series: { __typename?: 'SeriesList', items: Array<{ __typename?: 'Series', id: string, fullName: string }> } } } };

export type UpdateTemplateAssignmentMutationVariables = Exact<{
  input: UpdateMusicAssignmentInput;
}>;


export type UpdateTemplateAssignmentMutation = { __typename?: 'Mutation', updateMusicAssignment: { __typename?: 'MusicAssignmentMutationOutput', success: boolean, message?: string | null, assignment?: { __typename?: 'MusicClockAssignment', id: string, isTemplate: boolean, clockId: string, dayOfWeek?: string | null, hour: number, clock: { __typename?: 'MusicClock', id: string, name: string, color: string, targetRuntime: number } } | null } };

export type UpdateTrackMutationVariables = Exact<{
  input: UpdateTrackInput;
}>;


export type UpdateTrackMutation = { __typename?: 'Mutation', updateTrack: { __typename?: 'UpdateTrackOutput', success: boolean, message?: string | null, track?: { __typename?: 'Track', id: string, title: string, artist: string, album: string, year: string, isrc: string, label: string, copyright: string, composer: string, publisher: string, image: string, enabled: boolean, dateAdded?: string | null, dateModified?: string | null, genre?: { __typename?: 'Genre', id: string, name: string } | null, subcategory?: { __typename?: 'Subcategory', id: string, name: string, category: { __typename?: 'Category', id: string, name: string } } | null, metadata: Array<{ __typename?: 'TrackMetadata', id: string, key: string, value?: string | null }> } | null } };

export type UpdateTrackMetadataMutationVariables = Exact<{
  input: UpdateTrackMetadataInput;
}>;


export type UpdateTrackMetadataMutation = { __typename?: 'Mutation', updateTrackMetadata: { __typename?: 'UpdateTrackMetadataOutput', success: boolean, message?: string | null, track?: { __typename?: 'Track', id: string, metadata: Array<{ __typename?: 'TrackMetadata', id: string, key: string, value?: string | null }> } | null } };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, subcategories: Array<{ __typename?: 'Subcategory', id: string, name: string, color?: string | null, averageDuration?: { __typename?: 'TrackDuration', raw: number, formatted: string } | null }> }> };

export type DebugQueryVariables = Exact<{ [key: string]: never; }>;


export type DebugQuery = { __typename?: 'Query', debug?: { __typename?: 'Debug', id: string, status: string, randomShow: { __typename?: 'Show', id: string, shortName: string, episodes: { __typename?: 'EpisodeList', total: number } } } | null };

export type SearchDefaultScheduleQueryVariables = Exact<{
  filters: DefaultScheduleListInput;
}>;


export type SearchDefaultScheduleQuery = { __typename?: 'Query', defaultSchedules: { __typename?: 'DefaultScheduleList', total: number, items: Array<{ __typename?: 'DefaultSchedule', id: string, assignedTo?: Array<string> | null, name: string, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }>, items: Array<{ __typename?: 'DefaultScheduleItem', id: string, start: string, end: string, episodeName?: string | null, media?: { __typename?: 'Media', id: string, urls: { __typename?: 'MediaUrls', customSquare?: string | null } } | null, show: { __typename?: 'Show', id: string, shortName: string, featuredImage: { __typename?: 'Media', urls: { __typename?: 'MediaUrls', customSquare?: string | null } } } }> }> } };

export type GetDefaultSchedulesQueryVariables = Exact<{
  filters: DefaultScheduleListInput;
}>;


export type GetDefaultSchedulesQuery = { __typename?: 'Query', defaultSchedules: { __typename?: 'DefaultScheduleList', total: number, items: Array<{ __typename?: 'DefaultSchedule', id: string, name: string, assignedTo?: Array<string> | null, networks: Array<{ __typename?: 'Network', id: string, name: string, logoSvgIcon: string }>, items: Array<{ __typename?: 'DefaultScheduleItem', id: string, start: string, end: string, episodeName?: string | null, media?: { __typename?: 'Media', id: string, urls: { __typename?: 'MediaUrls', customSquare?: string | null } } | null, show: { __typename?: 'Show', id: string, shortName: string, featuredImage: { __typename?: 'Media', urls: { __typename?: 'MediaUrls', customSquare?: string | null } } } }> }> } };

export type GetDefaultScheduleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetDefaultScheduleQuery = { __typename?: 'Query', defaultSchedule?: { __typename?: 'DefaultSchedule', id: string, name: string, assignedTo?: Array<string> | null, networks: Array<{ __typename?: 'Network', id: string, name: string, code: string }>, items: Array<{ __typename?: 'DefaultScheduleItem', id: string, start: string, end: string, endsNextDay: boolean, episodeName?: string | null, episodeDesc?: string | null, show: { __typename?: 'Show', id: string, fullName: string, shortName: string, featuredImage: { __typename?: 'Media', urls: { __typename?: 'MediaUrls', customSquare?: string | null } } }, series?: { __typename?: 'Series', id: string, fullName: string, shortName: string } | null, presenters?: Array<{ __typename?: 'Presenter', id: string, name: string }> | null, media?: { __typename?: 'Media', id: string, key: string, urls: { __typename?: 'MediaUrls', medium: string, original: string } } | null, networks?: Array<{ __typename?: 'Network', id: string, name: string, code: string, logoSvgIcon: string }> | null, existingEpisode?: { __typename?: 'Episode', id: string, name: string, description: string } | null, repeatOf?: { __typename?: 'DefaultScheduleItem', id: string, episodeName?: string | null } | null }> } | null };

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

export type GetGenresQueryVariables = Exact<{
  filters?: InputMaybe<GenreListInputV2>;
}>;


export type GetGenresQuery = { __typename?: 'Query', genresV2: { __typename?: 'GenreList', items: Array<{ __typename?: 'Genre', id: string, name: string }> } };

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

export type GetMusicClockAssignmentsQueryVariables = Exact<{
  networkId: Scalars['ID']['input'];
  filters?: InputMaybe<MusicAssignmentFilters>;
}>;


export type GetMusicClockAssignmentsQuery = { __typename?: 'Query', musicClockAssignments: Array<{ __typename?: 'MusicClockAssignment', id: string, dayOfWeek?: string | null, hour: number, startDate?: string | null, endDate?: string | null, priority: number, isTemplate: boolean, createdAt: string, updatedAt: string, clock: { __typename?: 'MusicClock', id: string, name: string, targetRuntime: number }, network: { __typename?: 'Network', id: string, name: string } }> };

export type GetMusicPlaylistsQueryVariables = Exact<{
  networkId: Scalars['ID']['input'];
  filters: MusicPlaylistFilters;
}>;


export type GetMusicPlaylistsQuery = { __typename?: 'Query', musicPlaylists: Array<{ __typename?: 'MusicPlaylist', id: string, shortId: string, scheduledDate: string, scheduledHour: number, status: PlaylistStatus, totalDuration: number, estimatedDuration: number, isLocked: boolean, notes?: string | null, createdAt: string, updatedAt: string, clock: { __typename?: 'MusicClock', id: string, name: string }, items: Array<{ __typename?: 'MusicPlaylistItem', id: string, orderIndex: number, itemType: PlaylistItemType, scheduledStart: string, scheduledEnd: string, actualDuration?: number | null, isManualEdit: boolean, notes?: string | null, track?: { __typename?: 'Track', id: string, title: string, artist: string, duration: { __typename?: 'TrackDuration', formatted: string } } | null }>, ruleViolations: Array<{ __typename?: 'MusicRuleViolation', id: string, severity: RuleViolationSeverity, description: string, suggestedFix?: string | null, autoFixAvailable: boolean, rule: { __typename?: 'MusicRule', id: string, name: string, ruleType: RuleType } }>, network: { __typename?: 'Network', id: string, name: string } }> };

export type GetMusicClockItemLibraryQueryVariables = Exact<{
  networkId: Scalars['ID']['input'];
  type?: InputMaybe<MusicClockLibraryItemType>;
}>;


export type GetMusicClockItemLibraryQuery = { __typename?: 'Query', musicClockItemLibrary: { __typename?: 'MusicClockItemLibraryList', items: Array<{ __typename?: 'MusicClockLibraryAdBreak', id: string, duration: number, createdAt: string, updatedAt: string, scheduledStartTime: string } | { __typename?: 'MusicClockLibraryCommand', id: string, duration: number, createdAt: string, updatedAt: string, command: string } | { __typename?: 'MusicClockLibraryNote', id: string, duration: number, createdAt: string, updatedAt: string, label: string, content: string }> } };

export type GetMusicClocksQueryVariables = Exact<{
  networkId: Scalars['ID']['input'];
  filters?: InputMaybe<MusicClockFilters>;
}>;


export type GetMusicClocksQuery = { __typename?: 'Query', musicClocks: Array<{ __typename?: 'MusicClock', id: string, name: string, description?: string | null, color: string, targetRuntime: number, createdAt: string, updatedAt: string, network: { __typename?: 'Network', id: string, name: string, logoSvgIcon: string }, items: Array<{ __typename?: 'AdBreakClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string } | { __typename?: 'CommandClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string } | { __typename?: 'GenreClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string } | { __typename?: 'LibraryAdBreakClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string } | { __typename?: 'LibraryCommandClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string } | { __typename?: 'LibraryNoteClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string } | { __typename?: 'NoteClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string } | { __typename?: 'SubcategoryClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string } | { __typename?: 'TrackClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string }> }> };

export type GetMusicClockQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMusicClockQuery = { __typename?: 'Query', musicClock?: { __typename?: 'MusicClock', id: string, name: string, description?: string | null, color: string, targetRuntime: number, createdAt: string, updatedAt: string, network: { __typename?: 'Network', id: string, name: string }, items: Array<{ __typename?: 'AdBreakClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, scheduledStartTime: any } | { __typename?: 'CommandClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, command: string } | { __typename?: 'GenreClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, genre: { __typename?: 'Genre', id: string, name: string } } | { __typename?: 'LibraryAdBreakClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, adBreak: { __typename?: 'MusicClockLibraryAdBreak', id: string, duration: number, scheduledStartTime: string } } | { __typename?: 'LibraryCommandClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, libraryCommand: { __typename?: 'MusicClockLibraryCommand', id: string, duration: number, command: string } } | { __typename?: 'LibraryNoteClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, note: { __typename?: 'MusicClockLibraryNote', id: string, duration: number, label: string, content: string } } | { __typename?: 'NoteClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, label?: string | null, content: string } | { __typename?: 'SubcategoryClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, subcategory: { __typename?: 'Subcategory', id: string, name: string, color?: string | null, category: { __typename?: 'Category', id: string, name: string } } } | { __typename?: 'TrackClockItem', id: string, clockId: string, createdAt: string, duration: number, orderIndex: number, updatedAt: string, track: { __typename?: 'Track', id: string, title: string } }> } | null };

export type GetMusicRulesQueryVariables = Exact<{
  networkId?: InputMaybe<Scalars['ID']['input']>;
  filters?: InputMaybe<MusicRuleFilters>;
}>;


export type GetMusicRulesQuery = { __typename?: 'Query', musicRules: Array<{ __typename?: 'MusicRule', id: string, name: string, description?: string | null, ruleType: RuleType, breakable: RuleBreakable, value: number, unit: RuleUnit, priority: number, isActive: boolean, createdAt: string, updatedAt: string, criteria: { __typename?: 'MusicRuleCriteria', categories?: Array<string> | null, genres?: Array<string> | null, artists?: Array<string> | null, tags?: Array<string> | null, timeWindows?: Array<{ __typename?: 'MusicTimeWindow', startHour: number, endHour: number, daysOfWeek?: Array<string> | null }> | null }, network?: { __typename?: 'Network', id: string, name: string } | null }> };

export type GetMusicRuleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMusicRuleQuery = { __typename?: 'Query', musicRule?: { __typename?: 'MusicRule', id: string, name: string, description?: string | null, ruleType: RuleType, breakable: RuleBreakable, value: number, unit: RuleUnit, priority: number, isActive: boolean, createdAt: string, updatedAt: string, criteria: { __typename?: 'MusicRuleCriteria', categories?: Array<string> | null, genres?: Array<string> | null, artists?: Array<string> | null, tags?: Array<string> | null, timeWindows?: Array<{ __typename?: 'MusicTimeWindow', startHour: number, endHour: number, daysOfWeek?: Array<string> | null }> | null }, network?: { __typename?: 'Network', id: string, name: string } | null } | null };

export type GetNetworksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNetworksQuery = { __typename?: 'Query', networks: Array<{ __typename?: 'Network', id: string, name: string, code: string, baseUrl: string, imagesUrl: string, logoSvg: string, logoSvgCircular?: string | null, logoSvgColor?: string | null, logoSvgIcon: string, networkType: NetworkType, tagline?: string | null, cssUrl?: string | null, playFormat?: string | null, playUrl?: string | null, shortId: string }> };

export type GetNetworkQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetNetworkQuery = { __typename?: 'Query', network: { __typename?: 'Network', id: string, name: string, code: string, baseUrl: string, imagesUrl: string, logoSvg: string, logoSvgCircular?: string | null, logoSvgColor?: string | null, logoSvgIcon: string, networkType: NetworkType, tagline?: string | null, cssUrl?: string | null, playFormat?: string | null, playUrl?: string | null, shortId: string } };

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


export type SearchTracksV2Query = { __typename?: 'Query', tracksV2: { __typename?: 'TrackList', total: number, items: Array<{ __typename?: 'Track', id: string, artist: string, title: string, album: string, path: string, enabled: boolean, year: string, isrc: string, bpm: number, dateAdded?: string | null, dateModified?: string | null, duration: { __typename?: 'TrackDuration', formatted: string, raw: number }, genre?: { __typename?: 'Genre', id: string, name: string } | null, subcategory?: { __typename?: 'Subcategory', id: string, name: string, category: { __typename?: 'Category', id: string, name: string } } | null, metadata: Array<{ __typename?: 'TrackMetadata', id: string }> }> } };

export type GetTrackQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTrackQuery = { __typename?: 'Query', track?: { __typename?: 'Track', id: string, artist: string, title: string, album: string, path: string, enabled: boolean, year: string, isrc: string, bpm: number, dateAdded?: string | null, dateModified?: string | null, label: string, copyright: string, composer: string, publisher: string, image: string, duration: { __typename?: 'TrackDuration', formatted: string, raw: number }, genre?: { __typename?: 'Genre', id: string, name: string } | null, subcategory?: { __typename?: 'Subcategory', id: string, name: string, category: { __typename?: 'Category', id: string, name: string } } | null, metadata: Array<{ __typename?: 'TrackMetadata', id: string, key: string, value?: string | null }> } | null };

export type SearchYouTubeMutationVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchYouTubeMutation = { __typename?: 'Mutation', searchYouTube: Array<{ __typename?: 'YouTubeSearchResult', url: string, title: string, artist: string, duration: number, thumbnail?: string | null, description?: string | null }> };

export type BulkSearchYouTubeMutationVariables = Exact<{
  input: BulkSearchYouTubeInput;
}>;


export type BulkSearchYouTubeMutation = { __typename?: 'Mutation', bulkSearchYouTube: { __typename?: 'BulkSearchYouTubeResponse', success: boolean, message: string, totalQueries: number, successfulQueries: number, failedQueries: number, results: Array<{ __typename?: 'YouTubeBulkSearchResult', query: string, error?: string | null, results: Array<{ __typename?: 'YouTubeSearchResult', url: string, title: string, artist: string, duration: number, thumbnail?: string | null, description?: string | null }> }> } };

export type SearchMusicBrainzQueryVariables = Exact<{
  input: MusicBrainzSearchInput;
}>;


export type SearchMusicBrainzQuery = { __typename?: 'Query', searchMusicBrainz: Array<{ __typename?: 'MusicBrainzSearchResult', id: string, recordingId: string, title: string, artist: string, artistId?: string | null, artistSortOrder?: string | null, length?: number | null, isrc?: string | null, score: number, artists: Array<{ __typename?: 'MusicBrainzArtistCredit', id?: string | null, name: string, sortName?: string | null, joinPhrase?: string | null }>, releases: Array<{ __typename?: 'MusicBrainzReleaseResult', id: string, releaseId: string, releaseGroupId?: string | null, album: string, trackNumber?: number | null, totalTracks?: number | null, discNumber?: number | null, totalDiscs?: number | null, date?: string | null, originalDate?: string | null, year?: number | null, country?: string | null, releaseType?: string | null, releaseStatus?: string | null, barcode?: string | null, albumArtistSortOrder?: string | null, media?: string | null, label?: string | null, releaseArtistId?: string | null, trackId?: string | null, score: number }>, dynamicFields: Array<{ __typename?: 'MusicBrainzMetadataField', key: string, value: string }> }> };

export type BulkSearchMusicBrainzMutationVariables = Exact<{
  input: BulkSearchMusicBrainzInput;
}>;


export type BulkSearchMusicBrainzMutation = { __typename?: 'Mutation', bulkSearchMusicBrainz: { __typename?: 'BulkSearchMusicBrainzResponse', success: boolean, message: string, totalSearches: number, successfulSearches: number, failedSearches: number, results: Array<{ __typename?: 'MusicBrainzBulkSearchResult', id?: string | null, error?: string | null, query: { __typename?: 'MusicBrainzSearchQuery', artist: string, title: string, album?: string | null }, results: Array<{ __typename?: 'MusicBrainzSearchResult', id: string, title: string, artist: string, score: number }> }> } };


export const ApplyAssignedDefaultScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyAssignedDefaultSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"assignedTo"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DayOfWeek"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyAssignedDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"networkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"assignedTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"assignedTo"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ApplyAssignedDefaultScheduleMutation, ApplyAssignedDefaultScheduleMutationVariables>;
export const ApplyDefaultScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApplyDefaultSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"defaultScheduleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"applyDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"defaultSchedule"},"value":{"kind":"Variable","name":{"kind":"Name","value":"defaultScheduleId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<ApplyDefaultScheduleMutation, ApplyDefaultScheduleMutationVariables>;
export const AssignDefaultScheduleToNetworkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignDefaultScheduleToNetwork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignDefaultScheduleToNetworkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignDefaultScheduleToNetwork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<AssignDefaultScheduleToNetworkMutation, AssignDefaultScheduleToNetworkMutationVariables>;
export const AssignMusicClockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AssignMusicClock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AssignMusicClockInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignMusicClock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"assignment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"targetRuntime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"hour"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"isTemplate"}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AssignMusicClockMutation, AssignMusicClockMutationVariables>;
export const StartMusicSchedulingJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartMusicSchedulingJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StartMusicSchedulingJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startMusicSchedulingJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<StartMusicSchedulingJobMutation, StartMusicSchedulingJobMutationVariables>;
export const BulkDeleteDefaultScheduleItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkDeleteDefaultScheduleItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkDeleteDefaultScheduleItemsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkDeleteDefaultScheduleItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"successCount"}},{"kind":"Field","name":{"kind":"Name","value":"failureCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"deletedIds"}},{"kind":"Field","name":{"kind":"Name","value":"failedItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]}}]} as unknown as DocumentNode<BulkDeleteDefaultScheduleItemsMutation, BulkDeleteDefaultScheduleItemsMutationVariables>;
export const BulkUpsertDefaultScheduleItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkUpsertDefaultScheduleItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkUpsertDefaultScheduleItemsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkUpsertDefaultScheduleItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"successCount"}},{"kind":"Field","name":{"kind":"Name","value":"failureCount"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}},{"kind":"Field","name":{"kind":"Name","value":"upsertedItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"endsNextDay"}},{"kind":"Field","name":{"kind":"Name","value":"episodeName"}},{"kind":"Field","name":{"kind":"Name","value":"episodeDesc"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"existingEpisode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repeatOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"failedItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]}}]} as unknown as DocumentNode<BulkUpsertDefaultScheduleItemsMutation, BulkUpsertDefaultScheduleItemsMutationVariables>;
export const CreateEpisodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEpisode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEpisodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEpisode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateEpisodeMutation, CreateEpisodeMutationVariables>;
export const CreateGenreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGenre"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateGenreInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGenre"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateGenreMutation, CreateGenreMutationVariables>;
export const CreateMusicClockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMusicClock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMusicClockInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMusicClock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"clock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"targetRuntime"}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockItemInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clockId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TrackClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubcategoryClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subcategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GenreClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoteClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdBreakClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduledStartTime"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommandClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"command"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LibraryNoteClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"note"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LibraryAdBreakClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adBreak"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStartTime"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LibraryCommandClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"libraryCommand"},"name":{"kind":"Name","value":"command"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"command"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateMusicClockMutation, CreateMusicClockMutationVariables>;
export const CreateMusicRuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMusicRule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMusicRuleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMusicRule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"rule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ruleType"}},{"kind":"Field","name":{"kind":"Name","value":"breakable"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"criteria"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"artists"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"timeWindows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startHour"}},{"kind":"Field","name":{"kind":"Name","value":"endHour"}},{"kind":"Field","name":{"kind":"Name","value":"daysOfWeek"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateMusicRuleMutation, CreateMusicRuleMutationVariables>;
export const CreateNetworkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateNetwork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateNetworkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createNetwork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"baseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imagesUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvg"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgCircular"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgColor"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}},{"kind":"Field","name":{"kind":"Name","value":"networkType"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"cssUrl"}},{"kind":"Field","name":{"kind":"Name","value":"playFormat"}},{"kind":"Field","name":{"kind":"Name","value":"playUrl"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}}]}}]}}]}}]} as unknown as DocumentNode<CreateNetworkMutation, CreateNetworkMutationVariables>;
export const CreatePresenterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreatePresenter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreatePresenterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createPresenter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presenter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"shortBio"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"hero"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreatePresenterMutation, CreatePresenterMutationVariables>;
export const CreateScheduleItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateScheduleItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateScheduleItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createScheduleItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"broadcasts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}},{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"150"}}]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateScheduleItemMutation, CreateScheduleItemMutationVariables>;
export const CreateScheduleTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateScheduleTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateDefaultScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateScheduleTemplateMutation, CreateScheduleTemplateMutationVariables>;
export const CreateSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSeriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSeries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateSeriesMutation, CreateSeriesMutationVariables>;
export const CreateShowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateShow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateShowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createShow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalEpisodes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<CreateShowMutation, CreateShowMutationVariables>;
export const DeleteWeeklyOverrideDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWeeklyOverride"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeWeeklyOverride"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteWeeklyOverrideMutation, DeleteWeeklyOverrideMutationVariables>;
export const DeleteEpisodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEpisode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteEpisodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEpisode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteEpisodeMutation, DeleteEpisodeMutationVariables>;
export const DeleteMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteMediaInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMedia"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteMediaMutation, DeleteMediaMutationVariables>;
export const DeletePresenterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeletePresenter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeletePresenterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePresenter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeletePresenterMutation, DeletePresenterMutationVariables>;
export const DeleteScheduleItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteScheduleItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteScheduleItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteScheduleItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<DeleteScheduleItemMutation, DeleteScheduleItemMutationVariables>;
export const DeleteScheduleTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteScheduleTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteDefaultScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteScheduleTemplateMutation, DeleteScheduleTemplateMutationVariables>;
export const DeleteSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteSeriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSeries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteSeriesMutation, DeleteSeriesMutationVariables>;
export const DeleteShowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteShow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteShowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteShow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteShowMutation, DeleteShowMutationVariables>;
export const DeleteTrackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTrack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteTrackInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteTrackMutation, DeleteTrackMutationVariables>;
export const CreateDownloadJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateDownloadJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DownloadJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createDownloadJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"searchQuery"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateDownloadJobMutation, CreateDownloadJobMutationVariables>;
export const CreateBulkDownloadJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBulkDownloadJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkDownloadJobsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBulkDownloadJobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalJobs"}},{"kind":"Field","name":{"kind":"Name","value":"successfulJobs"}},{"kind":"Field","name":{"kind":"Name","value":"failedJobs"}}]}}]}}]} as unknown as DocumentNode<CreateBulkDownloadJobsMutation, CreateBulkDownloadJobsMutationVariables>;
export const CancelJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<CancelJobMutation, CancelJobMutationVariables>;
export const DuplicateScheduleTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DuplicateScheduleTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DuplicateDefaultScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duplicateDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DuplicateScheduleTemplateMutation, DuplicateScheduleTemplateMutationVariables>;
export const CreateEnrichmentJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEnrichmentJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EnrichmentJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEnrichmentJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateEnrichmentJobMutation, CreateEnrichmentJobMutationVariables>;
export const EnrichPendingJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EnrichPendingJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EnrichPendingJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enrichPendingJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<EnrichPendingJobMutation, EnrichPendingJobMutationVariables>;
export const RetryJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RetryJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"retryJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<RetryJobMutation, RetryJobMutationVariables>;
export const CreateMusicClockLibraryItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMusicClockLibraryItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMusicClockLibraryItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMusicClockLibraryItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryItemInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryAdBreak"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduledStartTime"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryCommand"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"command"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateMusicClockLibraryItemMutation, CreateMusicClockLibraryItemMutationVariables>;
export const UpdateMusicClockLibraryItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMusicClockLibraryItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMusicClockLibraryItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMusicClockLibraryItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"item"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryItemInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryAdBreak"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduledStartTime"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryCommand"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"command"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMusicClockLibraryItemMutation, UpdateMusicClockLibraryItemMutationVariables>;
export const DeleteMusicClockLibraryItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMusicClockLibraryItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMusicClockLibraryItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteMusicClockLibraryItemMutation, DeleteMusicClockLibraryItemMutationVariables>;
export const UpdateEpisodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEpisode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEpisodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEpisode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateEpisodeMutation, UpdateEpisodeMutationVariables>;
export const UpdateMusicClockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMusicClock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMusicClockInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMusicClock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"clock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"targetRuntime"}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockItemInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clockId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TrackClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubcategoryClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subcategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GenreClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoteClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdBreakClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduledStartTime"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommandClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"command"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LibraryNoteClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"note"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LibraryAdBreakClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adBreak"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStartTime"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LibraryCommandClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"libraryCommand"},"name":{"kind":"Name","value":"command"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"command"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateMusicClockMutation, UpdateMusicClockMutationVariables>;
export const UpdateNetworkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateNetwork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateNetworkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateNetwork"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"baseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imagesUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvg"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgCircular"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgColor"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}},{"kind":"Field","name":{"kind":"Name","value":"networkType"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"cssUrl"}},{"kind":"Field","name":{"kind":"Name","value":"playFormat"}},{"kind":"Field","name":{"kind":"Name","value":"playUrl"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateNetworkMutation, UpdateNetworkMutationVariables>;
export const UpdatePresenterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePresenter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdatePresenterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePresenter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presenter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"shortBio"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"hero"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdatePresenterMutation, UpdatePresenterMutationVariables>;
export const UpdateScheduleItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScheduleItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateScheduleItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateScheduleItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduleItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"broadcasts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}},{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"150"}}]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateScheduleItemMutation, UpdateScheduleItemMutationVariables>;
export const UpdateScheduleTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateScheduleTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateDefaultScheduleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDefaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateScheduleTemplateMutation, UpdateScheduleTemplateMutationVariables>;
export const UpdateSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSeriesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSeries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSeriesMutation, UpdateSeriesMutationVariables>;
export const UpdateShowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateShow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateShowInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateShow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalEpisodes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateShowMutation, UpdateShowMutationVariables>;
export const UpdateTemplateAssignmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTemplateAssignment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMusicAssignmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMusicAssignment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"assignment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isTemplate"}},{"kind":"Field","name":{"kind":"Name","value":"clockId"}},{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"hour"}},{"kind":"Field","name":{"kind":"Name","value":"clock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"targetRuntime"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTemplateAssignmentMutation, UpdateTemplateAssignmentMutationVariables>;
export const UpdateTrackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTrack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTrackInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"album"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subcategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isrc"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"copyright"}},{"kind":"Field","name":{"kind":"Name","value":"composer"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"dateModified"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTrackMutation, UpdateTrackMutationVariables>;
export const UpdateTrackMetadataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTrackMetadata"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTrackMetadataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTrackMetadata"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateTrackMetadataMutation, UpdateTrackMetadataMutationVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subcategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"averageDuration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"raw"}},{"kind":"Field","name":{"kind":"Name","value":"formatted"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const DebugDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Debug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"debug"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"randomShow"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]}}]} as unknown as DocumentNode<DebugQuery, DebugQueryVariables>;
export const SearchDefaultScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchDefaultSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultScheduleListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"episodeName"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"120"}}]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"120"}}]}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchDefaultScheduleQuery, SearchDefaultScheduleQueryVariables>;
export const GetDefaultSchedulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDefaultSchedules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DefaultScheduleListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"episodeName"}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"120"}}]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"120"}}]}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDefaultSchedulesQuery, GetDefaultSchedulesQueryVariables>;
export const GetDefaultScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDefaultSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"defaultSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTo"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"endsNextDay"}},{"kind":"Field","name":{"kind":"Name","value":"episodeName"}},{"kind":"Field","name":{"kind":"Name","value":"episodeDesc"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"120"}}]}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"media"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"original"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"existingEpisode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"repeatOf"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"episodeName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetDefaultScheduleQuery, GetDefaultScheduleQueryVariables>;
export const SearchEpisodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchEpisodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EpisodeListInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchEpisodesQuery, SearchEpisodesQueryVariables>;
export const SearchEpisodesV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchEpisodesV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EpisodeListInputV2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodesV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"broadcasts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchEpisodesV2Query, SearchEpisodesV2QueryVariables>;
export const GetEpisodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEpisode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]} as unknown as DocumentNode<GetEpisodeQuery, GetEpisodeQueryVariables>;
export const GetEpisodeDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEpisodeDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"broadcasts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}},{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"150"}}]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]} as unknown as DocumentNode<GetEpisodeDetailsQuery, GetEpisodeDetailsQueryVariables>;
export const GetGenresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetGenres"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GenreListInputV2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genresV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetGenresQuery, GetGenresQueryVariables>;
export const GetJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobStatus"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"searchQuery"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"songId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]} as unknown as DocumentNode<GetJobsQuery, GetJobsQueryVariables>;
export const GetJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"sourceUrl"}},{"kind":"Field","name":{"kind":"Name","value":"searchQuery"}},{"kind":"Field","name":{"kind":"Name","value":"progress"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"songId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]} as unknown as DocumentNode<GetJobQuery, GetJobQueryVariables>;
export const GetMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"media"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}}]}}]} as unknown as DocumentNode<GetMediaQuery, GetMediaQueryVariables>;
export const SearchMediaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchMedia"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaListInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mediaList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchMediaQuery, SearchMediaQueryVariables>;
export const GetMusicClockAssignmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMusicClockAssignments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MusicAssignmentFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"musicClockAssignments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"networkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"targetRuntime"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dayOfWeek"}},{"kind":"Field","name":{"kind":"Name","value":"hour"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"isTemplate"}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMusicClockAssignmentsQuery, GetMusicClockAssignmentsQueryVariables>;
export const GetMusicPlaylistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMusicPlaylists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MusicPlaylistFilters"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"musicPlaylists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"networkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledDate"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledHour"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalDuration"}},{"kind":"Field","name":{"kind":"Name","value":"estimatedDuration"}},{"kind":"Field","name":{"kind":"Name","value":"isLocked"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"clock"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemType"}},{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStart"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledEnd"}},{"kind":"Field","name":{"kind":"Name","value":"actualDuration"}},{"kind":"Field","name":{"kind":"Name","value":"isManualEdit"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ruleViolations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"rule"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ruleType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"severity"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"suggestedFix"}},{"kind":"Field","name":{"kind":"Name","value":"autoFixAvailable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMusicPlaylistsQuery, GetMusicPlaylistsQueryVariables>;
export const GetMusicClockItemLibraryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMusicClockItemLibrary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryItemType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"musicClockItemLibrary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"networkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryItemInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryNote"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryAdBreak"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStartTime"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockLibraryCommand"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"command"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMusicClockItemLibraryQuery, GetMusicClockItemLibraryQueryVariables>;
export const GetMusicClocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMusicClocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MusicClockFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"musicClocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"networkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"targetRuntime"}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockItemInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clockId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMusicClocksQuery, GetMusicClocksQueryVariables>;
export const GetMusicClockDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMusicClock"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"musicClock"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"targetRuntime"}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ClockItemInterface"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clockId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndex"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TrackClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SubcategoryClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subcategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GenreClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NoteClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AdBreakClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"scheduledStartTime"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommandClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"command"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LibraryNoteClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"note"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LibraryAdBreakClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adBreak"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledStartTime"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LibraryCommandClockItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"libraryCommand"},"name":{"kind":"Name","value":"command"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"command"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetMusicClockQuery, GetMusicClockQueryVariables>;
export const GetMusicRulesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMusicRules"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MusicRuleFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"musicRules"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"networkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"networkId"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ruleType"}},{"kind":"Field","name":{"kind":"Name","value":"breakable"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"criteria"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"artists"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"timeWindows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startHour"}},{"kind":"Field","name":{"kind":"Name","value":"endHour"}},{"kind":"Field","name":{"kind":"Name","value":"daysOfWeek"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMusicRulesQuery, GetMusicRulesQueryVariables>;
export const GetMusicRuleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMusicRule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"musicRule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ruleType"}},{"kind":"Field","name":{"kind":"Name","value":"breakable"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"criteria"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"genres"}},{"kind":"Field","name":{"kind":"Name","value":"artists"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"timeWindows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startHour"}},{"kind":"Field","name":{"kind":"Name","value":"endHour"}},{"kind":"Field","name":{"kind":"Name","value":"daysOfWeek"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetMusicRuleQuery, GetMusicRuleQueryVariables>;
export const GetNetworksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNetworks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"baseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imagesUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvg"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgCircular"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgColor"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}},{"kind":"Field","name":{"kind":"Name","value":"networkType"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"cssUrl"}},{"kind":"Field","name":{"kind":"Name","value":"playFormat"}},{"kind":"Field","name":{"kind":"Name","value":"playUrl"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}}]}}]}}]} as unknown as DocumentNode<GetNetworksQuery, GetNetworksQueryVariables>;
export const GetNetworkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetNetwork"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"network"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"baseUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imagesUrl"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvg"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgCircular"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgColor"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}},{"kind":"Field","name":{"kind":"Name","value":"networkType"}},{"kind":"Field","name":{"kind":"Name","value":"tagline"}},{"kind":"Field","name":{"kind":"Name","value":"cssUrl"}},{"kind":"Field","name":{"kind":"Name","value":"playFormat"}},{"kind":"Field","name":{"kind":"Name","value":"playUrl"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}}]}}]}}]} as unknown as DocumentNode<GetNetworkQuery, GetNetworkQueryVariables>;
export const GetPresentersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPresenters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PresenterListInputV2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presentersV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetPresentersQuery, GetPresentersQueryVariables>;
export const GetPresenterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPresenter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presenter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"hero"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"shortBio"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"shows"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetPresenterQuery, GetPresenterQueryVariables>;
export const ScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Schedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"network"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"networkId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"network"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"amount"},"value":{"kind":"IntValue","value":"200"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"episode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"broadcasts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}},{"kind":"Field","name":{"kind":"Name","value":"customSquare"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"150"}}]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ScheduleQuery, ScheduleQueryVariables>;
export const SearchSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesListInputV2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seriesListV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchSeriesQuery, SearchSeriesQueryVariables>;
export const GetSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"archived"}},{"kind":"Field","name":{"kind":"Name","value":"show"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"network"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSeriesQuery, GetSeriesQueryVariables>;
export const SearchShowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchShows"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ShowListInputV2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"showsV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}}]}}]}}]}}]} as unknown as DocumentNode<SearchShowsQuery, SearchShowsQueryVariables>;
export const GetShowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetShow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"show"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"extraData"}},{"kind":"Field","name":{"kind":"Name","value":"featuredImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"fileSize"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"urls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"medium"}},{"kind":"Field","name":{"kind":"Name","value":"square"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fullDesc"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"hidden"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"networks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoSvgIcon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"presenters"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortDesc"}},{"kind":"Field","name":{"kind":"Name","value":"shortId"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"totalEpisodes"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<GetShowQuery, GetShowQueryVariables>;
export const SearchTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackListInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tracks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"album"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isrc"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"dateModified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<SearchTracksQuery, SearchTracksQueryVariables>;
export const SearchTracksV2Document = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchTracksV2"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TrackListInputV2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tracksV2"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"album"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subcategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isrc"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"dateModified"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<SearchTracksV2Query, SearchTracksV2QueryVariables>;
export const GetTrackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTrack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"album"}},{"kind":"Field","name":{"kind":"Name","value":"duration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"raw"}}]}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"genre"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subcategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"isrc"}},{"kind":"Field","name":{"kind":"Name","value":"bpm"}},{"kind":"Field","name":{"kind":"Name","value":"dateAdded"}},{"kind":"Field","name":{"kind":"Name","value":"dateModified"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"copyright"}},{"kind":"Field","name":{"kind":"Name","value":"composer"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<GetTrackQuery, GetTrackQueryVariables>;
export const SearchYouTubeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SearchYouTube"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchYouTube"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<SearchYouTubeMutation, SearchYouTubeMutationVariables>;
export const BulkSearchYouTubeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkSearchYouTube"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkSearchYouTubeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkSearchYouTube"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"query"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalQueries"}},{"kind":"Field","name":{"kind":"Name","value":"successfulQueries"}},{"kind":"Field","name":{"kind":"Name","value":"failedQueries"}}]}}]}}]} as unknown as DocumentNode<BulkSearchYouTubeMutation, BulkSearchYouTubeMutationVariables>;
export const SearchMusicBrainzDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchMusicBrainz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MusicBrainzSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchMusicBrainz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"recordingId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"artistId"}},{"kind":"Field","name":{"kind":"Name","value":"artistSortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sortName"}},{"kind":"Field","name":{"kind":"Name","value":"joinPhrase"}}]}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"isrc"}},{"kind":"Field","name":{"kind":"Name","value":"score"}},{"kind":"Field","name":{"kind":"Name","value":"releases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"releaseId"}},{"kind":"Field","name":{"kind":"Name","value":"releaseGroupId"}},{"kind":"Field","name":{"kind":"Name","value":"album"}},{"kind":"Field","name":{"kind":"Name","value":"trackNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalTracks"}},{"kind":"Field","name":{"kind":"Name","value":"discNumber"}},{"kind":"Field","name":{"kind":"Name","value":"totalDiscs"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"originalDate"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"releaseType"}},{"kind":"Field","name":{"kind":"Name","value":"releaseStatus"}},{"kind":"Field","name":{"kind":"Name","value":"barcode"}},{"kind":"Field","name":{"kind":"Name","value":"albumArtistSortOrder"}},{"kind":"Field","name":{"kind":"Name","value":"media"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"releaseArtistId"}},{"kind":"Field","name":{"kind":"Name","value":"trackId"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"dynamicFields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<SearchMusicBrainzQuery, SearchMusicBrainzQueryVariables>;
export const BulkSearchMusicBrainzDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BulkSearchMusicBrainz"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BulkSearchMusicBrainzInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bulkSearchMusicBrainz"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"query"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"album"}}]}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"score"}}]}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalSearches"}},{"kind":"Field","name":{"kind":"Name","value":"successfulSearches"}},{"kind":"Field","name":{"kind":"Name","value":"failedSearches"}}]}}]}}]} as unknown as DocumentNode<BulkSearchMusicBrainzMutation, BulkSearchMusicBrainzMutationVariables>;