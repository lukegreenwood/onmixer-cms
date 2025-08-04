/**
 * Color utility functions for contrast calculation
 */

/**
 * Convert hex color to RGB values
 */
export const hexToRgb = (
  hex: string,
): { r: number; g: number; b: number } | null => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Handle 3-digit hex codes
  if (cleanHex.length === 3) {
    const [r, g, b] = cleanHex
      .split('')
      .map((char) => parseInt(char + char, 16));
    return { r, g, b };
  }

  // Handle 6-digit hex codes
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substr(0, 2), 16);
    const g = parseInt(cleanHex.substr(2, 2), 16);
    const b = parseInt(cleanHex.substr(4, 2), 16);
    return { r, g, b };
  }

  return null;
};

/**
 * Calculate the relative luminance of a color
 * Based on WCAG 2.1 specification
 */
export const getLuminance = (r: number, g: number, b: number): number => {
  // Convert RGB to linear RGB
  const toLinear = (channel: number) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const rLinear = toLinear(r);
  const gLinear = toLinear(g);
  const bLinear = toLinear(b);

  // Calculate luminance using WCAG formula
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};

/**
 * Determine if white or black text should be used on a given background color
 * Returns 'white' or 'black' based on contrast ratio
 */
export const getContrastColor = (backgroundColor: string): 'dark' | 'light' => {
  const rgb = hexToRgb(backgroundColor);

  if (!rgb) {
    // If we can't parse the color, default to white (safe for most cases)
    return 'light';
  }

  const luminance = getLuminance(rgb.r, rgb.g, rgb.b);

  // Use a higher threshold for better contrast
  // Values above this threshold work better with black text
  // Values below work better with white text
  return luminance > 0.5 ? 'dark' : 'light';
};

/**
 * Get the hex color value for contrast text color
 */
export const getContrastHexColor = (backgroundColor: string): string => {
  const contrastColor = getContrastColor(backgroundColor);
  return contrastColor === 'light' ? '#ffffff' : '#000000';
};
