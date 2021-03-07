import './styles.css';
import fetchCountries from './js/fetchCountries';
import countryCardTpl from './templates/countriesCard.hbs';
import countryListTpl from './templates/countriesList.hbs';
import { notice, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash');


const refs = {
    countryInput: document.querySelector('.country-input'),
    countryContainer: document.querySelector('.country-container')
}

function renderCountryCard(country) { 
    const markup = countryCardTpl(country);
    refs.countryContainer.innerHTML = markup;   
}

function renderCountryList(countriesArray) { 
    const markup = countryListTpl(countriesArray);
    refs.countryContainer.innerHTML = markup;
}

const clearAll = function () { 
    refs.countryContainer.innerHTML = '';
}
    
const handleInput = event => {
    clearAll();
    const inputValue = event.target.value;
    if (!inputValue) {
        return
    }
    fetchCountries(inputValue)
        .then(country => {
            clearAll();
            if (country.length > 10) {
                notice({
                    text: "Too many countries, be more specific",
                    delay: 1000,
                });
                return;
            } if (country.length >= 2 && country.length <= 10) {
                renderCountryList(country);
                return;
            }
            renderCountryCard(country[0]);
        })
        .catch(err =>
            error({
                text: `Error! ${err}`
            }));
}

refs.countryInput.addEventListener('input', debounce.debounce(handleInput, 500))