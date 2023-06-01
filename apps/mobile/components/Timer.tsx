import { useCallback, useMemo, useState } from "react";
import { View, Text, GestureResponderEvent } from "react-native";
import useTimer from "ui/hooks/useTimer";
import { useStore } from "ui/store";
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
  const { time, startTimer, stopTimer, resetTimer, isRunning } = useTimer();
  const [timerColor, setTimerColor] = useState<string>("white");
  const { scrambleIndex, scrambleHistory } = useStore((state) => state);

  const [isTouching, setIsTouching] = useState(false);

  const currentScramble = useMemo(
    () => (scrambleIndex === null ? null : scrambleHistory[scrambleIndex]),
    [scrambleIndex, scrambleHistory]
  );

  const onPointerUp = useCallback((e: GestureResponderEvent) => {
    if (e.nativeEvent.identifier.toString() !== "1") return;
    console.log("up");
    setIsTouching(false)
  }, []);

  const onPointerDown = useCallback((e: GestureResponderEvent) => {
    if (e.nativeEvent.identifier.toString() !== "1") return;
    console.log("down");
    setIsTouching(true)
  }, []);

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onTouchStart={onPointerDown}
      onTouchEnd={onPointerUp}
    >
      <Text style={{ fontSize: 100, color: isTouching ? "red" : timerColor }}>
        {time}
      </Text>
    </View>
  );
};

export default Timer;
