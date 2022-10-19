import styled from 'styled-components'
import Link from 'next/link'
import { useModal, Heading } from '@pancakeswap/uikit'
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
`
const MenuItem = styled.li`
  position: relative;
`
const WrapperRefferal = styled.div`
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
`
const RefferalRow = styled.div`
  position: relative;
`

export interface Props {
  accountAddress?: string
}

const ProfileSidebar: React.FC<React.PropsWithChildren<Props>> = ({ accountAddress }) => {
  const { t } = useTranslation()
  return (
    <StyledProfileSidebar>
      <WrapperMenuItems>
        <MenuItem>
          <Link href={`/profile/${accountAddress.toLowerCase()}/inventory`}>{t('Inventory')}</Link>
        </MenuItem>
        <MenuItem>
          <Link href={`/profile/${accountAddress.toLowerCase()}/account`}>{t('Account')}</Link>
        </MenuItem>
        <MenuItem>
          <Link href={`/profile/${accountAddress.toLowerCase()}/peoples`}>{t('Peoples')}</Link>
        </MenuItem>
        <MenuItem>
          <Link href={`/profile/${accountAddress.toLowerCase()}/histories`}>{t('Histories')}</Link>
        </MenuItem>
      </WrapperMenuItems>
      <WrapperRefferal>
        <RefferalRow>
          <Heading>My Refferal ID</Heading>
          <CopyAddress account={accountAddress} />
        </RefferalRow>
        <RefferalRow>
          <Heading>My Refferal Link</Heading>
          <CopyAddress account={accountAddress} />
        </RefferalRow>
      </WrapperRefferal>
    </StyledProfileSidebar>
  )
}

export default ProfileSidebar
