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

const FilmDetail = ({
  dispatch,
  favoritesFilm,
  navigation,
  route,
  seenFilms,
}) => {
  const { idFilm, filmsType } = route.params;
  const [film, setFilm] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [heartIsTouched, setHeartIsTouched] = useState(false);
  const [eyeIsTouched, setEyeIsTouched] = useState(false);

  const _shareFilm = async () => {
    setIsLoading(true);
    await Share.share({ title: (film.title ? film.title : film.name), message: film.overview });
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
              <TouchableWithoutFeedback
                style={styles.favoriteContainer}
                onPress={() => _toggleFavorite()}
                onPressIn={() => setHeartIsTouched(true)}
                onPressOut={() => setHeartIsTouched(false)}
              >
                {_displayFavoriteImage()}
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={styles.seenContainer}
                onPress={() => _toggleSeen()}
                onPressIn={() => setEyeIsTouched(true)}
                onPressOut={() => setEyeIsTouched(false)}
              >
                {_displaySeenImage()}
              </TouchableWithoutFeedback>
            </View>
          );
        }
      },
    });
  }, [
    eyeIsTouched,
    favoritesFilm,
    film,
    heartIsTouched,
    navigation,
    seenFilms,
  ]);

  const _displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    }
  };

  useEffect(() => {
    const getFilm = async () => {
      let data = {}
      if(filmsType === 'tv') {
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

  const _toggleFavorite = () => {
    const action = { type: "TOGGLE_FAVORITE", value: film }; //Creation action avec le type et la valeur
    dispatch(action); // On passe l'action au store
    // Le store donne l'action à un reducer capable de gérer l'action de type 'TOGGLE_FAVORITE'
    // Le reducer reçoit l'action et modifie le state
    // Redux va détecter un changement dans le store et va envoyer la nouvelle liste de films favoris aux composants abonnés à ce changement
    // Les composants abonnés reçoivent la liste des nouveaux films favoris, la mappe à leurs props et re-rend
  };

  const _toggleSeen = () => {
    const action = { type: "TOGGLE_SEEN", value: film };
    dispatch(action);
  };

  const _toggleWishList= () => {
    const action = { type: "TOGGLE_WISHLIST", value: film };
    dispatch(action);
  };

  const _displayFavoriteImage = () => {
    let iconName = "heart-outline";
    let color = "black";
    if (favoritesFilm.findIndex((item) => item.id === film.id) !== -1) {
      iconName = "heart";
      color = "orange";
    }
    return (
      <Bounce isTouched={heartIsTouched}>
        <Ionicons size={30} name={iconName} color={color} />
      </Bounce>
    );
  };

  const _displaySeenImage = () => {
    let iconName = "eye-outline";
    let color = "black";
    if (seenFilms.findIndex((item) => item.id === film.id) !== -1) {
      iconName = "eye";
      color = "orange";
    }
    return (
      <Bounce isTouched={eyeIsTouched}>
        <Ionicons size={30} name={iconName} color={color} />
      </Bounce>
    );
  };

  const _displayMovie = () => {
    if (film !== undefined) {
      return (
        <>
          <ScrollView style={styles.scrollViewContainer}>
            <Image
              style={styles.image}
              source={{ uri: getImage(film.backdrop_path) }}
            />
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
      {filmsType === 'tv' ? _displayTv() : _displayMovie()}
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
  },
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContainer: {
    flex: 1,
    // marginBottom: 5,
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
  favoriteContainer: {
    marginRight: 5,
    paddingTop: 6,
    paddingBottom: 4,
    paddingHorizontal: 5,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  seenContainer: {
    marginRight: 5,
    padding: 5,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  headerRightButton: {
    marginRight: 5,
    padding: 5,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
    seenFilms: state.toggleSeen.seenFilms,
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
