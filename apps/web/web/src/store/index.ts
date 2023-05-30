import { ScrambleType, generateScramble } from "../utils/scramble";
import { create } from "zustand";
import {
  ScrambleOption,
  Session,
  UserConfig,
  ScrambleOptionVariation,
  Time,
} from "./types";

type StoreState = {
  scrambleHistory: string[];
  scrambleIndex: number | null;
  currentScrambleType: ScrambleType | null;
  selectedScrambleOption: ScrambleOption | null;
  selectedScrambleOptionVariation: ScrambleOptionVariation | null;
  sessions: Session[];
  selectedSession: string | null;
  currentTime: Time | null;

  generateNewScramble: () => void;
  goToPreviousScramble: () => void;
  goToNextScramble: () => void;
  loadConfig: (config: UserConfig) => void;
  setSelectScrambleOption: (option: ScrambleOption) => void;
  setSelectedScrambleOptionVariation: (option: ScrambleOptionVariation) => void;
  setSelectedSession: (sessionName: string) => void;
  recordTime: (time: Time) => void;
  deleteTime: (timeId: string) => void;
  createSession: (sessionName: string) => void;
  updateSession: (updatedSession: Partial<Session>) => void;
  deleteSession: (sessionName: string) => void;
};

export const useStore = create<StoreState>((set) => ({
  scrambleHistory: [],
  scrambleIndex: null,
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

  goToPreviousScramble: () => {
    set((state) => {
      if (state.scrambleIndex === null) return state;
      const newIndex = state.scrambleIndex - 1;
      return {
        ...state,
        scrambleIndex: newIndex < 0 ? 0 : newIndex,
      };
    });
  },

  goToNextScramble: () => {
    set((state) => {
      if (state.scrambleIndex === null || state.currentScrambleType === null)
        return state;
      const newIndex = state.scrambleIndex + 1;
      return {
        ...state,
        scrambleIndex: newIndex,
        scrambleHistory:
          newIndex === state.scrambleHistory.length
            ? [
                ...state.scrambleHistory,
                generateScramble(state.currentScrambleType),
              ]
            : state.scrambleHistory,
      };
    });
  },

  generateNewScramble: () => {
    set((state) => {
      if (!state.currentScrambleType) return state;
      return {
        ...state,
        scrambleHistory: [
          ...state.scrambleHistory,
          generateScramble(state.currentScrambleType),
        ],
        scrambleIndex: state.scrambleHistory.length,
      };
    });
  },

  setSelectScrambleOption: (option: ScrambleOption) => {
    set((state) => ({
      ...state,
      selectedScrambleOption: option,
      selectedScrambleOptionVariation: option.variations[0],
      currentScrambleType: option.variations[0].scrambleType,
    }));
  },

  setSelectedScrambleOptionVariation: (option: ScrambleOptionVariation) => {
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

  recordTime: (newTime: Time) => {
    set((state) => ({
      ...state,
      sessions: state.sessions.map((s) =>
        s.name === state.selectedSession
          ? {
              ...s,
              times: [newTime, ...s.times],
            }
          : s
      ),
    }));
  },

  deleteTime: (timeId: string) => {
    set((state) => ({
      ...state,
      sessions: state.sessions.map((s) =>
        s.name === state.selectedSession
          ? {
              ...s,
              times: s.times.filter((i) => i.id !== timeId),
            }
          : s
      ),
    }));
  },

  createSession: (sessionName: string) => {
    set((state) => ({
      ...state,
      sessions: [
        ...state.sessions,
        {
          name: sessionName,
          times: [],
          scrambleOption: state.selectedScrambleOption as ScrambleOption,
          scrambleOptionVariation:
            state.selectedScrambleOptionVariation as ScrambleOptionVariation,
        },
      ],
      selectedSession: sessionName,
    }));
  },

  deleteSession: (sessionName: string) => {
    set((state) => {
      const newSessions = state.sessions.filter((s) => s.name !== sessionName);
      return {
        ...state,
        sessions: newSessions,
        selectedSession: newSessions[0].name,
      };
    });
  },

  updateSession: (updatedSession: Partial<Session>) => {
    set((state) => ({
      ...state,
      selectedSession: updatedSession.name || state.selectedSession,
      sessions: state.sessions.map((s) =>
        s.name === state.selectedSession
          ? {
              ...s,
              ...updatedSession,
            }
          : s
      ),
    }));
  },
}));
