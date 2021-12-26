var debounce = require('lodash.debounce');
import './css/styles.css';
import API from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import countryCardTpl from './country-card';
// const Handlebars = require('handlebars');

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
    .then(renderCountry)
    .catch(error => console.log(error));
}

function renderCountry(countries) {
  console.log(`render country`, countries);
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
  if (countries.length === 1) {
    refs.countryInfo.insertAdjacentHTML(
      'afterbegin',
      `
            <div class="country-header">
                <img src="${countries[0].flags.svg}" alt="flag" width="30" heigth="50">
                <h2>${countries[0].name.official}</h2>
            </div>
                <p>Capital: ${countries[0].capital}</p>
                <p>Population: ${countries[0].population}</p>
                <p>Languages: ${Object.values(countries[0].languages)}</p>
    `,
    );
  } else if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (1 < countries.length <= 10) {
    // console.log(countries.length);

    console.log(refs.countryList);
    countries.map(country => {
      refs.countryList.insertAdjacentHTML(
        'afterbegin',
        `<li>
               <div class="country-header">
                   <img src="${country.flags.svg}" alt="flag" width="30" heigth="50">
                   <h2>${country.name.official}</h2>
               </div>
           </li>`,
      );
    });
  }
}
//   }
//   const markUp = countryCardTpl(countries);
//   refs.countryInfo.innerHTML = markUp;
// }

// function countryCardTpl(countries) {
//   if (countries.length === 1) {
//     return `
//             <div class="country-header">
//                 <img src="${countries[0].flags.svg}" alt="flag" width="30" heigth="50">
//                 <h2>${countries[0].name.official}</h2>
//             </div>
//                 <p>Capital: ${countries[0].capital}</p>
//                 <p>Population: ${countries[0].population}</p>
//                 <p>Languages: ${Object.values(countries[0].languages)}</p>
//     `;
//   } else if (countries.length > 10) {
//     Notify.info('Too many matches found. Please enter a more specific name.');
//   } else if (1 < countries.length <= 10) {
//     console.log(countries.length);
//     countries.map(country => {
//       refs.countryList.insertAdjacentHTML(
//         'afterend',
//         `<li>
//                 <div class="country-header">
//                     <img src="${country.flags.svg}" alt="flag" width="30" heigth="50">
//                     <h2>${country.name.official}</h2>
//                 </div>
//             </li>`,
//       );
//     });
//   }
// }
