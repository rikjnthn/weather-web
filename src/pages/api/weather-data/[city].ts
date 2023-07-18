import { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

import { WeatherInformationType, WeatherTypeApi } from "@/types/WeatherType";

const env = process.env.API_KEY;

async function getWeather(city: string): Promise<WeatherInformationType> {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  try {
    if (typeof city === "string") {
      const weatherDatas = await getWeather(city as string);

      res.json(weatherDatas);
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      res.status(404)
      res.json({
        message: e.message,
        name: e.name,
        code: e.code,
        status: e.response?.status,
      });
    }
  }

  res.end();
}
