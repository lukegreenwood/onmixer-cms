'use client';

import { Button } from '@soundwaves/components';
import { useState } from 'react';

import { WarningIcon, ClockIcon, MusicIcon, NoteIcon } from '@/components/icons';

import { formatDuration } from '../utils';

import type { MusicSchedule, ScheduleItem, RuleViolation } from '../types';

interface SchedulePreviewProps {
  schedules: MusicSchedule[];
}

interface ScheduleItemCardProps {
  item: ScheduleItem;
  violations: RuleViolation[];
}

interface RuleViolationsSummaryProps {
  violations: RuleViolation[];
}

const ScheduleItemCard = ({ item, violations }: ScheduleItemCardProps) => {
  const hasUnbreakableViolations = violations.some(v => v.severity === 'unbreakable');
  const hasBreakableViolations = violations.some(v => v.severity === 'breakable');

  return (
    <div 
      className={`schedule-item-card ${
        hasUnbreakableViolations ? 'violation-unbreakable' : 
        hasBreakableViolations ? 'violation-breakable' : ''
      }`}
    >
      <div className="schedule-item-card__header">
        <div className="schedule-item-card__icon">
          {item.itemType === 'track' ? (
            <MusicIcon size={20} />
          ) : (
            <NoteIcon size={20} />
          )}
        </div>
        
        <div className="schedule-item-card__info">
          {item.itemType === 'track' && item.track ? (
            <div className="track-display">
              <div className="track-display__title">{item.track.title}</div>
              <div className="track-display__artist">{item.track.artist}</div>
            </div>
          ) : (
            <div className="note-display">
              <div className="note-display__content">{item.noteContent}</div>
            </div>
          )}
        </div>

        <div className="schedule-item-card__duration">
          {formatDuration(item.duration)}
        </div>

        {violations.length > 0 && (
          <div 
            className={`violation-badge ${
              hasUnbreakableViolations ? 'unbreakable' : 'breakable'
            }`}
          >
            {violations.length}
          </div>
        )}
      </div>
      
      {violations.length > 0 && (
        <div className="schedule-item-card__violations">
          <ViolationsList violations={violations} />
        </div>
      )}
    </div>
  );
};

const ViolationsList = ({ violations }: { violations: RuleViolation[] }) => (
  <div className="violations-list">
    {violations.map((violation, index) => (
      <div 
        key={index}
        className={`violation-item violation-item--${violation.severity}`}
      >
        <WarningIcon size={16} />
        <div className="violation-content">
          <div className="violation-rule">{violation.ruleName}</div>
          <div className="violation-description">{violation.description}</div>
        </div>
      </div>
    ))}
  </div>
);

const RuleViolationsSummary = ({ violations }: RuleViolationsSummaryProps) => {
  const unbreakableCount = violations.filter(v => v.severity === 'unbreakable').length;
  const breakableCount = violations.filter(v => v.severity === 'breakable').length;

  if (violations.length === 0) {
    return (
      <div className="violations-summary violations-summary--success">
        <div className="violations-summary__icon">✓</div>
        <div className="violations-summary__text">No rule violations detected</div>
      </div>
    );
  }

  return (
    <div className="violations-summary violations-summary--warning">
      <div className="violations-summary__stats">
        {unbreakableCount > 0 && (
          <div className="violation-stat violation-stat--unbreakable">
            <WarningIcon size={16} />
            {unbreakableCount} unbreakable violation{unbreakableCount !== 1 ? 's' : ''}
          </div>
        )}
        {breakableCount > 0 && (
          <div className="violation-stat violation-stat--breakable">
            <WarningIcon size={16} />
            {breakableCount} breakable violation{breakableCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

const ScheduleHeader = ({ schedule }: { schedule: MusicSchedule }) => (
  <div className="schedule-header">
    <div className="schedule-header__info">
      <div className="schedule-header__title">
        <ClockIcon size={20} />
        {schedule.playlistName}
      </div>
      <div className="schedule-header__meta">
        {schedule.scheduledDate} at {schedule.hour.toString().padStart(2, '0')}:00
      </div>
    </div>
    
    {schedule.clock && (
      <div className="schedule-header__clock">
        <div 
          className="clock-color-indicator"
          style={{ backgroundColor: schedule.clock.color }}
        />
        <span>{schedule.clock.name}</span>
        <span className="schedule-header__runtime">
          {formatDuration(schedule.clock.targetRuntime)}
        </span>
      </div>
    )}
  </div>
);

export const SchedulePreview = ({ schedules }: SchedulePreviewProps) => {
  const [expandedSchedule, setExpandedSchedule] = useState<string | null>(null);

  const toggleSchedule = (scheduleId: string) => {
    setExpandedSchedule(expandedSchedule === scheduleId ? null : scheduleId);
  };

  const allViolations = schedules.flatMap(s => s.ruleViolations);

  return (
    <div className="schedule-preview">
      <div className="schedule-preview__header">
        <h4 className="schedule-preview__title">Schedule Preview</h4>
        <RuleViolationsSummary violations={allViolations} />
      </div>
      
      <div className="schedule-preview__content">
        {schedules.map(schedule => (
          <div key={schedule.id} className="schedule-preview__schedule">
            <div 
              className="schedule-preview__schedule-header"
              onClick={() => toggleSchedule(schedule.id)}
            >
              <ScheduleHeader schedule={schedule} />
              <Button variant="tertiary" size="sm">
                {expandedSchedule === schedule.id ? '−' : '+'}
              </Button>
            </div>
            
            {expandedSchedule === schedule.id && (
              <div className="schedule-preview__schedule-content">
                {schedule.items.map(item => (
                  <ScheduleItemCard 
                    key={item.id}
                    item={item}
                    violations={item.ruleViolations}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};