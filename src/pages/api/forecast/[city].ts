import { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import process from "process";

import {
  WeatherType,
  WeatherTypeApi,
  WeatherForecastApiType,
  WeatherForecastType,
} from "@/types/WeatherType";

const env = process.env.API_KEY;

async function getWeather(city: string): Promise<WeatherType> {
  const { data } = await axios.get<WeatherTypeApi>(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${env}`
  );
  return {
    main: data.weather[0].main,
    description: data.weather[0].description,
    temperature: Number(data.main.temp.toFixed()),
    temperature_min: Number(data.main.temp_min.toFixed()),
    temperature_max: Number(data.main.temp_max.toFixed()),
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    visibility: data.visibility / 1000,
    wind_speed: data.wind.speed,
    country: data.name,
  };
}

async function getWeatherForecast(city: string): Promise<WeatherForecastType> {
  const { data } = await axios.get<WeatherForecastApiType>(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${env}`
  );

  const hourly = data.list
    .map((val, ind) => {
      const intl = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: false,
      });
      const miliSecond = new Date(data.list[ind].dt_txt).getTime();

      return {
        id: miliSecond,
        time: intl.format(miliSecond),
        main: val.weather[0].main,
        description: val.weather[0].description,
        temperature: Number(val.main.temp.toFixed()),
      };
    })
    .splice(12);

  const daily = data.list
    .map((val, ind) => {
      const intl = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "short",
      });

      const miliSecond = new Date(data.list[ind].dt_txt).getTime();
      return {
        id: miliSecond,
        time: intl.format(miliSecond),
        main: val.weather[0].main,
        description: val.weather[0].description,
        temperature: Number(val.main.temp.toFixed()),
      };
    })
    .filter((val, ind, arr) => val.time !== arr[ind + 1]?.time);

  return {
    hourly,
    daily,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  const weatherDatas = await getWeather(city as string);

  const weatherForecast = await getWeatherForecast(city as string);

  res.json({
    weatherDatas: { ...weatherDatas },
    weatherForecast: { ...weatherForecast },
  });

  res.end();
}
