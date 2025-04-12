'use client';

import { HttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client-integration-nextjs';
import { setVerbosity } from 'ts-invariant';

setVerbosity('debug');

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
    link: httpLink,
  });
};

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={client}>
      {children}
    </ApolloNextAppProvider>
  );
}
