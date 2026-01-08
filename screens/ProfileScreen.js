import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }) {
  
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('IS_GUEST').then(value => {
      if (value === 'true') setIsGuest(true);
    });
  }, []);

  if (isGuest) {
    return (
      <View style={styles.container}>
        <Text style={styles.guestTitle}>You’re browsing as Guest</Text>

         <TouchableOpacity
          style={styles.netflixButton}
          onPress={() => navigation.replace('Signup')}
        >
          <Text style={styles.buttonText}>Sign In to Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.profileTitle}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.menuItem}>Watch History</Text>
        <Text style={styles.menuItem} onPress={()=>navigation.navigate('Watchlist') }>Watchlist</Text>
      </View>

      <TouchableOpacity
        style={[styles.netflixButton, styles.signOutBtn]}
        onPress={() => {
          signOut(auth);
          navigation.replace("Signup");
        }}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  profileTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 30,
  },

  guestTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },

  card: {
    width: width - 40,
    backgroundColor: '#111',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 40,
  },

  menuItem: {
    fontSize: 16,
    color: '#e5e5e5',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },

  netflixButton: {
    width: width - 80,
    backgroundColor: '#E50914',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
  },

  signOutBtn: {
    backgroundColor: '#333',
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
