import { View, Text, StyleSheet } from "react-native";

const AveragesRoute = () => {
  return (
    <View style={styles.container}>
      <Text>Averages</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});

export default AveragesRoute;
