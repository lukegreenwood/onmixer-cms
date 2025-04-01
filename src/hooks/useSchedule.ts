import { useSuspenseQuery } from '@apollo/client';

import { GET_SCHEDULE } from '@/graphql/queries';

export const useSchedule = ({
  date,
  networkId,
}: {
  date: Date | undefined;
  networkId: number | undefined;
}) => {
  const result = useSuspenseQuery(GET_SCHEDULE, {
    variables: {
      from: date ?? new Date(),
      network: networkId?.toString() ?? '',
    },
    skip: !date || !networkId,
  });

  return result;
};
