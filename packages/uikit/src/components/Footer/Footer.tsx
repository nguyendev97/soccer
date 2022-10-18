import React from "react";
import { Flex } from "../Box";
import { StyledFooter, StyledSocialLinks, StyledTextCoppyRight } from "./styles";
import { FooterProps } from "./types";

const MenuItem: React.FC<React.PropsWithChildren<FooterProps>> = ({ ...props }) => {
  return (
    <StyledFooter data-theme="dark" p={["40px 16px", null, "108px 0px 26px 0px"]} {...props} justifyContent="center">
      <Flex flexDirection="row" alignItems="center" width={["100%", null, "1120px;"]}>
        <StyledTextCoppyRight>2022 © EthereumPoW (ETHW) Official</StyledTextCoppyRight>
        <StyledSocialLinks order={[2]} pb={["42px", null, "32px"]} mb={["0", null, "32px"]} />
      </Flex>
    </StyledFooter>
  );
};

export default MenuItem;
