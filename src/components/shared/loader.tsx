import { Flex, Loader } from "@mantine/core";
import { FC } from "react";


export const LoaderCom: FC = () => {
  return (
    <Flex justify="center" align="center">
      <Loader />;
    </Flex>
  );
};
