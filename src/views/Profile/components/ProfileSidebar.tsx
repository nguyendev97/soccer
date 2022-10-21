import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useModal, Text } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import CopyAddress from 'components/Menu/UserMenu/CopyAddress'

const StyledProfileSidebar = styled.div`
  position: relative;
  padding: 20px;
  background: linear-gradient(349.42deg, #1d018d 15.74%, rgba(29, 9, 107, 0) 124.9%);
  border-radius: 10px;
`
const WrapperMenuItems = styled.ul`
  position: relative;
  list-style: none;
  margin-bottom: 30px;
`
const MenuItem = styled.li<{ icon?: string; active?: boolean }>`
  padding-left: 35px;
  height: 56px;
  border-radius: 10px;
  background: url('/images/${({ icon, active }) => `${icon}${active ? '-active' : ''}`}.svg') no-repeat left 15px center;
  background-color: ${({ active }) => (active ? '#0A4DB6' : 'transparent')};
  fill: blue;

  &:hover {
    background: url('/images/${({ icon }) => `${icon}-active`}.svg') no-repeat left 15px center;
    background-color: #0a4db6;
  }

  a {
    display: block;
    height: 100%;
    line-height: 56px;
    color: #fff;
    font-weight: 700;
    font-size: 16px;
    padding-left: 15px;
  }
`
const WrapperRefferal = styled.div`
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
`
const RefferalRow = styled.div`
  position: relative;
`
const RefferalHeading = styled(Text)`
  font-weight: 500;
  font-size: 14px;
  color: #ccd3ff;
  margin-bottom: 8px;
`

export interface Props {
  accountAddress?: string
}

const getActiveIndex = (pathname: string, url?: string): boolean => {
  if (pathname.includes(url)) {
    return true
  }
  return false
}

const ProfileSidebar: React.FC<React.PropsWithChildren<Props>> = ({ accountAddress }) => {
  const { t } = useTranslation()
  const { pathname } = useRouter()
  console.log('pathname ==>', pathname)
  return (
    <StyledProfileSidebar>
      <WrapperMenuItems>
        <MenuItem icon="inventory" active={getActiveIndex(pathname, '/inventory')}>
          <Link href={`/profile/${accountAddress.toLowerCase()}/inventory`}>{t('Inventory')}</Link>
        </MenuItem>
        <MenuItem icon="account" active={getActiveIndex(pathname, '/account')}>
          <Link href={`/profile/${accountAddress.toLowerCase()}/account`}>{t('Account')}</Link>
        </MenuItem>
        <MenuItem icon="peoples" active={getActiveIndex(pathname, '/peoples')}>
          <Link href={`/profile/${accountAddress.toLowerCase()}/peoples`}>{t('Peoples')}</Link>
        </MenuItem>
        <MenuItem icon="histories" active={getActiveIndex(pathname, '/histories')}>
          <Link href={`/profile/${accountAddress.toLowerCase()}/histories`}>{t('Histories')}</Link>
        </MenuItem>
      </WrapperMenuItems>
      <WrapperRefferal>
        {/* <RefferalRow style={{ marginBottom: '24px' }}>
          <RefferalHeading>My Refferal ID</RefferalHeading>
          <CopyAddress account={accountAddress} />
        </RefferalRow> */}
        <RefferalRow>
          <RefferalHeading>My Refferal Link</RefferalHeading>
          <CopyAddress account={`${window.location.origin}?ref=${accountAddress}`} />
        </RefferalRow>
      </WrapperRefferal>
    </StyledProfileSidebar>
  )
}

export default ProfileSidebar
