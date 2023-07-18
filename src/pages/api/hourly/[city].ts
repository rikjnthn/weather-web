import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import { WeatherHourlyType, WeatherForecastApiType } from "@/types/WeatherType";

const env = process.env.API_KEY;

async function getWeatherHourly(city: string): Promise<WeatherHourlyType[]> {
  const { data } = await axios.get<WeatherForecastApiType>(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${env}`
  );

  const hourly = data.list
    .map((val, ind) => {
      const intl = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
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
    .splice(0, 12);

  return hourly;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  try {
    if (typeof city === "string") {
      const weatherHourly = await getWeatherHourly(city);
      res.json(weatherHourly);
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
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
