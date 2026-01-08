import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import { useNavigation } from '@react-navigation/native';

export default function WatchlistScreen() {
  const { watchlist } = useWatchlist();
 const navigation = useNavigation();

  if (!watchlist || watchlist.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Your watchlist is empty
        </Text>
      </View>
    );
  }

  return (
    
    <View style={styles.container}>
        <View style={{
          position: 'absolute',
          top: 40,
          left: 15,
          zIndex: 10
        }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: 10,
              borderRadius: 20
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>←</Text>
          </TouchableOpacity>
        </View>
      <FlatList
        data={watchlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard item={item} />}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
  },
});
