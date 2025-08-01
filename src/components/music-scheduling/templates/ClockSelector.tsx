'use client';

import { Button, CloseIcon, Loading } from '@soundwaves/components';
import { useState } from 'react';

import { ClockIcon, SearchIcon } from '@/components/icons';

interface Clock {
  id: string;
  name: string;
  description?: string | null;
  targetRuntime: number;
  items?: Array<{
    id: string;
    name: string;
    duration: number;
  }>;
}

interface ClockSelectorProps {
  clocks: Clock[];
  loading?: boolean;
  selectedSlots: Array<{ dayOfWeek: number; hour: number }>;
  onClockSelect: (clockId: string) => void;
  onClose?: () => void;
}

export const ClockSelector = ({
  clocks,
  loading = false,
  selectedSlots,
  onClockSelect,
  onClose,
}: ClockSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const formatDayOfWeek = (day: number) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[day] || `Day ${day}`;
  };

  const formatHour = (hour: number) => {
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredClocks = clocks.filter(
    (clock) =>
      clock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (clock.description &&
        clock.description.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  if (loading) {
    return (
      <div className="clock-selector">
        <div className="clock-selector__header">
          <h3 className="clock-selector__title">Select Clock</h3>
          {onClose && (
            <Button variant="tertiary" size="sm" onClick={onClose}>
              ×
            </Button>
          )}
        </div>
        <div className="clock-selector__loading">
          <Loading size="md" />
          <p>Loading available clocks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="clock-selector">
      <div className="clock-selector__header">
        <div className="clock-selector__title-section">
          <h3 className="clock-selector__title">Select Clock</h3>
          {selectedSlots.length > 0 && (
            <p className="clock-selector__slot-info">
              For {selectedSlots.length} selected slot{selectedSlots.length !== 1 ? 's' : ''}
              {selectedSlots.length === 1 && (
                <span> ({formatDayOfWeek(selectedSlots[0].dayOfWeek)} at {formatHour(selectedSlots[0].hour)})</span>
              )}
            </p>
          )}
        </div>
        {onClose && (
          <Button variant="tertiary" size="sm" onClick={onClose} isIconOnly>
            <CloseIcon />
          </Button>
        )}
      </div>

      <div className="clock-selector__search">
        <div className="search-input">
          <SearchIcon className="search-input__icon" size={16} />
          <input
            type="text"
            placeholder="Search clocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input__field"
          />
        </div>
      </div>

      <div className="clock-selector__content">
        {filteredClocks.length > 0 ? (
          <div className="clock-list">
            {filteredClocks.map((clock) => (
              <div
                key={clock.id}
                className="clock-item"
                onClick={() => onClockSelect(clock.id)}
              >
                <div className="clock-item__header">
                  <div className="clock-item__icon">
                    <ClockIcon size={20} />
                  </div>
                  <div className="clock-item__info">
                    <div className="clock-item__name">{clock.name}</div>
                    {clock.description && (
                      <div className="clock-item__description">
                        {clock.description}
                      </div>
                    )}
                  </div>
                  <div className="clock-item__duration">
                    {formatDuration(clock.targetRuntime)}
                  </div>
                </div>

                <div className="clock-item__items">
                  <div className="clock-item__items-count">
                    {clock.items?.length || 0} item{(clock.items?.length || 0) !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="clock-selector__empty">
            <ClockIcon className="clock-selector__empty-icon" size={48} />
            <h4 className="clock-selector__empty-title">
              {searchTerm ? 'No clocks found' : 'No clocks available'}
            </h4>
            <p className="clock-selector__empty-description">
              {searchTerm
                ? `No clocks match "${searchTerm}"`
                : 'Create some clock templates first to assign them to time slots'}
            </p>
            {searchTerm && (
              <Button variant="secondary" onClick={() => setSearchTerm('')}>
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
