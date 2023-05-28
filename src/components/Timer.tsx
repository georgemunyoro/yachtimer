import useAverages from "@/hooks/useAverages";
import { useStore } from "@/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

enum TimerState {
  IDLE = "IDLE",
  READY = "READY",
  INSPECTING = "INSPECTING",
  TIMING = "TIMING",
}

const Timer = () => {
  const [timerState, setTimerState] = useState<TimerState>(TimerState.IDLE);
  const [timeColor, setTimeColor] = useState("text-white");
  const [runningTime, setRunningTime] = useState(0);
  const [startedTime, setStartedTime] = useState(Date.now() / 1000);

  const { currentAO5, currentAO12 } = useAverages();
  const { recordTime, generateNewScramble } = useStore((state) => state);

  useEffect(() => {
    let intervalId: NodeJS.Timer;
    if (timerState === TimerState.TIMING) {
      intervalId = setInterval(
        () => setRunningTime(Date.now() - startedTime),
        10
      );
    }
    return () => clearInterval(intervalId);
  }, [timerState, runningTime]);

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      if (timerState === TimerState.READY) {
        setTimeColor("text-white");
        setTimerState(TimerState.TIMING);
        setStartedTime(Date.now());
      } else {
        setTimeColor("text-white");
      }
    },
    [timerState]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape" && timerState === TimerState.IDLE)
        setRunningTime(0);
      if (e.code !== "Space") return;
      if (e.repeat && timerState === TimerState.IDLE) {
        setTimeColor("text-green-500");
        setTimerState(TimerState.READY);
        setRunningTime(0);
      } else if (timerState === TimerState.TIMING) {
        setTimerState(TimerState.IDLE);
        if (timerState === TimerState.TIMING)
          recordTime({
            id: uuidv4(),
            time: runningTime,
            date: Date.now().toString(),
            ao5: currentAO5 || 0,
            ao12: currentAO12 || 0,
          });
        generateNewScramble();
      } else if (timerState !== TimerState.READY) {
        setTimeColor("text-red-500");
      }
    },
    [timerState, runningTime]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  });

  return <div className={timeColor}>{(runningTime / 1000).toFixed(2)}</div>;
};

export default Timer;
