import React, { useState, useMemo } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { getImage } from "../API/TMDBApi";
import FadIn from "../Animations/FadIn";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const SeenFilmItem = ({ film, isFilmFavorite, displayFilmDetail }) => {
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

  const _displayText = () => {
    if (toggleDisplay) {
      return (
        <Text style={styles.text}>
          Sorti le {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
        </Text>
      );
    } else {
      return <Text style={styles.text}>{film.title}</Text>;
    }
  };

  return (
    <FadIn>
      <TouchableOpacity
        style={styles.mainContainer}
        onPress={() => displayFilmDetail(film.id)}
        onLongPress={() => setToggleDisplay(!toggleDisplay)}
      >
        <View>
          <Image
            style={styles.image}
            source={{ uri: getImage(film.poster_path) }}
          />
          {_displayFavoriteImage()}
        </View>

        <View style={styles.contentContainer}>{_displayText()}</View>
      </TouchableOpacity>
    </FadIn>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: "#9B9B9B",
    borderWidth: 2,
  },
  contentContainer: {
    flex: 1,
    margin: 5,
    justifyContent: "center",
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
    fontSize: 22,
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
  favoriteImage: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
});

export default SeenFilmItem;
