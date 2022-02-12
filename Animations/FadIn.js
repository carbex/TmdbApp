import React, { useRef, useEffect, useCallback } from "react";
import { Animated } from "react-native";
import Layout from "../Constants/Layout";
import { useFocusEffect } from '@react-navigation/native';

function FadIn({ index, children }) {
  const positionLeft = useRef(new Animated.Value(Layout.window.width)).current;

  useFocusEffect(
    useCallback(() => {
    Animated.spring(positionLeft, {
      toValue: 0,
      useNativeDriver: false,
      // delay: (index * 100)
    }).start();
    return () => {
      Animated.spring(positionLeft, {
        toValue: Layout.window.width,
        useNativeDriver: false,
      }).start();
    }
  }, [index])
  );

  return (
    <Animated.View style={{ left: positionLeft }}>{children}</Animated.View>
  );
}

export default FadIn;
