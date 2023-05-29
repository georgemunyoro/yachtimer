import { useStore } from "@/store";
import { newUserConfig } from "@/store/contants";
import { UserConfig } from "@/store/types";
import { ReactNode, useEffect } from "react";

export const ConfigSync = ({ children }: { children: ReactNode }) => {
  const { loadConfig, generateNewScramble } = useStore((state) => state);
  const state = useStore((state) => state);

  useEffect(() => {
    const isInvalidConfig =
      state.currentScrambleType === null ||
      state.selectedScrambleOption === null;
    if (isInvalidConfig) return;
    localStorage.setItem(
      "yachtimer_data",
      JSON.stringify({
        currentScrambleType: state.currentScrambleType,
        selectedScrambleOption: state.selectedScrambleOption,
        selectedScrambleOptionVariation: state.selectedScrambleOptionVariation,
        sessions: state.sessions,
        selectedSession: state.selectedSession,
      } as UserConfig)
    );
  }, [state]);

  useEffect(() => {
    const configString = localStorage.getItem("yachtimer_data");
    if (configString) {
      const userConfig = JSON.parse(configString);
      if (
        userConfig.currentScrambleType !== null &&
        userConfig.selectedScrambleOption !== null
      ) {
        loadConfig(userConfig);
      } else {
        localStorage.setItem("yachtimer_data", JSON.stringify(newUserConfig));
        loadConfig(newUserConfig);
      }
    } else {
      loadConfig(newUserConfig);
    }
    generateNewScramble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
