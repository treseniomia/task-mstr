// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
// import { authService } from "../../src/features/auth/services/authService";

// export default function LoginScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = async () => {
//     try {
//       await authService.login(email, password);
//       // Success! Move to home screen
//       router.replace("/");
//     } catch (error) {
//       Alert.alert("Login Failed", error as string);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Task-Master Pro</Text>
//       <TextInput
//         placeholder="Email"
//         style={styles.input}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//       />
//       <TextInput
//         placeholder="Password"
//         style={styles.input}
//         secureTextEntry
//         onChangeText={setPassword}
//       />
//       <Button title="Login" onPress={handleLogin} />
//       <Text onPress={() => router.push("/(auth)/register")} style={styles.link}>
//         Don't have an account? Sign up
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", padding: 20 },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   link: { marginTop: 15, color: "blue", textAlign: "center" },
// });

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { authService } from "../../src/features/auth/services/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Info", "Please enter both email and password.");
      return;
    }
    try {
      await authService.login(email, password);
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Invalid credentials");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="briefcase" size={50} color="#007AFF" />
          </View>
          <Text style={styles.title}>TaskMaster Pro</Text>
          <Text style={styles.subtitle}>
            Sign in to manage your productivity
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#8E8E93"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#8E8E93"
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="#8E8E93"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  scrollContainer: { flexGrow: 1, justifyContent: "center", padding: 30 },
  header: { alignItems: "center", marginBottom: 40 },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#FFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: { fontSize: 28, fontWeight: "800", color: "#1C1C1E" },
  subtitle: { fontSize: 16, color: "#8E8E93", marginTop: 5 },
  form: { width: "100%" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    height: 60,
    borderRadius: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: "#1C1C1E" },
  loginButton: {
    backgroundColor: "#007AFF",
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 4,
    shadowColor: "#007AFF",
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loginButtonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 25 },
  footerText: { color: "#8E8E93", fontSize: 15 },
  link: { color: "#007AFF", fontSize: 15, fontWeight: "bold" },
});
