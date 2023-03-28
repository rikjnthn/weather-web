import Head from "next/head";
import { useEffect, useState } from "react";

import { Flex, Spinner } from "@chakra-ui/react";

import { WeatherBody } from "@/components";
import { WeatherAndForecastType } from "@/types/WeatherType";
import axios from "axios";

export default function Home() {
  const [badResponse, setBadResponse] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<WeatherAndForecastType | object>({});

  async function getWeather() {
    setLoading(() => true);
    const url = new URL(window.location.href);
    const city = url.searchParams.get("city");

    try {
      const { data } = await axios.get<WeatherAndForecastType>(
        `/api/forecast/${city ?? "jakarta"}`
      );
      setWeather(() => {
        return {
          ...data,
        };
      });
    } catch {
      setBadResponse(() => true);
    } finally {
      setLoading(() => false);
    }
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <>
      <Head>
        <title>Weather App</title>
      </Head>

      {loading ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          minHeight="calc(100vh - 6rem)"
          width="full"
        >
          <Spinner thickness="10px" speed="1s" width="52" height="52" />
        </Flex>
      ) : (
        <WeatherBody
          badResponse={badResponse}
          weather={weather as WeatherAndForecastType}
        />
      )}
    </>
  );
}
