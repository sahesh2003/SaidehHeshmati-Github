let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let time = now.getHours() + ":" + now.getMinutes();
let date = document.querySelector("#date");
date.innerHTML = "Last updated: " + day + " " + time;

let fahrenheit = document.querySelector("#fahrenheit-link");
let celsius = document.querySelector("#celsius-link");
let tempValue = document.querySelector("#temperature");
let temp = document.querySelector("#temperature").innerText;
let weatherName = document.querySelector("#weatherName");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let h1 = document.querySelector("#city");

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${cityInput.value}`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
  let temperature = Math.round(event.data.main.temp);
  let weatherDescription = event.data.weather[0].description;
  weatherName.innerHTML = weatherDescription;
  tempValue.innerHTML = temperature;
  humidity.innerHTML = `Humidity: ${event.data.main.humidity}% `;
  wind.innerHTML = ` Wind: ${Math.round(event.data.wind.speed)} km/h `;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].description;
  weatherName.innerHTML = weatherDescription;
  h1.innerHTML = `${response.data.name}`;
  tempValue.innerHTML = temperature;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}% `;
  wind.innerHTML = ` Wind: ${Math.round(response.data.wind.speed)} km/h `;
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
