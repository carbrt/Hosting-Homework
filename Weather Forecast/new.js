const apiKey = "1e63667f4f920931fdaeaa011d900e3e";

function getCurrentDateTime() {
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
  let currentDateTimeElement = document.querySelector("h2");
  let currentDateTime = document.createTextNode(
    `${days[now.getDay()]} ${currentTime}`
  );
  currentDateTimeElement.appendChild(currentDateTime);
}

getCurrentDateTime();
function displayCurrentLocationWeather(response) {
  const currentCity = response.data.name;
  const currentCityWeather = Math.round(response.data.main.temp);
  const currentCityWeatherHigh = Math.round(response.data.main.temp_max);
  const currentCityWeatherLow = Math.round(response.data.main.temp_min);
  //console.log(response.data);
  document.querySelector(".city-title").innerHTML = currentCity;
  document.querySelector(".current-temp").innerHTML = currentCityWeather;
  document.querySelector("#current-hi-temp").innerHTML = currentCityWeatherHigh;
  document.querySelector("#current-low-temp").innerHTML = currentCityWeatherLow;
}
function getCurrentLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentLocationWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}
getCurrentPosition();

function displayCityAndTemp(searchResponse) {
  //console.log(searchResponse);
  displayCurrentLocationWeather(searchResponse);
}

function getCityAndTemp(event) {
  event.preventDefault();
  //console.log(event);
  const cityInput = document.querySelector(".city-search").value;
  if (cityInput) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${apiKey}`;
    axios.get(apiUrl).then(displayCityAndTemp);
  } else {
    alert("Finding Current Location...");
    getCurrentPosition();
  }
}

function searchCity() {
  let cityForm = document.querySelector(".search-form");
  cityForm.addEventListener("submit", getCityAndTemp);
}

searchCity();
