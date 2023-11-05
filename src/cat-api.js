import axios from "axios";

axios.defaults.headers.common['x-api-key'] =
  'live_dexl2PacBXoFTdBB36rtnCjoXL9KxuUptjOSSNVSkVUIHopgjoob0waGvc6imnxB';
const BASE_URL = 'https://api.thecatapi.com/v1';
const AND_POINT_BREEDS = '/breeds';
const AND_POINT_IMG_SEARCH = '/images/search';



function fetchBreeds() {
  return axios.get(`${BASE_URL}${AND_POINT_BREEDS}`);
}


function fetchCatByBreed(breedId) {
  return axios.get(`${BASE_URL}${AND_POINT_IMG_SEARCH}?breed_ids=${breedId}`);
}

export { fetchBreeds, fetchCatByBreed };