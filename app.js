const countries = document.querySelector('.countries');
const inputCntry =  document.querySelector('.cntryName');
const btn = document.querySelector('.btn');
let val = '';
btn.addEventListener('click', function(e){
    e.preventDefault();
    const contentDiv = document.querySelector('.country_image');
    if(contentDiv || countries){
        updateUI();                                                              
    }
    val = inputCntry.value;
    country(val);
    inputCntry.value = '';
});
const updateUI = function() {
    document.querySelector('.countries').innerHTML = '';
}
const displayError = function(msg) {
    countries.insertAdjacentHTML('beforeend', msg);
}; 

const displayCountry = function(data) {
    const [countryData] = data;
    const currency = [...Object.values(countryData.currencies)];
    const language = [...Object.values(countryData.languages)];
    
    const html =` <div class="country_image">
                    <img class="country__img" src="${countryData.flags.svg}" />
                    <div class="country__data"> 
                        <h3 class="country__name">${countryData.name.common}</h3>
                        <h4 class="country__region">${countryData.continents}</h4>
                        <p class="country__row"><span>👫</span>${((countryData.population)/1000000).toFixed(1)}M People</p>
                        <p class="country__row"><span>🗣️</span>${language}</p>
                        <p class="country__row"><span>💰</span>${currency[0].symbol}  (${currency[0].name})</p>
                    </div>
                </div>`;
    countries.insertAdjacentHTML('beforeend', html);
};


const country = function(data){
fetch(`https://restcountries.com/v3.1/name/${data}?fullText=true`)
                .then(response => {
                    if(!response.ok) throw new Error(`${data? data : 'undefined'} not found, Enter Fullname of the country`);
                    return response.json();
                })
                .then(data => {
                    displayCountry(data);
                })
                .catch(err => {
                    // console.log(err.message);
                    displayError(`<h3>${err.message}</h3>`);
                });
};


