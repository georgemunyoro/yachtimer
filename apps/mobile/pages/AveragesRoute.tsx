import { View, Text, StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { useStore } from "ui/store";
import { Time } from "ui/store/types";
import { formatTimeMS } from "ui/utils/formatting";

const AveragesRoute = () => {
  const { selectedSession, sessions } = useStore((state) => state);

  return (
    <View style={styles.container}>
      <Text>Averages</Text>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title textStyle={{ color: "white" }} numeric>
            Time
          </DataTable.Title>
          <DataTable.Title textStyle={{ color: "white" }} numeric>
            AO5
          </DataTable.Title>
          <DataTable.Title textStyle={{ color: "white" }} numeric>
            AO12
          </DataTable.Title>
        </DataTable.Header>

        {sessions
          .find((s) => s.name === selectedSession)
          ?.times.map(({ id, time, ao5, ao12 }: Time) => {
            return (
              <DataTable.Row borderless={true} key={id}>
                <DataTable.Cell textStyle={{ color: "white" }} numeric>
                  {formatTimeMS(time)}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ color: "white" }} numeric>
                  {ao5 === 0 ? "-" : formatTimeMS(ao5)}
                </DataTable.Cell>
                <DataTable.Cell textStyle={{ color: "white" }} numeric>
                  {ao12 === 0 ? "-" : formatTimeMS(ao12)}
                </DataTable.Cell>
              </DataTable.Row>
            );
          })}
      </DataTable>
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
