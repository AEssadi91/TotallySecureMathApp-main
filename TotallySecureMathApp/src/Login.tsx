import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TRootStackParamList } from "./App";
import * as Keychain from '@react-native-keychain/react-native-keychain';

export interface IUser {
  username: string;
  password: string;
}

interface IProps {
  onLogin: (user: IUser) => void;
}

type TProps = NativeStackScreenProps<TRootStackParamList, "Login"> & IProps;

const Login: React.FC<TProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handles the login logic
  async function handleLogin() {
    // Validates that both username and password fields are filled out
    if (!username || !password) {
      Alert.alert("Error", "Please fill in both username and password.");
      return;
    }

    try {
      // Attempts to retrieve the securely stored credentials for comparison
      const credentials = await Keychain.getGenericPassword();
      if (
        credentials &&
        credentials.username === username &&
        credentials.password === password
      ) {
        onLogin({ username, password });
      } else {
        Alert.alert("Error", "Username or password is invalid.");
      }
    } catch (error) {
      // Logs and alerts the user of any errors during the login process
      console.error("Login error:", error);
      Alert.alert("Error", "An error occurred when trying to log in.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        autoCapitalize="none" // Prevents automatic capitalization
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry // Ensures the password is obscured
        autoCapitalize="none" // Consistency with username field
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center", // Centers the title for better aesthetics
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5, // Adds a subtle rounded corner for a modern look
  },
});

export default Login;

/*
Changes and Enhancements:
- Introduced useState for state management, following React's best practices for functional components.
- Added input validation to check for empty fields before attempting login, improving user feedback.
- Consolidated TextInput styles into a single style object to maintain consistency and simplify the code.
- Applied 'autoCapitalize="none"' to both inputs to prevent automatic capitalization errors during login.
- Replaced 'console.log' with 'console.error' for error logging, appropriate for logging errors.
- Used descriptive function names (`handleLogin` instead of `login`) for clarity and maintainability.
- Included borderRadius in TextInput styles for a slightly enhanced UI/UX.
*/
