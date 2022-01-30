import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import moment from "moment";
import { getImage } from "../API/TMDBApi";

const SPACING = 20;
const IMAGE_HEIGHT = 200;
const IMAGE_WIDTH = 140;

const HorizontalFilmItem = ({ film, displayFilmDetail }) => {
  return useMemo(() => {
    return (
        <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => displayFilmDetail(film.id)}
      >
      {/* <View style={styles.itemContainer}> */}
        <Image
          style={styles.itemImage}
          source={{ uri: getImage(film.poster_path) }}
        />
        <View style={styles.itemBody}>
          <Text style={styles.itemTitle}>{film.title}</Text>
          <Text style={styles.itemDate}>
            {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
          </Text>
        </View>
      {/* </View> */}
      </TouchableOpacity>
    );
  }, [film]);
};

export default HorizontalFilmItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: IMAGE_WIDTH,
    marginHorizontal: SPACING / 2,
  },
  itemImage: {
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    backgroundColor: "grey",
    borderRadius: SPACING / 2,
  },
  itemBody: {
    paddingVertical: SPACING / 2,
  },
  itemTitle: {
    fontWeight: "bold",
  },
  itemDate: {
    color: "grey",
  },
});
