import { ScheduleTemplateEditPage } from '@/pages/ScheduleTemplateEditPage/ScheduleTemplateEditPage';

export default async function ScheduleTemplateEditRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ScheduleTemplateEditPage id={id} />;
}
