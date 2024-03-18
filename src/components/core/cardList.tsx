import { FC, useState } from "react";
import { HeroCard } from "../ui/card";
import { HeroButton } from "../ui/button";
import { FlexProps, ListItem, UnorderedList } from "@chakra-ui/react";

interface CountryList extends FlexProps {
  countries: string[];
}

export const CardList: FC<CountryList> = ({ countries, ...rest }) => {
  const [view, setView] = useState(false);

  return (
    <HeroCard
      position="absolute"
      display={{ base: "none", md: "flex" }}
      flexDirection="column"
      justifyContent="center"
      {...rest}
    >
      <HeroButton setView={setView} />

      {view && (
        <UnorderedList>
          {countries.map((code, i) => {
            return <ListItem key={i}>{code}</ListItem>;
          })}
        </UnorderedList>
      )}
    </HeroCard>
  );
};
