import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Text, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import CopyAddress from 'components/Menu/UserMenu/CopyAddress'
import { useRefferalContract, useCommContract } from 'hooks/useContract'

const notRegisteredyet = '0x0000000000000000000000000000000000000000'

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
const WrapperRefferal = styled.div`
  padding: 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
`
const RefferalRow = styled.div`
  position: relative;
`

const RefferalDetails = styled(Flex)`
  background: rgba(0, 137, 180, 0.5);
  border-radius: 8px;
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

// const specialAddressMockup = '0xB3308aC93252caA618BC87d97c8dCd7bbb0fccb4'

const ProfileSidebar: React.FC<React.PropsWithChildren<Props>> = ({ accountAddress }) => {
  const { t } = useTranslation()
  const { pathname } = useRouter()
  const [isSpecialTree, setIsSpecialTree] = useState(false)
  const [refferBy, setRefferBy] = useState('')
  const refferalContract = useRefferalContract()
  const commContract = useCommContract()

  useEffect(() => {
    if (accountAddress) {
      refferalContract.userInfos(accountAddress).then((res) => {
        setRefferBy(res.refferBy)
      })
      Promise.all([
        commContract.specials(accountAddress),
        commContract.specials2(accountAddress)
      ]).then(res => {
        setIsSpecialTree(res[0] || res[1])
      })
    }
    
  }, [accountAddress, refferalContract, commContract])
  return (
    <StyledProfileSidebar>
      <WrapperMenuItems>
        <MenuItem icon="inventory" active={getActiveIndex(pathname, '/inventory')}>
          <Link href={`/profile/${accountAddress.toLowerCase()}/inventory`}>{t('Inventory')}</Link>
        </MenuItem>
        <MenuItem icon="peoples" active={getActiveIndex(pathname, '/peoples')}>
          {/* <Link href={`/profile/${accountAddress.toLowerCase()}/peoples`}>{t('Peoples')}</Link> */}
          <Link href={`/profile/${accountAddress.toLowerCase()}/inventory`}>{t('Peoples (coming)')}</Link>
        </MenuItem>
        <MenuItem icon="histories" active={getActiveIndex(pathname, '/histories')}>
          {/* <Link href={`/profile/${accountAddress.toLowerCase()}/histories`}>{t('Histories')}</Link> */}
          <Link href={`/profile/${accountAddress.toLowerCase()}/inventory`}>{t('Histories (coming)')}</Link>
        </MenuItem>
      </WrapperMenuItems>
      <WrapperRefferal>
        {notRegisteredyet !== refferBy && refferBy !== '' && <RefferalRow style={{ marginBottom: '24px' }}>
          <RefferalHeading>Referred by</RefferalHeading>
          <CopyAddress account={refferBy} />
        </RefferalRow>}
        <RefferalRow>
          <RefferalHeading>My Refferal Link</RefferalHeading>
          <CopyAddress account={`${window.location.origin}?ref=${accountAddress}`} />
        </RefferalRow>
        <RefferalDetails my="24px" flexDirection="column" p="8px">
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="white">You will get</Text>
            <Text color="#36DBFF" bold fontSize="20px">100%</Text>
          </Flex>
          <Text>Buy box: {isSpecialTree ? '35' : '25'}%</Text>
          <Text>PvE: {isSpecialTree ? '35' : '25'}%</Text>
          <Text>Normal level: {isSpecialTree ? '7' : '4'} levels</Text>
        </RefferalDetails>
      </WrapperRefferal>
    </StyledProfileSidebar>
  )
}

export default ProfileSidebar
