import { fetchBreeds } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
const URL_BREED = 'https://api.thecatapi.com/v1/breeds';
const URL_SEARCH = 'https://api.thecatapi.com/v1/images/search';
const BreedSelect = document.querySelector('.breed-select');
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
    const markUpPhoto = data.map(({
      url,
      height,
      width,
      id,
      breeds: { 0: {
        name, origin,
      } },
    }) => { 
      
    });
  });
});
