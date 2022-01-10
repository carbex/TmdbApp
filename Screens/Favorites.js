import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import FilmList from "../Components/FilmList";
import Avatar from '../Components/Avatar'

const Favorites = ({ navigation, favoritesFilm }) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
        <Avatar navigation={navigation}/>
      </View>
        <FilmList
          films={favoritesFilm}
          navigation={navigation}
          loadMoreOnScroll={false}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 3
  },
  avatarContainer: {
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
  };
};

export default connect(mapStateToProps, null)(Favorites);
