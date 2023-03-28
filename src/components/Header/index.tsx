import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Flex, Button, Input, Stack, StackItem } from "@chakra-ui/react";
import DOMPurify from "dompurify";

const Header = () => {
  const [hamburgerClick, setHamburgerClick] = useState<boolean>(false);

  const inpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflowY = hamburgerClick ? "hidden" : "scroll";
  }, [hamburgerClick]);

  const handleHamburger = () => setHamburgerClick((click) => !click);

  const handleSubmit = (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    const inp = DOMPurify.sanitize(inpRef.current?.value ?? "", {
      ALLOWED_TAGS: [],
    });

    const param = new URL(window.location.href);
    param.searchParams.set("city", inp);
    window.location.href = param.toString();
  };
  return (
    <>
      <Flex
        as="section"
        flexDirection="column"
        width={{ base: "80%", sm: "60%", md: "40%", lg: "15rem" }}
        height="100%"
        paddingX="10"
        paddingY="7"
        position="fixed"
        transition="transform 300ms, box-shadow 300ms"
        transform="auto"
        translateX={{ base: hamburgerClick ? "0" : "-100%", lg: "0" }}
        backgroundColor="white"
        borderEndRadius="lg"
        boxShadow={{
          base: hamburgerClick ? "110px 0 10px 40rem #5e5e5e83" : "",
          lg: "none",
        }}
        borderRight={{ lg: "1px solid #cccccc" }}
        zIndex="10"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex>
            <Image src="/logo.svg" alt="Logo" width="71" height="30" />
          </Flex>
          <Button
            onClick={handleHamburger}
            display={{ base: "static", lg: "none" }}
            background="transparent"
            paddingInline="0"
            _hover={{}}
            _active={{}}
            _focus={{}}
          >
            <Image
              src="/hamburger.svg"
              alt="hamburger icon"
              width="30"
              height="28"
            />
          </Button>
        </Flex>
        <Stack marginTop="14" gap="6" fontSize="xl">
          <StackItem>
            <Link href="/">Weather</Link>
          </StackItem>
          <StackItem>
            <Link href="setting">Setting</Link>
          </StackItem>
        </Stack>

        <Flex marginTop="auto">{/* © All right reserve 2023 */}</Flex>
      </Flex>
      <Flex
        as="header"
        width="full"
        height="24"
        alignItems="center"
        paddingInline={{ base: "5", sm: "14" }}
      >
        <Button
          onClick={handleHamburger}
          display={{ base: "static", lg: "none" }}
          paddingInline="0"
          backgroundColor="transparent"
          _hover={{}}
          _active={{}}
          _focus={{}}
        >
          <Image
            src="/hamburger.svg"
            alt="hamburger icon"
            width="30"
            height="28"
          />
        </Button>

        <Flex
          as="form"
          onSubmit={handleSubmit}
          width={{ base: "55%", sm: "auto" }}
          alignItems="center"
          borderRadius="full"
          marginLeft="auto"
          border="2px solid"
          paddingInline="0"
          background="transparent"
        >
          <Input
            ref={inpRef}
            variant="unstyled"
            type="text"
            name="city"
            autoFocus
            placeholder="City"
            width="full"
            height="full"
            paddingInline="0"
            paddingLeft="4"
            borderStartRadius="full"
            required
            autoComplete="off"
          />
          <Button
            type="submit"
            backgroundColor="gray.100"
            borderEndRadius="full"
            paddingInline="0"
            transition="none"
            _hover={{}}
            _active={{}}
            _focus={{}}
          >
            <Image src="/search.svg" alt="search icon" width="20" height="25" />
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
