let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let celTemp = null;
let city = "Los Angeles";
let apiKey = "50ea266795ff34ae2a3920026adbb08c";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

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
  let day = date.getDay();
  return `${days[day]} ${hours}:${minutes}`;
}

function showTemperature(response) {
  let currentDegree = document.querySelector("#current-degree");
  let city = document.querySelector(".city");
  let description = document.querySelector("#description");
  let windSpeed = document.querySelector("#wind");
  let humid = document.querySelector("#humidity");
  let currentDate = document.querySelector(".date");
  let icon = document.querySelector("#icon");
  celTemp = response.data.main.temp;
  currentDegree.innerHTML = `${Math.round(celTemp)}°`;
  city.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  humid.innerHTML = response.data.main.humidity;
  currentDate.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function enterCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("input");
  let city = document.querySelector(".city");
  city.innerHTML = citySearch.value;
  let citySearched = citySearch.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", enterCity);

function degreeCel(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#current-degree");
  cel.classList.add("on");
  fahr.classList.remove("on");
  currentDegree.innerHTML = `${Math.round(celTemp)}°`;
}

let cel = document.querySelector("#celsius");
cel.addEventListener("click", degreeCel);

function degreeFahr(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#current-degree");
  cel.classList.remove("on");
  fahr.classList.add("on");
  let conversionF = (celTemp * 9) / 5 + 32;
  currentDegree.innerHTML = `${Math.round(conversionF)}°`;
}

let fahr = document.querySelector("#fahrenheit");
fahr.addEventListener("click", degreeFahr);
