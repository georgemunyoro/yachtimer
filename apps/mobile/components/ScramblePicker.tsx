import { View, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { SCRAMBLE_OPTIONS } from "ui/store/contants";
import { useStore } from "ui/store";
import CurrentScramble from "./CurrentScramble";
import { ScrambleOption, ScrambleOptionVariation } from "ui/store/types";
import { Button } from "react-native-paper";
import SessionPicker from "./SessionPicker";

const ScramblePicker = () => {
  const {
    selectedScrambleOption,
    selectedScrambleOptionVariation,
    setSelectScrambleOption,
    setSelectedScrambleOptionVariation,
    generateNewScramble,
  } = useStore((state) => state);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "black",
          borderRadius: 10,
          paddingHorizontal: 10,
          width: "90%",
        }}
      >
        <View style={styles.subContainer}>
          <SessionPicker />
          <SelectDropdown
            defaultValue={selectedScrambleOption}
            dropdownStyle={dropdownStyles.dropdown}
            buttonStyle={dropdownStyles.button}
            buttonTextStyle={dropdownStyles.buttonText}
            data={SCRAMBLE_OPTIONS}
            buttonTextAfterSelection={(selectedItem) => selectedItem.name}
            rowTextForSelection={(item) => item.name}
            onSelect={(selectedItem: ScrambleOption) => {
              setSelectScrambleOption(selectedItem);
              generateNewScramble();
            }}
            renderCustomizedButtonChild={() => {
              return (
                <Button textColor="white">
                  {selectedScrambleOption?.name}
                </Button>
              );
            }}
          />
          <SelectDropdown
            defaultValue={selectedScrambleOptionVariation}
            dropdownStyle={dropdownStyles.dropdown}
            buttonStyle={dropdownStyles.button}
            buttonTextStyle={dropdownStyles.buttonText}
            data={selectedScrambleOption?.variations || []}
            buttonTextAfterSelection={(selectedItem) => selectedItem.name}
            rowTextForSelection={(selectedItem) => selectedItem.name}
            onSelect={(selectedItem: ScrambleOptionVariation) => {
              setSelectedScrambleOptionVariation(selectedItem);
              generateNewScramble();
            }}
            renderCustomizedButtonChild={() => {
              return (
                <Button textColor="white">
                  {selectedScrambleOptionVariation?.name}
                </Button>
              );
            }}
            rowTextStyle={{
              fontSize: 15,
            }}
            selectedRowTextStyle={{
              color: "purple",
            }}
          />
        </View>
      </View>
      <CurrentScramble />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

const dropdownStyles = StyleSheet.create({
  dropdown: {
    borderRadius: 10,
  },
  button: {
    backgroundColor: "black",
    color: "white",
    width: 120,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
  },
});

export default ScramblePicker;
