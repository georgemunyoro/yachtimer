import { useFonts } from "expo-font";
import { View, Text } from "react-native";
import { ScrambleType } from "ui/utils/scramble";

type EventIconProps = {
  focused: boolean;
  event: ScrambleType;
};

// TODO: Replace with actual icons
const eventToIcon = {
  [ScrambleType.WCA_222]: "2x2x3",
  [ScrambleType.WCA_333]: "3x3x3",
  [ScrambleType.WCA_444]: "4x4x4",
  [ScrambleType.WCA_555]: "5x5x5",
  [ScrambleType.WCA_666]: "6x6x6",
  [ScrambleType.WCA_777]: "7x7x7",
  [ScrambleType.WCA_CLOCK]: "Clock",
};

const EventIcon = ({ focused, event }: EventIconProps) => {
  return (
    <View>
      <Text>{eventToIcon[event]}</Text>
    </View>
  );
};

export default EventIcon;
