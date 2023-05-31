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

export const calculateAO25 = (times: number[]): number => {
  const sortedTimes = [...times].sort();
  sortedTimes.shift();
  sortedTimes.pop();
  return sortedTimes.reduce((prev, current) => prev + current, 0) / 25;
};

export const calculateAO100 = (times: number[]): number => {
  const sortedTimes = [...times].sort().slice(5, -5);
  return sortedTimes.reduce((prev, current) => prev + current, 0) / 100;
};

export const calculateAO200 = (times: number[]): number => {
  const sortedTimes = [...times].sort().slice(10, -10);
  return sortedTimes.reduce((prev, current) => prev + current, 0) / 200;
};
