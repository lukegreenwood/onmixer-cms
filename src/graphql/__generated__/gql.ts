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
    "\n\tquery Debug {\n\t\tdebug {\n\t\t\tid\n\t\t\tstatus\n\t\t\trandomShow {\n\t\t\t\tid\n\t\t\t\tshortName\n\t\t\t\tepisodes {\n\t\t\t\t\ttotal\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": typeof types.DebugDocument,
    "\n\tquery GetNetworks {\n\t\tnetworks {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t}\n\t}\n": typeof types.GetNetworksDocument,
    "\n\tquery GetNetwork($id: ID!) {\n\t\tnetwork(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t}\n\t}\n": typeof types.GetNetworkDocument,
};
const documents: Documents = {
    "\n\tquery Debug {\n\t\tdebug {\n\t\t\tid\n\t\t\tstatus\n\t\t\trandomShow {\n\t\t\t\tid\n\t\t\t\tshortName\n\t\t\t\tepisodes {\n\t\t\t\t\ttotal\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.DebugDocument,
    "\n\tquery GetNetworks {\n\t\tnetworks {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t}\n\t}\n": types.GetNetworksDocument,
    "\n\tquery GetNetwork($id: ID!) {\n\t\tnetwork(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t}\n\t}\n": types.GetNetworkDocument,
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
export function gql(source: "\n\tquery Debug {\n\t\tdebug {\n\t\t\tid\n\t\t\tstatus\n\t\t\trandomShow {\n\t\t\t\tid\n\t\t\t\tshortName\n\t\t\t\tepisodes {\n\t\t\t\t\ttotal\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery Debug {\n\t\tdebug {\n\t\t\tid\n\t\t\tstatus\n\t\t\trandomShow {\n\t\t\t\tid\n\t\t\t\tshortName\n\t\t\t\tepisodes {\n\t\t\t\t\ttotal\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetNetworks {\n\t\tnetworks {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetNetworks {\n\t\tnetworks {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetNetwork($id: ID!) {\n\t\tnetwork(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetNetwork($id: ID!) {\n\t\tnetwork(id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tcode\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;