import { View, Text, StyleSheet } from "react-native";
import ScramblePicker from "../components/ScramblePicker";
import SessionPicker from "../components/SessionPicker";
import Timer from "../components/Timer";

const TimerRoute = () => {
  return (
    <View style={styles.container}>
      <ScramblePicker />
      <Timer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default TimerRoute;
