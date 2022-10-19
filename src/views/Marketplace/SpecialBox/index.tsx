import styled from 'styled-components'
import { Flex, Heading, Text } from '@pancakeswap/uikit'
import GradientButton from 'components/GradientButton'
import CountDown from 'components/CountDown'
import Image from 'next/image'
import { specialSellBoxImage, borderImage, busdImage } from '../images'

const StyledFlexWrapper = styled.div`
  width: 100%;
`

const StyledSoccerBox = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background: linear-gradient(164.38deg, rgb(29 1 141 / 70%) 10.92%, rgba(29, 9, 107, 0) 134.72%);
  border-radius: 10px;
  max-width: 900px;
  margin: auto;
  margin-top: 30px;
`

const HeadingBorder = styled(Heading)<{ src: string }>`
  font-weight: 700;
  font-size: 36px;
  color: #fff;
  text-transform: uppercase;
  display: inline-block;
  padding-left: 150px;
  padding-right: 150px;
  padding-bottom: 30px;
  background-image: url('${({ src }) => src}');
  background-position: center bottom;
  background-repeat: no-repeat;
`

const TextInfo = styled(Text)`
  border: 1.5px solid #0a4db6;
  border-radius: 6px;
  font-size: 16px;
  padding: 10px;
  font-weight: 600;
  display: flex;
  align-items: baseline;
  color: #ccd3ff;
`
const TextCount = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  color: #ccd3ff;
  margin-left: 10px;
`

const SpecialBox = () => {
  return (
    <>
      <StyledFlexWrapper>
        <Heading textAlign="center" fontWeight="500" style={{ color: '#fff', fontSize: '26px' }}>
          Soccer box contains various Heroes with certain drop rates.
        </Heading>
        <StyledSoccerBox>
          <HeadingBorder src={borderImage?.src}>Special box</HeadingBorder>
          <CountDown date="2022/11/30" />
          <Image src={specialSellBoxImage} alt="Box" className="box-image" />
          <Flex style={{ marginTop: '20px', marginBottom: '30px' }}>
            <TextInfo style={{ marginRight: '20px' }}>
              Amount: <TextCount>1000</TextCount>
            </TextInfo>
            <TextInfo>
              Remain: <TextCount>596</TextCount>
            </TextInfo>
          </Flex>
          <GradientButton style={{ fontSize: '16px', fontWeight: 700 }}>
            <Flex style={{ alignItems: 'center' }}>
              <Image src={busdImage} width="26px" />
              <Text bold fontSize="20px" color="#fff" style={{ marginLeft: '10px' }}>
                500 BUSD
              </Text>
            </Flex>
          </GradientButton>
        </StyledSoccerBox>
      </StyledFlexWrapper>
    </>
  )
}

export default SpecialBox
