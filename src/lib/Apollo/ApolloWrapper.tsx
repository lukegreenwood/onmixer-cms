'use client';

import { from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { setVerbosity } from 'ts-invariant';

import { toast } from '../toast';

setVerbosity('debug');

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
      toast(message, 'error');
    });
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const client = () => {
  const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache({
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
          },
        },
      },
    }),
    link: from([errorLink, httpLink]),
  });
};

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={client}>
      {children}
    </ApolloNextAppProvider>
  );
}
