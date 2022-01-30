import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, TextInput, View } from "react-native";
import React from "react";

SPACING= 20;
const SearchItem = ({ searchedText, searchFilms, searchTextInputChanged }) => {
  return (
    <>
      <Ionicons
        style={styles.searchIcon}
        name="search"
        size={25}
        color="grey"
      />
      <TextInput
        style={styles.headerTextInput}
        placeholder="Rechercher sur TMDB APP"
        onChangeText={(text) => searchTextInputChanged(text)}
        onSubmitEditing={() => searchFilms()}
        value={searchedText}
      />
      {searchedText !== "" && (
        <TouchableOpacity onPress={() => searchTextInputChanged("")}>
          <Ionicons
            style={styles.closeIcon}
            name="close-circle"
            size={25}
            color="grey"
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default SearchItem;

const styles = StyleSheet.create({
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
});
