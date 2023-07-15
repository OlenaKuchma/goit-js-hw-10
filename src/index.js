// import SlimSelect from "slim-select";
import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

document.addEventListener("DOMContentLoaded", () => {
  const breedSelect = document.querySelector(".breed-select");
  const loader = document.querySelector(".loader");
  const error = document.querySelector(".error");
  const catInfo = document.querySelector(".cat-info");


  function populateBreeds(breeds) {
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
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
    catInfo.style.display = "block";
  }

  
  fetchBreeds()
    .then((breeds) => {
      populateBreeds(breeds);
      breedSelect.addEventListener("change", () => {
        const selectedBreedId = breedSelect.value;
        loader.style.display = "block";
        catInfo.style.display = "none";
        error.style.display = "none";

        fetchCatByBreed(selectedBreedId)
          .then((cat) => {
            displayCatInfo(cat);
          })
          .catch((error) => {
            console.error("Error fetching cat by breed:", error);
            error.style.display = "block";
          })
          .finally(() => {
            loader.style.display = "none";
          });
      });
    })
    .catch((error) => {
      console.error("Error fetching cat breeds:", error);
      error.style.display = "block";
    })
    .finally(() => {
      loader.style.display = "none";
    });
});