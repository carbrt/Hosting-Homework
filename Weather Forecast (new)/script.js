// current day and time

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
let hour = now.getHours();
let minute = now.getMinutes();
let h4 = document.querySelector("h4");
h4.innerHTML = `${day} ${hour}:${minute}`;

// current city
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  console.log(searchInput.value);
  let h1 = document.querySelector("#cityname");

  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
    let apiKey = "1e63667f4f920931fdaeaa011d900e3e";
    let city = `${searchInput.value}`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(showTemperature);
  } else {
    h1.innerHTML = null;
    alert("Please type a city");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// default city
function searchCity(city) {
  let apiKey = `1e63667f4f920931fdaeaa011d900e3e`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

searchCity("Paris");

//format hours
function formatHours(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  return hours;
}

//display forecast hours
function displayForecastHours(response) {
  console.log(response.data.hourly);
  let forecastHourly = response.data.hourly;

  let forecastHourlyElement = document.querySelector("#forecast-hourly");
  let forecastHourlyElementHTML = `<div class="row">`;
  forecastHourly.forEach(function (hourlyForecast, index) {
    if (index > 0 && index < 7) {
      forecastHourlyElementHTML =
        forecastHourlyElementHTML +
        `
       <div class="col-2"> <div class="weather-forecast-date">
      ${formatHours(hourlyForecast.dt)}:00</div>
     
       <img
          src="http://openweathermap.org/img/wn/${
            hourlyForecast.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
          <br />
          <span class="weather-forecast-temperatures">${Math.round(
            hourlyForecast.temp
          )}</span><span class="degree-unit"> °C</span>
       </div>
      `;
    }
  });
  forecastHourlyElementHTML = forecastHourlyElementHTML + `</div>`;
  forecastHourlyElement.innerHTML = forecastHourlyElementHTML;
}

// format Day
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// display forecast days
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1e63667f4f920931fdaeaa011d900e3e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getForecastHours(coordinates) {
  let apiKey = "1e63667f4f920931fdaeaa011d900e3e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecastHours);
}

// temperature results
function showTemperature(response) {
  console.log(response);
  document.querySelector("#cityname").innerHTML = `${response.data.name}`;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let tempElement = document.querySelector("#tempnow");
  let iconElement = document.querySelector("#icon");
  tempElement.innerHTML = Math.round(response.data.main.temp) + "°C";
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
  getForecastHours(response.data.coord);
}
