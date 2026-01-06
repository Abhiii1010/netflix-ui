import { View, Image, Text, StyleSheet } from 'react-native';
import { memo } from 'react';

function MovieCard({ item }) {
  return (
    <View style={styles.card}>
      <Image
        source={{
          uri:
            item.primaryImage?.url ||
            'https://via.placeholder.com/300x450?text=No+Image'
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={1}>
        {item.primaryTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 6,
  },
  title: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default memo(MovieCard);
