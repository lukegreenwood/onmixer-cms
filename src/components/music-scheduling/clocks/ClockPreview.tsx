'use client';

import {
  isTrackClockItem,
  isSubcategoryClockItem,
  isGenreClockItem,
  isNoteClockItem,
} from '../utils';

import type { MusicClock, MusicClockItem } from '../types';

interface ClockPreviewProps {
  clock: MusicClock;
}

export const ClockPreview = ({ clock }: ClockPreviewProps) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getItemTypeColor = (item: MusicClockItem) => {
    if (isTrackClockItem(item)) {
      return 'status-badge--music';
    } else if (isSubcategoryClockItem(item)) {
      return 'status-badge--music';
    } else if (isGenreClockItem(item)) {
      return 'status-badge--music';
    } else if (isNoteClockItem(item)) {
      return 'status-badge--note';
    }
    return 'status-badge--default';
  };

  const getItemIcon = (item: MusicClockItem) => {
    if (isTrackClockItem(item)) {
      return '🎵';
    } else if (isSubcategoryClockItem(item)) {
      return '🎵';
    } else if (isGenreClockItem(item)) {
      return '🎵';
    } else if (isNoteClockItem(item)) {
      return '📝';
    }
    return '❓';
  };

  const getItemTypeName = (item: MusicClockItem) => {
    if (isTrackClockItem(item)) {
      return 'Track';
    } else if (isSubcategoryClockItem(item)) {
      return 'Subcategory';
    } else if (isGenreClockItem(item)) {
      return 'Genre';
    } else if (isNoteClockItem(item)) {
      return 'Note';
    }
    return 'Unknown';
  };

  let cumulativeTime = 0;

  return (
    <div className="clock-preview">
      <div className="card">
        <div className="clock-preview__header">
          <div className="clock-preview__title">
            <div className="clock-preview__info">
              <h2 className="clock-preview__heading">{clock.name}</h2>
              {clock.description && (
                <p className="clock-preview__description">{clock.description}</p>
              )}
            </div>
            <div className="clock-preview__duration">
              <div className="duration-label">Target Duration</div>
              <div className="duration-value">{formatDuration(clock.targetRuntime)}</div>
            </div>
          </div>
        </div>

        <div className="clock-preview__content">
          <h3 className="clock-preview__timeline-title">Clock Timeline</h3>
          
          {clock.items && clock.items.length > 0 ? (
            <div className="clock-preview__timeline">
              {clock.items
                .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                .map((item, index: number) => {
                  const startTime = cumulativeTime;
                  cumulativeTime += item.duration || 0;
                  const endTime = cumulativeTime;

                  return (
                    <div
                      key={item.id || index}
                      className="timeline-item"
                    >
                      <div className="timeline-item__time timeline-item__time--start">
                        <div className="time-label">Start</div>
                        <div className="time-value">{formatDuration(startTime)}</div>
                      </div>

                      <div className="timeline-item__content">
                        <div className="timeline-item__header">
                          <span className="timeline-item__icon">{getItemIcon(item)}</span>
                          <div className="timeline-item__info">
                            <div className="timeline-item__name">{item.name}</div>
                            <div className={`status-badge ${getItemTypeColor(item)}`}>
                              {getItemTypeName(item)}
                            </div>
                          </div>
                        </div>

                        {/* Type-specific details */}
                        {isTrackClockItem(item) && (
                          <div className="timeline-item__details">
                            Track: {item.track?.title || 'Unknown'} by {item.track?.artist || 'Unknown'}
                          </div>
                        )}
                        
                        {isSubcategoryClockItem(item) && (
                          <div className="timeline-item__details">
                            Subcategory: {item.subcategory?.name || 'Unknown'}
                          </div>
                        )}
                        
                        {isGenreClockItem(item) && (
                          <div className="timeline-item__details">
                            Genre: {item.genre?.name || 'Unknown'}
                          </div>
                        )}

                        {isNoteClockItem(item) && item.content && (
                          <div className="timeline-item__details">
                            {item.content}
                          </div>
                        )}

                      </div>

                      <div className="timeline-item__time timeline-item__time--duration">
                        <div className="time-label">Duration</div>
                        <div className="time-value">{formatDuration(item.duration || 0)}</div>
                      </div>

                      <div className="timeline-item__time timeline-item__time--end">
                        <div className="time-label">End</div>
                        <div className="time-value">{formatDuration(endTime)}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="clock-preview__empty-state">
              <div className="empty-state-icon">⏰</div>
              <p className="empty-state-message">No items in this clock yet</p>
            </div>
          )}

          <div className="clock-preview__summary">
            <div className="summary-row">
              <span className="summary-label">Total Actual Duration:</span>
              <span className="summary-value">{formatDuration(cumulativeTime)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Target Duration:</span>
              <span className="summary-value">{formatDuration(clock.targetRuntime)}</span>
            </div>
            <div className="summary-row summary-row--total">
              <span className="summary-label">Difference:</span>
              <span className={`summary-value ${
                cumulativeTime > clock.targetRuntime ? 'summary-value--over' : 'summary-value--under'
              }`}>
                {cumulativeTime > clock.targetRuntime ? '+' : ''}{formatDuration(Math.abs(cumulativeTime - clock.targetRuntime))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};