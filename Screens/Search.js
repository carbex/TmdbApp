import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import { getFilms } from "../API/TMDBApi";
import FilmList from "../Components/FilmList";
import SearchItem from "../Components/SearchItem";
import { Ionicons } from "@expo/vector-icons";

const SPACING = 20;
const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 55;

const Search = ({ navigation, route }) => {
  const { text } = route.params;
  const [searchedText, setSearchedText] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load searched films
  const _loadFilms = async () => {
    if (searchedText.length > 0) {
      setIsLoading(true);
      const data = await getFilms(searchedText, page + 1);
      if (data) {
        setPage(data.page);
        setTotalPages(data.total_pages);
        setFilms([...films, ...data.results]);
        setIsLoading(false);
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

  useEffect(() => {
    if(text.length > 0) {
      setSearchedText(text)
      setPage(0);
      setTotalPages(0);
      setFilms([]);
    } 
  }, [text]) 

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

  const _goBack = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableWithoutFeedback
        onPress={_goBack}
        >
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color="black"
            style={{
              // marginRight: 15,
              borderRadius: 20,
              backgroundColor: "white",
              padding: 5,
            }}
          />
        </TouchableWithoutFeedback>
        <View style={styles.searchSection}>
          <SearchItem
            searchedText={searchedText}
            searchFilms={_searchFilms}
            searchTextInputChanged={_searchTextInputChanged}
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FilmList
          horizontal={false}
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
    paddingHorizontal: SPACING / 2,
    height: 55,
    flexDirection: 'row',
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 10,
    backgroundColor: "white",
  },
  searchSection: {
    flex: 1,
    padding: 4,
    marginLeft: SPACING / 2,
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
    backgroundColor: "white",
  },
  searchIcon: {},
  closeIcon: {},
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
    flexGrow: 1,
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
