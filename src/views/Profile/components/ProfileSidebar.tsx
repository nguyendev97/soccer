import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from '@pancakeswap/localization'
import ReferralBox from './ReferralBox'

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
  margin-bottom: 4px;
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

export interface Props {
  accountAddress?: string
}

const getActiveIndex = (pathname: string, url?: string): boolean => {
  if (pathname.includes(url)) {
    return true
  }
  return false
}

// const specialAddressMockup = '0xB3308aC93252caA618BC87d97c8dCd7bbb0fccb4'

const ProfileSidebar: React.FC<React.PropsWithChildren<Props>> = ({ accountAddress }) => {
  const { t } = useTranslation()
  const { pathname } = useRouter()
  return (
    <StyledProfileSidebar>
      <WrapperMenuItems>
        <MenuItem icon="inventory" active={getActiveIndex(pathname, '/inventory')}>
          <Link href={`/profile/${accountAddress.toLowerCase()}/inventory`}>{t('Inventory')}</Link>
        </MenuItem>
        <MenuItem icon="peoples" active={getActiveIndex(pathname, '/people')}>
          <Link href={`/profile/${accountAddress.toLowerCase()}/people`}>{t('People')}</Link>
        </MenuItem>
        <MenuItem icon="histories" active={getActiveIndex(pathname, '/histories')}>
          {/* <Link href={`/profile/${accountAddress.toLowerCase()}/histories`}>{t('Histories')}</Link> */}
          <Link href={`/profile/${accountAddress.toLowerCase()}/inventory`}>{t('Histories (coming)')}</Link>
        </MenuItem>
      </WrapperMenuItems>
      <ReferralBox accountAddress={accountAddress} />
    </StyledProfileSidebar>
  )
}

export default ProfileSidebar
