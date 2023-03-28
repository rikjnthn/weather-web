import isDay from '@/helper/IsDay'

export const WEATHER_IMAGE = {
  "clear sky": isDay() ? "sunny" : "moon",
  clear: isDay() ? "sunny" : "moon",
  "few clouds": isDay() ? "sunny-cloud" : "moon-cloud",
  drizzle: "rain",
  "scattered clouds": "cloud",
  clouds: "cloud",
  "broken clouds": "cloudy",
  "shower rain": "rain",
  rain: "rain",
  thunderstorm: "thunder",
  snow: "snow",
  mist: "mist",
};
