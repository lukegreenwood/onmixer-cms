'use client';

import { useSuspenseQuery } from '@apollo/client';

import { DEBUG } from '@/graphql';

export const Test = () => {
  const { data, error } = useSuspenseQuery(DEBUG);
  const loading = false;
  console.log({ data, loading, error });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{JSON.stringify(data)}</div>;
};
