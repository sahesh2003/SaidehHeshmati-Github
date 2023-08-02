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

function getDate(day) {
  let date = new Date(day * 1000);
  let dayNumber = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayNumber];
}

function displayForecast(response) {
  let forecastDays = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecast = "";
  forecastDays.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecast =
        forecast +
        `<div class="col-2">
            <div class="day">${getDate(forecastDays.dt)}</div>
            <img src="http://openweathermap.org/img/wn/${
              forecastDays.weather[0].icon
            }@2x.png" alt="">
            <div class="min-max-temp">
            <span>${Math.round(forecastDays.temp.max)}°</span>
            <span class="min">${Math.round(forecastDays.temp.min)}°</span>
            </div>
          </div>`;
    }
  });
  forecastElement.innerHTML = forecast;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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
  getForecast(response.data.coord);
}

function showCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city");
  city.innerHTML = `${cityInput.value}`;
  showCity(cityInput.value);
}

let celsiusTemperature = null;

showCity("tehran");
