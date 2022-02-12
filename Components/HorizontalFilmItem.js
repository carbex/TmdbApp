import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import moment from "moment";
import { getImage } from "../API/TMDBApi";

const SPACING = 20;
const IMAGE_HEIGHT = 150;
const IMAGE_WIDTH = 100;

const HorizontalFilmItem = ({ film, displayFilmDetail }) => {
  return useMemo(() => {
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => displayFilmDetail(film.id)}
      >
        <Image
          style={styles.itemImage}
          source={{ uri: getImage(film.poster_path) }}
        />
        {/* <View style={styles.itemBody}>
          <Text style={styles.itemTitle}>{film.title}</Text>
          <Text style={styles.itemDate}>
            {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
          </Text>
        </View> */}
      </TouchableOpacity>
    );
  }, [film]);
};

export default HorizontalFilmItem;

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: SPACING / 2,
    overflow: 'hidden',
    marginHorizontal: SPACING / 2,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 4,
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
