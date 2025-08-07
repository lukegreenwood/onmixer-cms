'use client';

import { from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { setVerbosity } from 'ts-invariant';

import introspectionResult from '@/graphql/__generated__/introspection.json';

setVerbosity('debug');

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const getMakeClient = (cookieString?: string) => () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    credentials: 'include',
    headers: cookieString
      ? {
          Cookie: cookieString,
        }
      : undefined,
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      possibleTypes: introspectionResult.possibleTypes,
      typePolicies: {
        Query: {
          fields: {
            episode: {
              read(_, { args, toReference }) {
                return toReference({
                  __typename: 'Episode',
                  id: args?.id,
                });
              },
            },
            mediaList: {
              keyArgs: ['filters', ['filterGroup', 'order']],
              merge(existing, incoming, { args }) {
                const offset = args?.filters?.offset || 0;
                const merged = existing
                  ? { ...existing }
                  : { items: [], total: 0 };

                if (offset === 0) {
                  // New search or refetch - replace entirely
                  merged.items = incoming.items;
                } else {
                  // Pagination - append new items
                  merged.items = [...(merged.items || []), ...incoming.items];
                }

                merged.total = incoming.total;
                return merged;
              },
            },
          },
        },
        MusicClock: {
          fields: {
            items: {
              merge(existing, incoming) {
                // Always replace the existing items array with the incoming one
                // This handles reordering, deletions, and additions properly
                return incoming;
              },
            },
          },
        },
      },
    }),
    link: from([errorLink, httpLink]),
  });
};

export function ApolloWrapper({
  children,
  cookieString,
}: React.PropsWithChildren<{ cookieString?: string }>) {
  return (
    <ApolloNextAppProvider makeClient={getMakeClient(cookieString)}>
      {children}
    </ApolloNextAppProvider>
  );
}
