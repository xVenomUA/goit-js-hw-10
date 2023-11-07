import { fetchBreeds } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
const URL_BREED = 'https://api.thecatapi.com/v1/breeds';
const URL_SEARCH = 'https://api.thecatapi.com/v1/images/search';
const BreedSelect = document.querySelector('.breed-select');
const CatInfo = document.querySelector('.cat-info');
fetchBreeds(URL_BREED)
  .then(data => {
    const markUpSelect = data
      .map(({ name, id }) => `<option value="${id}">${name}</option>`)
      .join('');
    BreedSelect.innerHTML = markUpSelect;
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(console.error());

BreedSelect.addEventListener('change', evt => {
  const IDBreed = evt.currentTarget.value;
  fetchBreeds(URL_SEARCH + `?breed_ids=${IDBreed}`).then(data => {
    console.log(data);
    const markUpPhoto = data
      .map(
        ({
          url,
          breeds: {
            0: { name, origin },
          },
        }) => `<div id="js-cat">
  <img src="${url}" alt="${name}" width="${350}" height="${250}">
  <p>${name}</p>
  <p>${origin}</p>
</div>`
      )
      .join('');
    CatInfo.innerHTML = markUpPhoto;
  });
});
