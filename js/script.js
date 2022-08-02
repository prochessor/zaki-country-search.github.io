'use strict';

// function Car(make, speed) {
//     this.make = make;
//     this.speed = speed;
// }
// Car.prototype.accelerate = function () {
//     this.speed = Number.parseInt(this.speed) + 10 + " km/h";
//     console.log(this.speed);
// }
// Car.prototype.brake = function () {
//     this.speed = Number.parseInt(this.speed) - 5 + " km/h"
//     console.log(this.speed);
// }
// let bmw = new Car("BMW", "120 km/h");
// let mercedes = new Car("Mercedes", "90 km/h");
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();
// mercedes.accelerate();
// mercedes.brake();
// mercedes.accelerate();
// mercedes.brake();
// mercedes.accelerate();



// class CarCl {
//     make;
//     speed;
//     constructor(make, speed) {
//         this.make = make;
//         this.speed = speed;
//     }
//     get speedUS() {
//         return parseFloat(this.speed) / 1.6 + " mi/h";
//     }
//     set speedUS(sp) {
//         this.speed = parseFloat(sp) * 1.6 + ' km/h';
//     }

// }
// let ford = new CarCl("Ford", "100 km/h");
// console.log(ford.speedUS);
// ford.speedUS = "200 mi/h";
// console.log(ford.speedUS);


// function Car(make, speed) {
//     this.make = make;
//     this.speed = speed;
// }
// Car.prototype.accelerate = function () {
//     this.speed = Number.parseInt(this.speed) + 10 + " km/h";
//     console.log(this.speed);
// }
// Car.prototype.brake = function () {
//     this.speed = Number.parseInt(this.speed) - 5 + " km/h"
//     console.log(this.speed);
// }
// function electricCar(make, speed, charge) {
//     Car.call(this, make, speed);
//     this.charge = charge;
// }
// electricCar.prototype = Object.create(Car.prototype)
// electricCar.prototype.constructor = electricCar;

// electricCar.prototype.chargeBattery = function (chargeTo) {
//     this.charge = chargeTo + "%";
// }

// electricCar.prototype.accelerate = function () {
//     this.speed = Number.parseFloat(this.speed) + 20 + " km/h";
//     console.log(`${this.make} going at ${this.speed}, with battery ${this.charge}`);
// }
// let Tesla = new electricCar("Tesla Model X", "140 km/h", "50%")
// Tesla.chargeBattery(46);
// Tesla.accelerate();
// Tesla.brake();


// class CarCl {
//     make;
//     speed;
//     constructor(make, speed) {
//         this.make = make;
//         this.speed = speed;
//     }
//     get speedUS() {
//         return parseFloat(this.speed) / 1.6 + " mi/h";
//     }
//     set speedUS(sp) {
//         this.speed = parseFloat(sp) * 1.6 + ' km/h';
//     }

// }

// class EVCL extends CarCl {
//     _charge;
//     constructor(make, speed, charge) {
//         super(make, speed);
//         this._charge = charge;
//     }
//     accelerate() {
//         this.speed += 100;
//         return this;
//     }
//     brake() {
//         this.speed -= 50;
//         return this;
//     }
//     chargeBattery(val) {
//         this._charge += val;
//         return this;
//     }
// }
// let tesla = new EVCL("TESLA", 100, 50);
// tesla.accelerate().brake().chargeBattery(20);
// console.log(tesla);



//XMLHttpRequest
let countryContainer = document.querySelector(".country-container");

function getCountryData(country) {
    let request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    request.addEventListener("load", () => {
        let [data] = JSON.parse(request.responseText);
        console.log(data);
        let html = `
            <div class="country">
            <img class = "flag-image" src="${data.flags.png}" alt="">
            <div class="country-content">
                <div class="content-item name">${data.name.common}</div>
                <div class="content-item region">${data.region}</div>
                <div class="content-item population">🧑🏻‍🤝‍🧑🏻 <span>${data.population / 100000}M people</span></div>
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
    getCountryData(document.querySelector("input").value);
    document.querySelector("input").value = "";
})

let request = new XMLHttpRequest();
request.open("GET", "https://restcountries.com/v3.1/all");
request.send();
request.addEventListener("load", () => {
    let data = JSON.parse(request.responseText);
    data.forEach(element => {
        getCountryData(element.name.common);
    });
})