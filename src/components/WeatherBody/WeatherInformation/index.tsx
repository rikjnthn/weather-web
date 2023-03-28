import React from "react";

import { Flex, ListItem } from "@chakra-ui/react";

const WeatherInformation = ({
  title,
  children,
}: {
  title?: string;
  children: JSX.Element[];
}) => {
  return (
    <Flex
      as={ListItem}
      title={title}
      justifyContent='space-between'
      alignItems="center"
      width='full'
    >
      {children}
    </Flex>
  );
};

export default WeatherInformation;
