import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { getNewFilms, getImage } from "../API/TMDBApi";
import FilmList from "./FilmList";

const News = ({ navigation }) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [newFilms, setNewFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const _loadFilms = async () => {
    
      setIsLoading(true);
      const data = await getNewFilms(page + 1);
      if (data) {
        setPage(data.page);
        setTotalPages(data.total_pages);
        setNewFilms([...newFilms, ...data.results]);
        setIsLoading(false);
      }
    
  }

  useEffect(() => {
    if (newFilms.length === 0) {
      _loadFilms();
    }
  }, [newFilms]);

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
      <View style={styles.mainContainer}>
        <View style={styles.listContainer}>
          <FilmList
            films={newFilms}
            navigation={navigation}
            loadFilms={_loadFilms}
            page={page}
            totalPages={totalPages}
            favoriteList={false}
          />
        </View>
        {_displayLoading()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 3,
  },
  listContainer: {
    marginLeft: 5,
    marginRight: 5,
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

export default News;
