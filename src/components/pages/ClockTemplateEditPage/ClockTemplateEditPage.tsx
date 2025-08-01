'use client';

import { useQuery, useMutation } from '@apollo/client';
import { Button, Loading } from '@soundwaves/components';
import { useRouter } from 'next/navigation';
import { useState, useCallback, useMemo } from 'react';

import { ActionBar } from '@/components/blocks/ActionBar';
import { Card } from '@/components/blocks/Card/Card';
import { PageHeader } from '@/components/blocks/PageHeader';
import { SaveIcon } from '@/components/icons';
import { ClockSelector } from '@/components/music-scheduling/templates/ClockSelector';
import { TemplateGrid } from '@/components/music-scheduling/templates/TemplateGrid';
import { 
  ASSIGN_CLOCK_TO_TEMPLATE, 
  REMOVE_CLOCK_FROM_TEMPLATE 
} from '@/graphql/mutations/musicClockTemplates';
import { 
  GET_MUSIC_CLOCK_TEMPLATE, 
  GET_AVAILABLE_CLOCKS 
} from '@/graphql/queries/musicClockTemplates';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

interface ClockTemplateEditPageProps {
  networkCode: string;
  templateId: string;
}

interface SelectedSlot {
  dayOfWeek: number;
  hour: number;
}

