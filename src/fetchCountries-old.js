import { getRefs } from './getRefs';
const BASE_URL = 'https://restcountries.com/v3.1';
const refs = getRefs();

// =========== Получение с бекэнда всех стран - получаем массив объектов
function getCountries() {
  fetch(`${BASE_URL}/all`).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res.statusText);
  });
}

getCountries();

// =========== Получение с бекэнда данных одной страны в виде массива объектов всех значений
function getCountryName(name) {
  return fetch(`${BASE_URL}/name/${name}`).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw Error(res.statusText);
  });
}

getCountryName('Peru');

// =========== І способ. Получение с бекэнда данных одной страны в виде массива выбранных объектов
function fetchCountriesData(setData) {
  const PARAM_URL = `https://restcountries.com/v3.1/name/${setData}?fields=name,capital,population,flags,languages`;
  return fetch(`${PARAM_URL}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw Error(res.statusText);
    })
    .then(data => {
      const dataObject = console.log(...data);
      const countryData = data[0];
      const countryName = countryData.name['common'];
      const countryOfficialName = countryData.name.official;
      const countryCapital = countryData.capital[0];
      const countryPopulation = countryData.population;
      const countryLanguages = countryData.languages;
      const countryFlags = countryData.flags.svg;
      console.log(countryFlags);
      const countryLanguagesStr = Object.values(countryLanguages).join(', ');
      return {
        countryName,
        countryOfficialName,
        countryCapital,
        countryPopulation,
        countryLanguagesStr,
        countryFlags,
      };
    })
    .then(
      // =========== Создание разметки
      ({
        countryName,
        countryOfficialName,
        countryCapital,
        countryPopulation,
        countryLanguagesStr,
        countryFlags,
      }) => {
        const markup = `
        <div class="main-data">
          <img class="flag-icon" width="60" height="40" src="${countryFlags}" alt="country flag image">
          <h1 class="country-name">${countryName}</h1>
        </div>
        <ul class="country-data">
            <li class="country-official-name">Official name:<b> ${countryOfficialName}</b></li>
            <li class="country-capital">Capital: <b> ${countryCapital}</b></li>
            <li class="country-population">Population: <b>${countryPopulation}</b></li>
            <li class="country-languages">Languages: <b>${countryLanguagesStr}</b></li>
        </ul>`;
        refs.countryInfo.insertAdjacentHTML('beforeend', markup);
      },
    );
}

fetchCountriesData('Peru');

// +++++++++++ Пример из лекций
// export function fetchCountries(name) {
//   const countryUrl = `https://restcountries.com/v3.1/name/${name}`;
//   fetch(countryUrl)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(name => {
//       console.log(name);
//       // Data handling
//     });
//   //   .catch(error => {
//   //     // Error handling
//   //   });
// }
