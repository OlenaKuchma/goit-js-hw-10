import axios from "axios";

const API_KEY = "live_gBH5302ktbMVgPX5RapGKWNc8fiuPraiOniQHi3IPR2JsHdxLVJ1BZmiacTV6aqU";
axios.defaults.headers.common["x-api-key"] = API_KEY;

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Failed to fetch breeds");
      }
      return response.data;
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error("Failed to fetch cat by breed");
      }
      return response.data[0];
    });
}