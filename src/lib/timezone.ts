import { utc } from '@date-fns/utc';
import { format, parse } from 'date-fns';

/**
 * Convert local time string to UTC time string for backend storage
 * @param localTimeString - Time string in local timezone (e.g., "10:00:00")
 * @returns UTC time string (e.g., "09:00:00" for BST)
 */
export const convertLocalTimeToUTC = (localTimeString: string): string => {
  try {
    const today = new Date();
    const timeFormat = localTimeString.split(':').length === 3 ? 'HH:mm:ss' : 'HH:mm';
    const localDate = parse(localTimeString, timeFormat, today);
    
    if (isNaN(localDate.getTime())) {
      return localTimeString;
    }
    
    // Convert to UTC and format as time string
    return format(localDate, 'HH:mm:ss', { in: utc });
  } catch {
    return localTimeString;
  }
};

/**
 * Convert UTC time string to local time string for display
 * @param utcTimeString - UTC time string from backend (e.g., "09:00:00")
 * @returns Local time string for display (e.g., "10:00:00" for BST)
 */
export const convertUTCTimeToLocal = (utcTimeString: string): string => {
  try {
    // Parse the UTC time components
    const [hours, minutes, seconds = '0'] = utcTimeString.split(':').map(Number);
    
    if (isNaN(hours) || isNaN(minutes)) {
      return utcTimeString;
    }
    
    // Create a date and set UTC time
    const utcDate = new Date();
    utcDate.setUTCHours(hours, minutes, parseInt(seconds.toString()), 0);
    
    if (isNaN(utcDate.getTime())) {
      return utcTimeString;
    }
    
    // Format in local timezone for display (automatically converts from UTC to local)
    return format(utcDate, 'HH:mm:ss');
  } catch {
    return utcTimeString;
  }
};

/**
 * Convert UTC datetime string to local datetime string for display
 * @param utcDateTimeString - UTC datetime string from backend
 * @returns Local datetime string for display
 */
export const convertUTCDateTimeToLocal = (utcDateTimeString: string): string => {
  try {
    const utcDate = new Date(utcDateTimeString);
    
    if (isNaN(utcDate.getTime())) {
      return utcDateTimeString;
    }
    
    // Format in local timezone for display
    return format(utcDate, 'yyyy-MM-dd HH:mm:ss');
  } catch {
    return utcDateTimeString;
  }
};

/**
 * Convert local datetime string to UTC datetime string for backend storage
 * @param localDateTimeString - Local datetime string
 * @returns UTC datetime string for backend
 */
export const convertLocalDateTimeToUTC = (localDateTimeString: string): string => {
  try {
    const localDate = new Date(localDateTimeString);
    
    if (isNaN(localDate.getTime())) {
      return localDateTimeString;
    }
    
    // Convert to UTC
    return format(localDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", { in: utc });
  } catch {
    return localDateTimeString;
  }
};