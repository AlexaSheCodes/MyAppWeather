function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let citylocation = document.querySelector("h1");
  citylocation.innerHTML = searchInput.value;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day},  ${hour}:${minutes}`;
}
let now = new Date();
let currentDate = document.querySelector("#dayTime");
currentDate.innerHTML = formatDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        ` 
 <div class="col-2">
          <div class="center">
            <span class="weather-forecast-date">${formatDay(
              forecastDay.dt
            )}</span>
            <p>
              <img id="icons" src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="80">
               <br />
              <strong class="weather-forecast-temperature-max">${Math.round(
                forecastDay.temp.max
              )}</strong> / <small class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )} </small><br />
            </p>
          </div>
       </div>
  
   `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "959f16f94f43568286f7341b3d6b31a5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function convertToF(event) {
  event.preventDefault();
  let temperatureSign = document.querySelector("#diffentTemp");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureSign.innerHTML = Math.round(fahrenheitTemp);
}
function convertToC(event) {
  event.preventDefault();
  let temperatureSign = document.querySelector("#diffentTemp");
  temperatureSign.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToF);
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToC);

function showWeather(response) {
  console.log(response.data);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureSign = document.querySelector("#diffentTemp");
  temperatureSign.innerHTML = `${temperature}`;
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${response.data.main.humidity} %`;
  let wind = Math.round(response.data.wind.speed);
  let windSigh = document.querySelector("#wind");
  windSigh.innerHTML = `Wind ${wind} m/h`;
  let feels = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels");
  feelsLike.innerHTML = `Feels like ${feels}?? C`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function showPosition(position) {
  let apiKey = "959f16f94f43568286f7341b3d6b31a5";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocation = document.querySelector("#pin");
currentLocation.addEventListener("click", showCurrentLocation);

function searchCity(city) {
  let apiKey = "959f16f94f43568286f7341b3d6b31a5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  searchCity(city.value);
}
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", showCity);

searchCity("Mykonos");
