import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { ButtonMenu, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import SelectTabs, { OptionProps } from 'components/SelectTabs/SelectTabs'
import SoccerBox from './SoccerBox'
import Players from './Players'
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
  width: 1310px;
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
  width: 1310px;
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
  @media (max-width: 767px) {
    width: 100%;
    padding-right: 15px;
    margin-bottom: 15px;
  }
`
export const Content = styled.div`
  padding: 0px 15px;
  width: calc(100% - 100% / 4);
  @media (max-width: 767px) {
    width: 100%;
  }
`
export const WrapperSelect = styled.div`
  margin-bottom: 15px;
`
export default function Marketplace() {
  const { isMobile } = useMatchBreakpoints()
  const initialView = MarketView.SOCCER_BOX
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()

  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }

  const handleTypeOptionChange = useCallback((option: OptionProps) => setView(option.value), [])

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
      {isMobile ? (
        <WrapperSelect>
          <SelectTabs
            options={[
              {
                label: t('Soccer box'),
                value: 0,
              },
              {
                label: t('Hero'),
                value: 1,
              },
              {
                label: t('Equipment'),
                value: 2,
              },
            ]}
            onOptionChange={handleTypeOptionChange}
            defaultOptionIndex={initialView}
          />
        </WrapperSelect>
      ) : (
        <TabsComponent />
      )}
      <Container>
        <Row>
          <SideBar>
            <OptionsFilter />
          </SideBar>
          <Content>
            {view === MarketView.SOCCER_BOX && <SoccerBox />}
            {view === MarketView.HERO && <Players />}
            {view === MarketView.EQUIPMENT && <Equipment />}
          </Content>
        </Row>
      </Container>
    </BannerSoccer>
  )
}
