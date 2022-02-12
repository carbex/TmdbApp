import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  SafeAreaView,
  Share,
} from "react-native";
import { getMovieDetail, getTvDetail, getImage } from "../API/TMDBApi";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import moment from "moment";
import numeral from "numeral";
import Bounce from "../Animations/Bounce";
import { Header } from "react-native/Libraries/NewAppScreen";

const FilmDetail = ({
  dispatch,
  favoritesFilm,
  navigation,
  route,
  seenFilms,
  wishListFilms,
}) => {
  const { idFilm, filmsType } = route.params;
  const [film, setFilm] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [heartIsTouched, setHeartIsTouched] = useState(false);
  const [eyeIsTouched, setEyeIsTouched] = useState(false);
  const [bookmarkIsTouched, setBookmarkIsTouched] = useState(false);

  const _shareFilm = async () => {
    setIsLoading(true);
    await Share.share({
      title: film.title ? film.title : film.name,
      message: film.overview,
    });
    setIsLoading(false);
  };

  // Action buttons into the headerRight navigation
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (film != undefined) {
          return (
            <View style={{ flexDirection: "row" }}>
              <TouchableWithoutFeedback
                style={styles.headerRightButton}
                onPress={() => _shareFilm()}
              >
                <Ionicons size={30} name="share-social" color="black" />
              </TouchableWithoutFeedback>
            </View>
          );
        }
      },
    });
  }, [
    bookmarkIsTouched,
    eyeIsTouched,
    favoritesFilm,
    film,
    heartIsTouched,
    navigation,
    seenFilms,
    wishListFilms,
  ]);

  const _displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingIcon}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        </View>
      );
    }
  };

  useEffect(() => {
    const getFilm = async () => {
      let data = {};
      if (filmsType === "tv") {
        data = await getTvDetail(idFilm);
      } else {
        data = await getMovieDetail(idFilm);
      }
      if (data) {
        setFilm(data);
        setIsLoading(false);
      }
    };
    getFilm();
  }, [idFilm]);

  // Action type send to reducers (TOGGLE_FAVORITE, TOGGLE_SEEN, TOGGLE_WISHLIST)
  const _toggle = (type) => {
    const action = { type, value: film };
    dispatch(action);
  };

  // Header icons
  const _displayImage = (
    films,
    iconIsTouched,
    activeIconName,
    activeColor,
    inactiveColor
  ) => {
    let iconName = `${activeIconName}-outline`;
    let color = inactiveColor;
    if (films.findIndex((item) => item.id === film.id) !== -1) {
      iconName = activeIconName;
      color = activeColor;
    }
    return (
      <Bounce isTouched={iconIsTouched}>
        <Ionicons size={30} name={iconName} color={color} />
      </Bounce>
    );
  };

  const _displayIcons = () => {
    return(
      <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, right: 0}}>
        <TouchableWithoutFeedback
                style={styles.headerRightButton}
                onPress={() => _toggle("TOGGLE_FAVORITE")}
                onPressIn={() => setHeartIsTouched(true)}
                onPressOut={() => setHeartIsTouched(false)}
              >
                {_displayImage(
                  favoritesFilm,
                  heartIsTouched,
                  "heart",
                  "orange",
                  "grey"
                )}
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={styles.headerRightButton}
                onPress={() => _toggle("TOGGLE_SEEN")}
                onPressIn={() => setEyeIsTouched(true)}
                onPressOut={() => setEyeIsTouched(false)}
              >
                {_displayImage(
                  seenFilms,
                  eyeIsTouched,
                  "eye",
                  "orange",
                  "grey"
                )}
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={styles.headerRightButton}
                onPress={() => _toggle("TOGGLE_WISHLIST")}
                onPressIn={() => setBookmarkIsTouched(true)}
                onPressOut={() => setBookmarkIsTouched(false)}
              >
                {_displayImage(
                  wishListFilms,
                  bookmarkIsTouched,
                  "bookmark",
                  "orange",
                  "grey"
                )}
              </TouchableWithoutFeedback>
      </View>
    )
  }

  const _displayMovie = () => {
    if (film !== undefined) {
      return (
        <>
          <ScrollView style={styles.scrollViewContainer}>
            <View>
              <Image
                style={styles.image}
                source={{ uri: getImage(film.backdrop_path) }}
              />
              {_displayIcons()}
            </View>
            <View style={styles.bodyContainer}>
              <Text style={styles.title_text}>{film.title}</Text>
              <Text style={styles.description_text}>{film.overview}</Text>
              <Text style={styles.default_text}>
                Sorti le :{" "}
                {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
              </Text>
              <Text style={styles.default_text}>
                Note : {film.vote_average} / 10
              </Text>
              <Text style={styles.default_text}>
                Nombre de votes : {film.vote_count}
              </Text>
              <Text style={styles.default_text}>
                Budget : {numeral(film.budget).format("0,0[.]00 $")}
              </Text>
              <Text style={styles.default_text}>
                Genre(s) :{" "}
                {film.genres
                  .map(function (genre) {
                    return genre.name;
                  })
                  .join(" / ")}
              </Text>
              <Text style={styles.default_text}>
                Companie(s) :{" "}
                {film.production_companies
                  .map(function (company) {
                    return company.name;
                  })
                  .join(" / ")}
              </Text>
            </View>
          </ScrollView>
        </>
      );
    }
  };

  const _displayTv = () => {
    if (film !== undefined) {
      return (
        <>
          <ScrollView style={styles.scrollViewContainer}>
            <Image
              style={styles.image}
              source={{ uri: getImage(film.backdrop_path) }}
            />
            <View style={styles.bodyContainer}>
              <Text style={styles.title_text}>{film.name}</Text>
              <Text style={styles.description_text}>{film.overview}</Text>
              <Text style={styles.default_text}>
                Note : {film.vote_average} / 10
              </Text>
              <Text style={styles.default_text}>
                Nombre de votes : {film.vote_count}
              </Text>
              <Text style={styles.default_text}>
                Genre(s) :{" "}
                {film.genres
                  .map(function (genre) {
                    return genre.name;
                  })
                  .join(" / ")}
              </Text>
              <Text style={styles.default_text}>
                Companie(s) :{" "}
                {film.production_companies
                  .map(function (company) {
                    return company.name;
                  })
                  .join(" / ")}
              </Text>
            </View>
          </ScrollView>
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <StatusBar translucent backgroundColor="rgba(0,0,0,0.4)" barStyle="light-content"/> */}
      {filmsType === "tv" ? _displayTv() : _displayMovie()}
      {_displayLoading()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  bodyContainer: {
    marginHorizontal: 10,
    paddingBottom: 20
  },
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingIcon: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 4,
  },
  scrollViewContainer: {
    flex: 1,
    // paddingBottom: 20,
  },
  image: {
    height: 300,
    resizeMode: "cover",
    backgroundColor: "lightgrey",
  },
  title_text: {
    fontWeight: "bold",
    fontSize: 35,
    flex: 1,
    flexWrap: "wrap",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    marginBottom: 15,
  },
  default_text: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
  },
  headerRightButton: {
    marginRight: 5,
    padding: 5,
    borderRadius: 30,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    seenFilms: state.toggleSeen.seenFilms,
    wishListFilms: state.toggleWishList.wishListFilms,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetail);
