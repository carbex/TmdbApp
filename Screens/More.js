import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ActivityIndicator, Animated, SafeAreaView, StyleSheet,
  View
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
  const {type} = route.params;
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [newFilms, setNewFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');

  const scrollY = useRef(new Animated.Value(0)).current;
  
  const _onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )

  useLayoutEffect(() => {
    let title = "";
    switch (type) {
        case "nowPlaying":
            title = "A l'affiche"
            break;
        case "popular":
            title = "Les plus populaires"
            break;
        case "upcoming":
            title = "Bientôt à l'affiche"
            break;
        case "topRated":
            title = "Les mieux notés"
            break;
        default:
            title = "Les nouveautés"
            break;
    }
    navigation.setOptions({
      title: title
    });
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
    if(title) {
        setTitle(title);
    }
  };

  useEffect(() => {
    if (newFilms.length === 0) {
      _loadFilms();
    }
  },[type]);

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
