const apiKey = "1e63667f4f920931fdaeaa011d900e3e";

let weather = {
  paris: {
    temp: 20,
    humidity: 80,
  },
  tokyo: {
    temp: 18,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  moscow: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city");

if (weather[city] !== undefined) {
  let temperature = weather[city.toLowerCase()].temp;
  let humidity = weather[city.toLowerCase()].humidity;
  let celsius = Math.round(temperature);
  let farenheit = Math.round((9 * temperature) / 5 + 32);

  alert(
    `It is ${celsius}°C (${farenheit}°F) in ${city}. The humidity is ${humidity}%`
  );
} else {
  alert(
    `Sorry, we cannot access the weather for ${city}. Find out the forecast for ${city} on https://google.com/search?q=forecast+${city}`
  );
}

let currentDate = new Date();
let h2 = document.querySelector("h2");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentDate.getDay()];
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();

h2.innerHTML = `${day}, ${hour}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", search);

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
