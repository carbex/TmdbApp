import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { getImage } from "../API/TMDBApi";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { BlurView } from "expo-blur";

const IMAGE_SIZE = 70;
const SPACING = 20;

const AnimatedFilmItem = ({
  film,
  isFilmFavorite,
  isAlreadySeen,
  displayFilmDetail,
  screen,
}) => {
  const [toggleDisplay, setToggleDisplay] = useState(false);

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

  const _displaySeenImage = () => {
    if (isAlreadySeen) {
      return (
        <Ionicons
          style={styles.favoriteImage}
          size={20}
          name="eye"
          color="orange"
        />
      );
    }
  };

  const _displayIcons = () => {
    if (screen === "favorite") {
      return <>{_displaySeenImage()}</>;
    } else if (screen === "seen") {
      return <>{_displayFavoriteImage()}</>;
    }
  };

  const _displayText = () => {
    if (toggleDisplay) {
      return (
        <Text style={styles.date}>
          Sorti le {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
        </Text>
      );
    } else {
      return (
        <Text style={styles.text} numberOfLines={3}>
          {film.title}
        </Text>
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.mainContainer}
      onPress={() => displayFilmDetail(film.id)}
      onLongPress={() => setToggleDisplay(!toggleDisplay)}
    >
      <Image
        style={styles.backgroundImage}
        source={{ uri: getImage(film.poster_path) }}
        resizeMode="cover"
        blurRadius={20}
        blurType="light"
      />
      <BlurView intensity={100} tint="light" style={styles.blurView}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: getImage(film.poster_path) }}
          />
          {_displayIcons()}
        </View>
        <View style={styles.contentContainer}>{_displayText()}</View>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    // padding: SPACING,
    margin: SPACING / 2,
    borderRadius: SPACING,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.84,
    elevation: 5,
    overflow: "hidden",
  },
  imageContainer: {
    marginRight: SPACING / 2,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE,
  },
  contentContainer: {
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#666666",
  },
  date: {
    fontSize: 16,
    color: "#666666",
  },
  favoriteImage: {
    position: "absolute",
    top: -2,
    right: -2,
  },
  blurView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING,
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
});

export default AnimatedFilmItem;
