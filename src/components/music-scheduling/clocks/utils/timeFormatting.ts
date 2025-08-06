/**
 * Convert hh:mm:ss to mm:ss for display
 */
export const formatTimeForDisplay = (timeString?: string | null): string => {
  if (!timeString) return '';
  const parts = timeString.split(':');
  if (parts.length >= 2) {
    const minutes = parts[1];
    const seconds = parts[2] || '00';
    return `${minutes}:${seconds}`;
  }
  return timeString;
};

/**
 * Convert mm:ss to hh:mm:ss for backend
 */
export const formatTimeForBackend = (mmssTime: string): string => {
  if (!mmssTime) return '';
  const parts = mmssTime.split(':');
  if (parts.length === 2) {
    const minutes = parts[0].padStart(2, '0');
    const seconds = parts[1].padStart(2, '0');
    return `00:${minutes}:${seconds}`;
  }
  return mmssTime;
};

/**
 * Validate mm:ss format
 */
export const isValidMmSsFormat = (timeString: string): boolean => {
  if (!timeString) return true; // empty is valid for optional fields
  const mmssPattern = /^([0-5]?[0-9]):([0-5][0-9])$/;
  return mmssPattern.test(timeString);
};