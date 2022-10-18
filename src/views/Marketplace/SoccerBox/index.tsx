import styled from 'styled-components'
import { Flex, Heading, Text } from '@pancakeswap/uikit'
import GradientButton from 'components/GradientButton'
import Image from 'next/image'
import { soccerBoxImage, coinImage, backgroundSoccerImage } from '../images'

const StyledFlexWrapper = styled.div<{ src: string }>`
  width: 100%;
  background-image: url('${({ src }) => src}');
  background-color: #130355;
  background-position: center bottom;
`

const StyledSoccerBox = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background: linear-gradient(164.38deg, #1d018d 10.92%, rgba(29, 9, 107, 0) 134.72%);
  opacity: 0.7;
  border-radius: 10px;
  margin-top: 30px;
`

const HeadingBorder = styled(Heading)`
  font-weight: 700;
  font-size: 40px;
  color: #fff;
  text-transform: uppercase;
`

const SoccerBox = () => {
  console.log(backgroundSoccerImage)
  return (
    <>
      <StyledFlexWrapper src={backgroundSoccerImage?.src}>
        <Heading textAlign="center" fontWeight="500" style={{ color: '#fff', fontSize: '26px' }}>
          Soccer box contains various Heroes with certain drop rates.
        </Heading>
        <StyledSoccerBox>
          <HeadingBorder>Special box</HeadingBorder>
          <Image src={soccerBoxImage} alt="Box" className="box-image" />
          <GradientButton style={{ fontSize: '16px', fontWeight: 700, marginLeft: '20px' }}>
            <Flex>
              <Image src={coinImage} width="20px" mr="8px" />
              <Text>500 BUSD</Text>
            </Flex>
          </GradientButton>
        </StyledSoccerBox>
      </StyledFlexWrapper>
    </>
  )
}

export default SoccerBox
