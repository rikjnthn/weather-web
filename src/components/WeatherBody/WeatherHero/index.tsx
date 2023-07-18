import React from "react";
import Image from "next/image";

import { Flex, Container } from "@chakra-ui/react";

import { WEATHER_IMAGE } from "@/constants/WeatherImage";
import { WeatherInformationType } from "@/types/WeatherType";

const WeatherHero = ({ weather }: { weather: WeatherInformationType }) => {
  const weatherImg = weather.main.toLowerCase() as keyof typeof WEATHER_IMAGE;

  return (
    <Flex
      as="section"
      flexDirection={{ base: "column", md: "row-reverse" }}
      gap="20"
      justifyContent={{ base: "center", md: "space-between" }}
      alignItems="center"
      paddingInline={{ md: "10%" }}
      width={{ base: "48", md: "full" }}
      height={{ base: "sm", md: "52" }}
      marginBottom="20"
    >
      <Image
        src={`/${WEATHER_IMAGE[weatherImg]}.svg`}
        alt={weather.description}
        title={weather?.description}
        width="150"
        height="150"
        priority
      />
      <Flex
        flexDirection="column"
        textAlign={{ base: "center", md: "start" }}
        gap={{ md: "4" }}
      >
        <Container
          as="span"
          fontSize={{ base: "1.5rem", md: "3rem" }}
          paddingInline="0"
        >
          {weather?.country}
        </Container>
        <Container as="span" fontSize="3rem" paddingInline="0">
          {weather?.temperature - 273}&#8451;
        </Container>
        <Flex gap="8">
          <span className="title">{weather?.description}</span>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WeatherHero;
