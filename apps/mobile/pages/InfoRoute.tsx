import { View, Text, StyleSheet } from "react-native";

const InfoRoute = () => {
  return (
    <View style={styles.container}>
      <Text>Info</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});

export default InfoRoute;
