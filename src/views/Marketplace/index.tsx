import { useState } from 'react'
import styled from 'styled-components'
import { ButtonMenu, Button, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import SoccerBox from './SoccerBox'
import Hero from './Hero'
import Equipment from './Equipment'
import OptionsFilter from './components/Filters/OptionsFilter'

export enum MarketView {
  SOCCER_BOX,
  HERO,
  EQUIPMENT,
  WRONG_NETWORK,
}

const BannerSoccer = styled.div`
  padding-top: 30px;
  padding-bottom: 90px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt3};
`
const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt3};
  width: 1200px;
  margin: auto;
  padding: 0px 15px;
  margin-bottom: 50px;
`
const TabsWrapper = styled(ButtonMenu)`
  display: block;
  background-color: transparent;
  border: 0;
  border-radius: 0;
`
const TabsButton = styled(Button)<{ isActive: boolean }>`
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.buttonSecondaryActive : theme.colors.buttonSecondary};
  border-radius: 10px;
  padding: 10px 20px;
  height: 48px;
  width: 200px;
`
export const Container = styled.div`
  width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
  @media (max-width: 992px) {
    width: 100%;
  }
`
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
`
export const SideBar = styled.div`
  padding-left: 15px;
  width: calc(100% / 4);
`
export const Content = styled.div`
  padding: 0px 15px;
  width: calc(100% - 100% / 4);
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
      <TabsWrapper scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
        <TabsButton isActive={view === MarketView.SOCCER_BOX} style={{ marginRight: '20px' }}>
          {t('Soccer box')}
        </TabsButton>
        <TabsButton isActive={view === MarketView.HERO} style={{ marginRight: '20px' }}>
          {t('Hero')}
        </TabsButton>
        <TabsButton isActive={view === MarketView.EQUIPMENT}>{t('Equipment')}</TabsButton>
      </TabsWrapper>
    </Tabs>
  )

  return (
    <BannerSoccer>
      {view !== MarketView.WRONG_NETWORK && <TabsComponent />}
      <Container>
        <Row>
          <SideBar>
            <OptionsFilter />
          </SideBar>
          <Content>
            {view === MarketView.SOCCER_BOX && <SoccerBox />}
            {view === MarketView.HERO && <Hero />}
            {view === MarketView.EQUIPMENT && <Equipment />}
          </Content>
        </Row>
      </Container>
    </BannerSoccer>
  )
}
