import React, {
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Share,
  Platform,
} from "react-native";
import { getFilmDetail, getImage } from "../API/TMDBApi";
import moment from "moment";
import numeral from "numeral";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
// import EnlargeShrink from "../Animations/EnlargeShrink";
import Bounce from "../Animations/Bounce";

const FilmDetailScreen = ({ navigation, route, dispatch, favoritesFilm }) => {
  const { idFilm } = route.params;
  const [film, setFilm] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isTouched, setIsTouched] = useState(false)

  const _shareFilm = async () => {
    setIsLoading(true);
    await Share.share({ title: film.title, message: film.overview });
    setIsLoading(false);
  };

  // Share action button into the headerRight navigation on IOS
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (film != undefined && Platform.OS === "ios") {
          return (
            <TouchableOpacity
              style={styles.headerRightButton}
              onPress={() => _shareFilm()}
            >
              <Ionicons size={30} name="share"/>
            </TouchableOpacity>
          );
        }
      },
    });
  }, [navigation]);

  // Share floating action button on Android
  const _displayFloatingButton = () => {
    if (film != undefined && Platform.OS === "android") {
      return (
        <TouchableOpacity
          style={styles.floatingActionButton}
          onPress={() => _shareFilm()}
        >
          <Ionicons size={30} name="share" color="white" />
        </TouchableOpacity>
      );
    }
  };

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
      const data = await getFilmDetail(idFilm);
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

  const _displayFavoriteImage = () => {
    // let sourceImage = require("../Images/favorite_border.png");
    let iconName = "heart-outline"
    let color = "grey"
    // let shouldEnlarge = false
    if (favoritesFilm.findIndex((item) => item.id === film.id) !== -1) {
      // sourceImage = require("../Images/favorite.png");
      iconName = "heart"
      color = "orange"
      // shouldEnlarge = true
    }
    return (
      // <EnlargeShrink shouldEnlarge={shouldEnlarge}>
      <Bounce isTouched={isTouched}>
        <Ionicons size={40} name={iconName} color={color}/>
        {/* <Image style={styles.favoriteImage} source={sourceImage} /> */}
      </Bounce>
      // </EnlargeShrink>
    );
  };

  const _displayFilm = () => {
    if (film !== undefined) {
      return (
        <ScrollView style={styles.scrollViewContainer}>
          <Image
            style={styles.image}
            source={{ uri: getImage(film.backdrop_path) }}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favoriteContainer}
            onPress={() => _toggleFavorite()}
            onPressIn={() => setIsTouched(true)}
            onPressOut={() => setIsTouched(false)}
            // onPressIn={() => onPressIn()}
            // onPressOut={() => onPressOut()}
          >
            {_displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>
            Sorti le  : {moment(new Date(film.release_date)).format("DD/MM/YYYY")}
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
        </ScrollView>
      );
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.mainContainer}>
        {_displayFilm()}
        {_displayLoading()}
        {_displayFloatingButton()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
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
    //   flex: 1,
    // backgroundColor: "pink",
  },
  image: {
    height: 200,
    margin: 5,
    resizeMode: "cover",
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
    alignItems: "center",
  },
  favoriteImage: {
    // flex: 1,
    width: 40,
    height: 40,
  },
  floatingActionButton: {
    position: "absolute",
    width: 60,
    height: 60,
    right: 20,
    bottom: 20,
    borderRadius: 30,
    backgroundColor: "#e91e63",
    justifyContent: "center",
    alignItems: "center",
  },
  shareImage: {
    width: 30,
    height: 30,
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmDetailScreen);
