import { View, TextInput, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await AsyncStorage.removeItem('IS_GUEST');
      navigation.replace("Main");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://wallpaperaccess.com/full/13934140.jpg" }}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Dark overlay so text is readable */}
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.logo}>NETFLIX</Text>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#bbb"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#bbb"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={signup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>
            Already have an account? {" "}
            <Text style={{ color: "#E50914" }}>Sign In</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.setItem('IS_GUEST', 'true');
            navigation.replace('Main');
          }}
        >
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',  // dark overlay
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  logo: {
    color: "#E50914",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
  },

  input: {
    width: "100%",
    backgroundColor: "#222",
    color: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 6,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    width: "100%",
    backgroundColor: "#E50914",
    paddingVertical: 15,
    borderRadius: 6,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },

  error: {
    color: "#E50914",
    marginTop: 12,
    textAlign: "center",
    fontSize: 14,
  },

  loginText: {
    color: "#ddd",
    marginTop: 20,
    fontSize: 14,
    textAlign: "center",
  },

  guestText: {
    color: "#aaa",
    marginTop: 15,
    fontSize: 14,
    textAlign: "center",
  },
});
