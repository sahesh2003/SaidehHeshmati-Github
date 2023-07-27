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
let weatherName = document.querySelector("#weatherName");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let h1 = document.querySelector("#city");
let icon = document.querySelector("#weather-icon");



function showFahrenheit(event){
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  tempValue.innerHTML = Math.round(fahrenheitTemp);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}
function showCelsius(event){
  event.preventDefault();
  tempValue.innerHTML = celsiusTemperature;
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}
fahrenheit.addEventListener("click" , showFahrenheit);
celsius.addEventListener("click", showCelsius)

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${cityInput.value}`;
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);

function showWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let weatherDescription = response.data.weather[0].description;
  weatherName.innerHTML = weatherDescription;
  h1.innerHTML = `${response.data.name}`;
  tempValue.innerHTML = celsiusTemperature;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}% `;
  wind.innerHTML = ` Wind: ${Math.round(response.data.wind.speed)} km/h `;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
let celsiusTemperature = null;