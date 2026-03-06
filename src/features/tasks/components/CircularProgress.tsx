import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  progress: number; // 0 to 1
  size: number;
  strokeWidth: number;
  color: string;
}

export const CircularProgress = ({
  progress,
  size,
  strokeWidth,
  color,
}: Props) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    // Para maging smooth ang paggalaw ng ring
    animatedProgress.value = withTiming(progress, { duration: 500 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - animatedProgress.value),
  }));

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Svg width={size} height={size}>
        {/* Background Circle (Yung kulay gray na circle sa likod) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E5E5"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle (Yung gumagalaw) */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          strokeLinecap="round"
          rotation="-90" // Start sa taas (12 o'clock)
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
    </View>
  );
};
