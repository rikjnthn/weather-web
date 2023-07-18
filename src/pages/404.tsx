import React from "react";

import { Center } from "@chakra-ui/react";

function error() {
  return (
    <Center
      as="main"
      className="full-height"
      fontSize="3xl"
      fontWeight="bold"
      paddingInline="5"
      marginTop='-24'
      textAlign="center"
    >
      No Page Found
    </Center>
  );
}

export default error;
