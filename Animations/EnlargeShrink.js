import React, { useState, useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

function EnlargeShrink({ children, shouldEnlarge }) {
  const _getSize = () => {
    if (shouldEnlarge) {
      return 80;
    }
    return 40;
  };

  const viewSize = useRef(new Animated.Value(_getSize())).current;
 
  useEffect(() => {
    Animated.spring(viewSize, {
      toValue: _getSize(),
      useNativeDriver: false,
    }).start();
  }, [shouldEnlarge]);

  return (
    <Animated.View style={{ width: viewSize, height: viewSize }}>
      {children}
    </Animated.View>
  );
}

export default EnlargeShrink;
