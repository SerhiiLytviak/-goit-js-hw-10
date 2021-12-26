var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import API from './fetchCountries';
import countryListTpl from './templates/country-list';
import countryCardTpl from './templates/country-card';

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
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  API.fetchCountries(searchQuery)
    .then(renderSearchResults)
    .catch(error => console.log(error));
}

function renderSearchResults(countries) {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';

  if (countries.length === 1) {
    renderCountryInfo(countries);
  } else if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (1 < countries.length <= 10) {
    renderCountryList(countries);
  }
}

function renderCountryList(countries) {
  countries.map(country => {
    refs.countryList.insertAdjacentHTML('afterbegin', countryListTpl(country));
  });
}

function renderCountryInfo(country) {
  country.map(country => {
    return refs.countryInfo.insertAdjacentHTML('afterbegin', countryCardTpl(country));
  });
}
// function renderCountryInfo(country) {
//   return refs.countryInfo.insertAdjacentHTML(
//     'afterbegin',
//     `
//             <div class="country-header">
//                 <img src="${country[0].flags.svg}" alt="flag" width="50" heigth="30">
//                 <h1 class="country-name">${country[0].name.official}</h1>
//             </div>
//                 <p><b>Capital:</b> ${country[0].capital}</p>
//                 <p><b>Population:</b> ${country[0].population}</p>
//                 <p><b>Languages:</b> ${Object.values(country[0].languages)}</p>
//     `,
//   );
// }

// function renderCountryList(countries) {
//   countries.map(country => {
//     refs.countryList.insertAdjacentHTML(
//       'afterbegin',
//       `<li>
//                <div class="country-header">
//                    <img src="${country.flags.svg}" alt="flag" width="40" height="25">
//                    <h3 class="country-name">${country.name.official}</h3>
//                </div>
//            </li>`,
//     );
//   });
// }

//   }
//   const markUp = countryCardTpl(countries);
//   refs.countryInfo.innerHTML = markUp;
//
