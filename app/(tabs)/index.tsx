// import React from "react";
// import {
//   ActivityIndicator,
//   FlatList,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { useTasks } from "../../src/features/tasks/hooks/useTasks";
// import { useAuth } from "../../src/store/AuthContext";
// // Import our new components
// import { TaskInput } from "../../src/features/tasks/components/TaskInput";
// import { TaskItem } from "../../src/features/tasks/components/TaskItem";

// export default function TaskListScreen() {
//   const { user } = useAuth();
//   const { tasks, taskTitle, setTaskTitle, loading, addTask, deleteTask } =
//     useTasks(user);

//   if (loading && tasks.length === 0) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#007AFF" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>My Tasks</Text>

//       <TaskInput
//         value={taskTitle}
//         onChangeText={setTaskTitle}
//         onAdd={addTask}
//       />

//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TaskItem title={item.title} onDelete={() => deleteTask(item.id)} />
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#F2F2F7",
//     paddingTop: 60,
//   },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   header: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
// });

import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../../src/constants/theme";
import { TaskInput } from "../../src/features/tasks/components/TaskInput";
import { TaskItem } from "../../src/features/tasks/components/TaskItem";
import { useTasks } from "../../src/features/tasks/hooks/useTasks";
import { useAuth } from "../../src/store/AuthContext";

export default function TaskListScreen() {
  const { user } = useAuth();
  const { tasks, taskTitle, setTaskTitle, loading, addTask, deleteTask } =
    useTasks(user);

  if (loading && tasks.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tasks</Text>

      {/* Ang onAdd ay tumatanggap na ng category galing sa TaskInput */}
      <TaskInput
        value={taskTitle}
        onChangeText={setTaskTitle}
        onAdd={(category) => addTask(category)}
      />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            category={item.category} // Huwag kalimutan ito!
            onDelete={() => deleteTask(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
    paddingTop: 60,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.text,
  },
  listContent: { paddingBottom: 20 },
});
