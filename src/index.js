import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

document.addEventListener("DOMContentLoaded", () => {
  const breedSelect = document.querySelector(".breed-select");
  const loader = document.querySelector(".loader");
  const error = document.querySelector(".error");
  const catInfo = document.querySelector(".cat-info");

  function populateBreeds(breeds) {
    breedSelect.innerHTML = ""; 

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select a breed";
    breedSelect.appendChild(defaultOption);

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  }

  function showLoader() {
    loader.style.display = "block";
    breedSelect.style.display = "none";
    catInfo.style.display = "none";
    error.style.display = "none";
  }

  function showBreedSelect() {
    loader.style.display = "none";
    breedSelect.style.display = "block";
    catInfo.style.display = "none";
    error.style.display = "none";
  }

  function showCatInfo() {
    loader.style.display = "none";
    breedSelect.style.display = "none";
    catInfo.style.display = "block";
    error.style.display = "none";
  }

  function displayCatInfo(cat) {
    const catImage = document.createElement("img");
    const breedName = document.createElement("p");
    const breedDescription = document.createElement("p");
    const breedTemperament = document.createElement("p");

    catImage.src = cat.url;
    breedName.textContent = "Breed: " + cat.breeds[0].name;
    breedDescription.textContent = "Description: " + cat.breeds[0].description;
    breedTemperament.textContent = "Temperament: " + cat.breeds[0].temperament;

    catInfo.innerHTML = "";
    catInfo.appendChild(catImage);
    catInfo.appendChild(breedName);
    catInfo.appendChild(breedDescription);
    catInfo.appendChild(breedTemperament);
    showCatInfo();
    breedSelect.style.display = "block"; 
  }

  function handleBreedSelectChange() {
    const selectedBreedId = breedSelect.value;

    if (!selectedBreedId) {
      showBreedSelect();
      return;
    }

    showLoader();

    fetchCatByBreed(selectedBreedId)
      .then((cat) => {
        displayCatInfo(cat);
      })
      .catch((error) => {
        console.error("Error fetching cat by breed:", error);
        error.style.display = "block";
        showBreedSelect();
      });
  }

  breedSelect.addEventListener("change", handleBreedSelectChange);

  fetchBreeds()
    .then((breeds) => {
      populateBreeds(breeds);
      showBreedSelect();
    })
    .catch((error) => {
      console.error("Error fetching cat breeds:", error);
      error.style.display = "block";
      showBreedSelect();
    })
    .finally(() => {
      showBreedSelect();
    });
});