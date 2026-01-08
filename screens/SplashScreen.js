
import { View, Image, StyleSheet, Animated, Dimensions } from 'react-native';
import { useEffect, useRef } from 'react';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(1200), // wait for 1.2 seconds
      Animated.timing(opacity, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to main screen after animation
      navigation.replace('Signup'); // or 'Main' if user already logged in
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' }}
        style={[styles.logo, { opacity }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.6,
    height: height * 0.15,
  },
});
