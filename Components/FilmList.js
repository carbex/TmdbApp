import React, { useEffect } from "react";
import { FlatList, Animated } from "react-native";
import FilmItem from "./FilmItem";
import { connect } from "react-redux";
import FadeIn from "../Animations/FadIn";

const SPACING = 20;
const ITEM_SIZE = 180 + SPACING * 3;

const FilmList = ({
  navigation,
  films = [],
  page,
  totalPages,
  loadFilms,
  favoritesFilm,
  seenFilms,
  loadMoreOnScroll = false,
  scrollY,
  onScroll
}) => {
  const _displayFilmDetail = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm: idFilm });
  };

  const _renderItem = ({ item, index }) => {
    return (
      // <FadeIn index={index/page}>
      <FilmItem
        film={item}
        index={index}
        scrollY={scrollY}
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
      // </FadeIn>
    );
  };

  return (
    <Animated.FlatList
      data={films}
      contentContainerStyle={{ paddingHorizontal: SPACING }}
      extraData={favoritesFilm}
      keyExtractor={(_, index) => String(index)}
      renderItem={_renderItem}
      scrollEventThrottle={16}
      onScroll={onScroll}
      onEndReachedThreshold={100}
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
