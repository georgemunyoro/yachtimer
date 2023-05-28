/*
 * Calculates ao5 given an array of 5 numbers
 */
export const calculateAO5 = (times: number[]): number => {
  const sortedTimes = [...times].sort();
  sortedTimes.shift();
  sortedTimes.pop();
  return sortedTimes.reduce((prev, current) => prev + current, 0) / 3;
};

export const calculateAO12 = (times: number[]): number => {
  const sortedTimes = [...times].sort();
  sortedTimes.shift();
  sortedTimes.pop();
  return sortedTimes.reduce((prev, current) => prev + current, 0) / 10;
};
