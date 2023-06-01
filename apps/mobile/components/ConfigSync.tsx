import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReactNode, useEffect } from "react";
import { useStore } from "ui/store";
import { newUserConfig } from "ui/store/contants";
import { UserConfig } from "ui/store/types";

export const ConfigSync = ({ children }: { children: ReactNode }) => {
  const { loadConfig, generateNewScramble } = useStore((state) => state);
  const state = useStore((state) => state);

  useEffect(() => {
    const isInvalidConfig =
      state.currentScrambleType === null ||
      state.selectedScrambleOption === null;
    if (isInvalidConfig) return;
    AsyncStorage.setItem(
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
    const configString = AsyncStorage.getItem("yachtimer_data")
      .then((configString) => {
        if (!configString) {
          throw new Error("No config found");
        }

        const userConfig = JSON.parse(configString);
        if (
          userConfig.currentScrambleType !== null &&
          userConfig.selectedScrambleOption !== null
        ) {
          loadConfig(userConfig);
        } else {
          AsyncStorage.setItem("yachtimer_data", JSON.stringify(newUserConfig));
          loadConfig(newUserConfig);
        }
      })
      .catch(() => {
        loadConfig(newUserConfig);
      })
      .finally(() => {
        generateNewScramble();
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
