import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";

const Avatar = ({ dispatch, avatar }) => {

  const _avatarClicked = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const action = { type: "SET_AVATAR", value: { uri: result.uri }}
      dispatch(action)
    }
  };

  return (
    <TouchableOpacity style={styles.touchableOpacity} onPress={_avatarClicked}>
      <Image style={styles.avatar} source={avatar} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#9B9B9B",
    borderWidth: 2,
  },
});

const mapStateToProps = (state) => {
    return {
      avatar: state.setAvatar.avatar,
    };
  };

export default connect(mapStateToProps, null)(Avatar);
