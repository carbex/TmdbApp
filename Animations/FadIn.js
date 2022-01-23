import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";
import Layout from "../Constants/Layout";

function FadIn({ index, children }) {
  const positionLeft = useRef(new Animated.Value(Layout.window.width)).current;

  useEffect(() => {
    Animated.spring(positionLeft, {
      toValue: 0,
      useNativeDriver: false,
      // delay: (index * 150)
    }).start();
  }, [index]);

  return (
    <Animated.View style={{ left: positionLeft }}>{children}</Animated.View>
  );
}

export default FadIn;
