import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'

const StyledFlexWrapper = styled(Flex)`
  margin-bottom: -40px;
  padding-bottom: 40px;
`
const Hero = () => {
  return (
    <>
      <StyledFlexWrapper>
        <span>Hero view</span>
      </StyledFlexWrapper>
    </>
  )
}

export default Hero
