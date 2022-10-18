import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'

const StyledFlexWrapper = styled(Flex)`
  margin-bottom: -40px;
  padding-bottom: 40px;
`
const SoccerBox = () => {
  return (
    <>
      <StyledFlexWrapper>
        <span>Soccer Box</span>
      </StyledFlexWrapper>
    </>
  )
}

export default SoccerBox
