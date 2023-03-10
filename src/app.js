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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
// Forecast

function showForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast-weather");
  let forecastHTML = `<div class="row justify-content-evenly">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col">
    <div class="forecast-date" id="forecast-date">${formatForecastDay(
      forecastDay.dt
    )}</div>
    <img src="/media/icons/${
      forecastDay.weather[0].icon
    }.png" class="forecast-icon" id="forecast-icon">
    <div class="forecast-temp-max" id="temp-max">${Math.round(
      forecastDay.temp.max
    )}°</div>
    <div class="forecast-temp-min" id="temp-min">${Math.round(
      forecastDay.temp.min
    )}°</div>
    <div class="forecast-description" id="forecast-description">${
      forecastDay.weather[0].description
    }
    </div>
    </div>
    `;
    }
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
    .setAttribute("src", `/media/icons/${response.data.weather[0].icon}.png`);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function changeBackground(response) {
  let weather = response.data.weather[0].main;
  let description = response.data.weather[0].description;
  if (weather === "Rain" || weather === "Drizzle") {
    document.body.style.backgroundImage = "url(/media/background/rainy.jpg)";
  } else if (weather === "Snow") {
    document.body.style.backgroundImage = "url(/media/background/snow.jpg)";
  } else if (weather === "Thundestorm") {
    document.body.style.backgroundImage = "url(/media/background/thunders.jpg)";
  } else if (
    weather === "Clouds" &&
    (description === "few clouds" || description === "scattered clouds")
  ) {
    document.body.style.backgroundImage =
      "url(/media/background/few-clouds.jpg)";
  } else if (
    weather === "Clouds" &&
    (description === "broken clouds" || description === "overcast clouds")
  ) {
    document.body.style.backgroundImage = "url(/media/background/clouds.jpg)";
  } else if (weather === "Mist" || weather === "Fog" || weather === "Haze") {
    document.body.style.backgroundImage = "url(/media/background/mist.jpg)";
  } else if (weather === "Clear") {
    document.body.style.backgroundImage =
      "url(/media/background/clear-sky.jpg)";
  } else
    document.body.style.backgroundImage =
      "url(/media/background/clear-sky-night.jpg)";
}

function search(city) {
  let apiKey = "41f9f6ba4afb61d172bc15ed2c8d65a6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  axios.get(apiUrl).then(changeBackground);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#search-city");
  search(cityElement.value);
}

// Location

function retrieveLocation(response) {
  let apiKey = "8944afa6845bd7c413a687258d3211ef";
  let lat = response.coords.latitude;
  let lon = response.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&lat=${lat}&lon=${lon}&units=metric`;
  axios.get(apiUrl).then(showWeather);
  axios.get(apiUrl).then(changeBackground);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSubmit);

let locationButton = document.querySelector("#current-location-btn");
locationButton.addEventListener("click", getLocation);

search("Lodz");
