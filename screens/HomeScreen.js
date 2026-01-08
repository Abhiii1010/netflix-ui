import { 
  FlatList,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { fetchTitles } from '../api/imbdApi';
import MovieCard from '../components/MovieCard';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMovies = async (reset = false) => {
    if (loadingMore) return;

    setLoadingMore(true);
    const newData = await fetchTitles(page);

    setMovies(prev =>
      reset ? newData : [...prev, ...newData]
    );

    setLoadingMore(false);
  };

  useEffect(() => {
    loadMovies();
  }, [page]);

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await loadMovies(true);
    setRefreshing(false);
  };

  // 🔹 Featured movie (big card)
  const featuredMovie = movies[0];

  // 🔹 Top 10 shows (horizontal)
  const topTen = movies.slice(1, 11);

  // 🔹 Grid movies
  const gridMovies = movies.slice(11);

  return (
    <View style={styles.container}>
      <FlatList
        data={gridMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard item={item} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={() => setPage(p => p + 1)}
        onEndReachedThreshold={0.6}
        refreshing={refreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}

        // 🔹 Header: featured movie + horizontal Top 10
        ListHeaderComponent={
          <View>
            {/* 🔥 BIG FEATURED MOVIE */}
            {featuredMovie && (
              <View style={styles.heroContainer}>
                <Image
                  source={{
                    uri:
                      featuredMovie.primaryImage?.url ||
                      'https://via.placeholder.com/500x750',
                  }}
                  style={styles.heroImage}
                />
                <View style={styles.heroOverlay}>
                  <Text style={styles.heroTag}>FEATURED</Text>
                  <Text style={styles.heroTitle}>
                    {featuredMovie.primaryTitle}
                  </Text>

                  {/* ⭐ WATCH NOW BUTTON */}
                  <TouchableOpacity
                    style={styles.watchButton}
                    onPress={() =>
                      navigation.navigate('Details', { id: featuredMovie.id })
                    }
                  >
                    <Text style={styles.watchButtonText}>Watch Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* 🔥 TOP 10 HORIZONTAL ROW */}
            {topTen.length > 0 && (
              <View style={{ marginBottom: 16 }}>
                <Text style={styles.sectionTitle}>Top 10 Shows Today</Text>
                <FlatList
                  data={topTen}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => <MovieCard item={item} />}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.topList}
                />
              </View>
            )}
          </View>
        }

        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator size="large" color="#E50914" />
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  /* HERO FEATURED */
  heroContainer: {
    height: height * 0.55,
    marginBottom: 12,
  },

  heroImage: {
    width: '100%',
    height: '100%',
  },

  heroOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 16,
  },

  heroTag: {
    color: '#E50914',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },

  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },

  watchButton: {
    marginTop: 12,
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },

  watchButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  /* TOP 10 HORIZONTAL */
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 12,
    marginBottom: 8,
  },

  topList: {
    paddingLeft: 12,
    paddingRight: 8,
  },

  /* GRID BELOW */
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  row: {
    justifyContent: 'space-between',
  },
});
