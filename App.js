import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import Navigation from "./Navigation/Navigation";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
// import useColorScheme from "./hooks/useColorScheme";

export default function App() {
  const colorScheme = useColorScheme()
  return (
    <Provider store={Store}>
      <Navigation colorScheme={colorScheme}/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
