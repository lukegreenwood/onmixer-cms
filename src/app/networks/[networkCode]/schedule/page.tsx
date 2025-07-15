import { format } from 'date-fns';

import { SchedulePage } from '@/components';

export default async function SchedulePageRoot({
  params,
}: {
  params: Promise<{ networkCode: string }>;
}) {
  const { networkCode: _networkCode } = await params;
  const date = format(new Date(), 'yyyy-MM-dd');

  return <SchedulePage date={date} />;
}
