import useAverages from "../hooks/useAverages";
import useCurrentScramble from "../hooks/useCurrentScramble";
import useTimer from "../hooks/useTimer";
import { useStore } from "../store";
import { formatTimeMS } from "../utils/formatting";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

enum TimerState {
  /** The timer is ready to be started. */
  IDLE = "IDLE",

  /** The timer is ready to start. */
  READY = "READY",

  /** The timer is in inspection phase. */
  INSPECTING = "INSPECTING",

  /** The timer is running. */
  TIMING = "TIMING",

  /**
   * The timer has just been stopped. Will go into idle once the
   * user releases the spacebar. This is to prevent the timer from
   * going into idle when the user is still holding the spacebar
   * and starts the timer again.
   * */
  FINISHED = "FINISHED",
}

const Timer = () => {
  const [timerState, setTimerState] = useState<TimerState>(TimerState.IDLE);
  const [timeColor, setTimeColor] = useState("text-white");
  const { currentAO5, currentAO12 } = useAverages();
  const { recordTime, generateNewScramble } = useStore((state) => state);
  const currentScramble = useCurrentScramble();
  const { time, startTimer, stopTimer, resetTimer } = useTimer();

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      if (timerState === TimerState.READY) {
        setTimerState(TimerState.TIMING);
        startTimer();
      } else if (timerState === TimerState.FINISHED) {
        setTimerState(TimerState.IDLE);
      }
      setTimeColor("text-white");
    },
    [startTimer, timerState]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === "Escape" && timerState === TimerState.IDLE) resetTimer();
      if (e.code !== "Space") return;

      // The timer only starts after a delay to prevent accidental starts.
      if (e.repeat && timerState === TimerState.IDLE) {
        setTimeColor("text-green-500");
        setTimerState(TimerState.READY);
        resetTimer();
      } else if (timerState === TimerState.TIMING) {
        stopTimer();
        setTimerState(TimerState.FINISHED);
        if (timerState === TimerState.TIMING && currentScramble)
          recordTime({
            id: uuidv4(),
            time,
            date: Date.now().toString(),
            ao5: currentAO5 || 0,
            ao12: currentAO12 || 0,
            scramble: currentScramble,
          });
        generateNewScramble();
      } else if (
        timerState !== TimerState.READY &&
        timerState !== TimerState.FINISHED
      ) {
        setTimeColor("text-red-500");
      }
    },
    [
      timerState,
      resetTimer,
      stopTimer,
      currentScramble,
      recordTime,
      time,
      currentAO5,
      currentAO12,
      generateNewScramble,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  });

  return <div className={timeColor}>{formatTimeMS(time)}</div>;
};

export default Timer;
