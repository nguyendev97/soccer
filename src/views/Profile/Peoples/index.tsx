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
  @media (max-width: 767px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`
const Peoples = () => {
  return (
    <>
      <StyledFlexWrapper>
        <ReferralItem isChildren={false} level={0} totalRef={2} backgroundColor="#1D018D" />
        <ChildrenContent>
          <StyledHeading>Referral income of 5 children</StyledHeading>
          <ReferralItem isChildren level={0} totalRef={2} backgroundColor="#160461" />
          <ReferralItem isChildren level={0} totalRef={2} backgroundColor="transparent" />
          <ReferralItem isChildren level={0} totalRef={2} backgroundColor="#160461" />
          <ReferralItem isChildren level={0} totalRef={2} backgroundColor="transparent" />
          <ReferralItem isChildren level={0} totalRef={2} backgroundColor="#160461" />
        </ChildrenContent>
      </StyledFlexWrapper>
    </>
  )
}

export default Peoples
