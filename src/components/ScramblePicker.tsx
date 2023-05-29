"use client";

import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { IconButton, Select } from "@chakra-ui/react";
import { useStore } from "@/store";
import { SCRAMBLE_OPTIONS } from "@/store/contants";
import useSelectedScrambleOption from "@/hooks/useSelectedScrambleOption";

const ScramblePicker = () => {
  const {
    generateNewScramble,
    setSelectScrambleOption,
    selectedScrambleOption,
    setSelectedScrambleOptionVariation,
    selectedScrambleOptionVariation,
    goToNextScramble,
    goToPreviousScramble,
  } = useStore((state) => state);

  const { scrambleOption } = useSelectedScrambleOption();

  if (!selectedScrambleOption || !selectedScrambleOptionVariation) return null;

  return (
    <div className="flex items-center justify-center gap-2 pb-4">
      <Select
        width="200px"
        className="text-slate-400"
        borderColor="slategray"
        iconColor="slategray"
        value={selectedScrambleOption.name}
        onChange={(e) => {
          const option = SCRAMBLE_OPTIONS.find(
            (v) => v.name === e.target.value
          );
          if (!option) return;
          setSelectScrambleOption(option);
          generateNewScramble();
        }}
      >
        {SCRAMBLE_OPTIONS.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
      <Select
        width="200px"
        className="text-slate-400"
        borderColor="slategray"
        iconColor="slategray"
        value={selectedScrambleOptionVariation.name}
        onChange={(e) => {
          const variation = scrambleOption?.variations.find(
            (v) => v.name === e.target.value
          );
          if (!variation) return;
          setSelectedScrambleOptionVariation(variation);
          generateNewScramble();
        }}
      >
        {selectedScrambleOption?.variations.map(({ name }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </Select>
      <IconButton
        background="black"
        textColor="slategray"
        aria-label="Previous scramble"
        icon={<ArrowBackIcon />}
        onClick={goToPreviousScramble}
      />
      <IconButton
        background="black"
        textColor="slategray"
        aria-label="Next scramble"
        icon={<ArrowForwardIcon />}
        onClick={goToNextScramble}
      />
    </div>
  );
};

export default ScramblePicker;
