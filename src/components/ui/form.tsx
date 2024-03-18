import { FC, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useAuthForm } from "@/hooks/authForm";
import { InfoIcon } from "@chakra-ui/icons";
import { useFeedback } from "@/hooks/feedback";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface AuthProps {
  submitUrl: string;
  btnText?: string;
}

export const AuthenticationForm: FC<AuthProps> = ({
  btnText = "Create Account",
  submitUrl,
}) => {
  const { formData, handleInputChange, clearForm } = useAuthForm();
  const [hidePassword, setHidePassword] = useState(true);
  const { toasting } = useFeedback();
  const [incorrect, setIncorrect] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    setHidePassword((prevHidePassword) => !prevHidePassword);
  };

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const postReq = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          color: formData.color,
        }),
      });

      if (!postReq.ok) {
        setIncorrect(true);
      } else {
        setIncorrect(false);
        clearForm();
        // Store username in local storage
        Cookies.set("username", formData.username, {
          expires: 30 * 60 * 1000,
          domain:
            process.env.NODE_ENV === "development"
              ? ".localhost"
              : "https://world-tracker-app.vercel.app",
        });

        router.push("/worldTracker");
      }
    } catch (error) {
      toasting({
        _title: "FAILED",
        desc: "Failed to process credentials. Please try again later.",
        status: "error",
      });
    }
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <FormControl isRequired>
          <Stack gap={4} w="100%">
            <Box>
              <FormLabel>Email</FormLabel>
              <Input
                name="username"
                type="text"
                placeholder="Email"
                borderColor={incorrect ? "red" : ""}
                value={formData.username}
                onChange={handleInputChange}
              />
            </Box>

            <Box>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  type={hidePassword ? "password" : "text"}
                  placeholder="Password"
                  borderColor={incorrect ? "red" : ""}
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <InputRightElement
                  _hover={{ cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                >
                  {hidePassword ? (
                    <FaRegEyeSlash color="#c7c7c7" />
                  ) : (
                    <FaRegEye color="#c7c7c7" />
                  )}
                </InputRightElement>
              </InputGroup>
            </Box>

            {incorrect && submitUrl === "/api/users/login" ? (
              <HStack>
                <InfoIcon color="red.500" />
                <Text>Wrong email or password, pls try again!</Text>
              </HStack>
            ) : (
              ""
            )}

            {submitUrl === "/api/users/register" ? (
              <Box>
                <FormLabel>Color</FormLabel>
                <Input
                  name="color"
                  type="text"
                  borderColor=""
                  placeholder="Type in your favourite color"
                  value={formData.color}
                  onChange={handleInputChange}
                />
              </Box>
            ) : (
              ""
            )}

            {incorrect && submitUrl === "/api/users/register" ? (
              <HStack>
                <InfoIcon color="red.500" />
                <Text>Error saving your credentials!</Text>
              </HStack>
            ) : (
              ""
            )}

            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              _hover={{ bgColor: "gray.200" }}
              isDisabled={!formData.username}
            >
              {btnText}
            </Button>
          </Stack>
        </FormControl>
      </form>
    </>
  );
};

// HeroForm

interface HeroT {
  queryUrl: string;
  username: string | undefined;
}

export const HeroForm: FC<HeroT> = ({ queryUrl, username }) => {
  const [country, setCountry] = useState("");
  const { toasting } = useFeedback();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const countries = event.currentTarget.value;
    setCountry(countries.toLowerCase());
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const postReq = await fetch(queryUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          country: country,
        }),
      });
      if (postReq.ok) {
        setCountry("");
      } else {
        toasting({
          _title: "FAILED",
          desc: "Failed to process request. Please try again later.",
          status: "error",
        });
      }
    } catch (error) {
      toasting({
        _title: "FAILED",
        desc: "Failed to process request. Please try again later.",
        status: "error",
      });
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <FormControl isRequired>
        <Stack flexDirection="row" gap={4} w="100%" alignItems="center">
          <Box>
            <Input
              name="country"
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={onChangeHandler}
            />
          </Box>
          <Button
            colorScheme="teal"
            type="submit"
            _hover={{ bgColor: "gray.200" }}
            isDisabled={!country}
          >
            Add
          </Button>
        </Stack>
      </FormControl>
    </form>
  );
};
