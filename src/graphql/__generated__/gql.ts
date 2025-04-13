/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation ApplyAssignedDefaultSchedule(\n    $networkId: ID!\n    $date: DateTime!\n    $assignedTo: [DayOfWeek!]!\n  ) {\n    applyAssignedDefaultSchedule(\n      input: { networkId: $networkId, date: $date, assignedTo: $assignedTo }\n    ) {\n      success\n      message\n    }\n  }\n": typeof types.ApplyAssignedDefaultScheduleDocument,
    "\n  mutation CreateScheduleItem($input: CreateScheduleItemInput!) {\n    createScheduleItem(input: $input) {\n      scheduleItem {\n        id\n        end\n        start\n        networks {\n          id\n          name\n        }\n        episode {\n          id\n          name\n          show {\n            shortName\n          }\n          description\n          broadcasts {\n            id\n            start\n            end\n          }\n          featuredImage {\n            urls {\n              square\n              customSquare(size: 150)\n            }\n          }\n          networks {\n            id\n            logoSvgIcon\n          }\n        }\n      }\n    }\n  }\n": typeof types.CreateScheduleItemDocument,
    "\n  mutation DeleteScheduleItem($input: DeleteScheduleItemInput!) {\n    deleteScheduleItem(input: $input) {\n        success\n    }\n  }\n": typeof types.DeleteScheduleItemDocument,
    "\n  mutation UpdateScheduleItem($input: UpdateScheduleItemInput!) {\n    updateScheduleItem(input: $input) {\n      scheduleItem {\n        id\n        end\n        start\n        networks {\n          id\n          name\n        }\n        episode {\n          id\n          name\n          show {\n            shortName\n          }\n          description\n          broadcasts {\n            id\n            start\n            end\n          }\n          featuredImage {\n            urls {\n              square\n              customSquare(size: 150)\n            }\n          }\n          networks {\n            id\n            logoSvgIcon\n          }\n        }\n      }\n    }\n  }\n": typeof types.UpdateScheduleItemDocument,
    "\n\tquery Debug {\n\t\tdebug {\n\t\t\tid\n\t\t\tstatus\n\t\t\trandomShow {\n\t\t\t\tid\n\t\t\t\tshortName\n\t\t\t\tepisodes {\n\t\t\t\t\ttotal\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.DebugDocument,
    "\n  query SearchEpisodes($filters: EpisodeListInput) {\n    episodes(filters: $filters) {\n      items {\n        id\n        name\n        show {\n          id\n          shortName\n        }\n      }\n    }\n  }\n": typeof types.SearchEpisodesDocument,
    "\n  query GetEpisodeDetails($id: ID!) {\n    episode(id: $id) {\n    \tid\n      name\n      show {\n        id\n        shortName\n      }\n      description\n      broadcasts {\n        id\n      }\n      featuredImage {\n        urls {\n          square\n          customSquare(size: 150)\n        }\n      }\n      networks {\n        id\n        logoSvgIcon\n      }\n    }\n  }\n": typeof types.GetEpisodeDetailsDocument,
    "\n\tquery GetNetworks {\n\t\tnetworks {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t\tnetworkType\n\t\t\tlogoSvgIcon\n\t\t\tlogoSvgCircular\n\t\t}\n\t}\n": typeof types.GetNetworksDocument,
    "\n\tquery GetNetwork($id: ID!) {\n\t\tnetwork(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t\tnetworkType\n\t\t\tlogoSvgIcon\n\t\t}\n\t}\n": typeof types.GetNetworkDocument,
    "\n    query Schedule(\n\t$from: DateTime!\n\t$network: ID!\n\t$to: DateTime\n) {\n\tschedule(\n\t\tfilters: { from: $from, networkId: $network, to: $to, amount: 200 }\n\t) {\n\t\ttotal\n\t\titems {\n\t\t\tid\n\t\t\tstart\n\t\t\tend\n\t\t\tnetworks {\n\t\t\t\tid\n                name\n                logoSvgIcon\n\t\t\t}\n\t\t\tepisode {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tshow {\n\t\t\t\t\tid\n\t\t\t\t\tshortName\n\t\t\t\t}\n\t\t\t\tdescription\n\t\t\t\tbroadcasts {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\tfeaturedImage {\n\t\t\t\t\turls {\n\t\t\t\t\t\tsquare\n\t\t\t\t\t\tcustomSquare(size: 150)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tnetworks {\n\t\t\t\t\tid\n\t\t\t\t\tlogoSvgIcon\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n": typeof types.ScheduleDocument,
};
const documents: Documents = {
    "\n  mutation ApplyAssignedDefaultSchedule(\n    $networkId: ID!\n    $date: DateTime!\n    $assignedTo: [DayOfWeek!]!\n  ) {\n    applyAssignedDefaultSchedule(\n      input: { networkId: $networkId, date: $date, assignedTo: $assignedTo }\n    ) {\n      success\n      message\n    }\n  }\n": types.ApplyAssignedDefaultScheduleDocument,
    "\n  mutation CreateScheduleItem($input: CreateScheduleItemInput!) {\n    createScheduleItem(input: $input) {\n      scheduleItem {\n        id\n        end\n        start\n        networks {\n          id\n          name\n        }\n        episode {\n          id\n          name\n          show {\n            shortName\n          }\n          description\n          broadcasts {\n            id\n            start\n            end\n          }\n          featuredImage {\n            urls {\n              square\n              customSquare(size: 150)\n            }\n          }\n          networks {\n            id\n            logoSvgIcon\n          }\n        }\n      }\n    }\n  }\n": types.CreateScheduleItemDocument,
    "\n  mutation DeleteScheduleItem($input: DeleteScheduleItemInput!) {\n    deleteScheduleItem(input: $input) {\n        success\n    }\n  }\n": types.DeleteScheduleItemDocument,
    "\n  mutation UpdateScheduleItem($input: UpdateScheduleItemInput!) {\n    updateScheduleItem(input: $input) {\n      scheduleItem {\n        id\n        end\n        start\n        networks {\n          id\n          name\n        }\n        episode {\n          id\n          name\n          show {\n            shortName\n          }\n          description\n          broadcasts {\n            id\n            start\n            end\n          }\n          featuredImage {\n            urls {\n              square\n              customSquare(size: 150)\n            }\n          }\n          networks {\n            id\n            logoSvgIcon\n          }\n        }\n      }\n    }\n  }\n": types.UpdateScheduleItemDocument,
    "\n\tquery Debug {\n\t\tdebug {\n\t\t\tid\n\t\t\tstatus\n\t\t\trandomShow {\n\t\t\t\tid\n\t\t\t\tshortName\n\t\t\t\tepisodes {\n\t\t\t\t\ttotal\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.DebugDocument,
    "\n  query SearchEpisodes($filters: EpisodeListInput) {\n    episodes(filters: $filters) {\n      items {\n        id\n        name\n        show {\n          id\n          shortName\n        }\n      }\n    }\n  }\n": types.SearchEpisodesDocument,
    "\n  query GetEpisodeDetails($id: ID!) {\n    episode(id: $id) {\n    \tid\n      name\n      show {\n        id\n        shortName\n      }\n      description\n      broadcasts {\n        id\n      }\n      featuredImage {\n        urls {\n          square\n          customSquare(size: 150)\n        }\n      }\n      networks {\n        id\n        logoSvgIcon\n      }\n    }\n  }\n": types.GetEpisodeDetailsDocument,
    "\n\tquery GetNetworks {\n\t\tnetworks {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t\tnetworkType\n\t\t\tlogoSvgIcon\n\t\t\tlogoSvgCircular\n\t\t}\n\t}\n": types.GetNetworksDocument,
    "\n\tquery GetNetwork($id: ID!) {\n\t\tnetwork(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t\tnetworkType\n\t\t\tlogoSvgIcon\n\t\t}\n\t}\n": types.GetNetworkDocument,
    "\n    query Schedule(\n\t$from: DateTime!\n\t$network: ID!\n\t$to: DateTime\n) {\n\tschedule(\n\t\tfilters: { from: $from, networkId: $network, to: $to, amount: 200 }\n\t) {\n\t\ttotal\n\t\titems {\n\t\t\tid\n\t\t\tstart\n\t\t\tend\n\t\t\tnetworks {\n\t\t\t\tid\n                name\n                logoSvgIcon\n\t\t\t}\n\t\t\tepisode {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tshow {\n\t\t\t\t\tid\n\t\t\t\t\tshortName\n\t\t\t\t}\n\t\t\t\tdescription\n\t\t\t\tbroadcasts {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\tfeaturedImage {\n\t\t\t\t\turls {\n\t\t\t\t\t\tsquare\n\t\t\t\t\t\tcustomSquare(size: 150)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tnetworks {\n\t\t\t\t\tid\n\t\t\t\t\tlogoSvgIcon\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n": types.ScheduleDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ApplyAssignedDefaultSchedule(\n    $networkId: ID!\n    $date: DateTime!\n    $assignedTo: [DayOfWeek!]!\n  ) {\n    applyAssignedDefaultSchedule(\n      input: { networkId: $networkId, date: $date, assignedTo: $assignedTo }\n    ) {\n      success\n      message\n    }\n  }\n"): (typeof documents)["\n  mutation ApplyAssignedDefaultSchedule(\n    $networkId: ID!\n    $date: DateTime!\n    $assignedTo: [DayOfWeek!]!\n  ) {\n    applyAssignedDefaultSchedule(\n      input: { networkId: $networkId, date: $date, assignedTo: $assignedTo }\n    ) {\n      success\n      message\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateScheduleItem($input: CreateScheduleItemInput!) {\n    createScheduleItem(input: $input) {\n      scheduleItem {\n        id\n        end\n        start\n        networks {\n          id\n          name\n        }\n        episode {\n          id\n          name\n          show {\n            shortName\n          }\n          description\n          broadcasts {\n            id\n            start\n            end\n          }\n          featuredImage {\n            urls {\n              square\n              customSquare(size: 150)\n            }\n          }\n          networks {\n            id\n            logoSvgIcon\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateScheduleItem($input: CreateScheduleItemInput!) {\n    createScheduleItem(input: $input) {\n      scheduleItem {\n        id\n        end\n        start\n        networks {\n          id\n          name\n        }\n        episode {\n          id\n          name\n          show {\n            shortName\n          }\n          description\n          broadcasts {\n            id\n            start\n            end\n          }\n          featuredImage {\n            urls {\n              square\n              customSquare(size: 150)\n            }\n          }\n          networks {\n            id\n            logoSvgIcon\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteScheduleItem($input: DeleteScheduleItemInput!) {\n    deleteScheduleItem(input: $input) {\n        success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteScheduleItem($input: DeleteScheduleItemInput!) {\n    deleteScheduleItem(input: $input) {\n        success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateScheduleItem($input: UpdateScheduleItemInput!) {\n    updateScheduleItem(input: $input) {\n      scheduleItem {\n        id\n        end\n        start\n        networks {\n          id\n          name\n        }\n        episode {\n          id\n          name\n          show {\n            shortName\n          }\n          description\n          broadcasts {\n            id\n            start\n            end\n          }\n          featuredImage {\n            urls {\n              square\n              customSquare(size: 150)\n            }\n          }\n          networks {\n            id\n            logoSvgIcon\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateScheduleItem($input: UpdateScheduleItemInput!) {\n    updateScheduleItem(input: $input) {\n      scheduleItem {\n        id\n        end\n        start\n        networks {\n          id\n          name\n        }\n        episode {\n          id\n          name\n          show {\n            shortName\n          }\n          description\n          broadcasts {\n            id\n            start\n            end\n          }\n          featuredImage {\n            urls {\n              square\n              customSquare(size: 150)\n            }\n          }\n          networks {\n            id\n            logoSvgIcon\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery Debug {\n\t\tdebug {\n\t\t\tid\n\t\t\tstatus\n\t\t\trandomShow {\n\t\t\t\tid\n\t\t\t\tshortName\n\t\t\t\tepisodes {\n\t\t\t\t\ttotal\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Debug {\n\t\tdebug {\n\t\t\tid\n\t\t\tstatus\n\t\t\trandomShow {\n\t\t\t\tid\n\t\t\t\tshortName\n\t\t\t\tepisodes {\n\t\t\t\t\ttotal\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchEpisodes($filters: EpisodeListInput) {\n    episodes(filters: $filters) {\n      items {\n        id\n        name\n        show {\n          id\n          shortName\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchEpisodes($filters: EpisodeListInput) {\n    episodes(filters: $filters) {\n      items {\n        id\n        name\n        show {\n          id\n          shortName\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetEpisodeDetails($id: ID!) {\n    episode(id: $id) {\n    \tid\n      name\n      show {\n        id\n        shortName\n      }\n      description\n      broadcasts {\n        id\n      }\n      featuredImage {\n        urls {\n          square\n          customSquare(size: 150)\n        }\n      }\n      networks {\n        id\n        logoSvgIcon\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetEpisodeDetails($id: ID!) {\n    episode(id: $id) {\n    \tid\n      name\n      show {\n        id\n        shortName\n      }\n      description\n      broadcasts {\n        id\n      }\n      featuredImage {\n        urls {\n          square\n          customSquare(size: 150)\n        }\n      }\n      networks {\n        id\n        logoSvgIcon\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetNetworks {\n\t\tnetworks {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t\tnetworkType\n\t\t\tlogoSvgIcon\n\t\t\tlogoSvgCircular\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetNetworks {\n\t\tnetworks {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t\tnetworkType\n\t\t\tlogoSvgIcon\n\t\t\tlogoSvgCircular\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetNetwork($id: ID!) {\n\t\tnetwork(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t\tnetworkType\n\t\t\tlogoSvgIcon\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetNetwork($id: ID!) {\n\t\tnetwork(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t\tnetworkType\n\t\t\tlogoSvgIcon\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Schedule(\n\t$from: DateTime!\n\t$network: ID!\n\t$to: DateTime\n) {\n\tschedule(\n\t\tfilters: { from: $from, networkId: $network, to: $to, amount: 200 }\n\t) {\n\t\ttotal\n\t\titems {\n\t\t\tid\n\t\t\tstart\n\t\t\tend\n\t\t\tnetworks {\n\t\t\t\tid\n                name\n                logoSvgIcon\n\t\t\t}\n\t\t\tepisode {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tshow {\n\t\t\t\t\tid\n\t\t\t\t\tshortName\n\t\t\t\t}\n\t\t\t\tdescription\n\t\t\t\tbroadcasts {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\tfeaturedImage {\n\t\t\t\t\turls {\n\t\t\t\t\t\tsquare\n\t\t\t\t\t\tcustomSquare(size: 150)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tnetworks {\n\t\t\t\t\tid\n\t\t\t\t\tlogoSvgIcon\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n"): (typeof documents)["\n    query Schedule(\n\t$from: DateTime!\n\t$network: ID!\n\t$to: DateTime\n) {\n\tschedule(\n\t\tfilters: { from: $from, networkId: $network, to: $to, amount: 200 }\n\t) {\n\t\ttotal\n\t\titems {\n\t\t\tid\n\t\t\tstart\n\t\t\tend\n\t\t\tnetworks {\n\t\t\t\tid\n                name\n                logoSvgIcon\n\t\t\t}\n\t\t\tepisode {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tshow {\n\t\t\t\t\tid\n\t\t\t\t\tshortName\n\t\t\t\t}\n\t\t\t\tdescription\n\t\t\t\tbroadcasts {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\tfeaturedImage {\n\t\t\t\t\turls {\n\t\t\t\t\t\tsquare\n\t\t\t\t\t\tcustomSquare(size: 150)\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tnetworks {\n\t\t\t\t\tid\n\t\t\t\t\tlogoSvgIcon\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;