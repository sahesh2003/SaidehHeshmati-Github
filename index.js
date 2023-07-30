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
let forecastElement = document.querySelector("#forecast");

let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
let forecast = "";
forecastDays.forEach(function (day) {
  forecast =
    forecast +
    `<div class="col-2">
            <p>${day}</p>
            <img src="" alt="">
            <span>18</span>
            <span>12</span>
          </div>`;
});
forecastElement.innerHTML = forecast;

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

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  tempValue.innerHTML = Math.round(fahrenheitTemp);
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}
function showCelsius(event) {
  event.preventDefault();
  tempValue.innerHTML = celsiusTemperature;
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}

let celsiusTemperature = null;

fahrenheit.addEventListener("click", showFahrenheit);
celsius.addEventListener("click", showCelsius);

showCity("tehran");
