import React from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { connect } from "react-redux";
import SeenFilmItem from "../Components/SeenFilmItem";

const Seen = ({ navigation, favoritesFilm, seenFilms }) => {

  const _displayFilmDetail = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm: idFilm })
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        style={styles.listContainer}
        data={seenFilms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <SeenFilmItem
            film={item}
            displayFilmDetail={_displayFilmDetail}
            isFilmFavorite={
            favoritesFilm.findIndex((film) => film.id === item.id) !== -1
              ? true
              : false
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 6
  },
  listContainer: {
    flex: 1,
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    seenFilms: state.toggleSeen.seenFilms,
  };
};

export default connect(mapStateToProps, null)(Seen);
