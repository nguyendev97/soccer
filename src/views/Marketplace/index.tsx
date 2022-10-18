import { useState } from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Page from '../Page'
import SoccerBox from './SoccerBox'
import Hero from './Hero'
import Equipment from './Equipment'

export enum MarketView {
  SOCCER_BOX,
  HERO,
  EQUIPMENT,
  WRONG_NETWORK,
}

const StyledMarketPage = styled.div`
  width: 1148px;
  padding: 16px;
`

const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 24px;
`

export default function Marketplace() {
  const initialView = MarketView.SOCCER_BOX
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()

  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }

  const TabsComponent = () => (
    <Tabs>
      <ButtonMenu scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
        <ButtonMenuItem>{t('Soccer box')}</ButtonMenuItem>
        <ButtonMenuItem>{t('Hero')}</ButtonMenuItem>
        <ButtonMenuItem>{t('Equipment')}</ButtonMenuItem>
      </ButtonMenu>
    </Tabs>
  )

  return (
    <Page>
      <StyledMarketPage>
        {view !== MarketView.WRONG_NETWORK && <TabsComponent />}
        <Flex>
          {view === MarketView.SOCCER_BOX && <SoccerBox />}
          {view === MarketView.HERO && <Hero />}
          {view === MarketView.EQUIPMENT && <Equipment />}
        </Flex>
      </StyledMarketPage>
    </Page>
  )
}
