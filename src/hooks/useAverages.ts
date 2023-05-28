import { calculateAO12, calculateAO5 } from "@/utils/averages";
import { useMemo } from "react";
import useCurrentSession from "./useCurrentSession";

const useAverages = () => {
  const { currentSession } = useCurrentSession();

  const currentAO5 = useMemo(() => {
    const times = currentSession?.times.slice(-5).map((i) => i.time);
    if (!times || times.length !== 5) return null;
    return calculateAO5(times);
  }, [currentSession]);

  const currentAO12 = useMemo(() => {
    const times = currentSession?.times.slice(-12).map((i) => i.time);
    if (!times || times.length !== 12) return null;
    return calculateAO12(times);
  }, [currentSession]);

  const currentMO3 = useMemo(() => {
    const times = currentSession?.times.slice(-3).map((i) => i.time);
    if (!times || times.length !== 3) return null;
    return times.reduce((prev, current) => prev + current, 0) / 3;
  }, []);

  const averagesTableRowData = useMemo(() => {
    const hasSingle = (currentSession?.times.length || 0) > 0;
    return [
      hasSingle && {
        label: "single",
        current: currentSession?.times[currentSession.times.length - 1],
        best: null,
      },
      currentMO3 !== null && { label: "mo3", current: currentMO3, best: null },
      currentAO5 !== null && { label: "ao5", current: currentAO5, best: null },
      currentAO12 !== null && {
        label: "ao12",
        current: currentAO12,
        best: null,
      },
    ].filter((i) => i);
  }, []);

  return {
    currentAO5,
    currentAO12,
    averagesTableRowData,
  };
};

export default useAverages;
