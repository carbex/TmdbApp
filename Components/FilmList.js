import React from "react";
import { StyleSheet, FlatList } from "react-native";
import FilmItem from "./FilmItem";
import { connect } from "react-redux";

const FilmList = ({ navigation, films = [], page, totalPages, loadFilms, favoritesFilm }) => {

  console.log('Render de film list !')

  const _displayFilmDetail = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm: idFilm });
  };

  const _renderItem = ({ item }) => (
    <FilmItem
      film={item}
      isFilmFavorite={
        favoritesFilm.findIndex((film) => film.id === item.id) !== -1
          ? true
          : false
      }
      displayFilmDetail={_displayFilmDetail}
    />
  );

  return (
    <FlatList
      data={films}
      extraData={favoritesFilm}
      keyExtractor={(item) => item.id.toString()}
      renderItem={_renderItem}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (page < totalPages) {
          loadFilms();
        }
      }}
    />
  );
}

const mapStateToProps = state => {
    return {
        favoritesFilm: state.toggleFavorite.favoritesFilm
    }
}
export default connect(mapStateToProps, null)(FilmList);
