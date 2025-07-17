import { useSuspenseQuery } from '@apollo/client';
import { utc } from '@date-fns/utc';
import { endOfDay } from 'date-fns';

import { GET_SCHEDULE } from '@/graphql/queries';

export const useSchedule = ({
  date,
  networkId,
}: {
  date: Date | undefined;
  networkId: string | undefined;
}) => {
  const fromDate = date ?? new Date();
  const toDate = endOfDay(fromDate, { in: utc });
  const result = useSuspenseQuery(GET_SCHEDULE, {
    variables: {
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
      network: networkId?.toString() ?? '',
    },
    skip: !date || !networkId,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  return result;
};
