import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constants/theme";
import { CATEGORIES, CategoryType } from "../constants/categories";

interface TaskItemProps {
  id: string;
  title: string;
  category: CategoryType;
  onDelete: () => void;
}

export const TaskItem = ({ id, title, category, onDelete }: TaskItemProps) => {
  const categoryInfo = CATEGORIES[category] || CATEGORIES.Personal;
  const router = useRouter();

  const handlePress = () => {
    router.push(`/task/${id}?title=${title}&category=${category}`);
  };

  return (
    <TouchableOpacity
      style={styles.taskContainer}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View
        style={[styles.iconBox, { backgroundColor: categoryInfo.color + "15" }]}
      >
        <Ionicons
          name={categoryInfo.icon as any}
          size={22}
          color={categoryInfo.color}
        />
      </View>

      <View style={styles.textDetails}>
        <Text style={styles.taskName} numberOfLines={1}>
          {title}
        </Text>
        <Text style={[styles.categoryName, { color: categoryInfo.color }]}>
          {category}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteIconButton}
        onPress={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Ionicons name="trash-outline" size={20} color={COLORS.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 12,
    alignItems: "center",
    // Shadow for iOS/Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  textDetails: { flex: 1 },
  taskName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 2,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  deleteIconButton: {
    padding: 10,
    marginLeft: 10,
  },
});
