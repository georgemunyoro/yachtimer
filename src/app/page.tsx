"use client";

import ScramblePicker from "@/components/ScramblePicker";
import Time from "@/components/Time";
import TimesList from "@/components/TimesList";
import { newUserConfig, useStore } from "@/store";
import { calculateAO12, calculateAO5 } from "@/utils/averages";
import { Box } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";

export default function Home() {
  const {
    currentScramble,
    generateNewScramble,
    loadConfig,
    currentTime,
    selectedSession,
    sessions,
  } = useStore((state) => state);

  useEffect(() => {
    loadConfig(newUserConfig);
    generateNewScramble();
  }, []);

  const currentAO5 = useMemo(() => {
    const times = sessions
      .find((s) => s.name === selectedSession)
      ?.times.slice(-12)
      .map((i) => i.time);
    if (!times || times.length !== 5) return null;
    return calculateAO5(times);
  }, []);

  const currentAO12 = useMemo(() => {
    const times = sessions
      .find((s) => s.name === selectedSession)
      ?.times.slice(-12)
      .map((i) => i.time);
    if (!times || times.length !== 5) return null;
    return calculateAO12(times);
  }, []);

  return (
    <div className="w-screen h-screen flex bg-black text-slate-200">
      <div className="w-[400px] h-full flex flex-col gap-3">
        <TimesList />
      </div>
      <div className="w-500 w-full h-full flex flex-col items-center justify-center p-5">
        <div className="flex flex-col items-center justify-center gap-2">
          <ScramblePicker />
          <Box className="text-[30px] tracking-widest text-center">
            {currentScramble}
          </Box>
        </div>
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center -gap-4">
            <div className="text-[15rem] leading-[15rem]">
              <Time time={currentTime} />
            </div>
            <div className="flex gap-12">
              {currentAO5 !== null && (
                <div className="flex flex-col justify-center items-center">
                  <div className="text-[4rem] text-slate-500">
                    <Time time={currentAO5} />
                  </div>
                  ao5
                </div>
              )}
              {currentAO12 !== null && (
                <div className="flex flex-col justify-center items-center">
                  <div className="text-[4rem] text-slate-500">
                    <Time time={currentAO12} />
                  </div>
                  ao12
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
