import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { ButtonMenu, Button, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import SelectTabs, { OptionProps } from '../../../components/SelectTabs/SelectTabs'
import OptionsFilter from '../components/Filters/OptionsFilter'
import Pagination from '../components/Pagination'
import Heroes from '../Heroes'

export enum MarketView {
  HEROES,
  EQUIPMENT,
}
const StyledFlexWrapper = styled.div`
  width: 100%;
  margin-top: 63px;
  background-color: #130355;
  @media (max-width: 768px) {
    margin-top: 27px;
    padding-top: 15px;
  }
`
const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt3};
  width: 1310px;
  margin: auto;
  padding: 0px 15px;
  margin-bottom: 30px;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const TabsWrapper = styled(ButtonMenu)`
  display: block;
  background-color: transparent;
  border: 0;
  border-radius: 0;
`
const TabsButton = styled(Button)<{ icon?: string; active: boolean }>`
  background: url('/images/${({ icon, active }) => `${icon}${active ? '-active' : ''}`}.png') no-repeat left 30px center;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.buttonSecondaryActive : theme.colors.buttonSecondary};
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
  padding: 0px 15px;
  margin-bottom: 15px;
`
export const FlexPagination = styled(Flex)`
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 50px;
  @media (max-width: 767px) {
    justify-content: center;
  }
`
const Buy = () => {
  const { isMobile } = useMatchBreakpoints()
  const initialView = MarketView.HEROES
  const [view, setView] = useState(initialView)
  const { t } = useTranslation()

  const listCheck = [
    {
      key: 'Common',
      value: true,
      content: 'Common',
    },
    {
      key: 'Rare',
      value: false,
      content: 'Rare',
    },
    {
      key: 'Epic',
      value: false,
      content: 'Epic',
    },
    {
      key: 'Legend',
      value: false,
      content: 'Legend',
    },
  ]

  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }

  const handleTypeOptionChange = useCallback((option: OptionProps) => setView(option.value), [])

  const TabsComponent = () => (
    <Tabs>
      <TabsWrapper scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
        <TabsButton icon="heroes" active={view === MarketView.HEROES} style={{ marginRight: '20px' }}>
          {t('Heroes')}
        </TabsButton>
        <TabsButton icon="equipments" active={view === MarketView.EQUIPMENT}>
          {t('Equipment')}
        </TabsButton>
      </TabsWrapper>
    </Tabs>
  )

  return (
    <StyledFlexWrapper>
      {isMobile ? (
        <WrapperSelect>
          <SelectTabs
            options={[
              {
                label: t('Heroes'),
                value: 0,
              },
              {
                label: t('Equipment'),
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
      <Container>
        <Row>
          <SideBar>
            <OptionsFilter checks={listCheck} />
          </SideBar>
          <Content>
            {view === MarketView.HEROES && <Heroes col={4} />}
            {view === MarketView.EQUIPMENT && <Heroes col={4} />}
            <FlexPagination>
              <Pagination currentPage={1} totalPage={65} />
            </FlexPagination>
          </Content>
        </Row>
      </Container>
    </StyledFlexWrapper>
  )
}

export default Buy
