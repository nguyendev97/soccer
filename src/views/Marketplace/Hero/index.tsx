import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'
import MarketItem from '../components/MarketItem'
import { avtImage } from '../images'

const StyledFlexWrapper = styled(Flex)`
  width: 100%;
`
const StyledFlexContent = styled(Flex)`
  width: 100%;
  flex-direction: column;
`
const Hero = () => {
  return (
    <>
      <StyledFlexWrapper>
        <StyledFlexContent>
          <MarketItem
            avatar={avtImage}
            code="#434343"
            ratity="Legend"
            level="Level 8"
            pow="99"
            sho="99"
            spe="99"
            jmp="99"
            price="513.436"
          />
          <MarketItem
            avatar={avtImage}
            code="#434343"
            ratity="Legend"
            level="Level 8"
            pow="99"
            sho="99"
            spe="99"
            jmp="99"
            price="513.436"
          />
          <MarketItem
            avatar={avtImage}
            code="#434343"
            ratity="Legend"
            level="Level 8"
            pow="99"
            sho="99"
            spe="99"
            jmp="99"
            price="513.436"
          />
          <MarketItem
            avatar={avtImage}
            code="#434343"
            ratity="Legend"
            level="Level 8"
            pow="99"
            sho="99"
            spe="99"
            jmp="99"
            price="513.436"
          />
          <MarketItem
            avatar={avtImage}
            code="#434343"
            ratity="Legend"
            level="Level 8"
            pow="99"
            sho="99"
            spe="99"
            jmp="99"
            price="513.436"
          />
        </StyledFlexContent>
      </StyledFlexWrapper>
    </>
  )
}

export default Hero
