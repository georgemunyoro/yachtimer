import { ScrambleType } from "@/utils/scramble";
import { ScrambleOption, Session, UserConfig } from "./types";

export const SCRAMBLE_OPTIONS: ScrambleOption[] = [
  {
    name: "WCA",
    variations: [
      { name: "2x2x2", scrambleType: ScrambleType.WCA_222 },
      { name: "3x3x3", scrambleType: ScrambleType.WCA_333 },
      { name: "4x4x4", scrambleType: ScrambleType.WCA_444 },
      { name: "5x5x5", scrambleType: ScrambleType.WCA_555 },
      { name: "6x6x6", scrambleType: ScrambleType.WCA_666 },
      { name: "7x7x7", scrambleType: ScrambleType.WCA_777 },
      { name: "Clock", scrambleType: ScrambleType.WCA_CLOCK },
    ],
  },
];

const DEFAULT_SESSIONS: Session[] = [
  {
    name: "2x2x2",
    times: [],
    scrambleOption: SCRAMBLE_OPTIONS[0],
    scrambleOptionVariation: SCRAMBLE_OPTIONS[0].variations[0],
  },
  {
    name: "3x3x3",
    times: [],
    scrambleOption: SCRAMBLE_OPTIONS[0],
    scrambleOptionVariation: SCRAMBLE_OPTIONS[0].variations[1],
  },
  {
    name: "Clock",
    times: [],
    scrambleOption: SCRAMBLE_OPTIONS[0],
    scrambleOptionVariation: SCRAMBLE_OPTIONS[0].variations[6],
  },
];

export const newUserConfig: UserConfig = {
  currentScrambleType: ScrambleType.WCA_333,
  selectedScrambleOption: SCRAMBLE_OPTIONS[0],
  selectedScrambleOptionVariation: SCRAMBLE_OPTIONS[0].variations[1],
  sessions: DEFAULT_SESSIONS,
  selectedSession: DEFAULT_SESSIONS[0].name,
} as const;
