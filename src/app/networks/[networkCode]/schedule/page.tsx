import { format } from 'date-fns';

import { SchedulePage } from '@/components';

export default async function SchedulePageRoot({
  params,
}: {
  params: Promise<{ date?: string }>;
}) {
  const { date = format(new Date(), 'yyyy-MM-dd') } = await params;

  return <SchedulePage date={date} />;
}
