import styled from 'styled-components'
import { Flex } from '@pancakeswap/uikit'
import OptionsFilter from '../components/Filters/OptionsFilter'
import MarketItem from '../components/MarketItem'
import { avtImage } from '../images'

const StyledFlexWrapper = styled(Flex)`
  width: 100%;
`
const StyledFlexContent = styled(Flex)`
  margin-top: 20px;
  width: 100%;
  flex-direction: column;
`
const Hero = () => {
  const checkList = [
    { key: 'common', value: 'Common', content: 'Common' },
    { key: 'rate', value: 'Rare', content: 'Rare' },
    { key: 'epic', value: 'Epic', content: 'Epic' },
    { key: 'legend', value: 'Legend', content: 'Legend' },
  ]

  return (
    <>
      <StyledFlexWrapper>
        <OptionsFilter checks={checkList} />
        <StyledFlexContent>
          <MarketItem
            avatar={avtImage}
            code="#434343"
            ratity="Legend"
            level="Level 8"
            pow="99"
            sho="99"
            spe="99"
            jpm="99"
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
            jpm="99"
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
            jpm="99"
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
            jpm="99"
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
            jpm="99"
            price="513.436"
          />
        </StyledFlexContent>
      </StyledFlexWrapper>
    </>
  )
}

export default Hero
