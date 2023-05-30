/**
 * Format a time in milliseconds to a human readable format.
 * @param timeMS Time in milliseconds.
 * @returns Time in human readable format.
 * @example
 * formatTimeMS(undefined) // "0.00"
 * formatTimeMS(0) // "0.00"
 * formatTimeMS(1234) // "1.23"
 * formatTimeMS(12345) // "12.35"
 * formatTimeMS(123456) // "2:03.46"
 * formatTimeMS(1234567) // "20:34.57
 **/
export const formatTimeMS = (timeMS: number | undefined): string => {
  if (timeMS === 0 || timeMS === undefined) {
    return "0.00";
  }

  const timeInSeconds = timeMS / 1000;
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = (timeInSeconds % 60).toFixed(2);

  if (minutes === 0) {
    return seconds;
  }

  return `${minutes}:${seconds.padStart(5, "0")}`;
};
