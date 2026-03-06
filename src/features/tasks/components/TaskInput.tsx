import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../constants/theme";
import { CATEGORIES, CategoryType } from "../constants/categories";

interface TaskInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onAdd: (category: CategoryType) => void;
}

export const TaskInput = ({ value, onChangeText, onAdd }: TaskInputProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("Personal");

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="New task..."
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onAdd(selectedCategory)}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
      >
        {(Object.keys(CATEGORIES) as CategoryType[]).map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryChip,
              selectedCategory === cat && {
                backgroundColor: CATEGORIES[cat].color,
              },
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Ionicons
              name={CATEGORIES[cat].icon as any}
              size={16}
              color={selectedCategory === cat ? "#FFF" : COLORS.subtext}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.activeText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  inputRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
  input: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    elevation: 2,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 15,
    borderRadius: 12,
    justifyContent: "center",
  },
  categoryList: { flexDirection: "row" },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryText: { fontSize: 13, color: COLORS.subtext, fontWeight: "500" },
  activeText: { color: "#FFF" },
});
