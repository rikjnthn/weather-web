import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";
import { WeatherDailyType, WeatherForecastApiType } from "@/types/WeatherType";

const env = process.env.API_KEY;

async function getWeatherDaily(city: string): Promise<WeatherDailyType[]> {
  const { data } = await axios.get<WeatherForecastApiType>(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${env}`
  );

  const daily = data.list
    .map((val, ind) => {
      const intl = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
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

  return daily;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  try {
    if (typeof city === "string") {
      const weatherDaily = await getWeatherDaily(city);
      res.json(weatherDaily);
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
