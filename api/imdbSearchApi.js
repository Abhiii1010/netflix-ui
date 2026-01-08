const SEARCH_URL = 'https://api.imdbapi.dev/search/titles';

export const searchTitles = async (query) => {
  if (!query || query.trim().length < 2) return [];

  try {
    console.log('Searching:', query);

    const res = await fetch(
      `${SEARCH_URL}?query=${encodeURIComponent(query)}`
    );
    const json = await res.json();

    return json.titles || [];
  } catch (err) {
    console.log('Search error:', err);
    return [];
  }
};
