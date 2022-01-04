import React, { useRef, useEffect} from "react";
import { Animated, Easing } from "react-native";

function Bounce({ children, isTouched }) {
  
    const scaleValue = useRef(new Animated.Value(0)).current;

    const favoriteScale = scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 1.2, 1.5],
    });
  
    const onPressIn = () => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };
  
    const onPressOut = () => {
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };

    useEffect(() => {
        if(isTouched) {
            onPressIn()
        } else {
            onPressOut()
        }
    }, [isTouched])
  
  return (
    <Animated.View style={{transform: [{ scale: favoriteScale}]}}>
      {children}
    </Animated.View>
  );
}

export default Bounce;
