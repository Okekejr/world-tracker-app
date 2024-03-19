import { Flex, Text } from "@chakra-ui/react";
import { SectionContainer } from "./sectionContainer";
import { Map } from "./svg/map";
import { HeroCard } from "./ui/card";
import { HeroForm } from "./ui/form";
import { CardList } from "./core/cardList";
import { HeroButton } from "./ui/button";
import Cookies from "js-cookie";

import { useRouter } from "next/router";
import { FC } from "react";
import { WorldData } from "@/pages/worldTracker";

interface WorldProps {
  data: WorldData | null | undefined;
}

const WorldTrackerPage: FC<WorldProps> = ({ data }) => {
  const router = useRouter();
  const username = Cookies.get("username");

  const logout = () => {
    Cookies.remove("username");
    router.push("/");
  };

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
            Welcome back {data?.userName}
          </Text>

          <HeroForm queryUrl="/api/users/postdata" username={username} />
        </HeroCard>
        <HeroButton click={logout} _title="Logout" />
      </Flex>

      <CardList countries={data?.countries} />

      <Map fill={data?.color} countries={data?.countries} />
    </SectionContainer>
  );
};

export default WorldTrackerPage;
