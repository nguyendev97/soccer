import styled from 'styled-components'
import { useState } from 'react'
import { BoxProps, ButtonMenu, Button } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const TabsWrapper = styled.div`
  position: relative;
  width: 1092px;
  margin: auto;
  padding: 0px 15px;
  margin-top: 30px;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    width: 100%;
  }
`
const TabsBody = styled.div`
  background-color: #160461;
  border-radius: 10px;
  padding: 30px;
`
const TabsHeader = styled(ButtonMenu)`
  display: block;
  background-color: transparent;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 40px;
`
const TabsContent = styled.div`
  display: block;
`
const TabsButton = styled(Button)<{ isActive: boolean }>`
  position: relative;
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? '#fff' : '#9197BA')};
  padding: 0;
  height: 30px;
  padding-bottom: 12px;
  font-weight: 500;
  font-size: 16px;

  &:not(:last-child) {
    margin-right: 60px;
  }

  &:after {
    content: '';
    position: absolute;
    width: 30px;
    height: 4px;
    background-color: #36dbff;
    bottom: -1px;
    left: 0;
    border-radius: 20px;
    display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  }

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`

interface ItemProps extends BoxProps {
  tabsInfo?: Array<{ title: string; content: any; view: number }>
}

const TabsComponent: React.FC<React.PropsWithChildren<ItemProps>> = ({ tabsInfo, ...props }) => {
  const { t } = useTranslation()
  const initialView = tabsInfo.length > 0 ? tabsInfo[0].view : 0
  const [view, setView] = useState(initialView)
  const handleClick = (newIndex: number) => {
    setView(newIndex)
  }
  return (
    <TabsWrapper {...props}>
      <TabsBody>
        <TabsHeader scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
          {tabsInfo.length > 0 &&
            tabsInfo.map((item) => <TabsButton isActive={view === item.view}>{t(item.title)}</TabsButton>)}
        </TabsHeader>
        <TabsContent>{tabsInfo.length > 0 && tabsInfo[view].content}</TabsContent>
      </TabsBody>
    </TabsWrapper>
  )
}

export default TabsComponent
