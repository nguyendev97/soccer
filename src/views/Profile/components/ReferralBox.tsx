import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Text, Flex } from '@pancakeswap/uikit'
import CopyAddress from 'components/Menu/UserMenu/CopyAddress'
import { useRefferalContract, useCommContract } from 'hooks/useContract'

const notRegisteredyet = '0x0000000000000000000000000000000000000000'

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

// const specialAddressMockup = '0xB3308aC93252caA618BC87d97c8dCd7bbb0fccb4'

const ReferralBox: React.FC<React.PropsWithChildren<Props>> = ({ accountAddress }) => {
  const [isSpecialTree, setIsSpecialTree] = useState(false)
  const [refferBy, setRefferBy] = useState('')
  const refferalContract = useRefferalContract()
  const commContract = useCommContract()

  useEffect(() => {
    if (accountAddress) {
      refferalContract.userInfos(accountAddress).then((res) => {
        setRefferBy(res.refferBy)
      })
      Promise.all([commContract.specials(accountAddress), commContract.specials2(accountAddress)]).then((res) => {
        setIsSpecialTree(res[0] || res[1])
      })
    }
  }, [accountAddress, refferalContract, commContract])
  return (
    <WrapperRefferal>
      {notRegisteredyet !== refferBy && refferBy !== '' && (
        <RefferalRow style={{ marginBottom: '24px' }}>
          <RefferalHeading>Referred by</RefferalHeading>
          <CopyAddress account={refferBy} />
        </RefferalRow>
      )}
      <RefferalRow>
        <RefferalHeading>My Refferal Link</RefferalHeading>
        <CopyAddress account={`${window.location.origin}?ref=${accountAddress}`} />
      </RefferalRow>
      <RefferalDetails mt="24px" flexDirection="column" p="8px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="white">You will get</Text>
          <Text color="#36DBFF" bold fontSize="20px">
            100%
          </Text>
        </Flex>
        <Text>Buy box: {isSpecialTree ? '35' : '25'}%</Text>
        <Text>PvE: 25%</Text>
        <Text>Normal level: {isSpecialTree ? '7' : '4'} levels</Text>
      </RefferalDetails>
    </WrapperRefferal>
  )
}

export default ReferralBox
