import { ScrambleType, generateScramble } from "@/utils/scramble";
import { create } from "zustand";

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
    ],
  },
];

export type Time = {
  id: string;
  time: number;
  date: string;
  ao5: number;
  ao12: number;
};

export type Session = {
  name: string;
  times: Time[];
  scrambleOption: ScrambleOption;
  scrambleOptionVariation: ScrambleOptionVariation;
};

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
];

export const newUserConfig: UserConfig = {
  currentScrambleType: ScrambleType.WCA_333,
  selectedScrambleOption: SCRAMBLE_OPTIONS[0],
  selectedScrambleOptionVariation: SCRAMBLE_OPTIONS[0].variations[1],
  sessions: DEFAULT_SESSIONS,
  selectedSession: DEFAULT_SESSIONS[0].name,
} as const;

type UserConfig = {
  currentScrambleType: ScrambleType;
  selectedScrambleOption: ScrambleOption;
  selectedScrambleOptionVariation: ScrambleOptionVariation;
  sessions: Session[];
  selectedSession: string;
};

export type ScrambleOption = {
  name: string;
  variations: ScrambleOptionVariation[];
};

export type ScrambleOptionVariation = {
  name: string;
  scrambleType: ScrambleType;
};

type StoreState = {
  scrambleHistory: string[];
  currentScramble: string | null;
  currentScrambleType: ScrambleType | null;
  selectedScrambleOption: ScrambleOption | null;
  selectedScrambleOptionVariation: ScrambleOptionVariation | null;
  sessions: Session[];
  selectedSession: string | null;
  currentTime: Time | null;
  generateNewScramble: () => void;
  loadConfig: (config: UserConfig) => void;
  selectScrambleOption: (option: ScrambleOption) => void;
  selectScrambleOptionVariation: (option: ScrambleOptionVariation) => void;
  setSelectedSession: (sessionName: string) => void;
};

export const useStore = create<StoreState>((set) => ({
  scrambleHistory: [],
  currentScramble: null,
  currentScrambleType: null,
  selectedScrambleOption: null,
  selectedScrambleOptionVariation: null,
  sessions: [],
  selectedSession: null,
  currentTime: null,
  loadConfig: (config: UserConfig) => {
    set((state) => ({
      ...state,
      ...config,
    }));
  },
  generateNewScramble: () => {
    set((state) => ({
      ...state,
      currentScramble:
        state.currentScrambleType === null
          ? null
          : generateScramble(state.currentScrambleType),
      scrambleHistory:
        state.currentScramble === null
          ? state.scrambleHistory
          : [...state.scrambleHistory, state.currentScramble],
    }));
  },
  selectScrambleOption: (option: ScrambleOption) => {
    set((state) => ({
      ...state,
      selectedScrambleOption: option,
      selectedScrambleOptionVariation: option.variations[0],
      currentScrambleType: option.variations[0].scrambleType,
    }));
  },
  selectScrambleOptionVariation: (option: ScrambleOptionVariation) => {
    set((state) => ({
      ...state,
      selectedScrambleOptionVariation: option,
      currentScrambleType: option.scrambleType,
    }));
  },
  setSelectedSession: (sessionName: string) => {
    set((state) => ({
      ...state,
      selectedSession: sessionName,
    }));
  },
}));
