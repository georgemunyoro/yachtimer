import { useCallback, useState } from "react";

/**
 * A hook that provides an accurate timer.
 * @returns
 * - `time`: The current time in milliseconds.
 * - `startTimer`: A function that starts the timer.
 * - `stopTimer`: A function that stops the timer.
 * - `resetTimer`: A function that resets the timer.
 * - `isRunning`: A boolean that indicates whether the timer is running.
 */
const useTimer = () => {
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer>();

  const onUpdate = useCallback(
    (startTime: number) => setTime(Date.now() - startTime),
    []
  );

  const startTimer = useCallback(
    () => setIntervalId(setInterval(onUpdate.bind(null, Date.now()))),
    [onUpdate]
  );

  const stopTimer = useCallback(
    () => intervalId && clearInterval(intervalId),
    [intervalId]
  );

  const resetTimer = () => setTime(0);

  return {
    time,
    startTimer,
    stopTimer,
    resetTimer,
    isRunning: intervalId !== undefined,
  };
};

export default useTimer;
