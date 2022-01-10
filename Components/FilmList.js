import React, { useMemo } from "react";
import { FlatList } from "react-native";
import FilmItem from "./FilmItem";
import { connect } from "react-redux";

const FilmList = ({
  navigation,
  films = [],
  page,
  totalPages,
  loadFilms,
  favoritesFilm,
  loadMoreOnScroll=false,
}) => {

  const _displayFilmDetail = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm: idFilm })
  };

  const _renderItem = ({ item }) => {
    return (
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
  };

  // return useMemo(() => {
    return (
      <FlatList
        data={films}
        extraData={favoritesFilm}
        keyExtractor={(item) => item.id.toString()}
        renderItem={_renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (loadMoreOnScroll && page < totalPages) {
            loadFilms();
          }
        }}
      />
    );
  // }, [films]);
};

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
  };
};
export default connect(mapStateToProps, null)(FilmList);
