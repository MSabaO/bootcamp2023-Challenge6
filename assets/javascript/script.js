// api for 5 days weather:

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
let AUTH = "df7ffa53ca8a5ccc2ffc1a065854c8d6"; //API key for weather
let city = "la ciudad";
// let lat = 45.273918;
// let lon = -66.067657;

const getWeatherDetails = (cityName, lat, lon) => {
const createWeatherCard = (weatherItem) => {
    return `   <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
              <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="icon-weather">
              <h4>Temperature: ${(weatherItem.main.temp -273.15).toFixed(2)} °C</h4>
              <h4> Wind: ${weatherItem.wind.speed}m/s</h4>
              <h4>Humidity: ${weatherItem.main.humidity}%</h4>
              </li>`;
}

  //api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const APIWEATHER_URL =
  `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${AUTH}`;

  fetch(APIWEATHER_URL).then(res => res.json()).then(data => {
    
     //Get only one day per forecast
    const uniqueForecastDays = [];
   
const fiveDaysFor = data.list.filter(forecast => {
  const forecastDate = new Date(forecast.dt.txt).getDate();
  if(!uniqueForecastDays.includes(forecastDate)) {
   return uniqueForecastDays.push(forecastDate);
  }
  });
console.log(fiveDaysFor);
fiveDaysFor.forEach(weatherItem => {
  createWeatherCard(weatherItem);
});


  }).catch (() => {
    alert("Error occurred while fetching the weather forecast!");
  });
}

// start
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");


const getCityCoordinates = () => {
  //get city name without spaces
  const cityName = cityInput.value.trim();
  if(!cityName) return;
 
  
const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${AUTH}`;


//Return city coordinates (name, lat and long) from API
fetch (GEOCODING_API_URL).then(res => res.json()).then(data => {
  console.log(data)
    if(data.lenght) return alert(`No coordinates were found for ${cityName}`);
  const { name, lat, lon} = data[0];
  getWeatherDetails(name,lat,lon);
  }).catch(() => {
    alert("An error ocurred while fetching location.");
  });
}
searchButton.addEventListener("click", getCityCoordinates);

