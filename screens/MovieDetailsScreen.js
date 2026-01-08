import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useEffect, useState } from 'react';
import { fetchTitleDetails } from '../api/imdbDetailsApi';
import { useWatchlist } from '../context/WatchlistContext';
import { useNavigation } from '@react-navigation/native';

export default function MovieDetailsScreen({ route }) {
  const { id } = route.params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
 const navigation = useNavigation();

  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();

  useEffect(() => {
    (async () => {
      const data = await fetchTitleDetails(id);
      setMovie(data);
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} color="#E50914" />;
  }

  if (!movie) return null;

  const saved = isInWatchlist(movie.id);
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
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

      <Image
        source={{ uri: movie.primaryImage?.url }}
        style={{ height: 500 }}
      />

      <View style={{ padding: 14 }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
          {movie.primaryTitle}
        </Text>

        <Text style={{ color: '#aaa', marginVertical: 6 }}>
          {movie.startYear} • {Math.floor(movie.runtimeSeconds / 60)} min • ⭐
          {movie.rating?.aggregateRating}
        </Text>

        <Text style={{ color: '#fff', marginVertical: 8 }}>
          {movie.plot}
        </Text>

        <Text style={{ color: '#aaa' }}>
          Genres: {movie.genres?.join(', ')}
        </Text>

        <Text style={{ color: '#aaa', marginTop: 6 }}>
          Director: {movie.directors?.map(d => d.displayName).join(', ')}
        </Text>

        <Text style={{ color: '#aaa', marginTop: 4 }}>
          Stars: {movie.stars?.map(s => s.displayName).join(', ')}
        </Text>

        {/* WATCHLIST BUTTON — ONLY HERE */}
        <TouchableOpacity
          onPress={() =>
            saved ? removeFromWatchlist(movie.id) : addToWatchlist(movie)
          }
          style={{
            backgroundColor: saved ? '#333' : '#E50914',
            padding: 12,
            marginTop: 20,
            borderRadius: 6
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>
            {saved ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
