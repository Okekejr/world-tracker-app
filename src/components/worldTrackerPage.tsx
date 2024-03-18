import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SectionContainer } from "./sectionContainer";
import { Map } from "./svg/map";
import { HeroCard } from "./ui/card";
import { HeroForm } from "./ui/form";
import { CardList } from "./core/cardList";
import { useRouter } from "next/navigation";
import { HeroButton } from "./ui/button";

interface WorldData {
  name: string;
  color: string;
  countries: string[];
}

const WorldTrackerPage = () => {
  const router = useRouter();
  const [data, setData] = useState<WorldData>({
    name: "",
    color: "",
    countries: [],
  });
  const [userlogged, setUserlogged] = useState("");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const logout = () => {
    router.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedUsername = localStorage.getItem("username");

      if (storedUsername) {
        setUserlogged(storedUsername);
      } else return;

      try {
        const response = await fetch(
          `${apiUrl}/users/getdata?username=${storedUsername}`
        );
        const newData = await response.json();
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  });

  return (
    <SectionContainer
      px={{ base: 6, lg: 12 }}
      pt={{ base: 6, md: 6 }}
      pb={{ sm: 8, md: 12 }}
    >
      <Flex
        m="0 auto 2rem auto"
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
        gap={4}
      >
        <HeroCard alignItems="center">
          <Text fontSize={{ base: "1rem", md: "1.8rem" }}>
            Welcome back {data && data.name}
          </Text>
          {data && (
            <HeroForm queryUrl="/api/users/getdata" username={userlogged} />
          )}
        </HeroCard>
        {data && <HeroButton click={logout} _title="Logout" />}
      </Flex>
      {data && <CardList countries={data.countries} />}
      <Map fill={data.color} countries={data.countries} />
    </SectionContainer>
  );
};

export default WorldTrackerPage;
