import axios from 'axios';
const KEY = '40758984-7f24ff10d45b7d0fc8545c88b';
axios.defaults.baseURL = 'https://pixabay.com';
async function requestImage({ query, page }) {
  const params = {
    q: query,
    key: KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page,
  };

  const images = await axios.get('/api/', { params });
  return images.data;
}
export { requestImage };
