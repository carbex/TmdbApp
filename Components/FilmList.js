import React from "react";
import { Animated, FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import FilmItem from "./FilmItem";

const SPACING = 20;

const FilmList = ({
  navigation,
  films = [],
  page,
  totalPages,
  loadFilms,
  favoritesFilm,
  seenFilms,
  loadMoreOnScroll = false,
}) => {
  const _displayFilmDetail = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm: idFilm });
  };

  function _renderItem({ item, index }) {
    return (
      <FilmItem
        film={item}
        index={index}
        isFilmFavorite={
          favoritesFilm.findIndex((film) => film.id === item.id) !== -1
            ? true
            : false
        }
        isAlreadySeen={
          seenFilms.findIndex((film) => film.id === item.id) !== -1
            ? true
            : false
        }
        displayFilmDetail={_displayFilmDetail}
      />
    );
  }

  return (
    <FlatList
      data={films}
      contentContainerStyle={{ paddingHorizontal: SPACING }}
      extraData={favoritesFilm}
      keyExtractor={(_, index) => String(index)}
      renderItem={_renderItem}
      onEndReachedThreshold={1}
      onEndReached={() => {
        if (loadMoreOnScroll && page < totalPages) {
          loadFilms();
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    seenFilms: state.toggleSeen.seenFilms,
  };
};
export default connect(mapStateToProps, null)(FilmList);
