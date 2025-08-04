'use client';

import { GetMusicClockQuery } from '@/graphql/__generated__/graphql';

import {
  isTrackClockItem,
  isSubcategoryClockItem,
  isGenreClockItem,
  isNoteClockItem,
} from './utils';

type ClockQueryResult = NonNullable<GetMusicClockQuery['musicClock']>;

interface ClockPreviewProps {
  clock: ClockQueryResult;
}

export const ClockPreview = ({ clock }: ClockPreviewProps) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getItemTypeColor = (item: ClockQueryResult['items'][number]) => {
    if (isTrackClockItem(item) ||
        isSubcategoryClockItem(item) ||
        isGenreClockItem(item)) {
      return 'status-badge--music';
    } else if (isNoteClockItem(item)) {
      return 'status-badge--note';
    }
    return 'status-badge--default';
  };

  const getItemIcon = (item: ClockQueryResult['items'][number]) => {
    if (isTrackClockItem(item) ||
        isSubcategoryClockItem(item) ||
        isGenreClockItem(item)) {
      return '🎵';
    } else if (isNoteClockItem(item)) {
      return '📝';
    }
    return '❓';
  };

  const getItemTypeName = (item: ClockQueryResult['items'][number]) => {
    if (isTrackClockItem(item)) return 'Track';
    if (isSubcategoryClockItem(item)) return item.subcategory?.name || 'Subcategory';
    if (isGenreClockItem(item)) return item.genre?.name || 'Genre';
    if (isNoteClockItem(item)) return 'Note';
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
                <p className="clock-preview__description">
                  {clock.description}
                </p>
              )}
            </div>
            <div className="clock-preview__duration">
              <div className="duration-label">Target Duration</div>
              <div className="duration-value">
                {formatDuration(clock.targetRuntime)}
              </div>
            </div>
          </div>
        </div>

        <div className="clock-preview__content">
          <h3 className="clock-preview__timeline-title">Clock Timeline</h3>

          {clock.items && clock.items.length > 0 ? (
            <div className="clock-preview__timeline">
              {[...clock.items]
                .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
                .map((item, index: number) => {
                  const startTime = cumulativeTime;
                  cumulativeTime += item.duration || 0;
                  const endTime = cumulativeTime;

                  return (
                    <div key={item.id || index} className="timeline-item">
                      <div className="timeline-item__time timeline-item__time--start">
                        <div className="time-label">Start</div>
                        <div className="time-value">
                          {formatDuration(startTime)}
                        </div>
                      </div>

                      <div className="timeline-item__content">
                        <div className="timeline-item__header">
                          <span className="timeline-item__icon">
                            {getItemIcon(item)}
                          </span>
                          <div className="timeline-item__info">
                            <div className="timeline-item__name">
                              {isTrackClockItem(item) ? item.track?.title || 'Unknown Track' :
                               isSubcategoryClockItem(item) ? item.subcategory?.name || 'Subcategory' :
                               isGenreClockItem(item) ? item.genre?.name || 'Genre' :
                               isNoteClockItem(item) ? (item.content || 'Note') :
                               'Unknown'}
                            </div>
                            <div
                              className={`status-badge ${getItemTypeColor(
                                item,
                              )}`}
                            >
                              {getItemTypeName(item)}
                            </div>
                          </div>
                        </div>

                        {/* Type-specific details */}
                        {item.__typename === 'TrackClockItem' && (
                          <div className="timeline-item__details">
                            Track: {item.track?.title || 'Unknown'}
                          </div>
                        )}

                        {item.__typename === 'SubcategoryClockItem' && (
                          <div className="timeline-item__details">
                            Subcategory: {item.subcategory?.name || 'Unknown'}
                          </div>
                        )}

                        {item.__typename === 'GenreClockItem' && (
                          <div className="timeline-item__details">
                            Genre: {item.genre?.name || 'Unknown'}
                          </div>
                        )}

                        {item.__typename === 'NoteClockItem' && item.content && (
                          <div className="timeline-item__details">
                            {item.content}
                          </div>
                        )}
                      </div>

                      <div className="timeline-item__time timeline-item__time--duration">
                        <div className="time-label">Duration</div>
                        <div className="time-value">
                          {formatDuration(item.duration || 0)}
                        </div>
                      </div>

                      <div className="timeline-item__time timeline-item__time--end">
                        <div className="time-label">End</div>
                        <div className="time-value">
                          {formatDuration(endTime)}
                        </div>
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
              <span className="summary-value">
                {formatDuration(cumulativeTime)}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Target Duration:</span>
              <span className="summary-value">
                {formatDuration(clock.targetRuntime)}
              </span>
            </div>
            <div className="summary-row summary-row--total">
              <span className="summary-label">Difference:</span>
              <span
                className={`summary-value ${
                  cumulativeTime > clock.targetRuntime
                    ? 'summary-value--over'
                    : 'summary-value--under'
                }`}
              >
                {cumulativeTime > clock.targetRuntime ? '+' : ''}
                {formatDuration(Math.abs(cumulativeTime - clock.targetRuntime))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
