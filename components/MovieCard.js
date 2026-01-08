import { View, Image, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { memo } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 16;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

function MovieCard({ item }) {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Details', { id: item.id })}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed
      ]}
    >
      <Image
        source={{
          uri: item.primaryImage?.url || 'https://via.placeholder.com/300x450?text=No+Image'
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={1}>
        {item.primaryTitle}
      </Text>
    </Pressable>
  );
}

export default memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginBottom: 18,
    backgroundColor: '#000',
  },

  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }], // Netflix-style tap feedback
  },

  image: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: 6,
    backgroundColor: '#1c1c1c',
  },

  title: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
    color: '#e5e5e5',
  },
});
