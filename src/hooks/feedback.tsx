import { UseToastOptions, useToast } from "@chakra-ui/toast";

interface Props {
  _title: string;
  desc?: string;
  status: UseToastOptions["status"] | undefined;
}

export const useFeedback = () => {
  const toast = useToast();

  const toasting = ({ _title, desc, status }: Props) => {
    toast({
      title: _title,
      description: desc,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  };

  return { toasting };
};
