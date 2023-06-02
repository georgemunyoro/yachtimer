import { useCallback, useMemo, useState } from "react";
import { Text, GestureResponderEvent, TouchableOpacity } from "react-native";
import { formatTimeMS } from "ui/utils/formatting";
import useTimer from "ui/hooks/useTimer";
import { useStore } from "ui/store";
import uuid from "react-native-uuid";

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
  const { time, startTimer, stopTimer, resetTimer, isRunning } = useTimer();
  const { scrambleIndex, scrambleHistory, generateNewScramble, recordTime } =
    useStore((state) => state);

  const currentScramble = useMemo(
    () => (scrambleIndex === null ? null : scrambleHistory[scrambleIndex]),
    [scrambleIndex, scrambleHistory]
  );

  const onPointerUp = useCallback(
    (e: GestureResponderEvent) => {
      if (e.nativeEvent.identifier.toString() !== "1") return;

      if (timerState === TimerState.READY) {
        startTimer();
      }
    },
    [startTimer, timerState]
  );

  const onPointerDown = useCallback(
    (e: GestureResponderEvent) => {
      if (e.nativeEvent.identifier.toString() !== "1") return;

      stopTimer();
      setTimerState(TimerState.IDLE);

      if (timerState === TimerState.READY) {
        stopTimer();
        setTimerState(TimerState.FINISHED);
        const id = uuid.v4();
        if (currentScramble && typeof id === "string") {
          recordTime({
            id,
            time,
            date: Date.now().toString(),
            ao5: 0,
            ao12: 0,
            scramble: currentScramble,
          });
        }
        generateNewScramble();
      } else if (timerState === TimerState.FINISHED) {
        setTimerState(TimerState.IDLE);
      }
    },
    [
      stopTimer,
      timerState,
      currentScramble,
      generateNewScramble,
      recordTime,
      time,
    ]
  );

  const onLongPress = useCallback(
    (e: GestureResponderEvent) => {
      console.log("long");

      if (timerState === TimerState.IDLE) {
        setTimerState(TimerState.READY);
      }
    },
    [timerState]
  );

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onLongPress={onLongPress}
      onPressIn={onPointerDown}
      onPressOut={onPointerUp}
      delayLongPress={300}
    >
      <Text
        style={{
          fontSize: 100,
          color: "white",
        }}
      >
        {formatTimeMS(time)}
      </Text>
    </TouchableOpacity>
  );
};

export default Timer;
