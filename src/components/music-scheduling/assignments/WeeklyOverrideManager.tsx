'use client';
// TODO refactor or remove file
import { DocumentNode, useMutation, useQuery } from '@apollo/client';
import { Button, Input } from '@soundwaves/components';
import { useState, useCallback } from 'react';

import { ClockIcon } from '@/components/icons';
import {
  CREATE_WEEKLY_OVERRIDE,
  DELETE_WEEKLY_OVERRIDE,
} from '@/graphql/mutations/createWeeklyOverride';
import { GET_WEEKLY_OVERRIDES } from '@/graphql/queries/musicSchedules';
import { toast } from '@/lib/toast';

import { ClockSelector } from '../templates/ClockSelector';
import { TemplateGrid } from '../templates/TemplateGrid';
import {
  formatWeekCommencing,
  getWeekCommencing,
  getDayName,
  formatHour,
} from '../utils';

import type { MusicClock, TemplateAssignment } from '../types';

interface WeeklyOverrideManagerProps {
  networkId: string;
  templateId: string;
  clocks: MusicClock[];
  baseAssignments: TemplateAssignment[];
}

export const WeeklyOverrideManager = ({
  networkId,
  templateId,
  clocks,
  baseAssignments,
}: WeeklyOverrideManagerProps) => {
  const [selectedWeek, setSelectedWeek] = useState(() =>
    getWeekCommencing(new Date()),
  );
  const [selectedSlots, setSelectedSlots] = useState<
    Array<{ dayOfWeek: number; hour: number }>
  >([]);
  const [showClockSelector, setShowClockSelector] = useState(false);
  // TODO FIX WHEN IMPLEMENTING PAGe
  const { data: overridesData, refetch: refetchOverrides } = useQuery(
    GET_WEEKLY_OVERRIDES as DocumentNode,
    {
      variables: { networkId, templateId, weekCommencing: selectedWeek },
    },
  );
  // TODO FIX WHEN IMPLEMENTING PAGe
  const [createOverride, { loading: createLoading }] = useMutation(
    CREATE_WEEKLY_OVERRIDE as DocumentNode,
  );
  const [deleteOverride] = useMutation(DELETE_WEEKLY_OVERRIDE);

  const overrides = overridesData?.musicClockWeeklyOverrides || [];

  // Merge base assignments with weekly overrides
  const effectiveAssignments = useCallback(() => {
    const assignments = new Map<string, TemplateAssignment>();

    // Start with base template assignments
    baseAssignments.forEach((assignment) => {
      const key = `${assignment.dayOfWeek}-${assignment.hour}`;
      assignments.set(key, assignment);
    });

    // Apply weekly overrides
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    overrides.forEach((override: any) => {
      const key = `${override.dayOfWeek}-${override.hour}`;
      if (override.clockId && override.clock) {
        // Override with a different clock
        assignments.set(key, {
          id: override.id,
          templateId: override.templateId,
          clockId: override.clockId,
          dayOfWeek: override.dayOfWeek,
          hour: override.hour,
          clock: override.clock,
        });
      } else {
        // Remove assignment (null override)
        assignments.delete(key);
      }
    });

    return Array.from(assignments.values());
  }, [baseAssignments, overrides]);

  const handleSlotClick = useCallback(
    (dayOfWeek: number, hour: number) => {
      const isSelected = selectedSlots.some(
        (slot) => slot.dayOfWeek === dayOfWeek && slot.hour === hour,
      );

      if (isSelected) {
        setSelectedSlots((prev) =>
          prev.filter(
            (slot) => !(slot.dayOfWeek === dayOfWeek && slot.hour === hour),
          ),
        );
      } else {
        setSelectedSlots((prev) => [...prev, { dayOfWeek, hour }]);
      }
    },
    [selectedSlots],
  );

  const handleClockSelect = useCallback(
    async (clockId: string) => {
      if (selectedSlots.length === 0) return;

      try {
        await Promise.all(
          selectedSlots.map((slot) =>
            createOverride({
              variables: {
                input: {
                  networkId,
                  templateId,
                  clockId,
                  weekCommencing: selectedWeek,
                  dayOfWeek: slot.dayOfWeek,
                  hour: slot.hour,
                  reason: `Manual override for ${getDayName(
                    slot.dayOfWeek,
                  )} ${formatHour(slot.hour)}`,
                },
              },
            }),
          ),
        );

        toast('Weekly overrides created successfully', 'success');
        setSelectedSlots([]);
        setShowClockSelector(false);
        refetchOverrides();
      } catch {
        toast('Failed to create weekly overrides', 'error');
      }
    },
    [
      selectedSlots,
      networkId,
      templateId,
      selectedWeek,
      createOverride,
      refetchOverrides,
    ],
  );

  const handleRemoveOverride = useCallback(
    async (overrideId: string) => {
      try {
        await deleteOverride({
          variables: { id: overrideId },
        });

        toast('Weekly override removed successfully', 'success');
        refetchOverrides();
      } catch {
        toast('Failed to remove weekly override', 'error');
      }
    },
    [deleteOverride, refetchOverrides],
  );

  const handleClearSlots = useCallback(() => {
    setSelectedSlots([]);
  }, []);

  const handleRemoveSelectedSlots = useCallback(async () => {
    if (selectedSlots.length === 0) return;

    try {
      await Promise.all(
        selectedSlots.map((slot) =>
          createOverride({
            variables: {
              input: {
                networkId,
                templateId,
                clockId: null, // null removes the assignment
                weekCommencing: selectedWeek,
                dayOfWeek: slot.dayOfWeek,
                hour: slot.hour,
                reason: `Remove assignment for ${getDayName(
                  slot.dayOfWeek,
                )} ${formatHour(slot.hour)}`,
              },
            },
          }),
        ),
      );

      toast('Selected slots cleared successfully', 'success');
      setSelectedSlots([]);
      refetchOverrides();
    } catch {
      toast('Failed to clear selected slots', 'error');
    }
  }, [
    selectedSlots,
    networkId,
    templateId,
    selectedWeek,
    createOverride,
    refetchOverrides,
  ]);

  return (
    <div className="weekly-override-manager">
      <div className="weekly-override-manager__header">
        <div className="weekly-override-manager__title">
          <h3 className="weekly-override-manager__heading">Weekly Overrides</h3>
          <p className="weekly-override-manager__description">
            Make temporary changes to the schedule for specific weeks
          </p>
        </div>
      </div>

      <div className="weekly-override-manager__controls">
        <div className="form-field">
          <label className="form-label">Week Commencing</label>
          <Input
            type="date"
            value={selectedWeek}
            onChange={(e) =>
              setSelectedWeek((e.target as HTMLInputElement).value)
            }
            className="week-selector"
          />
          <div className="form-help-text">
            {formatWeekCommencing(selectedWeek)}
          </div>
        </div>

        <div className="override-actions">
          {selectedSlots.length > 0 && (
            <>
              <div className="selection-info">
                {selectedSlots.length} slot
                {selectedSlots.length !== 1 ? 's' : ''} selected
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowClockSelector(true)}
                disabled={createLoading}
              >
                <ClockIcon className="button-icon--sm" />
                Assign Clock
              </Button>
              <Button
                variant="tertiary"
                size="sm"
                onClick={handleRemoveSelectedSlots}
                disabled={createLoading}
              >
                Clear Slots
              </Button>
              <Button variant="tertiary" size="sm" onClick={handleClearSlots}>
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="weekly-override-manager__grid">
        <TemplateGrid
          assignments={effectiveAssignments()}
          selectedSlots={selectedSlots}
          onSlotClick={handleSlotClick}
          onRemoveClock={handleRemoveOverride}
        />
      </div>

      {selectedSlots.length > 0 && (
        <div className="weekly-override-manager__legend">
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-indicator legend-indicator--selected" />
              <span>Selected slots</span>
            </div>
            <div className="legend-item">
              <div className="legend-indicator legend-indicator--override" />
              <span>Weekly overrides</span>
            </div>
            <div className="legend-item">
              <div className="legend-indicator legend-indicator--template" />
              <span>Template assignments</span>
            </div>
          </div>
        </div>
      )}

      {showClockSelector && (
        <div className="clock-selector-overlay">
          <div className="clock-selector-modal">
            <ClockSelector
              clocks={clocks}
              selectedSlots={selectedSlots}
              onClockSelect={handleClockSelect}
              onClose={() => setShowClockSelector(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
