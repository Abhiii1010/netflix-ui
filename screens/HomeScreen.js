import { FlatList, ActivityIndicator } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { fetchTitles } from '../../api/imbdApi';
import MovieCard from '../../components/MovieCard';

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMovies = useCallback(async (reset = false) => {
    if (loadingMore) return;

    setLoadingMore(true);
    const newData = await fetchTitles(page);

    setMovies(prev =>
      reset ? newData : [...prev, ...newData]
    );

    setLoadingMore(false);
  }, [page, loadingMore]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    await loadMovies(true);
    setRefreshing(false);
  };

  return (
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MovieCard item={item} />}
      onEndReached={() => setPage(p => p + 1)}
      onEndReachedThreshold={0.6}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListFooterComponent={
        loadingMore ? <ActivityIndicator size="large" /> : null
      }
      removeClippedSubviews
      windowSize={7}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
    />
  );
}
