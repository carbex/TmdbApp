import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ActivityIndicator,
  SafeAreaView,
  Pressable,
  Text,
} from "react-native";
import { getFilms } from "../API/TMDBApi";
import { connect } from "react-redux";
import FilmList from "../Components/FilmList";

const Search = ({ navigation }) => {
  const [searchedText, setSearchedText] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  }

  useEffect(() => {
    if (films.length === 0) {
      _loadFilms();
    }
  }, [films]);

  const _displayLoading = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    }
  };

  const _searchTextInputChanged = (text) => {
    setSearchedText(text);
  };

  const _searchFilms = () => {
    setPage(0);
    setTotalPages(0);
    setFilms([]);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Titre du film"
          onChangeText={(text) => _searchTextInputChanged(text)}
          onSubmitEditing={() => _searchFilms()}
          value={searchedText}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => _searchFilms()}>
            <Text>Rechercher</Text>
          </Pressable>
        </View>
        <View style={styles.listContainer}>
          <FilmList
            films={films}
            navigation={navigation}
            loadFilms={_loadFilms}
            page={page}
            totalPages={totalPages}
            loadMoreOnScroll={true} // Permet de déclencher le chargement de plus de film lors du scroll
          />
        </View>
        {_displayLoading()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 3
  },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 10,
    marginBottom: 5,
  },
  buttonContainer: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 8,
    backgroundColor: "orange",
  },
  listContainer: {
    flex: 1,
    marginBottom: 5,
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
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.favoritesFilm,
  };
};

export default connect(mapStateToProps, null)(Search);
