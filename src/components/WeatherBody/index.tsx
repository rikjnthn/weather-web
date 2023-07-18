import React, { useEffect, useState } from "react";

import { Flex } from "@chakra-ui/react";
import { useQueries } from "@tanstack/react-query";
import axios from "axios";

import getParam from "@/helper/getParam";

import {
  WeatherDailyType,
  WeatherHourlyType,
  WeatherInformationType,
} from "@/types/WeatherType";
import BadResponse from "../BadResponse";
import WeatherData from "./WeatherData";
import DailyForecast from "./DailyForecast";
import WeatherHero from "./WeatherHero";
import HourlyForecast from "./HourlyForecast";
import Loading from "../Loading";

const WeatherBody = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const city = getParam("city");
  const queries = useQueries({
    queries: [
      {
        queryKey: ["mainData"],
        queryFn: async () =>
          await axios.get<WeatherInformationType>(`api/weather-data/${city}`),
      },
      {
        queryKey: ["daily"],
        queryFn: async () =>
          await axios.get<WeatherDailyType[]>(`api/daily/${city}`),
      },
      {
        queryKey: ["hourly"],
        queryFn: async () =>
          await axios.get<WeatherHourlyType[]>(`api/hourly/${city}`),
      },
    ],
  });

  useEffect(() => {
    setLoading(() => queries.some((val) => val.isLoading));
    setError(() => queries.some((val) => val.isError));
  }, [queries]);

  if (loading) return <Loading />;

  const [weather, daily, hourly] = queries;

  if (
    error ||
    typeof weather.data === "undefined" ||
    typeof daily.data === "undefined" ||
    typeof hourly.data === "undefined"
  )
    return <BadResponse />;

  return (
    <Flex
      as="main"
      className="full-height"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      width="full"
      paddingBottom="20"
    >
      <WeatherHero weather={weather.data.data} />

      <Flex
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        width="full"
        gap="10"
      >
        <HourlyForecast hourly={hourly.data.data} />
        <DailyForecast daily={daily.data.data} />
        <WeatherData weather={weather.data.data} />
      </Flex>
    </Flex>
  );
};

export default WeatherBody;
