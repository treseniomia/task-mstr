// import { Ionicons } from "@expo/vector-icons";
// import { useLocalSearchParams } from "expo-router";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { COLORS } from "../../src/constants/theme";
// import { usePomodoro } from "../../src/features/tasks/hooks/usePomodoro";

// // FIXED: Added default export
// export default function TaskDetailScreen() {
//   const { title, category } = useLocalSearchParams();
//   const { formatTime, isActive, toggleTimer, resetTimer } = usePomodoro(25);

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerCard}>
//         <Text style={styles.categoryLabel}>{category}</Text>
//         <Text style={styles.taskTitle}>{title}</Text>
//       </View>

//       <View style={styles.timerBox}>
//         <Text style={styles.timerText}>{formatTime()}</Text>
//         <Text style={styles.statusText}>
//           {isActive ? "FOCUSING" : "PAUSED"}
//         </Text>
//       </View>

//       <View style={styles.controls}>
//         <TouchableOpacity onPress={resetTimer}>
//           <Ionicons name="refresh" size={30} color={COLORS.subtext} />
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.mainBtn, isActive && { backgroundColor: "#FF9500" }]}
//           onPress={toggleTimer}
//         >
//           <Ionicons name={isActive ? "pause" : "play"} size={45} color="#FFF" />
//         </TouchableOpacity>

//         <View style={{ width: 30 }} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: COLORS.background, padding: 25 },
//   headerCard: {
//     padding: 20,
//     backgroundColor: "#FFF",
//     borderRadius: 20,
//     marginBottom: 40,
//   },
//   categoryLabel: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: COLORS.primary,
//     textTransform: "uppercase",
//   },
//   taskTitle: { fontSize: 24, fontWeight: "bold", color: COLORS.text },
//   timerBox: { flex: 1, justifyContent: "center", alignItems: "center" },
//   timerText: { fontSize: 90, fontWeight: "200", color: COLORS.text },
//   statusText: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: COLORS.subtext,
//     letterSpacing: 3,
//   },
//   controls: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     paddingBottom: 50,
//   },
//   mainBtn: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: COLORS.primary,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../src/constants/theme";
import { CircularProgress } from "../../src/features/tasks/components/CircularProgress";
import { usePomodoro } from "../../src/features/tasks/hooks/usePomodoro";

export default function TaskDetailScreen() {
  const { title, category } = useLocalSearchParams();

  // Naka-set sa 25 minutes
  const initialMinutes = 25;
  const { timeLeft, formatTime, isActive, toggleTimer, resetTimer } =
    usePomodoro(initialMinutes);

  // Kinalkula ang progress ratio (0 to 1) para sa ring
  const totalSeconds = initialMinutes * 60;
  const progress = timeLeft / totalSeconds;

  return (
    <View style={styles.container}>
      {/* Task Header Section */}
      <View style={styles.headerCard}>
        <Text style={styles.categoryLabel}>{category}</Text>
        <Text style={styles.taskTitle}>{title}</Text>
      </View>

      {/* Timer Section with Circular Progress */}
      <View style={styles.timerBox}>
        <View style={styles.progressWrapper}>
          <CircularProgress
            progress={progress}
            size={280}
            strokeWidth={15}
            color={COLORS.primary}
          />

          {/* Timer text is positioned absolutely to be inside the circle */}
          <View style={styles.timerTextContainer}>
            <Text style={styles.timerText}>{formatTime()}</Text>
            <Text style={styles.statusText}>
              {isActive ? "FOCUSING" : "PAUSED"}
            </Text>
          </View>
        </View>
      </View>

      {/* Controls Section */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.secondaryBtn} onPress={resetTimer}>
          <Ionicons name="refresh" size={28} color={COLORS.subtext} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.mainBtn, isActive && { backgroundColor: "#FF9500" }]}
          onPress={toggleTimer}
        >
          <Ionicons name={isActive ? "pause" : "play"} size={40} color="#FFF" />
        </TouchableOpacity>

        {/* Placeholder to keep layout balanced */}
        <View style={{ width: 44 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 25,
  },
  headerCard: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 40,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  categoryLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.primary,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
  },
  timerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  progressWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 280,
    height: 280,
  },
  timerTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    fontSize: 70,
    fontWeight: "200",
    color: COLORS.text,
    letterSpacing: -2,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.subtext,
    letterSpacing: 3,
    marginTop: -5,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  mainBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  secondaryBtn: {
    padding: 10,
  },
});
