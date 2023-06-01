import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TimerRoute from "./pages/TimerRoute";
import AveragesRoute from "./pages/AveragesRoute";
import InfoRoute from "./pages/InfoRoute";
import { SafeAreaView, StatusBar } from "react-native";
import { ConfigSync } from "./components/ConfigSync";

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "timer",
      focusedIcon: "clock",
    },
    { key: "averages", focusedIcon: "menu" },
    {
      key: "info",
      focusedIcon: "graph",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    timer: TimerRoute,
    averages: AveragesRoute,
    info: InfoRoute,
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaProvider>
        <ConfigSync>
          <BottomNavigation
            barStyle={styles.bar}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
        </ConfigSync>
      </SafeAreaProvider>
    </SafeAreaView>
  );
};

const styles = {
  bar: {
    backgroundColor: "black",
  },
};

export default App;
