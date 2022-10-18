import styled from 'styled-components'
import { Flex, Heading } from '@pancakeswap/uikit'
import { soccerBoxImage } from '../images'

const StyledFlexWrapper = styled(Flex)`
  width: 100%;
`
const SoccerBox = () => {
  return (
    <>
      <StyledFlexWrapper>
        <Heading>
          Soccer box contains various Heroes with certain drop rates.
          <br />
          Special box and limited quantity.
        </Heading>
      </StyledFlexWrapper>
    </>
  )
}

export default SoccerBox
