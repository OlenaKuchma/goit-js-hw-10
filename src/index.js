import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import { selectCreateMarkUp, createMarkUp } from './modules.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  select: document.querySelector('.breed-select'),
  pLoader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  div: document.querySelector('.cat-info'),
};

refs.pLoader.hidden = false;

fetchBreeds()
  .then(({ data }) => {
    refs.select.innerHTML = selectCreateMarkUp(data);

    new SlimSelect({
      select: '#selectElement',
      settings: {
        allowDeselect: true,
      },
    });

    refs.select.hidden = false;
    refs.error.hidden = true;
  })
  .catch(err => {
    console.log(err.message);

    Notify.failure(`Oops! Something went wrong! Try reloading the page!`, 
    {
      position: 'center-center',
    });
  })
  .finally(() => {
    refs.pLoader.hidden = true;
  });

refs.select.addEventListener('change', onSelect);


function onSelect(evt) {
  const breedId = evt.currentTarget.value;
  refs.pLoader.hidden = false;
  refs.div.innerHTML = '';

  fetchCatByBreed(breedId)
    .then(({ data }) => {
      refs.div.innerHTML = createMarkUp(data);
    })
    .catch(err => {
      console.log(err.message);

      Notify.failure(`Oops! Something went wrong! Try reloading the page!`, {
        position: 'center-center',
      });
    })
    .finally(() => {
      refs.pLoader.hidden = true;
    });
}