let today = document.querySelector(".date");
let now = new Date();
let day = now.getDay();
let month = now.getMonth();
let date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

let apiKey = "50ea266795ff34ae2a3920026adbb08c";

today.innerHTML = `${days[day]}, ${months[month]} ${date} (${hour}:${
  (minute < 10 ? "0" : "") + minute
})`;

let citySearch = document.querySelector("input");

function enterCity() {
  event.preventDefault();
  let city = document.querySelector("h1");
  city.innerHTML = citySearch.value;
  let citySearched = citySearch.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=${apiKey}&units=metric`;
  function showTemperature(response) {
    let currentDegree = document.querySelector(".current-degree");
    currentDegree.innerHTML = `${Math.round(response.data.main.temp)}°`;
  }
  axios.get(`${apiUrl}`).then(showTemperature);
}

let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", enterCity);

function degreeCel() {
  let currentDegree = document.querySelector(".current-degree");
  currentDegree.innerHTML = "19°";
}

let cel = document.querySelector("#celsius");
cel.addEventListener("click", degreeCel);

function degreeFar() {
  let currentDegree = document.querySelector(".current-degree");
  currentDegree.innerHTML = "72°";
}

let far = document.querySelector("#fahrenheit");
far.addEventListener("click", degreeFar);

function currentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  let currentDegree = document.querySelector(".current-degree");
  let h1 = document.querySelector("h1");
  currentDegree.innerHTML = `${temp}°`;
  h1.innerHTML = response.data.name;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", currentLocation);
