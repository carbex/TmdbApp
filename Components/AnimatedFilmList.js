import React, { useRef, useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { connect } from "react-redux";
import AnimatedFilmItem from "./AnimatedFilmItem";
import Layout from "../Constants/Layout";
import FadIn from "../Animations/FadIn";

const SPACING = 20;
const IMAGE_SIZE = 70;
const ITEM_SIZE = IMAGE_SIZE + SPACING * 3;
const height = Layout.window.height - 110;

const AnimatedFilmList = ({
  navigation,
  favoritesFilm,
  seenFilms,
  wishListFilms,
  screen,
}) => {
  const [films, setFilms] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (screen === "favorite") {
      setFilms(favoritesFilm);
    } else if (screen === "seen") {
      setFilms(seenFilms);
    } else if (screen === "wishList") {
      setFilms(wishListFilms);
    }
  }, [screen, seenFilms, favoritesFilm, wishListFilms]);

  const _displayFilmDetail = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm });
  };

  return (
    <Animated.FlatList
      contentContainerStyle={styles.listContainer}
      data={films}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      keyExtractor={(_, index) => String(index)}
      renderItem={function ({ item, index }) {
        const position = Animated.subtract(index * ITEM_SIZE, scrollY);
        const isDisappearing = -ITEM_SIZE;
        const isTop = 0;
        const isBottom = height - ITEM_SIZE;
        const isAppearing = height;

        const translateY = Animated.add(
          Animated.add(
            scrollY,
            scrollY.interpolate({
              inputRange: [0, 0.00001 + index * ITEM_SIZE],
              outputRange: [0, -index * ITEM_SIZE],
              extrapolateRight: "clamp",
            })
          ),
          position.interpolate({
            inputRange: [isBottom, isAppearing],
            outputRange: [0, -ITEM_SIZE / 4],
            extrapolate: "clamp",
          })
        );

        const scale = position.interpolate({
          inputRange: [isDisappearing, isTop, isBottom, isAppearing],
          outputRange: [0.5, 1, 1, 0.5],
          extrapolate: "clamp",
        });

        const opacity = position.interpolate({
          inputRange: [isDisappearing, isTop, isBottom, isAppearing],
          outputRange: [0.5, 1, 1, 0.5],
        });

        return (
          <Animated.View
            style={{
              opacity,
              transform: [{ translateY }, { scale }],
            }}
          >
            <FadIn index={index}>
              <AnimatedFilmItem
                film={item}
                displayFilmDetail={_displayFilmDetail}
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
                screen={screen}
              />
            </FadIn>
          </Animated.View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: SPACING / 2,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    seenFilms: state.toggleSeen.seenFilms,
    wishListFilms: state.toggleWishList.wishListFilms,
  };
};
export default connect(mapStateToProps, null)(AnimatedFilmList);
