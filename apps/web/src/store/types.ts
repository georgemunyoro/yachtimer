import { ScrambleType } from "../utils/scramble";

export type Time = {
  id: string;
  time: number;
  date: string;
  ao5: number;
  ao12: number;
  scramble: string;
};

export type Session = {
  name: string;
  times: Time[];
  scrambleOption: ScrambleOption;
  scrambleOptionVariation: ScrambleOptionVariation;
};

export type UserConfig = {
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
