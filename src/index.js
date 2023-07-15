import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const catInfoDiv = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");

function displayCatInfo(cat) {
  catInfoDiv.innerHTML = `
    <h2>${cat.breeds[0].name}</h2>
    <p>Опис: ${cat.breeds[0].description}</p>
    <p>Темперамент: ${cat.breeds[0].temperament}</p>
    <img src="${cat.url}" alt="${cat.breeds[0].name}" />
  `;
}

function setupBreedSelect(breeds) {
  const selectOptions = breeds.map((breed) => ({ text: breed.name, value: breed.id }));
  new SlimSelect({
    select: ".breed-select",
    data: selectOptions,
    onChange: (info) => {
      const selectedValue = info.value[0];
      loader.style.display = "block";
      catInfoDiv.style.display = "none";
      error.style.display = "none";

      fetchCatByBreed(selectedValue)
        .then((cat) => {
          displayCatInfo(cat);
          loader.style.display = "none";
          catInfoDiv.style.display = "block";
        })
        .catch((err) => {
          loader.style.display = "none";
          error.style.display = "block";
          console.error(err);
        });
    },
  });
}

loader.style.display = "block";
catInfoDiv.style.display = "none";
error.style.display = "none";

fetchBreeds()
  .then((breeds) => {
    setupBreedSelect(breeds);
    loader.style.display = "none";
  })
  .catch((err) => {
    loader.style.display = "none";
    error.style.display = "block";
    console.error(err);
  });


fetchBreeds()
  .then((breeds) => {
    setupBreedSelect(breeds);
    loader.style.display = "none";
  })
  .catch((err) => {
    loader.style.display = "none";
    error.style.display = "block";
    console.error(err);
  });