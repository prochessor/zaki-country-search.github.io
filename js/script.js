'use strict';

//XMLHttpRequest

function getCountryData(country, type = 1) {
    let request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    let countryContainer = document.querySelector(`.container-${type}`);
    request.addEventListener("load", () => {
        let [data] = JSON.parse(request.responseText);
        let html = `
            <div class="country">
            <img class = "flag-image" src="${data.flags.png}" alt="">
            <div class="country-content">
                <div class="content-item name">${data.name.common}</div>
                <div class="content-item region">${data.region}</div>
                <div class="content-item population">🧑🏻‍🤝‍🧑🏻 <span>${data.population / 1000000}M people</span></div>
                <div class="content-item language">🏙️ ${data.capital[0]}</div>
                <div class="content-item language">🔗 ${data.borders}</div>
                <div class="content-item language">🌐 ${data.subregion}</div>
                <div class="content-item language">💸 ${data.currencies[`${Object.keys(data.currencies)[0]}`].name}</div>
                <div class="content-item currency">🗣️  ${data.languages[`${Object.keys(data.languages)[0] }`] }</div>
            </div>
        </div>
        `;
        countryContainer.insertAdjacentHTML("afterbegin", html);
        countryContainer.style.opacity = "1";
    });
};


document.querySelector(".search-btn").addEventListener("click", function () {
    getCountryData(document.querySelector("input").value, 1);
    document.querySelector("input").value = "";
})

let request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/all");
request.send();
request.addEventListener("load", () => {
    let data = JSON.parse(request.responseText);
    data.forEach(element => {
        getCountryData(element.name.common, 2);
    });
})
