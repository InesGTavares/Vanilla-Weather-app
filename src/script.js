function formatDate () {
    let now = new Date();
    let hours = now.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[now.getDay()];
    return `${day} ${hours}:${minutes}`
}

function formatHours (timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${hours}:${minutes}`
}

function displayTemperature (response) {
let currentTemperature =document.querySelector ("#current-temp");
let cityElement = document.querySelector("#city");
let weatherDescription = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");

celsiusTemp = Math.round(response.data.main.temp);

currentTemperature.innerHTML = Math.round(celsiusTemp);
cityElement.innerHTML = response.data.name;
weatherDescription.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate();
iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
iconElement.setAttribute ("alt", response.data.weather[0].description)
}

function displayForecast (response) {
    let forecastElement = document.querySelector("#info"); 
    forecastElement.innerHTML = null; 
    let forecast = null;
    
for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col">
    <h3><strong>${formatHours(forecast.dt * 1000)}</strong></h3>
    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
    <p><strong>
    ${Math.round(forecast.main.temp_max)}º | ${Math.round(forecast.main.temp_min)}º
    </strong>C</p>
    </div>`; 
}
}

function search (city) {
let apiKey = "4d96685ad0055b470dd85d4445d4e3c9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}



function handleSubmit(event) {
event.preventDefault(); 
let inputBox = document.querySelector("#inputBox");
search(inputBox.value);
}

function displayFahrenheitTemperature (event) {
    event.preventDefault(); 
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    let fahrenheitTemperature = (celsiusTemp * 9) / 5 + 32;
    let currentTemperature = document.querySelector("#current-temp");
    currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature (event) {
    event.preventDefault();
    fahrenheit.classList.remove("active");
    celsius.classList.add("active");
    let currentTemperature = document.querySelector("#current-temp");
    currentTemperature.innerHTML = Math.round(celsiusTemp);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "4d96685ad0055b470dd85d4445d4e3c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector ("form"); 
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemperature);

search ("Lisbon");