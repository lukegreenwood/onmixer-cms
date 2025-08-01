'use client';

import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@soundwaves/components';
import { useState, useCallback } from 'react';

import { Card } from '@/components/blocks/Card';
import { ClockIcon, ScheduleIcon } from '@/components/icons';
import { ASSIGN_MUSIC_CLOCK } from '@/graphql/mutations/assignMusicClock';
import { GET_MUSIC_CLOCK_ASSIGNMENTS } from '@/graphql/queries/musicAssignments';
import { GET_MUSIC_CLOCKS } from '@/graphql/queries/musicClocks';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

interface TimeSlot {
  dayOfWeek: string;
  hour: number;
}

export const AssignmentScheduler = () => {
  const { currentNetwork } = useNetwork();
  const [selectedClock, setSelectedClock] = useState('');
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<TimeSlot[]>([]);

  const { data: clocksData } = useQuery(GET_MUSIC_CLOCKS, {
    variables: { networkId: currentNetwork?.id || '' },
  });

  const { data: assignmentsData, refetch: refetchAssignments } = useQuery(
    GET_MUSIC_CLOCK_ASSIGNMENTS,
    {
      variables: { networkId: currentNetwork?.id || '', filters: {} },
    },
  );

  const [assignClock, { loading: assignLoading }] =
    useMutation(ASSIGN_MUSIC_CLOCK);

  const daysOfWeek = [
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY',
    'SUNDAY',
  ];

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleSlotToggle = useCallback((dayOfWeek: string, hour: number) => {
    const slot = { dayOfWeek, hour };
    setSelectedTimeSlots((prev) => {
      const exists = prev.some(
        (s) => s.dayOfWeek === dayOfWeek && s.hour === hour,
      );
      return exists
        ? prev.filter((s) => !(s.dayOfWeek === dayOfWeek && s.hour === hour))
        : [...prev, slot];
    });
  }, []);

  const isSlotSelected = useCallback(
    (dayOfWeek: string, hour: number) => {
      return selectedTimeSlots.some(
        (s) => s.dayOfWeek === dayOfWeek && s.hour === hour,
      );
    },
    [selectedTimeSlots],
  );

  const getAssignedClock = useCallback(
    (dayOfWeek: string, hour: number) => {
      return assignmentsData?.musicClockAssignments?.find(
        (a) => a.dayOfWeek === dayOfWeek && a.hour === hour,
      );
    },
    [assignmentsData],
  );

  const handleAssignment = useCallback(() => {
    if (!selectedClock || selectedTimeSlots.length === 0) return;

    const assignmentPromises = selectedTimeSlots.map((slot) =>
      assignClock({
        variables: {
          input: {
            clockId: selectedClock,
            dayOfWeek: slot.dayOfWeek,
            hour: slot.hour,
            templateId: 'default-template-id', // TODO: Get actual template ID
          },
        },
      }),
    );

    Promise.all(assignmentPromises)
      .then((results) => {
        const successful = results.filter(
          (result) => result.data?.assignMusicClock?.assignment,
        );
        if (successful.length === selectedTimeSlots.length) {
          toast('Clock assignments created successfully', 'success');
        } else {
          toast(
            `Created ${successful.length} of ${selectedTimeSlots.length} assignments`,
            'warning',
          );
        }
        setSelectedClock('');
        setSelectedTimeSlots([]);
        refetchAssignments();
      })
      .catch(() => {
        toast('Failed to create clock assignments', 'error');
      });
  }, [
    selectedClock,
    selectedTimeSlots,
    currentNetwork?.id,
    assignClock,
    refetchAssignments,
  ]);

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  return (
    <div className="assignment-scheduler">
      <Card>
        <div className="assignment-scheduler__header">
          <div className="assignment-scheduler__title">
            <h2 className="assignment-scheduler__heading">
              Clock Assignment Scheduler
            </h2>
            <p className="assignment-scheduler__description">
              Assign music clocks to specific time slots
            </p>
          </div>
        </div>

        <div className="assignment-scheduler__controls">
          <div className="form-field">
            <label htmlFor="clock-select" className="form-label">
              Select Clock
            </label>
            <select
              id="clock-select"
              value={selectedClock}
              onChange={(e) => setSelectedClock(e.target.value)}
              className="form-select"
            >
              <option value="">Select a clock...</option>
              {clocksData?.musicClocks?.map((clock) => (
                <option key={clock.id} value={clock.id}>
                  {clock.name} ({Math.floor(clock.targetRuntime / 60)}min)
                </option>
              ))}
            </select>
          </div>
          <div className="assignment-scheduler__actions">
            <Button
              onClick={handleAssignment}
              disabled={
                !selectedClock ||
                selectedTimeSlots.length === 0 ||
                assignLoading
              }
              className="button--full-width"
            >
              <ScheduleIcon className="button-icon" />
              Assign to {selectedTimeSlots.length} slots
            </Button>
          </div>

          {selectedTimeSlots.length > 0 && (
            <div className="assignment-scheduler__selection-info">
              <p className="selection-count">
                Selected: {selectedTimeSlots.length} time slots
              </p>
            </div>
          )}
        </div>

        <div className="assignment-scheduler__grid">
          <div className="weekly-grid">
            {/* Header row */}
            <div className="grid-header grid-header--time">Time</div>
            {daysOfWeek.map((day) => (
              <div key={day} className="grid-header grid-header--day">
                {day.slice(0, 3)}
              </div>
            ))}

            {/* Time slots */}
            {hours
              .map((hour) => [
                <div key={`time-${hour}`} className="grid-time-label">
                  {formatHour(hour)}
                </div>,
                ...daysOfWeek.map((day) => {
                  const assignment = getAssignedClock(day, hour);
                  const isSelected = isSlotSelected(day, hour);

                  return (
                    <button
                      key={`${day}-${hour}`}
                      onClick={() => handleSlotToggle(day, hour)}
                      className={`time-slot ${
                        isSelected
                          ? 'time-slot--selected'
                          : assignment
                          ? 'time-slot--assigned'
                          : 'time-slot--available'
                      }`}
                      title={
                        assignment
                          ? `Assigned: ${assignment.clock.name}`
                          : 'Click to select'
                      }
                    >
                      {assignment ? (
                        <div className="time-slot__content">
                          <ClockIcon className="time-slot__icon" />
                          <span className="time-slot__name">
                            {assignment.clock.name.slice(0, 8)}
                          </span>
                        </div>
                      ) : (
                        <div className="time-slot__placeholder">
                          {isSelected ? '✓' : ''}
                        </div>
                      )}
                    </button>
                  );
                }),
              ])
              .flat()}
          </div>
        </div>

        <div className="assignment-scheduler__legend">
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-indicator legend-indicator--assigned"></div>
              <span>Assigned</span>
            </div>
            <div className="legend-item">
              <div className="legend-indicator legend-indicator--selected"></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="legend-indicator legend-indicator--available"></div>
              <span>Available</span>
            </div>
          </div>
          <div className="assignment-total">
            Total assignments:{' '}
            {assignmentsData?.musicClockAssignments?.length || 0}
          </div>
        </div>
      </Card>
    </div>
  );
};
