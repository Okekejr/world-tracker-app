import theme from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const username = Cookies.get("username");
    if (username) {
      router.push("/worldTracker");
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
