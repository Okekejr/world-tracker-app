import { Box, Button, ButtonProps } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction } from "react";

interface Props extends ButtonProps {
  _title?: string;
  setView?: Dispatch<SetStateAction<boolean>>;
  click?: () => void;
}

export const HeroButton: FC<Props> = ({
  _title = "Country List",
  click,
  setView,
  ...rest
}) => {
  const toggleView = () => {
    if (setView) {
      setView((prevView) => !prevView);
    }
  };

  return (
    <Box>
      <Button onClick={click || toggleView} {...rest}>
        {_title}
      </Button>
    </Box>
  );
};
