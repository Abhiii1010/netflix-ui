const DETAILS_URL = 'https://api.imdbapi.dev/titles';

export const fetchTitleDetails = async (id) => {
  try {
    const res = await fetch(`${DETAILS_URL}/${id}`);
    return await res.json();
  } catch (err) {
    console.log('Details API error:', err);
    return null;
  }
};
