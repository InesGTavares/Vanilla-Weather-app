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

function search (city) {
let apiKey = "4d96685ad0055b470dd85d4445d4e3c9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
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

let form = document.querySelector ("form"); 
form.addEventListener("submit", handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusTemperature);