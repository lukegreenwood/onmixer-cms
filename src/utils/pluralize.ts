/**
 * Pluralizes a word based on the count of items
 * @param count The number of items
 * @param singular The singular form of the word
 * @param plural Optional plural form of the word. If not provided, will append 's' to the singular form
 * @returns The appropriate form of the word based on count
 */
export const pluralize = (
  count: number,
  singular: string,
  plural?: string,
): string => {
  if (count === 1) {
    return singular;
  }

  return plural || `${singular}s`;
};
