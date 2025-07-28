'use client';

import type { MusicClock } from '../types';

interface ClockPreviewProps {
  clock: MusicClock;
}

export const ClockPreview = ({ clock }: ClockPreviewProps) => {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getItemTypeColor = (type: string) => {
    switch (type) {
      case 'MUSIC_SLOT':
      case 'MusicSlot':
        return 'status-badge--music';
      case 'NOTE_BLOCK':
      case 'NoteBlock':
        return 'status-badge--note';
      case 'AD_BREAK':
      case 'AdBreak':
        return 'status-badge--ad';
      case 'STATION_IDENT':
      case 'StationIdent':
        return 'status-badge--ident';
      default:
        return 'status-badge--default';
    }
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'MUSIC_SLOT':
      case 'MusicSlot':
        return '🎵';
      case 'NOTE_BLOCK':
      case 'NoteBlock':
        return '📝';
      case 'AD_BREAK':
      case 'AdBreak':
        return '📺';
      case 'STATION_IDENT':
      case 'StationIdent':
        return '📻';
      default:
        return '❓';
    }
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
              <div className="duration-value">{formatDuration(clock.duration)}</div>
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
                          <span className="timeline-item__icon">{getItemIcon(item.type || item.__typename || 'MUSIC_SLOT')}</span>
                          <div className="timeline-item__info">
                            <div className="timeline-item__name">{item.name}</div>
                            <div className={`status-badge ${getItemTypeColor(item.type || item.__typename || 'MUSIC_SLOT')}`}>
                              {(item.type || item.__typename)?.replace('_', ' ')}
                            </div>
                          </div>
                        </div>

                        {/* Type-specific details */}
                        {(item.type === 'MUSIC_SLOT' || item.__typename === 'MusicSlot') && (
                          <div className="timeline-item__details">
                            {item.categories && item.categories.length > 0 && (
                              <span>Categories: {item.categories.join(', ')} • </span>
                            )}
                            {item.genres && item.genres.length > 0 && (
                              <span>Genres: {item.genres.join(', ')} • </span>
                            )}
                            Priority: {item.priority || item.musicPriority || 5}
                          </div>
                        )}

                        {(item.type === 'NOTE_BLOCK' || item.__typename === 'NoteBlock') && item.content && (
                          <div className="timeline-item__details">
                            {item.content}
                          </div>
                        )}

                        {(item.type === 'AD_BREAK' || item.__typename === 'AdBreak') && (
                          <div className="timeline-item__details">
                            {item.adType?.replace('_', ' ')}
                            {item.isFixed && ' • Fixed Duration'}
                          </div>
                        )}

                        {(item.type === 'STATION_IDENT' || item.__typename === 'StationIdent') && (
                          <div className="timeline-item__details">
                            {item.identType?.replace('_', ' ')}
                            {item.trackId && ` • Track: ${item.trackId}`}
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
              <span className="summary-value">{formatDuration(clock.duration)}</span>
            </div>
            <div className="summary-row summary-row--total">
              <span className="summary-label">Difference:</span>
              <span className={`summary-value ${
                cumulativeTime > clock.duration ? 'summary-value--over' : 'summary-value--under'
              }`}>
                {cumulativeTime > clock.duration ? '+' : ''}{formatDuration(Math.abs(cumulativeTime - clock.duration))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};