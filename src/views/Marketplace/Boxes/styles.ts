import { Flex, Heading, Input, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import Page from 'views/Page'

export const BannerSoccer = styled.div<{ src: string; isMobile: boolean }>`
  padding-top: 30px;
  padding-bottom: 90px;
  padding-left: ${({ isMobile }) => (isMobile ? '15px' : 0)};
  padding-right: ${({ isMobile }) => (isMobile ? '15px' : 0)};
  background-image: url('${({ src }) => src}');
  background-color: ${({ theme }) => theme.colors.backgroundAlt3};
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
`
export const StyledFlexWrapper = styled.div`
  width: 100%;
`
export const StyledSoccerBox = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background: linear-gradient(164.38deg, rgb(29 1 141 / 70%) 10.92%, rgba(29, 9, 107, 0) 134.72%);
  border-radius: 10px;
  max-width: 900px;
  margin: auto;
`
export const HeadingBorder = styled(Heading)<{ src: string; isMobile: boolean }>`
  font-weight: 700;
  text-align: center;
  font-size: ${({ isMobile }) => (isMobile ? '24px' : '36px')};
  color: #fff;
  text-transform: uppercase;
  display: inline-block;
  padding-left: ${({ isMobile }) => (isMobile ? '60px' : '150px')};
  padding-right: ${({ isMobile }) => (isMobile ? '60px' : '150px')};
  padding-bottom: 30px;
  background-image: url('${({ src }) => src}');
  background-position: center bottom;
  background-repeat: no-repeat;
`
export const TextInfo = styled(Text)`
  border: 1.5px solid #0a4db6;
  border-radius: 6px;
  font-size: 16px;
  padding: 10px;
  font-weight: 600;
  display: flex;
  align-items: baseline;
  color: #ccd3ff;
`
export const TextCount = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  color: #ccd3ff;
  margin-left: 10px;
`
export const InputAmout = styled(Input)`
  font-size: 18px;
  font-weight: 700;
  color: #ccd3ff;
  margin-left: 10px;
  width: 70px;
  background-color: transparent;
  border: 0;
  height: 30px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`

export const PapeStyled = styled(Page)`
  min-height: calc(100vh - 364px);
`
