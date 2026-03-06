// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Button,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { authService } from "../../src/features/auth/services/authService";

// export default function RegisterScreen() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const handleRegister = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please fill in all fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       await authService.register(email, password);
//       Alert.alert("Success", "Account created successfully!");
//       router.replace("/"); // Go to main app
//     } catch (error) {
//       Alert.alert("Registration Failed", error as string);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>

//       <TextInput
//         placeholder="Email"
//         style={styles.input}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//       />

//       <TextInput
//         placeholder="Password"
//         style={styles.input}
//         secureTextEntry
//         onChangeText={setPassword}
//       />

//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <Button title="Register" onPress={handleRegister} />
//       )}

//       <Text onPress={() => router.back()} style={styles.link}>
//         Already have an account? Login here
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 30,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 15,
//     marginBottom: 15,
//     borderRadius: 8,
//   },
//   link: {
//     marginTop: 20,
//     color: "#007AFF",
//     textAlign: "center",
//     fontWeight: "600",
//   },
// });

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
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

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await authService.register(email, password);
      Alert.alert("Success", "Account created successfully!");
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
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
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="person-add" size={45} color="#007AFF" />
          </View>
          <Text style={styles.title}>Join Us</Text>
          <Text style={styles.subtitle}>
            Create an account to start tracking tasks.
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#8E8E93"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email Address"
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
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#8E8E93"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>CREATE ACCOUNT</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.back()} style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account? <Text style={styles.link}>Login</Text>
            </Text>
          </TouchableOpacity>
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
    width: 90,
    height: 90,
    backgroundColor: "#FFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1C1C1E",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: "#8E8E93",
    marginTop: 10,
    textAlign: "center",
  },
  form: { width: "100%" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
    height: 60,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  icon: { marginRight: 10 },
  input: { flex: 1, fontSize: 16, color: "#1C1C1E" },
  registerButton: {
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
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footer: { marginTop: 30, alignItems: "center" },
  footerText: { color: "#8E8E93", fontSize: 15 },
  link: { color: "#007AFF", fontWeight: "bold" },
});
