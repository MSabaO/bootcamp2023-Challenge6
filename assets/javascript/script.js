// api for 5 days weather:

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
let AUTH = "df7ffa53ca8a5ccc2ffc1a065854c8d6"; //API key for weather
let city = "la ciudad";
let lat = 45.273918;
let lon = -66.067657;

let URL =
  "api.openweathermap.org/data/2.5/forecast?lat=" +
  lat +
  "&" +
  "lon=" +
  lon +
  "&" +
  "appid=" +
  AUTH;
console.log(URL);
