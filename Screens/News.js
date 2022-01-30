import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator, Animated, SafeAreaView, StyleSheet,
  View
} from "react-native";
import { getNewFilms } from "../API/TMDBApi";
import FilmList from "../Components/FilmList";

const News = ({ navigation }) => {
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [newFilms, setNewFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const scrollY = useRef(new Animated.Value(0)).current;
  
  const _onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )

  const _loadFilms = async () => {
    setIsLoading(true);
    const data = await getNewFilms(page + 1);
    if (data) {
      setPage(data.page);
      setTotalPages(data.total_pages);
      setNewFilms([...newFilms, ...data.results]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (newFilms.length === 0) {
      _loadFilms();
    }
  },[]);

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
      <View style={styles.listContainer}>
        <FilmList
          scrollY={scrollY}
          onScroll={_onScroll}
          films={newFilms}
          navigation={navigation}
          loadFilms={_loadFilms}
          page={page}
          totalPages={totalPages}
          loadMoreOnScroll={true}
        />
      </View>
      {_displayLoading()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
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
    alignItems: "center",
    justifyContent: "center",
  },
});

export default News;
