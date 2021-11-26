import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { getRefs } from './getRefs';
const refs = getRefs();
import { fetchCountries } from './fetchCountries';
import { markupAllCountries, markupCountryData } from './markup';

const DEBOUNCE_DELAY = 300;

refs.searchBox.addEventListener('input', debounce(inputHandling, DEBOUNCE_DELAY));

function inputHandling() {
  const inputData = refs.searchBox.value.trim();
  if (inputData !== '') {
    fetchCountries(inputData)
      .then(countryRendering)
      .catch(error => {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        Notify.failure(`Oops, there is no country with that name`, {
          width: '200px',
          position: 'center-top',
          distance: '20px',
          opacity: 1,
        });
      });
  }
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function countryRendering(countriesData) {
  // console.log(countriesData);
  // console.log(countriesData.length);
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  let dataLength = countriesData.length;

  if (dataLength > 1 && dataLength <= 10) {
    markupAllCountries(countriesData);
  } else if (dataLength === 1) {
    markupCountryData(countriesData);
    // } else if (refs.searchBox.value === '') {
    //   refs.countryList.innerHTML = '';
    //   refs.countryInfo.innerHTML = '';
  } else {
    Notify.info('Too many matches found. Please enter a more specific name.', {
      width: '200px',
      position: 'center-top',
      distance: '20px',
      opacity: 1,
    });
    return;
  }
}
