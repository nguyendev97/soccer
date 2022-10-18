import React from "react";
import { EthwPrice, EthwPriceProps } from ".";
import { Flex } from "../Box";

export default {
  title: "Components/EthwPrice",
  component: EthwPrice,
};

const Template: React.FC<React.PropsWithChildren<EthwPriceProps>> = ({ ...args }) => {
  return (
    <Flex p="10px">
      <EthwPrice {...args} />
    </Flex>
  );
};

export const Default = Template.bind({});
Default.args = {
  EthwPriceUsd: 20.0,
};
