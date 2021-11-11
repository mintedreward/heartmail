import React from "react";
import { StyleSheet } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./CustomProperties/Themes";

import MainScreen from "./Screens/MainScreen";
import TopBar from "./Components/TopBar";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function App() {
  return (
    <PaperProvider theme={theme} styles={styles.container}>
      <TopBar />

      <MainScreen />
    </PaperProvider>
  );
}