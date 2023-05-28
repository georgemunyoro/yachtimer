"use client";

import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Badge, IconButton, Select } from "@chakra-ui/react";
import { SCRAMBLE_OPTIONS, useStore } from "@/store";

const ScramblePicker = () => {
  const {
    generateNewScramble,
    selectScrambleOption,
    selectedScrambleOption,
    selectScrambleOptionVariation,
    selectedScrambleOptionVariation,
  } = useStore((state) => state);

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
          selectScrambleOption(option);
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
          const variation = selectedScrambleOption.variations.find(
            (v) => v.name === e.target.value
          );
          if (!variation) return;
          selectScrambleOptionVariation(variation);
          generateNewScramble();
        }}
      >
        {selectedScrambleOption.variations.map(({ name }) => (
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
      />
      <IconButton
        background="black"
        textColor="slategray"
        aria-label="Next scramble"
        icon={<ArrowForwardIcon />}
        onClick={generateNewScramble}
      />
    </div>
  );
};

export default ScramblePicker;
