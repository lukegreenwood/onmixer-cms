'use client';

import { useQuery } from '@apollo/client';
import { Button, Loading } from '@soundwaves/components';
import { useRouter } from 'next/navigation';

import { Card } from '@/components/blocks/Card/Card';
import { PageHeader } from '@/components/blocks/PageHeader';
import { ClockIcon, EditIcon, StarIcon } from '@/components/icons';
import { GET_MUSIC_CLOCK_TEMPLATE } from '@/graphql/queries/musicClockTemplates';

interface ClockTemplateDetailPageProps {
  networkCode: string;
  templateId: string;
}

export const ClockTemplateDetailPage = ({ 
  networkCode, 
  templateId 
}: ClockTemplateDetailPageProps) => {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_MUSIC_CLOCK_TEMPLATE, {
    variables: { id: templateId },
  });

  const template = data?.musicClockTemplate;

  const handleEdit = () => {
    router.push(`/networks/${networkCode}/music-scheduling/templates/${templateId}/edit`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" />
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="clock-template-detail-page">
        <PageHeader
          heading="Template Not Found"
          subheading="The requested template could not be found"
        />
        <div className="page-content">
          <Card>
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Template not found or access denied.</p>
              <Button
                variant="primary"
                onClick={() => router.push(`/networks/${networkCode}/music-scheduling/templates`)}
              >
                Back to Templates
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const formatDayOfWeek = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day] || `Day ${day}`;
  };

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  // Group assignments by day for better display
  const assignmentsByDay = template.assignments.reduce((acc, assignment) => {
    const day = assignment.dayOfWeek;
    if (!acc[day]) acc[day] = [];
    acc[day].push(assignment);
    return acc;
  }, {} as Record<number, typeof template.assignments>);

  // Sort assignments within each day by hour
  Object.keys(assignmentsByDay).forEach(day => {
    assignmentsByDay[parseInt(day)].sort((a, b) => a.hour - b.hour);
  });

  return (
    <div className="clock-template-detail-page">
      <PageHeader
        heading={template.name}
        subheading={template.description || 'Clock template details'}
        actions={
          <Button variant="primary" onClick={handleEdit}>
            <EditIcon className="button-icon button-icon--sm" />
            Edit Template
          </Button>
        }
      />

      <div className="page-content">
        <div className="template-detail">
          <Card>
            <div className="template-detail__header">
              <div className="template-detail__info">
                <h3 className="template-detail__title">
                  {template.name}
                  {template.isDefault && (
                    <StarIcon 
                      className="ml-2 text-yellow-500" 
                      size={20} 
                      title="Default Template" 
                    />
                  )}
                </h3>
                {template.description && (
                  <p className="template-detail__description">{template.description}</p>
                )}
              </div>
              <div className="template-detail__stats">
                <div className="stat">
                  <div className="stat__value">{template.assignments.length}</div>
                  <div className="stat__label">Assignments</div>
                </div>
                <div className="stat">
                  <div className="stat__value">
                    {Object.keys(assignmentsByDay).length}
                  </div>
                  <div className="stat__label">Days</div>
                </div>
              </div>
            </div>
          </Card>

          {template.assignments.length > 0 ? (
            <Card>
              <div className="template-assignments">
                <h4 className="template-assignments__title">Schedule Assignments</h4>
                <div className="template-assignments__content">
                  {Object.entries(assignmentsByDay)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([dayStr, dayAssignments]) => {
                      const day = parseInt(dayStr);
                      return (
                        <div key={day} className="day-assignments">
                          <h5 className="day-assignments__title">
                            {formatDayOfWeek(day)}
                          </h5>
                          <div className="day-assignments__list">
                            {dayAssignments.map((assignment) => (
                              <div key={assignment.id} className="assignment-item">
                                <div className="assignment-item__time">
                                  {formatHour(assignment.hour)}
                                </div>
                                <div className="assignment-item__clock">
                                  <div className="assignment-item__name">
                                    {assignment.clock.name}
                                  </div>
                                  <div className="assignment-item__duration">
                                    {Math.floor(assignment.clock.duration / 60)}:
                                    {(assignment.clock.duration % 60).toString().padStart(2, '0')}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="template-assignments__empty">
                <div className="text-center py-8">
                  <ClockIcon className="mx-auto mb-4 text-gray-400" size={48} />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    No assignments configured
                  </h4>
                  <p className="text-gray-600 mb-4">
                    This template doesn&apos;t have any clock assignments yet.
                  </p>
                  <Button variant="primary" onClick={handleEdit}>
                    <EditIcon className="button-icon button-icon--sm" />
                    Configure Template
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};