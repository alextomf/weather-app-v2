//current date

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = date.getDate();
  let month = months[date.getMonth()];
  let weekDay = days[date.getDay()];
  return `${weekDay}, ${day} ${month}, ${hours}:${minutes}`;
}

// Forecast

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast-weather");
  let forecastHTML = `<div class="row justify-content-evenly">`;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col">
    <div class="forecast-date" id="forecast-date">${day}</div>
    <img scr="" class="forecast-icon" id="forecast-icon">
    <div class="forecast-temp-max"><span id="temp-max"></span>°</div>
    <div class="forecast-temp-min"><span id="temp-min"></span>°</div>
    </div>
    `;
  });
  forecastHTML = forecastHTML + "</div>";

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

//current weather for searched city

function showWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "41f9f6ba4afb61d172bc15ed2c8d65a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
// let apiKey = "d3404e661974cfd3od9d68t5333a8f2b";
// let apiUrl = 'https://api.shecodes.io/weather/v1/current?query=Lodz&key=${apiKey}'

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-city");
  search(cityElement.value);
}

//unit conversion

function convertToFaherheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");
  tempCelsius.classList.remove("active");
  tempFahrenheit.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  tempCelsius.classList.add("active");
  tempFahrenheit.classList.remove("active");
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

// function showLocation(response) {
//   let apiKey = "41f9f6ba4afb61d172bc15ed2c8d65a6";
//   let lat = response.coords.latitude;
//   let lon = response.coords.longitude;
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=&appid=${apiKey}&${lat}&lon=${lon}&units=metric`;
//   axios.get(apiUrl).then(showWeather);
// }

// function handleClick(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(showLocation);
// }

let celsiusTemp = null;

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);

let tempFahrenheit = document.querySelector("#temp-fahr");
tempFahrenheit.addEventListener("click", convertToFaherheit);

let tempCelsius = document.querySelector("#temp-cels");
tempCelsius.addEventListener("click", convertToCelsius);

// let locationButton = document.querySelector("#current-location-button");
// locationButton.addEventListener("click", handleClick);

search("Lodz");
