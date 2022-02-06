import React, { useLayoutEffect, useRef } from "react";
import { Animated, SafeAreaView, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import FadIn from "../Animations/FadIn";
import AnimatedFilmItem from "../Components/AnimatedFilmItem";
// import FilmList from "../Components/FilmList";
import Avatar from "../Components/Avatar";
import Layout from "../Constants/Layout";
// import Animated, {
//   abs,
//   add,
//   call,
//   clockRunning,
//   cond,
//   eq,
//   not,
//   set,
//   useCode,
// } from "react-native-reanimated";
// import { PanGestureHandler } from "react-native-gesture-handler";
// import {
//   snapPoint,
//   timing,
//   useClock,
//   usePanGestureHandler,
//   useValue,
//   minus,
//   clamp,
// } from "react-native-redash";

const SPACING = 20;
const IMAGE_SIZE = 70;
const ITEM_SIZE = IMAGE_SIZE + SPACING * 3;
const height = Layout.window.height - 110;

const Favorites = ({ navigation, favoritesFilm, seenFilms }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (favoritesFilm != undefined) {
          return (
            <View style={{ flexDirection: "row" }}>
              <Avatar navigation={navigation} />
            </View>
          );
        }
      },
    });
  }, [favoritesFilm]);

  const _displayFilmDetail = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm: idFilm });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animated.FlatList
        contentContainerStyle={styles.listContainer}
        data={favoritesFilm}
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

          // const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
          // const translateX = translation.x;

          return (
            // <Animated.View>
            //   <View style={styles.background} />
            //   <PanGestureHandler {...gestureHandler}>
            //     <Animated.View style={{ transform: [{ translateX }] }}>
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
                      favoritesFilm.findIndex((film) => film.id === item.id) !==
                      -1
                        ? true
                        : false
                    }
                    isAlreadySeen={
                      seenFilms.findIndex((film) => film.id === item.id) !== -1
                        ? true
                        : false
                    }
                    screen={"favorite"}
                  />
                </FadIn>
              </Animated.View>
            //      </Animated.View>
            //   </PanGestureHandler>
            //  </Animated.View>
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
  avatarContainer: {
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    seenFilms: state.toggleSeen.seenFilms,
  };
};

export default connect(mapStateToProps, null)(Favorites);
