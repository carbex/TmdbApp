import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import FilmList from "./FilmList";

const Favorites = ({ navigation, favoritesFilm }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        <FilmList
          films={favoritesFilm}
          navigation={navigation}
          favoritesList={true}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps, null)(Favorites);
