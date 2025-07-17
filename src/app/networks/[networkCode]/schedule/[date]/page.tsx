import { SchedulePage } from '@/components';

export default async function ScheduleDatePage({
  params,
}: {
  params: Promise<{ networkCode: string; date: string }>;
}) {
  const { date } = await params;
  
  return <SchedulePage date={date} />;
}