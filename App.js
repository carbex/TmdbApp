import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import Navigation from "./Navigation/Navigation";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
// import useColorScheme from "./hooks/useColorScheme";

export default function App() {
  const colorScheme = useColorScheme();
  let persistor = persistStore(Store);
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor}>
        <Navigation colorScheme={colorScheme} />
      </PersistGate>
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
