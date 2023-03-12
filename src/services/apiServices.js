import axios from 'axios';

export async function goSearch(query, pageNumber) {
  try {
    const { data } = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '32613318-c4586bdc29b7e1cabb37e9d30',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: pageNumber,
        per_page: 12,
      },
    });
    const totalHits = data.totalHits;
    const pictures = data.hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
      })
    );
    return { totalHits, pictures };
  } catch (error) {
    throw new Error(error);
  }
}
