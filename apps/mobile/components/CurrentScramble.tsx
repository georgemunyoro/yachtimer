import { View, Text, StyleSheet } from "react-native";
import { useStore } from "ui/store";

const CurrentScramble = () => {
  const { scrambleHistory, scrambleIndex } = useStore((state) => state);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {scrambleIndex === null ? "" : scrambleHistory[scrambleIndex]}
      </Text>
    </View>
  );
};

export default CurrentScramble;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    color: "white",
  },
});
