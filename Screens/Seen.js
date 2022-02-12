import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import AnimatedFilmList from "../Components/AnimatedFilmList";

const Seen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <AnimatedFilmList navigation={navigation} screen="seen" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default Seen;
