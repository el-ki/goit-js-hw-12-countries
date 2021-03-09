const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
        if (!response.ok) {
            return 
        }
        return response.json();
    });
}

export default fetchCountries;
