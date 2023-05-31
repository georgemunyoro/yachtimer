import { useStore } from "../store";
import { SCRAMBLE_OPTIONS } from "../store/contants";
import { useMemo } from "react";

const useSelectedScrambleOption = () => {
  const { selectedScrambleOption, selectedScrambleOptionVariation } = useStore(
    (state) => state
  );

  const scrambleOption = useMemo(
    () =>
      SCRAMBLE_OPTIONS.find(
        (option) => option.name === selectedScrambleOption?.name
      ),
    [selectedScrambleOption?.name]
  );

  const scrambleOptionVariation = useMemo(
    () =>
      scrambleOption?.variations.find(
        (variation) => variation.name === selectedScrambleOptionVariation?.name
      ),
    [scrambleOption, selectedScrambleOptionVariation?.name]
  );

  return {
    scrambleOption,
    scrambleOptionVariation,
  };
};

export default useSelectedScrambleOption;
