import { memo } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { View, Text } from "react-native";
import { useStore } from "ui/store";
import { Session } from "ui/store/types";
import { Button, IconButton } from "react-native-paper";

const SessionPicker = () => {
  const { generateNewScramble, sessions, selectedSession, setSelectedSession } =
    useStore((state) => state);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SelectDropdown
        defaultValue={selectedSession}
        dropdownStyle={{
          borderRadius: 10,
        }}
        buttonStyle={{
          borderRadius: 10,
          width: 120,
          backgroundColor: "black",
          padding: 0,
          margin: 0,
        }}
        renderCustomizedButtonChild={() => {
          return (
            <Button
              style={{
                padding: 0,
                width: 100,
              }}
              mode="elevated"
            >
              {selectedSession}
            </Button>
          );
        }}
        buttonTextStyle={{
          color: "white",
        }}
        data={sessions}
        buttonTextAfterSelection={(selectedItem) => selectedItem.name}
        rowTextForSelection={(item) => item.name}
        onSelect={(selectedItem: Session) => {
          setSelectedSession(selectedItem.name);
          generateNewScramble();
        }}
      />
    </View>
  );
};

export default SessionPicker;
