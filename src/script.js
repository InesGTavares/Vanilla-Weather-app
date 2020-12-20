function displayTemperature (response) {
let currentTemperature =document.querySelector ("#current-temp");
let cityElement = document.querySelector("#city");
let weatherDescription = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");


currentTemperature.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
weatherDescription.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
}


let apiKey = "4d96685ad0055b470dd85d4445d4e3c9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);