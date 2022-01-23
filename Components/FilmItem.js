import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { getImage } from "../API/TMDBApi";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Layout from "../Constants/Layout";

const SPACING = 10;
const IMAGE_SIZE = 180;
const ITEM_SIZE = IMAGE_SIZE + SPACING * 2;
const height = Layout.window.height - 110;

const FilmItem = ({
  film,
  isFilmFavorite,
  isAlreadySeen,
  displayFilmDetail,
  index,
  scrollY,
}) => {
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

  const _displayFavoriteImage = () => {
    if (isFilmFavorite) {
      return <Ionicons size={20} name="heart" color="orange" />;
    }
  };

  const _displaySeenImage = () => {
    if (isAlreadySeen) {
      return <Ionicons size={20} name="eye" color="orange" />;
    }
  };

  const _displayIcons = () => {
    return (
      <View style={styles.posterIcons}>
        {_displayFavoriteImage()}
        {_displaySeenImage()}
      </View>
    );
  };

  return useMemo(() => {
    return (
      <Animated.View
        style={{ opacity, transform: [{ translateY }, { scale }] }}
      >
        <TouchableOpacity
          style={styles.mainContainer}
          onPress={() => displayFilmDetail(film.id)}
        >
          <View>
            <Image
              style={styles.image}
              source={{ uri: getImage(film.poster_path) }}
            />
            {_displayIcons()}
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {film.title}
              </Text>
              <Text style={styles.vote}>{film.vote_average}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description} numberOfLines={4}>
                {film.overview}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>
                Date de sortie:{" "}
                {moment(new Date(film.release_date)).format("YYYY")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }, [film, isFilmFavorite, isAlreadySeen]);
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: SPACING,
    overflow: "hidden",
    marginVertical: SPACING,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: "white",
    elevation: 4,
  },
  image: {
    height: IMAGE_SIZE,
    width: 120,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: SPACING,
  },
  headerContainer: {
    flex: 3,
    flexDirection: "row",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    flexWrap: "wrap",
    paddingRight: SPACING,
  },
  text: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  vote: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666",
  },
  descriptionContainer: {
    flex: 6,
  },
  description: {
    fontStyle: "italic",
    color: "#666666",
  },
  dateContainer: {
    flex: 1,
  },
  date: {
    textAlign: "right",
    fontSize: 14,
  },
  posterIcons: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 2,
  },
});

export default FilmItem;
