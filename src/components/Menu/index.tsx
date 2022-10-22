import { useMemo } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Link from 'next/link'
import { NextLinkFromReactRouter } from 'components/NextLink'
import GradientButton from 'components/GradientButton'
import { Menu as UikitMenu, useModal, Flex, Text } from '@pancakeswap/uikit'
import { useTranslation, languageList } from '@pancakeswap/localization'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import { useAccount } from 'wagmi'
// import { NetworkSwitcher } from 'components/NetworkSwitcher'
import useTheme from 'hooks/useTheme'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import UserMenu from './UserMenu'
import { useMenuItems } from './hooks/useMenuItems'
// import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'
import RegisterModal from './UserMenu/RegisterModal'
// import { SettingsMode } from './GlobalSettings/types'

export const ProfileList = styled.div`
  position: relative;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`
export const AccountInfo = styled(Flex)`
  position: relative;
  margin-bottom: 15px;
`
export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  background: url('/images/user-avatar.png') no-repeat center center;
  margin-right: 15px;
`
export const ProfileMenu = styled.ul`
  list-style: none;
`
const MenuItem = styled.li`
  position: relative;
  margin-bottom: 15px;

  a {
    display: block;
    height: 100%;
    color: #36dbff;
    font-weight: 400;
    font-size: 16px;
  }
`
const Menu = (props) => {
  const { isMobile } = useMatchBreakpoints()
  const { isDark, setTheme } = useTheme()
  const cakePriceUsd = useCakeBusdPrice({ forceMainnet: true })
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useRouter()
  const { address: account } = useAccount()

  const menuItems = useMenuItems()
  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })
  const [onPresentRegisterModal] = useModal(<RegisterModal />)
  const accountEllipsis = account ? `${account.substring(0, 12)}...${account.substring(account.length - 4)}` : null
  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  const getFooterLinks = useMemo(() => {
    return footerLinks(t)
  }, [t])
  return (
    <>
      <UikitMenu
        linkComponent={(linkProps) => {
          return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
        }}
        rightSide={
          <Flex flexDirection="column" width={isMobile ? '100%' : 'auto'}>
            <Flex
              width="100%"
              flexDirection={!account ? 'row-reverse' : 'row'}
              justifyContent={isMobile ? 'flex-end' : 'flex-start'}
              mt={isMobile ? '20px' : '0px'}
            >
              <GradientButton
                style={{ fontSize: '16px', fontWeight: 700, marginLeft: isMobile ? 0 : '20px' }}
                onClick={() => onPresentRegisterModal()}
              >
                Play game
              </GradientButton>
              {!isMobile && <UserMenu />}
            </Flex>
            {account && isMobile && (
              <ProfileList>
                <AccountInfo>
                  <Avatar />
                  <Text>{accountEllipsis}</Text>
                </AccountInfo>
                <ProfileMenu>
                  <MenuItem>
                    <Link href={`/profile/${account.toLowerCase()}/inventory`}>{t('Inventory')}</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href={`/profile/${account.toLowerCase()}/account`}>{t('Account')}</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href={`/profile/${account.toLowerCase()}/peoples`}>{t('Peoples')}</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href={`/profile/${account.toLowerCase()}/histories`}>{t('Histories')}</Link>
                  </MenuItem>
                </ProfileMenu>
              </ProfileList>
            )}
          </Flex>
        }
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        cakePriceUsd={cakePriceUsd}
        links={menuItems}
        subLinks={activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
        footerLinks={getFooterLinks}
        activeItem={activeMenuItem?.href}
        activeSubItem={activeSubMenuItem?.href}
        buyCakeLabel={t('Buy CAKE')}
        {...props}
      />
    </>
  )
}

export default Menu
