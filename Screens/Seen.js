import React, { useRef } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";
import { connect } from "react-redux";
import SeenFilmItem from "../Components/SeenFilmItem";
import FadIn from "../Animations/FadIn";

const SPACING = 20;
const IMAGE_SIZE = 70;
const ITEM_SIZE = IMAGE_SIZE + SPACING * 3 + 3.5;

const Seen = ({ navigation, favoritesFilm, seenFilms }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const _displayFilmDetail = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm: idFilm });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animated.FlatList
        contentContainerStyle={styles.listContainer}
        data={seenFilms}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(_, index) => String(index)}
        renderItem={({ item, index }) => {
          const scaleInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];
          const scale = scrollY.interpolate({
            inputRange: scaleInputRange,
            outputRange: [1, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });

          return (
            <Animated.View style={{ transform: [{ scale }], opacity }}>
              <FadIn index={index}>
                <SeenFilmItem
                  film={item}
                  displayFilmDetail={_displayFilmDetail}
                  isFilmFavorite={
                    favoritesFilm.findIndex((film) => film.id === item.id) !==
                    -1
                      ? true
                      : false
                  }
                />
              </FadIn>
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: {
    paddingHorizontal: SPACING,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    seenFilms: state.toggleSeen.seenFilms,
  };
};

export default connect(mapStateToProps, null)(Seen);
