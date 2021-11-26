import debounce from 'lodash.debounce';
import './css/styles.css';
import { getRefs } from './getRefs';
import { fetchCountriesData } from './renderOneContry';

// import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = getRefs();
// const fetch = fetchCountries();

refs.searchBox.addEventListener('input', debounce(inputHandling, DEBOUNCE_DELAY));

function inputHandling() {
  const inputData = refs.searchBox.value.trim();
  if (inputData !== '') {
    fetchCountries(inputData).then(countryList);
  }
  // refs.countryList.textContent = inputData;
  // console.log(inputData);
  refs.countryList.innerHTML === '';
  return;
}

function fetchCountries(inputData) {
  return fetch(`https://restcountries.com/v2/name/${inputData}`).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res.statusText);
  });
}

function countryList(countryData) {
  refs.countryList.innerHTML = '';

  // console.log(countryData);
  // console.log(countryData.length);
  let dataLength = countryData.length;

  if (dataLength > 1 && dataLength <= 10) {
    const firstMarkup = countryData
      .map(
        ({ name, flag }) =>
          `<li class="main-data">
          <img class="flag-icon" width="30" height="20" src="${flag}" alt="country flag image"></img>
          <p class="country-list__name">${name}</p>
        </li>`,
      )
      .join('');

    refs.countryList.insertAdjacentHTML('beforeend', firstMarkup);
  } else if (dataLength === 1) {
    fetchCountriesData(countryData);
  } else {
    refs.countryList.innerHTML = '';
    return alert('Too many matches found. Please enter a more specific name.');
  }
}

// const countryName = countryData.name['common'];
//const countryFlags = countryData.flags.svg;
