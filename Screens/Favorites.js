import React, {useRef,useLayoutEffect} from "react";
import { View, StyleSheet, SafeAreaView, Animated } from "react-native";
import { connect } from "react-redux";
import FilmList from "../Components/FilmList";
import Avatar from '../Components/Avatar'
import Layout from "../Constants/Layout";

const Favorites = ({ navigation, favoritesFilm }) => {

  const scrollY = useRef(new Animated.Value(Layout.window.height)).current;
  
  const _onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  )


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (favoritesFilm != undefined) {
          return (
            <View style={{ flexDirection: "row" }}>
              <Avatar navigation={navigation}/>
            </View>
          );
        }
      },
    });
  }, [
    favoritesFilm
  ]);


  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* <View style={styles.avatarContainer}>
        <Avatar navigation={navigation}/>
      </View> */}
        <FilmList
          scrollY={scrollY}
          onScroll={_onScroll}
          films={favoritesFilm}
          navigation={navigation}
          loadMoreOnScroll={false}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  avatarContainer: {
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => {
  return {
    favoritesFilm: state.toggleFavorite.favoritesFilm,
  };
};

export default connect(mapStateToProps, null)(Favorites);
