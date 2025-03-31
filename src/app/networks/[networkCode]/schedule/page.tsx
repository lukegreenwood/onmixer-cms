import { Loading } from '@soundwaves/components';
import { format } from 'date-fns';
import { Suspense } from 'react';

import { SchedulePage } from '@/components';

export default async function SchedulePageRoot({
  params,
}: {
  params: Promise<{ date?: string }>;
}) {
  const { date = format(new Date(), 'yyyy-MM-dd') } = await params;

  return (
    <Suspense fallback={<Loading color="primary" size="md" type="line" />}>
      <SchedulePage date={date} />
    </Suspense>
  );
}
