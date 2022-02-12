import React, { useLayoutEffect } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Avatar from "../Components/Avatar";
import AnimatedFilmList from "../Components/AnimatedFilmList";

const Favorites = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={{ flexDirection: "row" }}>
            <Avatar navigation={navigation} />
          </View>
        );
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AnimatedFilmList navigation={navigation} screen="favorite" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  avatarContainer: {
    alignItems: "center",
  },
});

export default Favorites;
