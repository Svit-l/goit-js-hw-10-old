import { getRefs } from './getRefs';
const refs = getRefs();

export function markupAllCountries(countriesData) {
  // console.log(countriesData);
  const markupCountryList = countriesData
    .map(
      ({ name, flags }) =>
        `<li class="main-data">
          <img class="flag-icon" width="30" height="20" src="${flags.svg}" alt="country flag image"></img>
          <p class="country-list__name">${name.common}</p>
        </li>`,
    )
    .join('');
  refs.countryList.insertAdjacentHTML('beforeend', markupCountryList);
}

export function markupCountryData(countriesData) {
  const languageRef = Object.values(countriesData[0].languages).join(', ');
  // console.log(languageRef);

  const markup = countriesData
    .map(
      ({ name, capital, population, flags }) => `
        <div class="main-data">
          <img class="flag-icon" width="60" height="40" src="${flags.svg}" alt="country flag image">
          <h1 class="country-name">${name.common}</h1>
        </div>
        <ul class="country-data">
            <li class="country-official-name">Official name:<b> ${name.official}</b></li>
            <li class="country-capital">Capital: <b> ${capital}</b></li>
            <li class="country-population">Population: <b>${population}</b></li>
            <li class="country-languages">Languages: <b>${languageRef}</b></li>
        </ul>`,
    )
    .join('');
  refs.countryInfo.innerHTML = markup;
}
