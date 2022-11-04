import styled from 'styled-components'
// import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from '@pancakeswap/localization'
import { Flex, Heading, Text, Button } from '@pancakeswap/uikit'
import TabsComponent from '../components/TabsComponent'
import { powImage, shoImage, speImage, jmpImage, coin2xImage } from '../images'

const StyledFlexWrapper = styled(Flex)`
  width: 100%;
  margin-top: 63px;
  background-color: #130355;
  @media (max-width: 768px) {
    margin-top: 27px;
  }
`
const StyledFlexContent = styled(Flex)`
  width: 100%;
  flex-direction: column;
`
const StyledContent = styled.div`
  width: 1092px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`
export const Container = styled.div`
  width: 100%;
  padding: 0px 15px;
`
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px -12px;
`
export const Col2 = styled.div`
  width: calc(100% / 2);
  padding: 0 12px;
  @media (max-width: 768px) {
    width: 100%;
  }
`
export const NftAvatar = styled(Flex)`
  justify-content: center;
  padding-bottom: 70px;
  background: url('/images/nfts/nft-bg.png') no-repeat bottom center;
  @media (max-width: 768px) {
    background-size: contain;
  }
`
export const NftTitle = styled(Heading)`
  font-weight: 600;
  font-size: 40px;
  color: #fff;
  margin-bottom: 20px;
`
export const NftInfo = styled(Flex)`
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`
export const NftInfoItem = styled(Flex)`
  background-color: transparent;
  border: 1px solid #4757b7;
  border-radius: 10px;
  padding: 8px 20px;
  width: 164px;
  height: 64px;
  align-items: center;

  &:not(:last-child) {
    margin-right: 10px;
  }
`
const NftInfoIcon = styled(Flex)`
  margin-right: 17px;
`
const NftInfoContent = styled(Flex)`
  flex-direction: column;
`
const SpanText = styled.span`
  font-weight: 500;
  font-size: 14px;
  color: #ccd3ff;
  margin-bottom: 10px;
`
const SpanCount = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #3579ff;
`
const SubTabText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  color: #ccd3ff;
`
const FlexSubTabContent = styled.div`
  background-color: transparent;
`
const NftProperties = styled(Flex)`
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
`
const ItemLegend = styled.div`
  width: 114px;
  height: 69px;
  padding: 8px 24px;
  background: #1d018d;
  border-radius: 10px;

  &:not(:last-child) {
    margin-right: 16px;
  }

  @media (max-width: 768px) {
    margin-right: 0 !important;
    margin-bottom: 20px;
  }
`
const FlexLegendItem = styled(Flex)`
  align-items: center;
`
const ItemLegendText = styled(Text)`
  color: #ccd3ff;
  font-weight: 400;
  font-size: 14px;
`
const ItemLegendNumber = styled(Text)`
  color: #ccd3ff;
  font-weight: 700;
  font-size: 18px;
