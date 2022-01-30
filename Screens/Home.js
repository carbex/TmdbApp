import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  getNowPlaying,
  getPopular,
  getUpcoming,
  getTopRated,
} from "../API/TMDBApi";
import HorizontalFilmList from "../Components/HorizontalFilmList";
import SearchItem from "../Components/SearchItem";
// import { TouchableOpacity } from "react-native-gesture-handler";

// utiliser webview et react-native-youtube-iframe

const SPACING = 20;
const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 55;

const Home = ({ navigation }) => {
  const [searchedText, setSearchedText] = useState("");
  const [type, setType] = useState("movie");
  const [nowPlayingPage, setNowPlayingPage] = useState(0);
  const [nowPlayingTotalPages, setNowPlayingTotalPages] = useState(0);
  const [popularPage, setPopularPage] = useState(0);
  const [popularTotalPages, setPopularTotalPages] = useState(0);
  const [upcomingPage, setUpcomingPage] = useState(0);
  const [upcomingTotalPages, setUpcomingTotalPages] = useState(0);
  const [topRatedPage, setTopRatedPage] = useState(0);
  const [topRatedTotalPages, setTopRatedTotalPages] = useState(0);
  const [nowPlayingFilms, setNowPlayingFilms] = useState([]);
  const [popularFilms, setPopularFilms] = useState([]);
  const [upcomingFilms, setUpcomingFilms] = useState([]);
  const [topRatedFilms, setTopRatedFilms] = useState([]);
  const [isNowPlayingLoading, setIsNowPlayingLoading] = useState(true);
  const [isPopularLoading, setIsPopularLoading] = useState(true);
  const [isUpcomingLoading, setIsUpcomingLoading] = useState(true);
  const [isTopRatedLoading, setIsTopRatedLoading] = useState(true);

  const scrollY = useRef(new Animated.Value(0)).current;

  const _onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  // Header animation
  const searchSectionPadding = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [15, 4],
    extrapolate: "clamp",
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerElevation = scrollY.interpolate({
    inputRange: [
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
    ],
    outputRange: [0, 10],
    extrapolate: "clamp",
  });

  const _searchFilms = () => {
    navigation.navigate("SearchScreen", { text: searchedText });
    setSearchedText("");
  };

  const _searchTextInputChanged = (text) => {
    setSearchedText(text);
  };

  const _loadNowPlayingFilms = async () => {
    setIsNowPlayingLoading(true);
    const data = await getNowPlaying(nowPlayingPage + 1);
    if (data) {
      setNowPlayingPage(data.page);
      setNowPlayingTotalPages(data.total_pages);
      setNowPlayingFilms([...nowPlayingFilms, ...data.results]);
      setIsNowPlayingLoading(false);
    }
  };

  const _loadPopularFilms = async () => {
    setIsPopularLoading(true);
    const data = await getPopular(popularPage + 1, type);
    if (data) {
      setPopularPage(data.page);
      setPopularTotalPages(data.total_pages);
      setPopularFilms([...popularFilms, ...data.results]);
      setIsPopularLoading(false);
    }
  };

  const _loadUpcomingFilms = async () => {
    setIsUpcomingLoading(true);
    const data = await getUpcoming(upcomingPage + 1);
    if (data) {
      setUpcomingPage(data.page);
      setUpcomingTotalPages(data.total_pages);
      setUpcomingFilms([...upcomingFilms, ...data.results]);
      setIsUpcomingLoading(false);
    }
  };

  const _loadTopRatedFilms = async () => {
    setIsTopRatedLoading(true);
    const data = await getTopRated(topRatedPage + 1);
    if (data) {
      setTopRatedPage(data.page);
      setTopRatedTotalPages(data.total_pages);
      setTopRatedFilms([...topRatedFilms, ...data.results]);
      setIsTopRatedLoading(false);
    }
  };

  useEffect(() => {
    if (nowPlayingFilms.length === 0) {
      _loadNowPlayingFilms();
    }
  }, [nowPlayingFilms]);

  useEffect(() => {
    if (popularFilms.length === 0) {
      _loadPopularFilms();
    }
  }, [popularFilms, type]);

  useEffect(() => {
    if (upcomingFilms.length === 0) {
      _loadUpcomingFilms();
    }
  }, [upcomingFilms]);

  useEffect(() => {
    if (topRatedFilms.length === 0) {
      _loadTopRatedFilms();
    }
  }, [topRatedFilms]);

  const _displayLoading = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  };

  const _toggleType = () => {
    if (type === "movie") {
      setType("tv");
    } else if (type === "tv") {
      setType("movie");
    }
    setPopularPage(0);
    setPopularFilms([]);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Animated.View
        style={[
          styles.headerContainer,
          { height: headerHeight, elevation: headerElevation },
        ]}
      >
        <Animated.View
          style={[styles.searchSection, { padding: searchSectionPadding }]}
        >
          <SearchItem
            searchedText={searchedText}
            searchFilms={_searchFilms}
            searchTextInputChanged={_searchTextInputChanged}
          />
        </Animated.View>
        <Text style={styles.headerText}>TMDB APP</Text>
      </Animated.View>
      <ScrollView
        scrollEventThrottle={0.1}
        contentContainerStyle={{ paddingTop: 50 }}
        onScroll={_onScroll}
      >
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Films à l'affiche</Text>
          </View>
          <HorizontalFilmList
            navigation={navigation}
            films={nowPlayingFilms}
            page={nowPlayingPage}
            totalPages={nowPlayingTotalPages}
            maxPage={2}
            loadFilms={_loadNowPlayingFilms}
          />
          {isNowPlayingLoading && _displayLoading()}
        </View>
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Films bientôt à l'affiche</Text>
          </View>
          <HorizontalFilmList
            navigation={navigation}
            films={upcomingFilms}
            page={upcomingPage}
            totalPages={upcomingTotalPages}
            maxPage={2}
            loadFilms={_loadUpcomingFilms}
          />
          {isUpcomingLoading && _displayLoading()}
        </View>
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Films populaires</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ borderWidth: 1, padding: 5 }}>
                <TouchableOpacity onPress={_toggleType}>
                  <Text>Au ciné</Text>
                </TouchableOpacity>
              </View>
              <View style={{ borderWidth: 1, padding: 5 }}>
                <TouchableOpacity onPress={_toggleType}>
                  <Text>A la télé</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <HorizontalFilmList
            navigation={navigation}
            filmsType={type}
            films={popularFilms}
            page={popularPage}
            totalPages={popularTotalPages}
            maxPage={2}
            loadFilms={_loadPopularFilms}
          />
          {isPopularLoading && _displayLoading()}
        </View>
        <View style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>Films les mieux notés</Text>
          </View>
          <HorizontalFilmList
            navigation={navigation}
            films={topRatedFilms}
            page={topRatedPage}
            totalPages={topRatedTotalPages}
            maxPage={2}
            loadFilms={_loadTopRatedFilms}
          />
          {isTopRatedLoading && _displayLoading()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight || 42,
  },
  listContainer: {
    flex: 1,
    minHeight: 350,
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
  listHeader: {
    flexDirection: "row",
    padding: SPACING,
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingRight: 10,
  },
  headerContainer: {
    height: HEADER_MAX_HEIGHT,
    justifyContent: "flex-end",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    // elevation: 4,
    backgroundColor: "white",
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
});
