import { SectionContainer } from "@/components/sectionContainer";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SectionContainer>
        <VStack width="fit-content" justifySelf="center" margin="auto" gap={6}>
          <Heading>World Tracker App</Heading>
          <Text fontSize="1.8rem">
            <TypeAnimation
              sequence={[
                "Welcome 🇺🇸",
                2000,
                "Bienvenido 🇲🇽",
                2000,
                "Bienvenu 🇫🇷",
                2000,
              ]}
              wrapper="span"
              speed={5}
              repeat={Infinity}
            />
          </Text>

          <Flex gap={8}>
            <Button
              w="5.5rem"
              as={Link}
              href="/login"
              colorScheme="teal"
              variant="solid"
            >
              Login
            </Button>
            <Button
              w="5.5rem"
              as={Link}
              href="/signUp"
              colorScheme="teal"
              variant="outline"
            >
              Sign Up
            </Button>
          </Flex>
        </VStack>
      </SectionContainer>
    </>
  );
}
