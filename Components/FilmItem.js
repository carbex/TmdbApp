import React, { useMemo, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { getImage } from "../API/TMDBApi";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import moment from "moment";
import Star from "react-native-star-rating";

const SPACING = 10;
const IMAGE_SIZE = 180;

const FilmItem = ({
  film,
  isFilmFavorite,
  isAlreadySeen,
  displayFilmDetail,
}) => {
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
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={() => displayFilmDetail(film.id)}
      >
        <Image
          style={styles.backgroundImage}
          source={{ uri: getImage(film.backdrop_path) }}
          resizeMode="cover"
          blurRadius={10}
          blurType="light"
        />
        <BlurView intensity={100} tint="light" style={styles.blurView}>
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
              {/* <Text style={styles.vote}>{film.vote_average}</Text> */}
            </View>
            <View style={styles.starsContainer}>
              <Star
                disabled={true}
                maxStars={5}
                fullStarColor="orange"
                rating={film.vote_average / 2}
                starSize={15}
              />
              <Text style={styles.voteCount}>({film.vote_count})</Text>
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
        </BlurView>
      </TouchableOpacity>
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
    backgroundColor: "transparent",
    elevation: 4,
  },
  blurView: {
    flex: 1,
    flexDirection: "row",
  },
  image: {
    height: IMAGE_SIZE,
    width: 120,
    backgroundColor: "grey",
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "lightgrey",
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
  starsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  voteCount: {
    marginLeft: 10,
  },
  descriptionContainer: {
    flex: 5,
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
