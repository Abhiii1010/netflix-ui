import { View, TextInput, FlatList, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { searchTitles } from '../api/imdbSearchApi';
import MovieCard from '../components/MovieCard';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      const data = await searchTitles(query);
      setResults(data);
      setLoading(false);
    }, 400); // debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search movies or shows"
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      {loading && <ActivityIndicator color="#E50914" size="large" style={{ marginTop: 10 }} />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MovieCard item={item} />}
        numColumns={2}                          // ⭐ 2-column grid like HomeScreen
        columnWrapperStyle={styles.row}        // ⭐ spacing between cards
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && query.length > 1 ? (
            <Text style={styles.noResults}>No results found</Text>
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
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },

  row: {
    justifyContent: 'space-between',
  },

  listContent: {
    paddingBottom: 20,
  },

  noResults: {
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
