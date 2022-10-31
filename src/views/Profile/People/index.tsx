import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Heading, Button, Text } from '@pancakeswap/uikit'
import { useRefferalContract, useCommContract } from 'hooks/useContract'
import { useWeb3React } from '@pancakeswap/wagmi'
import GradientButton from 'components/GradientButton'
import BigNumber from 'bignumber.js'
import { multicallv2 } from 'utils/multicall'
import commAbi from 'config/abi/comm.json'
import { getBalanceNumber } from 'utils/formatBalance'
import { getCommAddress } from 'utils/addressHelpers'
import { BUSD } from '@pancakeswap/tokens'
import GridPlaceholder from 'components/GridPlaceholder'
import ReferralItem from '../components/ReferralItem'

const StyledFlexWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
`
const ChildrenContent = styled.div`
  width: 100%;
  margin-top: 30px;
`
const StyledHeading = styled(Heading)`
  font-weight: 600;
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    font-size: 18px;
    margin-bottom: 16px;
  }
`
let skipMarked = []

const pageSize = 10

const People = () => {
  const { account, chainId } = useWeb3React()
  const refferalContract = useRefferalContract()
  const commContract = useCommContract()
  const [children, setChildren] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [rootRewards, setRootRewards] = useState({
    busd: 0
  })
  const [totalChildren, setTotalChildren] = useState(0)
  const [selectedAccount, setSelectedAccount] = useState(account)
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (history.length < 1 && account) {
      setHistory([account])
      setSelectedAccount(account)
    }
  }, [account, history])

  useEffect(() => {
    if (selectedAccount) {
      const skip = (page * pageSize)
      if (!skipMarked.includes(skip)) {
        skipMarked.push(skip)
        setIsLoading(true)
        refferalContract.getTotalUserByUp(selectedAccount, pageSize, skip).then( async res => {
          const cleanedChildren = res.list.map(({ user, totalRefer }) => ({
            address: user,
            totalRefer: totalRefer.toNumber()
          }))
          
          const rewardsCalls = cleanedChildren.map(({ address }) => {
            const params = [address, BUSD[chainId]?.address]
            return { address: getCommAddress(chainId), name: 'totalRewards', params }
          })
          const rewardsCallsResult = await multicallv2({
            abi: commAbi,
            calls: rewardsCalls,
            options: { requireSuccess: false },
            chainId,
          })

          commContract.totalRewards(selectedAccount, BUSD[chainId]?.address).then(resRewards => {
            setRootRewards({
              busd: getBalanceNumber(new BigNumber(resRewards._hex))
            })}
          )
          
          const newChilren = cleanedChildren.map((item, index) => ({
            ...item,
            rewards: {
              busd: getBalanceNumber(new BigNumber(rewardsCallsResult[index][0]._hex))
            }
          }))
          setChildren((prev) => [...prev, ...newChilren])
          setTotalChildren(res.totalItem.toNumber())
        }).finally(() => setIsLoading(false))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAccount, page])

  const handleViewAccount = acc => {
    setHistory(prev => [...prev, acc])
    setPage(0)
    setSelectedAccount(acc)
    setChildren([])
    skipMarked = []
  }

  const handleBack = acc => {
    setHistory(prev => prev.filter(item => item !== acc))
    setPage(0)
    setSelectedAccount(acc)
    setChildren([])
    skipMarked = []
  }

  return (
    <StyledFlexWrapper>
      {history.length > 1 && <Flex alignItems="center" mb="12px">
        <Button variant="secondary" mr="12px" scale='sm' onClick={() => handleBack(history[history.length - 2])}>Back to `&gt;`?</Button>
        <Text>{history[history.length - 2]}</Text>
      </Flex>}
      <ReferralItem rewards={rootRewards} address={selectedAccount} isChildren={false} level={0} totalRef={2} backgroundColor="#1D018D" />
      <ChildrenContent>
        <StyledHeading>Referral income</StyledHeading>
        {isLoading
          ? <GridPlaceholder numItems={1} />
          : children.map(({ address, totalRefer, rewards }, index) => {
          return <ReferralItem onClick={() => handleViewAccount(address)} key={address} rewards={rewards} address={address} isChildren level={index} totalRef={totalRefer} backgroundColor={(index % 2) ? "transparent" : "#160461"} />
        })}
      </ChildrenContent>
      <Flex mt="12px" flexDirection="column" alignItems="center">
        {children.length < totalChildren && <GradientButton onClick={() => setPage(page + 1)}>Load More ({totalChildren - children.length} left)</GradientButton>}
      </Flex>
    </StyledFlexWrapper>
  )
}

export default People
