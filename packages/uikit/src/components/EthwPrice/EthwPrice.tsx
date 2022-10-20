import React from "react";
import styled from "styled-components";
import Image from "next/image";
// import LogoRound from "../Svg/Icons/LogoRound";
import { logoImage } from "./images";
import Text from "../Text/Text";
import Skeleton from "../Skeleton/Skeleton";
import { Colors } from "../../theme";

export interface Props {
  color?: keyof Colors;
  ethwPriceUsd?: number;
  showSkeleton?: boolean;
}

const PriceLink = styled.a`
  display: flex;
  align-items: center;
  svg {
    transition: transform 0.3s;
  }
  :hover {
    svg {
      transform: scale(1.2);
    }
  }
`;

const EthwPrice: React.FC<React.PropsWithChildren<Props>> = ({
  ethwPriceUsd,
  color = "textLink",
  showSkeleton = true,
}) => {
  return ethwPriceUsd ? (
    <PriceLink
      href="https://pancakeswap.finance/swap?outputCurrency=0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82&chainId=56"
      target="_blank"
    >
      {/* <LogoRound width="24px" mr="8px" /> */}
      <Image src={logoImage} width="24px" alt="Ethw" className="ethw-icon" />
      <Text color={color} ml="8px">{`$${ethwPriceUsd.toFixed(3)}`}</Text>
    </PriceLink>
  ) : showSkeleton ? (
    <Skeleton width={80} height={24} />
  ) : null;
};

export default React.memo(EthwPrice);
