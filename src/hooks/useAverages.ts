import { calculateAO12, calculateAO5 } from "@/utils/averages";
import { useMemo } from "react";
import useCurrentSession from "./useCurrentSession";

const useAverages = () => {
  const { currentSession } = useCurrentSession();

  const currentAO5 = useMemo(() => {
    const times = currentSession?.times.slice(0, 5).map((i) => i.time);
    if (!times || times.length !== 5) return null;
    return calculateAO5(times);
  }, [currentSession]);

  const currentAO12 = useMemo(() => {
    const times = currentSession?.times.slice(0, 12).map((i) => i.time);
    if (!times || times.length !== 12) return null;
    return calculateAO12(times);
  }, [currentSession]);

  const currentMO3 = useMemo(() => {
    const times = currentSession?.times.slice(0, 3).map((i) => i.time);
    if (!times || times.length !== 3) return null;
    return times.reduce((prev, current) => prev + current, 0) / 3;
  }, [currentSession]);

  const averagesTableRowData = useMemo(() => {
    const hasSingle = (currentSession?.times.length || 0) > 0;
    return [
      hasSingle && {
        label: "single",
        current: currentSession?.times[0].time,
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
  }, [currentAO12, currentAO5, currentMO3, currentSession]);

  return {
    currentAO5,
    currentAO12,
    averagesTableRowData,
  };
};

export default useAverages;
