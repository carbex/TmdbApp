import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Bounce from "../Animations/Bounce";

const Avatar = ({ navigation, dispatch, avatar }) => {
  const [avatarIsTouched, setAvatarIsTouched] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

  const _showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    _toggleModal();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const action = { type: "SET_AVATAR", value: { uri: result.uri } };
      dispatch(action);
    }
  };

  const _openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    _toggleModal();

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      const action = { type: "SET_AVATAR", value: { uri: result.uri } };
      dispatch(action);
    }
  };

  const _toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={_toggleModal}
      >
        <TouchableWithoutFeedback onPress={_toggleModal}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable
                style={{
                  position: "absolute",
                  top: -22,
                  marginLeft: "auto",
                  marginRight: "auto",
                  backgroundColor: "white",
                  borderRadius: 25,
                  padding: 10,
                }}
                onPress={_toggleModal}
              >
                <Ionicons size={25} name="close" />
              </Pressable>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={[styles.button]} onPress={_openCamera}>
                  <Ionicons size={30} name="camera" />
                  <Text>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button]}
                  onPress={_showImagePicker}
                >
                  <Ionicons size={30} name="folder" />
                  <Text>Album</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity 
        style={styles.touchableOpacity} 
        onPress={_toggleModal}
        onPressIn={() => setAvatarIsTouched(true)}
        onPressOut={() => setAvatarIsTouched(false)}
      >
      <Bounce isTouched={avatarIsTouched}>
        <Image style={styles.avatar} source={avatar} />
        </Bounce>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  touchableOpacity: {
    marginRight: 20,
    // width: 100,
    // height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#9B9B9B",
    borderWidth: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    margin: 5,
    alignItems: "center",
  },
  buttonOpen: {
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "orange",
  },
  buttonClose: {
    borderRadius: 25,
    backgroundColor: "white",
  },
});

const mapStateToProps = (state) => {
  return {
    avatar: state.setAvatar.avatar,
  };
};

export default connect(mapStateToProps, null)(Avatar);
