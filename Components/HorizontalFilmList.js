import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import HorizontalFilmItem from "./HorizontalFilmItem";
import { LinearGradient } from 'expo-linear-gradient';

const HorizontalFilmList = ({
  navigation,
  films,
  loadFilms,
  page,
  totalPages,
  maxPage,
  filmsType
}) => {
  const _displayFilmDetail = (idFilm) => {
    navigation.navigate("FilmDetail", { idFilm: idFilm , filmsType: filmsType});
  };

  function _renderItem({ item }) {
    return <HorizontalFilmItem film={item} displayFilmDetail={_displayFilmDetail}/>;
  };

  return (
    <View>
      <FlatList
        horizontal
        contentContainerStyle={styles.listContainer}
        data={films}
        keyExtractor={(_, index) => String(index)}
        renderItem={_renderItem}
        onEndReachedThreshold={1}
        onEndReached={() => {
          if (page < (maxPage ? maxPage : totalPages)) {
            loadFilms();
          }
        }}
      />
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['transparent', 'white']} style={styles.rightGradient}></LinearGradient>
      <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={['transparent', 'white']} style={styles.leftGradient}></LinearGradient>
    </View>
  );
};

export default HorizontalFilmList;

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: SPACING / 2,
  },
  rightGradient: {
    height: 300, 
    width: 20, 
    position: 'absolute', 
    top: 0, 
    right: 0,
  },
  leftGradient: {
    height: 300, 
    width: 20, 
    position: 'absolute', 
    top: 0, 
    left: 0,
  }
});
