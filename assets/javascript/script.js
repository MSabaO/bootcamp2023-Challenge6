// api for 5 days weather:
// start
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const AUTH = "df7ffa53ca8a5ccc2ffc1a065854c8d6"; //API key for weather
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const weatherCardsDiv = document.querySelector(".weather-cards");
const currentWeatherDiv = document.querySelector(".current-weather");

//Updating weather cards

const createWeatherCard = (cityName, weatherItem, index) => {
  if (index === 0) { 
  return `  <div class="details">
            <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
            <h3>Temperature: ${(weatherItem.main.temp -273.15).toFixed(2)} °C</h3>
            <h3> Wind:  ${weatherItem.wind.speed} m/s</h3>
            <h3>Humidity: ${weatherItem.main.humidity}%</h3>
                    </div>
                    <div class="icon">
                        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="icon-weather">
                    <h3>${weatherItem.weather[index].description}</h3>
                    </div>`; 
} else { //for the five days
  return ` <li class="card">
             <h3>${weatherItem.dt_txt.split(" ")[0]}</h3>
              <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="icon-weather">
              <h4>Temperature: ${(weatherItem.main.temp -273.15).toFixed(2)} °C</h4>
              <h4> Wind: ${weatherItem.wind.speed}m/s</h4>
              <h4>Humidity: ${weatherItem.main.humidity}%</h4>
              </li>`;
}
}

//Getting weather info from coordinates
//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const getWeatherDetails = (cityName, lat, lon) => {
const APIWEATHER_URL =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${AUTH}`;

  fetch(APIWEATHER_URL).then(res => res.json()).then(data => {
       //Get only one day per forecast
    const uniqueForecastDays = [];  
    const fiveDaysForecast = data.list.filter(forecast => {
    const forecastDate = new Date(forecast.dt_txt).getDate();
      if(!uniqueForecastDays.includes(forecastDate)) {
       return uniqueForecastDays.push(forecastDate);
  }
  });
//clearing previous
cityInput.value = "";
currentWeatherDiv.innerHTML = "";
weatherCardsDiv.innerHTML = "";

//creating each weather card
console.log(fiveDaysForecast);
fiveDaysForecast.forEach((weatherItem, index) => {
  const html = createWeatherCard(cityName, weatherItem, index);
  if (index === 0) {
    currentWeatherDiv.insertAdjacentHTML("beforeend",html);
  } else {
    weatherCardsDiv.insertAdjacentHTML("beforeend", html);
  }
  });
  }).catch (() => {
    alert("Error occurred while fetching the weather forecast!");
  });
}

//getting city coordinates
const getCityCoordinates = () => {
  //get city name without spaces
  const cityName = cityInput.value.trim(); //get typed entered city without spaces
  if(!cityName) return; //Return if empty
  const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${AUTH}`;

//Return city coordinates (name, lat and long) from API
fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
  // console.log(data);
    if(!data.length) return alert(`No coordinates were found for ${cityName}`);
    const {name, lat, lon} = data[0];
     getWeatherDetails(name,lat,lon);
  }).catch(() => {
    alert("An error ocurred while fetching location.");
  });
}

searchButton.addEventListener("click", getCityCoordinates);
// cityInput.addEventListener("keyup", e => e.key === "Enter" & getCityCoordinates());