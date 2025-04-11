import { useSuspenseQuery } from '@apollo/client';

import { GET_SCHEDULE } from '@/graphql/queries';

export const useSchedule = ({
  date,
  networkId,
}: {
  date: Date | undefined;
  networkId: string | undefined;
}) => {
  const result = useSuspenseQuery(GET_SCHEDULE, {
    variables: {
      from: date?.toISOString() ?? new Date().toISOString(),
      network: networkId?.toString() ?? '',
    },
    skip: !date || !networkId,
  });

  return result;
};
