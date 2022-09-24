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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecastHTML =
    forecastHTML +
    `<div class="row">
    <div class="col-2">
      <div class="weather-forecast-date">Sat</div>
      <img
        src="http://openweathermap.org/img/wn/10d@2x.png"
        alt=""
        width="55"
      />
      <div class="weather-forecast-temp">
        <span class="weather-forcast-temp-max"> 30° </span>
        <span class="weather-forecast-temp-min">20°</span>
      </div>
    </div>
  </div>`;
  forecastHTML =
    forecastHTML +
    `<div class="row">
    <div class="col-2">
      <div class="weather-forecast-date">Sat</div>
      <img
        src="http://openweathermap.org/img/wn/10d@2x.png"
        alt=""
        width="55"
      />
      <div class="weather-forecast-temp">
        <span class="weather-forcast-temp-max"> 30° </span>
        <span class="weather-forecast-temp-min">20°</span>
      </div>
    </div>
  </div>`;
  forecastElement.innerHTML = forecastHTML;
}
function displayTemp(response) {
  let currentTemp = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let tempDescription = document.querySelector("#temp-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  currentTemp.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  tempDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
}
function search(city) {
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);
search("Osaka");
displayForecast();