export const ClockTemplateEditPage = ({ 
  networkCode, 
  templateId 
}: ClockTemplateEditPageProps) => {
  const router = useRouter();
  const { currentNetwork } = useNetwork();
  const [selectedSlots, setSelectedSlots] = useState<SelectedSlot[]>([]);
  const [lastSelectedSlot, setLastSelectedSlot] = useState<SelectedSlot | null>(null);
  const [pendingChanges, setPendingChanges] = useState<string[]>([]);

  // GraphQL queries
  const { 
    data: templateData, 
    loading: templateLoading, 
    refetch: refetchTemplate 
  } = useQuery(GET_MUSIC_CLOCK_TEMPLATE, {
    variables: { id: templateId },
  });

  const { 
    data: clocksData, 
    loading: clocksLoading 
  } = useQuery(GET_AVAILABLE_CLOCKS, {
    variables: { networkId: currentNetwork?.id || '' },
    skip: !currentNetwork?.id,
  });

  // GraphQL mutations
  const [assignClock, { loading: assignLoading }] = useMutation(ASSIGN_CLOCK_TO_TEMPLATE);
  const [removeClock, { loading: removeLoading }] = useMutation(REMOVE_CLOCK_FROM_TEMPLATE);

  const template = templateData?.musicClockTemplate;
  const availableClocks = useMemo(() => clocksData?.musicClocks || [], [clocksData]);

  const handleSlotClick = useCallback((dayOfWeek: number, hour: number, event: React.MouseEvent) => {
    const newSlot = { dayOfWeek, hour };
    
    if (event.shiftKey && lastSelectedSlot) {
      // Handle shift-click for range selection
      const slots: SelectedSlot[] = [];
      
      // Calculate range - we'll select a rectangular area
      const minDay = Math.min(lastSelectedSlot.dayOfWeek, dayOfWeek);
      const maxDay = Math.max(lastSelectedSlot.dayOfWeek, dayOfWeek);
      const minHour = Math.min(lastSelectedSlot.hour, hour);
      const maxHour = Math.max(lastSelectedSlot.hour, hour);
      
      for (let d = minDay; d <= maxDay; d++) {
        for (let h = minHour; h <= maxHour; h++) {
          slots.push({ dayOfWeek: d, hour: h });
        }
      }
      
      // If ctrl/cmd is also held, add to existing selection, otherwise replace
      if (event.ctrlKey || event.metaKey) {
        setSelectedSlots(prev => {
          const newSlots = [...prev];
          slots.forEach(slot => {
            const exists = newSlots.some(s => s.dayOfWeek === slot.dayOfWeek && s.hour === slot.hour);
            if (!exists) {
              newSlots.push(slot);
            }
          });
          return newSlots;
        });
      } else {
        setSelectedSlots(slots);
      }
    } else if (event.ctrlKey || event.metaKey) {
      // Handle ctrl/cmd-click for multi-selection
      setSelectedSlots(prev => {
        const exists = prev.some(slot => slot.dayOfWeek === dayOfWeek && slot.hour === hour);
        if (exists) {
          // Remove if already selected
          return prev.filter(slot => !(slot.dayOfWeek === dayOfWeek && slot.hour === hour));
        } else {
          // Add to selection
          return [...prev, newSlot];
        }
      });
      setLastSelectedSlot(newSlot);
    } else {
      // Normal click - single selection
      setSelectedSlots([newSlot]);
      setLastSelectedSlot(newSlot);
    }
  }, [lastSelectedSlot]);

  const handleClockSelect = useCallback(async (clockId: string) => {
    if (!selectedSlots.length || !template) {
      toast('Please select at least one time slot first', 'error');
      return;
    }

    try {
      // Assign clock to all selected slots
      const assignmentPromises = selectedSlots.map(slot => 
        assignClock({
          variables: {
            input: {
              templateId: template.id,
              clockId,
              dayOfWeek: slot.dayOfWeek,
              hour: slot.hour,
            },
          },
        })
      );

      const results = await Promise.all(assignmentPromises);
      const successCount = results.filter(result => result.data?.assignClockToTemplate?.success).length;
      const failCount = results.length - successCount;

      if (successCount > 0) {
        toast(
          `Clock assigned to ${successCount} slot${successCount !== 1 ? 's' : ''}${
            failCount > 0 ? ` (${failCount} failed)` : ''
          }`, 
          failCount > 0 ? 'warning' : 'success'
        );
        setPendingChanges(prev => [...prev, `assign-${Date.now()}`]);
        refetchTemplate();
        setSelectedSlots([]);
        setLastSelectedSlot(null);
      } else {
        toast('Failed to assign clock to any slots', 'error');
      }
    } catch (error) {
      console.error('Assign clock error:', error);
      toast('Failed to assign clock', 'error');
    }
  }, [selectedSlots, template, assignClock, refetchTemplate]);

  const handleRemoveClock = useCallback(async (assignmentId: string) => {
    if (!confirm('Are you sure you want to remove this assignment?')) {
      return;
    }

    try {
      const result = await removeClock({
        variables: { id: assignmentId },
      });

      if (result.data?.removeClockFromTemplate?.success) {
        toast('Assignment removed successfully', 'success');
        setPendingChanges(prev => [...prev, `remove-${Date.now()}`]);
        refetchTemplate();
      } else {
        toast(result.data?.removeClockFromTemplate?.message || 'Failed to remove assignment', 'error');
      }
    } catch (error) {
      console.error('Remove clock error:', error);
      toast('Failed to remove assignment', 'error');
    }
  }, [removeClock, refetchTemplate]);

  const handleSave = useCallback(() => {
    // Clear pending changes since assignments are saved immediately
    setPendingChanges([]);
    toast('Template saved successfully', 'success');
  }, []);

  const handleCancel = useCallback(() => {
    if (pendingChanges.length > 0) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        router.push(`/networks/${networkCode}/music-scheduling/templates/${templateId}`);
      }
    } else {
      router.push(`/networks/${networkCode}/music-scheduling/templates/${templateId}`);
    }
  }, [pendingChanges.length, router, networkCode, templateId]);

  const formatDayOfWeek = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day] || `Day ${day}`;
  };

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  if (templateLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading size="lg" />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="clock-template-edit-page">
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

  const isLoading = assignLoading || removeLoading;

  return (
    <div className="clock-template-edit-page">
      <PageHeader
        heading={`Edit: ${template.name}`}
        subheading="Configure clock assignments for each day and hour"
      />

      <div className="page-content">
        <div className="template-editor">
          <div className="template-editor__main">
            <Card>
              <div className="template-editor__grid-header">
                <h3 className="template-editor__grid-title">Weekly Schedule Grid</h3>
                <p className="template-editor__grid-description">
                  Click on any time slot to assign a clock. Use Shift+click for range selection, Ctrl/Cmd+click for multiple selection.
                  {selectedSlots.length > 0 && (
                    <span className="selected-slot-info">
                      {' '}Selected: {selectedSlots.length} slot{selectedSlots.length !== 1 ? 's' : ''}
                      {selectedSlots.length === 1 && (
                        <span> ({formatDayOfWeek(selectedSlots[0].dayOfWeek)} at {formatHour(selectedSlots[0].hour)})</span>
                      )}
                    </span>
                  )}
                </p>
              </div>
              
              <TemplateGrid
                assignments={template.assignments}
                selectedSlots={selectedSlots}
                onSlotClick={handleSlotClick}
                onRemoveClock={handleRemoveClock}
              />
            </Card>
          </div>

          <div className="template-editor__sidebar">
            <Card>
              <ClockSelector
                clocks={availableClocks}
                loading={clocksLoading}
                selectedSlots={selectedSlots}
                onClockSelect={handleClockSelect}
                onClose={() => {
                  setSelectedSlots([]);
                  setLastSelectedSlot(null);
                }}
              />
            </Card>
          </div>
        </div>
      </div>

      <ActionBar 
        unsavedChanges={pendingChanges.length > 0}
      >
        <div className="template-editor__stats">
          <span className="text-sm text-gray-600">
            {template.assignments.length} assignment{template.assignments.length !== 1 ? 's' : ''} configured
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="tertiary" onClick={handleCancel} disabled={isLoading}>
            {pendingChanges.length > 0 ? 'Cancel' : 'Back'}
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave}
            disabled={isLoading || pendingChanges.length === 0}
          >
            <SaveIcon className="button-icon button-icon--sm" />
            {pendingChanges.length > 0 ? 'Save Changes' : 'Saved'}
          </Button>
        </div>
      </ActionBar>
    </div>
  );
};