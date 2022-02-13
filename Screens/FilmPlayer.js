import { StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";
import YoutubePlayer from "react-native-youtube-iframe";

export default function FilmPlayer({ navigation, route }) {
  const { key } = route.params;

  const onStateChange = (state) => {
    if (state === "ended") {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <YoutubePlayer
        height={300}
        play={true}
        videoId={key}
        onChangeState={onStateChange}
      />
      {/* <WebView
        style={styles.WebViewStyle}
        source={{
          uri: `https://www.youtube.com/embed/${key}`,
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    alignContent: 'center', justifyContent: 'center'
  },
  WebViewStyle: {
    height: 300,
  },
});
