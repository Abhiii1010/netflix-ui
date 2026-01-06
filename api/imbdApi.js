const BASE_URL = 'https://api.imdbapi.dev/titles';

export const fetchTitles = async (page = 1) => {
  try {
    const url = `${BASE_URL}?startYear=2025&sortBy=SORT_BY_POPULARITY&page=${page}`;
    console.log('Fetching:', url);

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log('API response:', json);

    return json?.titles ?? [];
  } catch (err) {
    console.error('Fetch error:', err.message);
    return [];
  }
};
