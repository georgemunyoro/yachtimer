import {
  calculateAO100,
  calculateAO12,
  calculateAO200,
  calculateAO25,
  calculateAO5,
} from "../utils/averages";
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

  const currentAO25 = useMemo(() => {
    const times = currentSession?.times.slice(0, 25).map((i) => i.time);
    if (!times || times.length !== 25) return null;
    return calculateAO25(times);
  }, [currentSession?.times]);

  const currentAO100 = useMemo(() => {
    const times = currentSession?.times.slice(0, 100).map((i) => i.time);
    if (!times || times.length !== 100) return null;
    return calculateAO100(times);
  }, [currentSession?.times]);

  const currentAO200 = useMemo(() => {
    const times = currentSession?.times.slice(0, 200).map((i) => i.time);
    if (!times || times.length !== 100) return null;
    return calculateAO200(times);
  }, [currentSession?.times]);

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
      currentAO25 !== null && {
        label: "ao25",
        current: currentAO25,
        best: null,
      },
      currentAO100 !== null && {
        label: "ao100",
        current: currentAO100,
        best: null,
      },
      currentAO200 !== null && {
        label: "ao200",
        current: currentAO200,
        best: null,
      },
    ].filter((i) => i);
  }, [
    currentAO100,
    currentAO12,
    currentAO200,
    currentAO25,
    currentAO5,
    currentMO3,
    currentSession?.times,
  ]);

  return {
    currentAO5,
    currentAO12,
    currentAO25,
    currentAO100,
    currentAO200,
    averagesTableRowData,
  };
};

export default useAverages;
