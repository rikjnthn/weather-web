import React from "react";

import { Flex } from "@chakra-ui/react";

const BadResonse = () => {
  return (
    <Flex
      as="section"
      justifyContent="center"
      alignItems="center"
      minHeight="calc(100vh - 6rem)"
      fontSize="2xl"
      fontWeight="bold"
    >
      Can&lsquo;t find the place that you looking for
    </Flex>
  );
};

export default BadResonse;
