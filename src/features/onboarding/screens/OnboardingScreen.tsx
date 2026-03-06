import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    title: "Precision Planning",
    description:
      "Manage your tasks with a professional-grade interface designed for speed.",
    icon: "briefcase-outline",
    color: "#007AFF",
  },
  {
    id: "2",
    title: "Cloud Sync",
    description:
      "Your data is secured and synced across all your devices in real-time.",
    icon: "cloud-done-outline",
    color: "#5856D6",
  },
  {
    id: "3",
    title: "Ready for Launch",
    description:
      "Experience the new standard of productivity. Let’s get to work.",
    icon: "shield-checkmark-outline",
    color: "#10b981",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  // Animation for button width expansion
  const buttonWidth = useRef(new Animated.Value(70)).current;

  useEffect(() => {
    if (currentIndex === SLIDES.length - 1) {
      Animated.spring(buttonWidth, {
        toValue: 180, // Lalawak yung button
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(buttonWidth, {
        toValue: 70, // Babalik sa bilog
        useNativeDriver: false,
      }).start();
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      (slidesRef.current as any).scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace("/(auth)/login");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={SLIDES}
        horizontal
        pagingEnabled
        ref={slidesRef}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(e) =>
          setCurrentIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: item.color + "15" },
              ]}
            >
              <Ionicons name={item.icon as any} size={100} color={item.color} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        {/* Pagination Dots - Naka-align sa Left para balance sa Button na nasa Right */}
        <View style={styles.indicatorContainer}>
          {SLIDES.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 24, 8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    backgroundColor:
                      i === currentIndex
                        ? SLIDES[currentIndex].color
                        : "#D1D1D6",
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Dynamic Animated Button sa Right Side */}
        <Animated.View style={{ width: buttonWidth }}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              { backgroundColor: SLIDES[currentIndex].color },
            ]}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            {currentIndex === SLIDES.length - 1 ? (
              <Text style={styles.buttonText} numberOfLines={1}>
                GET STARTED
              </Text>
            ) : (
              <Ionicons name="arrow-forward" size={28} color="#FFF" />
            )}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  slide: { width, justifyContent: "center", alignItems: "center", padding: 40 },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1C1C1E",
    textAlign: "center",
    letterSpacing: -1,
  },
  description: {
    fontSize: 17,
    color: "#636366",
    textAlign: "center",
    marginTop: 15,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  footer: {
    flexDirection: "row", // Ginawang Row para magkatabi ang Dots at Button
    justifyContent: "space-between", // Dots sa Left, Button sa Right
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 60,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  indicatorContainer: { flexDirection: "row" },
  dot: { height: 8, borderRadius: 4, marginHorizontal: 4 },
  nextButton: {
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    flexDirection: "row",
    overflow: "hidden",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 1,
  },
});
