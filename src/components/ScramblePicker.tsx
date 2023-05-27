import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import { Box, Button, IconButton, Select } from "@chakra-ui/react";

const scrambleOptions = [
  { label: "2x2x2", value: "222" },
  { label: "3x3x3", value: "333" },
  { label: "4x4x4", value: "444" },
  { label: "5x5x5", value: "555" },
  { label: "6x6x6", value: "666" },
  { label: "7x7x7", value: "777" },
];

const scrambleTypeOptions = [
  {
    label: "WCA",
    value: "WCA",
  },
];

const ScramblePicker = () => {
  return (
    <div className="flex gap-2">
      <Select width="200px" className="text-slate-400" borderColor="slategray" iconColor="slategray">
        {scrambleTypeOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </Select>
      <Select width="200px" className="text-slate-400" borderColor="slategray" iconColor="slategray">
        {scrambleOptions.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </Select>
      <IconButton background="black" textColor="slategray" aria-label="Previous scramble" icon={<ArrowBackIcon />} />
      <IconButton background="black" textColor="slategray" aria-label="Next scramble" icon={<ArrowForwardIcon />} />
    </div>
  );
};

export default ScramblePicker;
