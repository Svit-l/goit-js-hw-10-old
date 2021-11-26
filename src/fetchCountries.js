const BASE_URL = 'https://restcountries.com/v3.1';

export function fetchCountries(inputData) {
  return fetch(`${BASE_URL}/name/${inputData}?fields=name,capital,population,flags,languages`).then(
    res => {
      if (res.ok) {
        return res.json();
      }
      throw Error(res.statusText);
    },
  );
}
