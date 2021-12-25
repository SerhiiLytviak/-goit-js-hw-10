var debounce = require('lodash.debounce');
import './css/styles.css';
import API from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const searchQuery = e.target.value.trim();

  if (searchQuery === '') {
    return;
  }

  API.fetchCountries(searchQuery)
    .then(renderCountry)
    .catch(error => console.log(error));
}

function renderCountry(countries) {
  console.log(`render country`, countries);
  const markUp = countryCardTpl(countries);
  refs.countryInfo.innerHTML = markUp;
}

function countryCardTpl(countries) {
  if (countries.length === 1) {
    return `
            <div class="country-header">
                <img src="${countries[0].flags.svg}" alt="Flag" width="70" heigth="50">
                <h2>${countries[0].name.official}</h2>
            </div>
                <p>Capital: ${countries[0].capital}</p>
                <p>Population: ${countries[0].population}</p>
                <p>Languages: ${Object.values(countries[0].languages)}</p>
    `;
  } else if (1 < countries.length <= 10) {
    console.log('1-10');
  }
}
