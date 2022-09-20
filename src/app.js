function displayTemp(response) {
  console.log(response);
  let currentTemp = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let tempDescription = document.querySelector("#temp-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  tempDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}
let apiKey = "c819171fe0abdc14039af4ef5dda283b";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Osaka&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemp);
