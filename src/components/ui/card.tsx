import { Box, Flex, FlexProps, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";

interface CardProps extends FlexProps {
  header: string;
  subHeader: string;
}

export const Card: FC<CardProps> = ({
  children,
  header,
  subHeader,
  ...rest
}) => {
  return (
    <Flex
      flexDir="column"
      bgColor="transparent"
      border="2px solid #c7c7c7"
      borderRadius="15px"
      boxShadow="0 2px 8px rgba(0, 0, 0, 0.2)"
      w={{ base: "auto", md: "32rem" }}
      h={{ base: "auto", md: "fit-content" }}
      m="auto"
      p="2rem"
      {...rest}
    >
      <Stack spacing={4}>
        <Box>
          <Heading>{header}</Heading>
          <Text>{subHeader}</Text>
        </Box>
        {children}
        <Flex justify="flex-end">
          <Link href="/">
            <Text color="teal.500">Back to home</Text>
          </Link>
        </Flex>
      </Stack>
    </Flex>
  );
};

export const HeroCard: FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      borderRadius="10px"
      boxShadow="0 4px 8px #6C4ED9"
      bgColor="#000"
      color="#fff"
      padding="0.3rem"
      gap={4}
      p="5px"
      w={{ md: "fit-content" }}
      {...rest}
    >
      {children}
    </Flex>
  );
};
