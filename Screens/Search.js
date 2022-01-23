import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
  Text,
  StatusBar,
  Animated,
  TouchableOpacity,
} from "react-native";
import { getFilms } from "../API/TMDBApi";
import { connect } from "react-redux";
import FilmList from "../Components/FilmList";
import { Ionicons } from "@expo/vector-icons";

const SPACING = 20;
const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 55;

const Search = ({ navigation }) => {
  const [searchedText, setSearchedText] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const scrollY = useRef(new Animated.Value(0)).current;
  
  const _onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )

  // Header animation
  const searchSectionPadding = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [15, 4],
    extrapolate: 'clamp'
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp'
  });


  // Load searched films
  const _loadFilms = async () => {
    if (searchedText.length > 0) {
      setIsLoading(true);
      try {
        const data = await getFilms(searchedText, page + 1);
        if (data) {
          setPage(data.page);
          setTotalPages(data.total_pages);
          setFilms([...films, ...data.results]);
          setIsLoading(false);
      }
      } catch (error) {
        console.log(error)
      }
    }
  };

  // Set page, totalPages and films to zero before loading new searched films
  const _searchFilms = () => {
    setPage(0);
    setTotalPages(0);
    setFilms([]);
  };

  // Load new searched films when films state changed
  useEffect(() => {
    if (films.length === 0) {
      _loadFilms();
    }
  }, [films]);

  const _searchTextInputChanged = (text) => {
    setSearchedText(text);
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <Animated.View style={[styles.searchSection, { padding: searchSectionPadding}]}>
          <Ionicons
            style={styles.searchIcon}
            name="search"
            size={25}
            color="grey"
          />
          <TextInput
            style={styles.headerTextInput}
            placeholder="Rechercher sur TMDB APP"
            onChangeText={(text) => _searchTextInputChanged(text)}
            onSubmitEditing={() => _searchFilms()}
            value={searchedText}
          />
          {searchedText !== "" && (
            <TouchableOpacity
              onPress={() => _searchTextInputChanged("")}
            >
              <Ionicons
                style={styles.closeIcon}
                name="close-circle"
                size={25}
                color="grey"
              />
            </TouchableOpacity>
          )}
        </Animated.View>
        <Text style={styles.headerText}>TMDB APP</Text>
      </Animated.View>
      {/* <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => _searchFilms()}>
            <Text>Rechercher</Text>
          </Pressable>
        </View> */}
      <View style={styles.listContainer}>
        <FilmList
          scrollY={scrollY}
          onScroll={_onScroll}
          films={[...new Set(films)]}
          navigation={navigation}
          loadFilms={_loadFilms}
          page={page}
          totalPages={totalPages}
          loadMoreOnScroll={true} // Permet de déclencher le chargement de plus de film lors du scroll
        />
      {_displayLoading()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight || 42,
  },
  headerContainer: {
    height: HEADER_MAX_HEIGHT,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  searchSection: {
    marginHorizontal: SPACING,
    marginVertical: SPACING / 2,
    borderRadius: SPACING / 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 4,
  },
  searchIcon: {
  },
  closeIcon: {
  },
  headerTextInput: {
    flex: 1,
    paddingHorizontal: SPACING / 2,
    backgroundColor: "#fff",
    color: "#424242",
  },
  headerText: {
    position: "absolute",
    top: 12,
    fontSize: 21,
    fontWeight: "bold",
    color: "orange",
  },
  buttonContainer: {
    marginHorizontal: SPACING,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: SPACING,
    padding: SPACING * 2,
    borderRadius: SPACING,
    backgroundColor: "orange",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 4,
  },
  listContainer: {
    flex: 1,
  },
  loadingContainer: {
    // position: "absolute",
    // left: 0,
    // right: 0,
    // top: 100,
    // bottom: 0,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
    seenFilms: state.toggleSeen.seenFilms,
  };
};

export default connect(mapStateToProps, null)(Search);
