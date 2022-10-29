import styled from "styled-components";
import { darkColors } from "../../theme/colors";
import { Box, Flex } from "../Box";
import SocialLinks from "./Components/SocialLinks";

export const StyledFooter = styled(Flex)`
  background: ${darkColors.backgroundAlt1};
`;

export const StyledList = styled.ul`
  list-style: none;
  margin-bottom: 40px;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0px;
  }
`;

export const StyledListItem = styled.li`
  font-size: 16px;
  margin-bottom: 8px;
  text-transform: capitalize;

  &:first-child {
    color: ${darkColors.secondary};
    font-weight: 600;
    text-transform: uppercase;
  }
`;

export const StyledIconMobileContainer = styled(Box)`
  margin-bottom: 24px;
`;

export const StyledToolsContainer = styled(Flex)`
  border-color: ${darkColors.cardBorder};
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  padding: 24px 0;
  margin-bottom: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    border-top-width: 0;
    border-bottom-width: 0;
    padding: 0 0;
    margin-bottom: 0;
  }
`;

export const StyledSocialLinks = styled(SocialLinks)`
  border-bottom: 0;
  padding: 0;
  margin-bottom: 0;
  margin-left: auto;
`;
export const Container = styled.div`
  width: 1310px;
  padding: 0 15px;
  margin: 0 auto;
  @media (max-width: 992px) {
    width: 100%;
  }
`;
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
`;
export const Col4 = styled.div`
  padding: 0 15px;
  width: calc(100% / 4);
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 992px) {
    width: 50%;
  }
`;
export const TitleFooter = styled.h3`
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
`;
