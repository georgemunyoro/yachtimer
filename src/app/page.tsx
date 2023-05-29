"use client";

import ScramblePicker from "@/components/ScramblePicker";
import Time from "@/components/Time";
import TimesList from "@/components/TimesList";
import { useStore } from "@/store";
import { Box } from "@chakra-ui/react";
import Timer from "@/components/Timer";
import useAverages from "@/hooks/useAverages";
import { ConfigSync } from "@/components/ConfigSync";
import useCurrentScramble from "@/hooks/useCurrentScramble";

export default function Home() {
  const { currentAO5, currentAO12 } = useAverages();
  const currentScramble = useCurrentScramble();

  return (
    <ConfigSync>
      <div className="w-screen h-screen flex bg-black text-slate-200">
        <div className="w-[400px] h-full flex flex-col gap-3">
          <TimesList />
        </div>
        <div className="w-500 w-full h-full flex flex-col items-center justify-center p-5">
          <div className="flex flex-col items-center justify-center gap-2">
            <ScramblePicker />
            <Box className="text-[2rem] tracking-widest text-center">
              {currentScramble}
            </Box>
          </div>
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center -gap-4">
              <div className="text-[15rem] leading-[15rem] -mt-[8rem]">
                <Timer />
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
    </ConfigSync>
  );
}
