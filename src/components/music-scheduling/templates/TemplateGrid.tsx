'use client';

import { useMemo } from 'react';

import { ClockIcon } from '@/components/icons';

interface TemplateGridProps {
  assignments: Array<{
    id: string;
    dayOfWeek: number;
    hour: number;
    clock: {
      id: string;
      name: string;
      duration: number;
    };
  }>;
  selectedSlot?: { dayOfWeek: number; hour: number } | null;
  onSlotClick: (dayOfWeek: number, hour: number) => void;
  onRemoveClock?: (assignmentId: string) => void;
}

export const TemplateGrid = ({
  assignments,
  selectedSlot,
  onSlotClick,
  onRemoveClock,
}: TemplateGridProps) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Create a lookup map for assignments
  const assignmentMap = useMemo(() => {
    const map = new Map<string, typeof assignments[0]>();
    assignments.forEach(assignment => {
      const key = `${assignment.dayOfWeek}-${assignment.hour}`;
      map.set(key, assignment);
    });
    return map;
  }, [assignments]);

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getSlotKey = (dayOfWeek: number, hour: number) => {
    return `${dayOfWeek}-${hour}`;
  };

  const isSlotSelected = (dayOfWeek: number, hour: number) => {
    return selectedSlot?.dayOfWeek === dayOfWeek && selectedSlot?.hour === hour;
  };

  return (
    <div className="template-grid">
      <div className="template-grid__container">
        {/* Header with day labels */}
        <div className="template-grid__header">
          <div className="template-grid__corner">Time</div>
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="template-grid__day-header">
              {day}
            </div>
          ))}
        </div>

        {/* Grid content */}
        <div className="template-grid__content">
          {hours.map((hour) => (
            <div key={hour} className="template-grid__row">
              {/* Hour label */}
              <div className="template-grid__hour-label">
                {formatHour(hour)}
              </div>
              
              {/* Day slots */}
              {days.map((_, dayIndex) => {
                const slotKey = getSlotKey(dayIndex, hour);
                const assignment = assignmentMap.get(slotKey);
                const isSelected = isSlotSelected(dayIndex, hour);
                
                return (
                  <div
                    key={`${dayIndex}-${hour}`}
                    className={`template-grid__slot ${
                      assignment ? 'template-grid__slot--assigned' : 'template-grid__slot--empty'
                    } ${
                      isSelected ? 'template-grid__slot--selected' : ''
                    }`}
                    onClick={() => onSlotClick(dayIndex, hour)}
                  >
                    {assignment ? (
                      <div className="slot-assignment">
                        <div className="slot-assignment__header">
                          <div className="slot-assignment__name">
                            {assignment.clock.name}
                          </div>
                          {onRemoveClock && (
                            <button
                              className="slot-assignment__remove"
                              onClick={(e) => {
                                e.stopPropagation();
                                onRemoveClock(assignment.id);
                              }}
                              title="Remove assignment"
                            >
                              ×
                            </button>
                          )}
                        </div>
                        <div className="slot-assignment__duration">
                          {formatDuration(assignment.clock.duration)}
                        </div>
                      </div>
                    ) : (
                      <div className="slot-empty">
                        <ClockIcon className="slot-empty__icon" size={16} />
                        <span className="slot-empty__text">Click to assign</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};