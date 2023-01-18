function displayWeather(response) {
  console.log(response.data);
document.querySelector("#city").innerHTML = response.data.name;
document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp)
document.querySelector("#description").innerHTML = response.data.weather[0].description;
document.querySelector("#feels_like").innerHTML = Math.round(response.data.main.feels_like);
document.querySelector("#humidity").innerHTML = response.data.main.humidity;
document.querySelector("#pressure").innerHTML = response.data.main.pressure;
document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
}


// let apiKey = "d3404e661974cfd3od9d68t5333a8f2b";
// let apiUrl = 'https://api.shecodes.io/weather/v1/current?query=Lodz&key=${apiKey}'


let apiKey = "41f9f6ba4afb61d172bc15ed2c8d65a6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Lodz&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayWeather);
  