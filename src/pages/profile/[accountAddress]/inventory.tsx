import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { ButtonMenu, Button, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import SelectTabs, { OptionProps } from 'components/SelectTabs/SelectTabs'
import { NftProfileLayout } from 'views/Profile'
import SoccerBox from 'views/Marketplace/SoccerBox'
import Hero from 'views/Marketplace/Hero'
import Equipment from 'views/Marketplace/Equipment'

export enum MarketView {
  SOCCER_BOX,
  HERO,
  EQUIPMENT,
  WRONG_NETWORK,
}

const BannerSoccer = styled.div`
  padding-bottom: 90px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt3};
`
const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt3};
  width: 100%;
  padding: 0;
  margin-bottom: 30px;
`
const StyledTabContent = styled(Flex)<{ isSoccerPage: boolean }>`
  width: 100%;
  margin: auto;
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
  font-size: 16px;
`
export const WrapperSelect = styled.div`
  padding: 0px 15px;
  margin-bottom: 15px;
`

const NftProfileInventory = () => {
  const { isMobile } = useMatchBreakpoints()
  const initialView = MarketView.SOCCER_BOX
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()

  const handleTypeOptionChange = useCallback((option: OptionProps) => setView(option.value), [])
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
          {t('Kickers')}
        </TabsButton>
        <TabsButton isActive={view === MarketView.HERO}>{t('Equipment (Coming)')}</TabsButton>
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
                label: t('Kickers'),
                value: 1,
              },
              {
                label: t('Equipment (Coming)'),
                value: 1,
              },
            ]}
            onOptionChange={handleTypeOptionChange}
            defaultOptionIndex={initialView}
          />
        </WrapperSelect>
      ) : (
        <TabsComponent />
      )}
      <StyledTabContent isSoccerPage={view === MarketView.SOCCER_BOX}>
        {view === MarketView.SOCCER_BOX && <SoccerBox />}
        {view === MarketView.HERO && <Hero />}
        {view === MarketView.EQUIPMENT && <Equipment />}
      </StyledTabContent>
    </BannerSoccer>
  )
}

NftProfileInventory.Layout = NftProfileLayout

export default NftProfileInventory
