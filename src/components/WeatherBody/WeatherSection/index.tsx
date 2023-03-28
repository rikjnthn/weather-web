import React from "react";

import { Flex } from "@chakra-ui/react";

const WeatherSection = ({
  children,
}: {
  children?: JSX.Element[] | JSX.Element;
}) => {
  return (
    <Flex
      as="section"
      flexDirection='column'
      width='full'
      maxWidth='xl'
      minHeight="20rem"
      padding="10"
      borderRadius="10"
      backgroundColor="#222"
      color="white"
      overflowX='scroll'
    >
      {children}
    </Flex>
  );
};

export default WeatherSection;
