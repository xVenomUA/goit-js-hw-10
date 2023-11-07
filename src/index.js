import { fetchBreeds } from './cat-api';
import SlimSelect from 'slim-select';

import 'slim-select/dist/slimselect.css';
const URL_BREED = 'https://api.thecatapi.com/v1/breeds';
const URL_SEARCH = 'https://api.thecatapi.com/v1/images/search';
const BreedSelect = document.querySelector('.breed-select');
BreedSelect.setAttribute('hidden', true);
const CatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorr = document.querySelector('.error');
errorr.style.display = 'none';

fetchBreeds(URL_BREED)
  .then(data => {
    const markUpSelect = data
      .map(({ name, id }) => `<option value="${id}">${name}</option>`)
      .join('');
    BreedSelect.innerHTML = markUpSelect;

    new SlimSelect({
      select: '.breed-select',
    });
    loader.style.display = 'none';
    BreedSelect.removeAttribute('hidden');
  })
  .catch(error => {
    loader.style.display = 'none';
    errorr.style.display = 'block';
    console.log(error);
  });

BreedSelect.addEventListener('change', evt => {
  const IDBreed = evt.currentTarget.value;
  CatInfo.innerHTML = '';
  loader.style.display = 'block';
  fetchBreeds(URL_SEARCH + `?breed_ids=${IDBreed}`)
    .then(data => {
      const markUpPhoto = data
        .map(
          ({
            url,
            breeds: {
              0: { name, origin },
            },
          }) => `
  <img src="${url}" alt="${name}" width="${350}" height="${250}">
  <div class="js-some">
  <p>${name}</p>
  <p>${origin}</p>
  </div>
`
        )
        .join('');
      loader.style.display = 'none';
      CatInfo.innerHTML = markUpPhoto;
    })
    .catch(error => {
      loader.style.display = 'none';
      errorr.style.display = 'block';
      console.log(error);
    });
});
