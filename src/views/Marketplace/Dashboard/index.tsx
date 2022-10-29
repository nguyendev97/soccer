import styled from 'styled-components'
import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useTranslation } from '@pancakeswap/localization'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import { Flex, Heading, ButtonMenu, Button } from '@pancakeswap/uikit'
import SelectTabs, { OptionProps } from 'components/SelectTabs/SelectTabs'
import SwiperBanner from '../components/Banners/SwiperBanner'
import TabsComponent from '../components/TabsComponent'
import Pagination from '../components/Pagination'
import Heroes from '../Heroes'

export enum RecentlyView {
  HEROES,
  EQUIPMENT,
  LIMIT,
}
const StyledFlexWrapper = styled(Flex)`
  width: 100%;
  margin-top: 63px;
  background-color: #130355;
  @media (max-width: 768px) {
    margin-top: 27px;
  }
`
const StyledFlexContent = styled(Flex)`
  width: 100%;
  flex-direction: column;
`
const StyledContent = styled.div`
  width: 1092px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const StyledHeading = styled(Heading)`
  width: 100%;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 20px;
  color: #fff;
`
export const Container = styled.div`
  width: 100%;
  padding: 0px 15px;
`
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0px -12px;
`
const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundAlt3};
  margin-bottom: 30px;
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
  height: 40px;
  width: 160px;
`
const ReadMoreButton = styled(Button)`
  padding: 8px 48px;
  background-color: transparent;
  height: 40px;
  font-weight: 400;
  font-size: 16px;
  color: #ccd3ff;
  border-radius: 8px;
  border: 0.5px solid #ccd3ff;
  margin-bottom: 60px;

  &:hover {
    background-color: #1d018d;
    border-color: #1d018d;
    color: #fff;
  }
`
const FlexSubTabContent = styled(Flex)`
  background-color: transparent;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
const SubTabItem = styled(Flex)`
  background-color: transparent;

  &:not(:last-child) {
    margin-right: 140px;
  }

  @media (max-width: 768px) {
    &:not(:last-child) {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
`
const SubTabIcon = styled(Flex)`
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  width: 64px;
  height: 64px;
  background: #2400ae;
  border-radius: 10px;
`
const SubTabContent = styled(Flex)`
  flex-direction: column;
  justify-content: space-between;
`
const SpanText = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #ccd3ff;
`
const SpanCount = styled.span`
  font-weight: 600;
  font-size: 32px;
  color: #fff;
`
export const WrapperSelect = styled.div`
  margin-bottom: 15px;
`
export const FlexPagination = styled(Flex)`
  justify-content: 'center';
  margin-top: 40px;
  margin-bottom: 50px;
`

const TabLast24h = () => {
  return (
    <FlexSubTabContent>
      <SubTabItem>
        <SubTabIcon>
          <Image src="/images/listed-icon.png" width="36px" height="28px" />
        </SubTabIcon>
        <SubTabContent>
          <SpanText>Total Listed</SpanText>
          <SpanCount>400</SpanCount>
        </SubTabContent>
      </SubTabItem>
      <SubTabItem>
        <SubTabIcon>
          <Image src="/images/transaction-icon.png" width="37px" height="37px" />
        </SubTabIcon>
        <SubTabContent>
          <SpanText>Transaction Volume</SpanText>
          <SpanCount>5.465</SpanCount>
        </SubTabContent>
      </SubTabItem>
      <SubTabItem>
        <SubTabIcon>
          <Image src="/images/price-up-icon.png" width="40px" height="40px" />
        </SubTabIcon>
        <SubTabContent>
          <SpanText>Items Traded</SpanText>
          <SpanCount>3.657</SpanCount>
        </SubTabContent>
      </SubTabItem>
    </FlexSubTabContent>
  )
}
const Dashboard = () => {
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const initialView = RecentlyView.HEROES
  const [view, setView] = useState(initialView)
  const banners = [
    { url: '/images/banners/banner1.jpg' },
    { url: '/images/banners/banner1.jpg' },
    { url: '/images/banners/banner1.jpg' },
  ]
  const tabsInfo = [
    {
      title: 'Last 24h',
      content: <TabLast24h />,
      view: 0,
    },
    {
      title: '7 days',
      content: <TabLast24h />,
      view: 1,
    },
    {
      title: '30 days',
      content: <TabLast24h />,
      view: 2,
    },
    {
      title: 'All',
      content: <TabLast24h />,
      view: 3,
    },
  ]
  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }
  const handleTypeOptionChange = useCallback((option: OptionProps) => setView(option.value), [])

  const TabsRecentlyView = () => (
    <Tabs>
      <TabsWrapper scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
        <TabsButton isActive={view === RecentlyView.HEROES} style={{ marginRight: '20px' }}>
          {t('Heroes')}
        </TabsButton>
        <TabsButton isActive={view === RecentlyView.EQUIPMENT} style={{ marginRight: '20px' }}>
          {t('Equipments')}
        </TabsButton>
        <TabsButton isActive={view === RecentlyView.LIMIT}>{t('Limit')}</TabsButton>
      </TabsWrapper>
    </Tabs>
  )
  return (
    <>
      <StyledFlexWrapper>
        <StyledFlexContent>
          <SwiperBanner banners={banners} />
          <TabsComponent tabsInfo={tabsInfo} />
          <StyledContent>
            <Container>
              <StyledHeading>Recently listed</StyledHeading>
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
                <TabsRecentlyView />
              )}
              {view === RecentlyView.HEROES && <Heroes col={5} />}
              {view === RecentlyView.EQUIPMENT && <Heading>Equipments</Heading>}
              {view === RecentlyView.LIMIT && <Heading>Limit</Heading>}
              <Flex justifyContent="center">
                <ReadMoreButton>
                  <span style={{ marginRight: '24px' }}>View more rencently listed</span>
                  <Image src="/images/arraw-right.png" width="5px" height="12px" />
                </ReadMoreButton>
              </Flex>
            </Container>
            <Container>
              <StyledHeading>Recently traded</StyledHeading>
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
                <TabsRecentlyView />
              )}
              {view === RecentlyView.HEROES && <Heroes col={5} />}
              {view === RecentlyView.EQUIPMENT && <Heading>Equipments</Heading>}
              {view === RecentlyView.LIMIT && <Heading>Limit</Heading>}
            </Container>
            <FlexPagination>
              <Pagination currentPage={1} totalPage={65} />
            </FlexPagination>
          </StyledContent>
        </StyledFlexContent>
      </StyledFlexWrapper>
    </>
  )
}

export default Dashboard
