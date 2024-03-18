import { Container, ContainerProps } from "@chakra-ui/react";

interface Props extends ContainerProps {
  children: React.ReactElement | React.ReactElement[];
}

export const SectionContainer: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <Container
      display="flex"
      flexDir="column"
      justifyContent="center"
      maxW="container.xl"
      w="100%"
      height="100vh"
      position="relative"
      px={{ base: 6, lg: 24 }}
      pt={{ base: 6, md: 16 }}
      pb={{ sm: 8, md: 24 }}
      zIndex={10}
      {...rest}
    >
      {children}
    </Container>
  );
};
