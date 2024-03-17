import { FC } from "react";
import { SectionContainer } from "./sectionContainer";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

const AuthPage: FC = () => {
  return (
    <>
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
};

export default AuthPage;
