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

function convertToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#diffentTemp");
  temperatureElement.innerHTML = 77;
}
function convertToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#diffentTemp");
  temperatureElement.innerHTML = 25;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToF);
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
  windSigh.innerHTML = `Wind ${wind} km/h`;
  let feels = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels");
  feelsLike.innerHTML = `Feels like ${feels}° C`;
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
  let city = document.querySelector("#search-text-input").value;
  searchCity(city.value);
}
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", showCity);

searchCity("New York");
