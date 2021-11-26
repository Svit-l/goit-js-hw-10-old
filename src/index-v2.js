import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { getRefs } from './getRefs';
const refs = getRefs();
// import { fetchCountriesData } from './renderOneContry';
const BASE_URL = 'https://restcountries.com/v2';
// import { fetchCountries } from './fetchCountries';
const DEBOUNCE_DELAY = 300;

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
  return fetch(`${BASE_URL}/name/${inputData}?fields=name,capital,population,flags,languages`).then(
    res => {
      if (res.ok) {
        return res.json();
      }
      throw Error(res.statusText);
    },
  );
}

function countryList(countriesData) {
  console.log(countriesData);
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  // console.log(countriesData);
  // console.log(countriesData.length);
  let dataLength = countriesData.length;

  if (dataLength > 1 && dataLength <= 10) {
    const markupCountryList = countriesData
      .map(
        ({ name, flags }) =>
          `<li class="main-data">
          <img class="flag-icon" width="30" height="20" src="${flags.svg}" alt="country flag image"></img>
          <p class="country-list__name">${name}</p>
        </li>`,
      )
      .join('');

    refs.countryList.insertAdjacentHTML('beforeend', markupCountryList);
  } else if (dataLength === 1) {
    const countryData = countriesData[0];
    console.log(countryData);
    const countryName = countryData.name['common'];
    const countryOfficialName = countryData.name.official;
    const countryCapital = countryData.capital[0];
    const countryPopulation = countryData.population;
    const countryLanguage = countryData.languages[0];
    const countryFlags = countryData.flags.svg;
    console.log(countryFlags);
    const countryLanguagesStr = Object.values(countryLanguage).join(', ');

    const markup = countriesData
      .map(
        ({ name, capital, population, flags }) =>
          `<div class="main-data">
          <img class="flag-icon" width="60" height="40" src="${flags.svg}" alt="country flag image">
          <h1 class="country-name">${name}</h1>
        </div>
        <ul class="country-data">
            <li class="country-capital">Capital: <b> ${capital}</b></li>
            <li class="country-population">Population: <b>${population}</b></li>
            <li class="country-languages">Languages: <b>${countryLanguagesStr}</b></li>
        </ul>`,
      )
      .join('');
    refs.countryInfo.innerHTML = markup;
    // const markupCountyData = countryData
    //   .map(
    //     ({ name, flag, capital }) =>
    //       `<div class="main-data">
    //       <img class="flag-icon" width="60" height="40" src="${countryFlags}" alt="country flag image">
    //       <h1 class="country-name">${countryName}</h1>
    //     </div>
    //     <ul class="country-data">
    //         <li class="country-official-name">Official name:<b> ${countryOfficialName}</b></li>
    //         <li class="country-capital">Capital: <b> ${countryCapital}</b></li>
    //         <li class="country-population">Population: <b>${countryPopulation}</b></li>
    //         <li class="country-languages">Languages: <b>${countryLanguagesStr}</b></li>
    //     </ul>`,
    //   )
    //   .join('');
    // refs.countryList.insertAdjacentHTML('beforeend', markupCountyData);
  } else {
    refs.countryList.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
}
