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


currentTemperature.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
weatherDescription.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate();
iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
iconElement.setAttribute ("alt", response.data.weather[0].description)
}


let apiKey = "4d96685ad0055b470dd85d4445d4e3c9";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);