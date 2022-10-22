import { FC } from 'react'
import { useRouter } from 'next/router'
import { isAddress } from 'utils'
import { Flex, Text } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from '@pancakeswap/localization'
import styled from 'styled-components'
import ProfileSidebar from './components/ProfileSidebar'
import NoNftsImage from '../Nft/market/components/Activity/NoNftsImage'

const WrapperProfile = styled(Flex)`
  margin-top: 30px;
  padding-top: 35px;
  padding-bottom: 90px;
  background-color: ${({ theme }) => theme.colors.backgroundAlt3};
`
export const Container = styled.div`
  width: 1200px;
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

const NftProfile: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  const accountAddress = useRouter().query.accountAddress as string
  const { t } = useTranslation()

  const invalidAddress = !accountAddress || isAddress(accountAddress) === false

  if (invalidAddress) {
    return (
      <>
        <Page style={{ minHeight: 'auto' }}>
          <Flex p="24px" flexDirection="column" alignItems="center">
            <NoNftsImage />
            <Text textAlign="center" maxWidth="420px" pt="8px" bold>
              {t('Please enter a valid address, or connect your wallet to view your profile')}
            </Text>
          </Flex>
        </Page>
      </>
    )
  }

  return (
    <WrapperProfile>
      <Container>
        <Row>
          <SideBar>
            <ProfileSidebar accountAddress={accountAddress} />
          </SideBar>
          <Content>
            <Page style={{ minHeight: 'auto', padding: 0 }}>{children}</Page>
          </Content>
        </Row>
      </Container>
    </WrapperProfile>
  )
}

export const NftProfileLayout: FC<React.PropsWithChildren<unknown>> = ({ children }) => {
  return <NftProfile>{children}</NftProfile>
}

export default NftProfile
