import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const URL_SEARCH = 'https://api.thecatapi.com/v1/images/search';
const BreedSelect = document.querySelector('.breed-select');
BreedSelect.setAttribute('hidden', true);
const CatInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorr = document.querySelector('.error');
errorr.style.display = 'none';

fetchBreeds()
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
  fetchCatByBreed(IDBreed)
    .then(data => {
      const markUpPhoto = data
        .map(
          ({
            url,
            breeds: {
              0: { name, origin, description, temperament },
            },
          }) => `
  <img src="${url}" alt="${name}" width="${350}" height="${290}">
  <div class="js-some">
  <h2 class="hmain-js" >${name}</h2>
  <h3 class="hmain3-js">${origin}</h3>
  <p class="text"> ${description}</p>
  <p class= "text"> Temperament: ${temperament}</p>
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
