import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import {
  getNewFilms,
  getNowPlaying,
  getPopular,
  getUpcoming,
  getTopRated,
} from "../API/TMDBApi";
import FilmList from "../Components/FilmList";

const News = ({ navigation, route }) => {
  const { type } = route.params;
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [newFilms, setNewFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const scrollY = useRef(new Animated.Value(0)).current;

  const _onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  useLayoutEffect(() => {
    let title = "";
    switch (type) {
      case "nowPlaying":
        title = "Toujours à l'affiche";
        break;
      case "popular":
        title = "Les plus consultés";
        break;
      case "upcoming":
        title = "Bientôt à l'affiche";
        break;
      case "topRated":
        title = "Les mieux notés";
        break;
      default:
        title = "Films";
        break;
    }
    navigation.setOptions({
      title,
    });
  }, [type]);

  useEffect(() => {
    if (newFilms.length === 0) {
      _loadFilms();
    }
  }, [type]);

  const _loadFilms = async () => {
    setIsLoading(true);
    let data = {};
    switch (type) {
      case "nowPlaying":
        data = await getNowPlaying(page + 1);
        break;
      case "popular":
        data = await getPopular(page + 1);
        break;
      case "upcoming":
        data = await getUpcoming(page + 1);
        break;
      case "topRated":
        data = await getTopRated(page + 1);
        break;
      default:
        data = await getNewFilms(page + 1);
        break;
    }
    if (data) {
      setPage(data.page);
      setTotalPages(data.total_pages);
      setNewFilms([...newFilms, ...data.results]);
      setIsLoading(false);
    }
  };

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
});

export default News;