`
const NftInfoPrice = styled.div`
  background: linear-gradient(349.42deg, #1d018d 15.74%, rgba(29, 9, 107, 0) 124.9%);
  border-radius: 10px;
  padding: 20px 24px;
  margin-top: 20px;
`
const NftPrice = styled(Flex)`
  align-items: center;
  margin-bottom: 20px;
`
const MainPrice = styled(Flex)`
  align-items: center;
  margin-right: 16px;
`
const TextPrice = styled(Flex)`
  font-weight: 700;
  font-size: 30px;
  color: #fff;
  margin-left: 10px;
`
const SubPrice = styled(Flex)`
  font-weight: 400;
  font-size: 16px;
  color: #ccd3ff;
`
const BuyButton = styled(Button)`
  background: linear-gradient(103.59deg, #00cc83 26.67%, #36dbff 74.7%);
  border-radius: 10px;
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-weight: 700;
  font-size: 16px;
  color: #fff;
`
const NftAddress = styled(Flex)`
  align-items: center;
  margin-top: 20px;
`
const NftAddressBox = styled.div`
  &:not(:last-child) {
    margin-right: 70px;
  }
`
const BoxTitle = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  color: #ccd3ff;
`
const BoxContent = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  color: #ccd3ff;
`

const TabStarts = () => {
  const { t } = useTranslation()
  return (
    <FlexSubTabContent>
      <SubTabText>
        Came from the lost tribe which was famous for technology, Durass is a kind warrior who has a bright heart.
        However, BigPapa wants him to join the force then he trapped Durass and made Durass becomes one of BigPapa is
        strongest subordinates.
      </SubTabText>
      <NftProperties>
        <ItemLegend>
          <ItemLegendText>{t('POW')}</ItemLegendText>
          <FlexLegendItem>
            <Image src={powImage} width="20px" height="20px" />
            <ItemLegendNumber ml="8px">99</ItemLegendNumber>
          </FlexLegendItem>
        </ItemLegend>
        <ItemLegend>
          <ItemLegendText>{t('SHO')}</ItemLegendText>
          <FlexLegendItem>
            <Image src={shoImage} width="20px" height="20px" />
            <ItemLegendNumber ml="8px">99</ItemLegendNumber>
          </FlexLegendItem>
        </ItemLegend>
        <ItemLegend>
          <ItemLegendText>{t('SPE')}</ItemLegendText>
          <FlexLegendItem>
            <Image src={speImage} width="20px" height="20px" />
            <ItemLegendNumber ml="8px">99</ItemLegendNumber>
          </FlexLegendItem>
        </ItemLegend>
        <ItemLegend>
          <ItemLegendText>{t('JMP')}</ItemLegendText>
          <FlexLegendItem>
            <Image src={jmpImage} width="20px" height="20px" />
            <ItemLegendNumber ml="8px">99</ItemLegendNumber>
          </FlexLegendItem>
        </ItemLegend>
      </NftProperties>
    </FlexSubTabContent>
  )
}
const NftDetail = () => {
  // const { t } = useTranslation()
  const tabsInfo = [
    {
      title: 'Stats',
      content: <TabStarts />,
      view: 0,
    },
    {
      title: '7 days',
      content: <TabStarts />,
      view: 1,
    },
    {
      title: '30 days',
      content: <TabStarts />,
      view: 2,
    },
  ]
  return (
    <>
      <StyledFlexWrapper>
        <StyledFlexContent>
          <StyledContent>
            <Container>
              <Row>
                <Col2>
                  <NftAvatar>
                    <img src="/images/nfts/cr7.png" alt="cr7" />
                  </NftAvatar>
                </Col2>
                <Col2>
                  <NftTitle>Ronaldo</NftTitle>
                  <NftInfo>
                    <NftInfoItem>
                      <NftInfoIcon>
                        <Image src="/images/rate-icon.png" width="27px" height="21px" />
                      </NftInfoIcon>
                      <NftInfoContent>
                        <SpanText>Hero Ratity</SpanText>
                        <SpanCount>RARE</SpanCount>
                      </NftInfoContent>
                    </NftInfoItem>
                    <NftInfoItem>
                      <NftInfoIcon>
                        <Image src="/images/level-icon.png" width="25px" height="19px" />
                      </NftInfoIcon>
                      <NftInfoContent>
                        <SpanText>Level</SpanText>
                        <SpanCount>3</SpanCount>
                      </NftInfoContent>
                    </NftInfoItem>
                  </NftInfo>
                  <NftInfoPrice>
                    <NftPrice>
                      <MainPrice>
                        <Image src={coin2xImage} width="24px" height="24px" />
                        <TextPrice>10000 SOT</TextPrice>
                      </MainPrice>
                      <SubPrice>(~ 2.45 BUSD)</SubPrice>
                    </NftPrice>
                    <BuyButton>BUY</BuyButton>
                  </NftInfoPrice>
                  <NftAddress>
                    <NftAddressBox>
                      <BoxTitle>ID:</BoxTitle>
                      <BoxContent>#214235325235</BoxContent>
                    </NftAddressBox>
                    <NftAddressBox>
                      <BoxTitle>Owner</BoxTitle>
                      <BoxContent style={{ color: '#0089B4' }}>0xd009d8...99594bc4</BoxContent>
                    </NftAddressBox>
                  </NftAddress>
                </Col2>
              </Row>
            </Container>
          </StyledContent>
          <TabsComponent tabsInfo={tabsInfo} />
        </StyledFlexContent>
      </StyledFlexWrapper>
    </>
  )
}

export default NftDetail
