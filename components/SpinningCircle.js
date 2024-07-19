import React, { useEffect, useState } from "react";
import { StyleSheet , Dimensions } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import  RotatingIcon  from './RotatingIcon';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

const CIRCLE_SIZE = SCREEN_WIDTH * 0.78;
const IMAGE_PATH = "../../assets/techs";
const images = [
  {
    image: require(`../assets/techs/vs-code.png`),
    imageTintColor: "#29B6F6",
    containerColor: "#f0efef",
   title: "Track Expenses",
    description:
      "Keep a detailed record of all your expenses to manage your budget effectively.",
  },
  {
    image: require(`../assets/techs/flutter.png`),
    imageTintColor: "#40C4FF",
    containerColor: "#f0efef",
    title: "Savings Goals",
    description:
      "Set and monitor your savings goals to achieve your financial objectives.",
  },
  {
    image: require(`../assets/techs/react.png`),
    imageTintColor: "#8BB7F0",
    containerColor: "#f0efef",
    title: "Investments",
    description:
      "Diversify your investments to build a robust and profitable portfolio.",
  },
  {
    image: require(`../assets/techs/swiftui.png`),
    imageTintColor: "#ffffff",
    containerColor: "#F58420",
   title: "Budget Planning",
    description:
      "Plan your budget to ensure all your financial commitments are met with ease.",
  },
  {
    image: require(`../assets/techs/kotlin.png`),
    imageTintColor: "#f0efef",
    containerColor: "#3060FF",
    title: "Debt Management",
    description:
      "Manage and repay your debts efficiently to maintain a healthy financial status.",
  },
  {
    image: require(`../assets/techs/figma.png`),
    imageTintColor: "#7C4DFF",
    containerColor: "#f5f5f5",
    title: "Retirement Planning",
    description:
      "Prepare for your retirement by planning and saving early to ensure a comfortable future.",
  },
];

 const RunnyCircle = () => {
  const selectedIcon = useSharedValue(undefined);
  const [selectedIndex, setSelectedIndex] = useState(
    undefined
  );

  const rotation = useSharedValue(0);
  

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 25000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [rotation]);

  const circleAStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handleIconPress = (index) => {
    selectedIcon.value = index;
    setSelectedIndex(index);
  };

  return (
    <Animated.View style={[styles.circle, circleAStyle]}>
      {images.map((image, i) => (
        <RotatingIcon
          selectedIndex={selectedIndex}
          rotation={rotation}
          onPress={handleIconPress}
          tech={image}
          key={i}
          index={i}
        />
      ))}
    </Animated.View>
  );
};

export default RunnyCircle

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: "absolute",
    borderWidth: 3,
    borderColor: "#252525",
  },
});