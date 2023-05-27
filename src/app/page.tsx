"use client";

import ScramblePicker from "@/components/ScramblePicker";
import TimesList from "@/components/TimesList";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <div className="w-screen h-screen flex bg-black text-slate-200">
      <div className="w-[400px] h-full">
        <TimesList />
      </div>
      <div className="w-500 w-full h-full flex flex-col">
        <div className="h-[150px] p-4 flex justify-center flex-col gap-2 pl-[280px]">
          <ScramblePicker />
          <Box className="w-full flex items-center ustify-center text-[30px] tracking-widest -ml-[190px]">
            R2 D' L B2 U2 R2 B2 U2 L R2 B2 R' U2 B2 D' R B F' L' R F'
          </Box>
        </div>
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center -gap-4 -mt-[150px] -ml-[320px]">
            <div className="text-[15rem] leading-[15rem]">11.58</div>
            <div className="flex gap-12">
              <div className="flex flex-col justify-center items-center">
                <div className="text-[4rem] text-slate-500">12.43</div>ao5
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="text-[4rem] text-slate-500">13.21</div>ao12
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
