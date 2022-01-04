import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { getImage } from "../API/TMDBApi";
import FadIn from "../Animations/FadIn";
import { Ionicons } from "@expo/vector-icons";

const FilmItem = ({ film, isFilmFavorite, displayFilmDetail }) => {
  
  console.log('Render de film item!')

  const _displayFavoriteImage = () => {
    if (isFilmFavorite) {
      return (
        <Ionicons
          style={styles.favoriteImage}
          size={20}
          name="heart"
          color="orange"
        />
      );
    }
  };

  return (
    <FadIn>
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={() => displayFilmDetail(film.id)}
      >
        <View>
          <Image
            style={styles.image}
            source={{ uri: getImage(film.poster_path) }}
          />
          {_displayFavoriteImage()}
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{film.title}</Text>
            <Text style={styles.vote}>{film.vote_average}</Text>
          </View>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description} numberOfLines={6}>
              {film.overview}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </FadIn>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 190,
    flexDirection: "row",
    marginBottom: 5,
    borderRadius: 4,
  },
  image: {
    height: 180,
    width: 120,
    margin: 5,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    margin: 5,
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
    paddingRight: 5,
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
    flex: 7,
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
  favoriteImage: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

export default FilmItem;
