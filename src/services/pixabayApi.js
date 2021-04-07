import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const apiKey = '19999371-811acb2fbb8c6314c2455af9d';

export default function fetchImages(query, currentPage) {
  return axios
    .get(`${baseURL}?q=${query}&page=${currentPage}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=12`)
    .then(response => {
      return response.json();
    })
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        return Promise.reject(new Error(`Can't find any image on this query ${query}`));
      }

      return { hits, totalHits };
    });
}