import styled from 'styled-components'
import { Flex, Heading } from '@pancakeswap/uikit'
import ReferralItem from '../components/ReferralItem'

const StyledFlexWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
`
const ChildrenContent = styled.div`
  width: 100%;
  margin-top: 30px;
`
const StyledHeading = styled(Heading)`
  font-weight: 600;
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
`
const Histories = () => {
  return (
    <>
      <StyledFlexWrapper>
        <ReferralItem isChildren={false} level={1} totalRef={2} backgroundColor="#1D018D" />
        <ChildrenContent>
          <StyledHeading>History rewards</StyledHeading>
          <ReferralItem isChildren historyDate="Today" totalRef={2} backgroundColor="#160461" />
          <ReferralItem isChildren historyDate="Yesterday" totalRef={2} backgroundColor="transparent" />
          <ReferralItem isChildren historyDate="2 days ago" totalRef={2} backgroundColor="#160461" />
          <ReferralItem isChildren historyDate="3 days ago" totalRef={2} backgroundColor="transparent" />
          <ReferralItem isChildren historyDate="4 days ago" totalRef={2} backgroundColor="#160461" />
        </ChildrenContent>
      </StyledFlexWrapper>
    </>
  )
}

export default Histories
