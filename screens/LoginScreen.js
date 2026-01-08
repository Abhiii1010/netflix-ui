import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Main');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* NETFLIX LOGO */}
      <Text style={styles.logo}>NETFLIX</Text>
      <Text style={styles.title}>Sign In</Text>

      {/* EMAIL INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#b3b3b3"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* PASSWORD INPUT */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#b3b3b3"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* LOGIN BUTTON */}
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* ERROR MESSAGE */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* NAVIGATION TO SIGNUP */}
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    padding: 40,
  },
  logo: {
    color: '#E50914',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 14,
    borderRadius: 6,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E50914',
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  error: {
    color: '#E50914',
    marginTop: 15,
    textAlign: 'center',
    fontSize: 14,
  },
  signupText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
