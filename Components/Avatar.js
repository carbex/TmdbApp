import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

const Avatar = ({ navigation, dispatch, avatar }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const _showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    setModalVisible(false);

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

    setModalVisible(false);

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      const action = { type: "SET_AVATAR", value: { uri: result.uri } };
      dispatch(action);
    }
  };

  const _avatarClicked = () => {};

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                position: "absolute",
                top: -25,
                marginLeft: "auto",
                marginRight: "auto",
                backgroundColor: 'white',
                borderRadius: 25
              }}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons size={25} name="close" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.buttonOpen]}
              onPress={_openCamera}
            >
              <Text>Utiliser la caméra</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonOpen]}
              onPress={_showImagePicker}
            >
              <Text>Accéder à la gallerie</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={() => setModalVisible(true)}
      >
        <Image style={styles.avatar} source={avatar} />
      </TouchableOpacity>
    </>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
