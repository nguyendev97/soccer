import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Heading } from '@pancakeswap/uikit'
import { useRefferalContract, useCommContract } from 'hooks/useContract'
import { useWeb3React } from '@pancakeswap/wagmi'
import GradientButton from 'components/GradientButton'
import BigNumber from 'bignumber.js'
import { multicallv2 } from 'utils/multicall'
import commAbi from 'config/abi/comm.json'
import { getBalanceNumber } from 'utils/formatBalance'
import { getCommAddress } from 'utils/addressHelpers'
import { BUSD } from '@pancakeswap/tokens'
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
const skipMarked = []

const pageSize = 2
const mockup = "0xd9Ee77C838B4613a67eAe08A602F078997FfB2DE"
const People = () => {
  const { account, chainId } = useWeb3React()
  const refferalContract = useRefferalContract()
  const commContract = useCommContract()
  const [children, setChildren] = useState([])
  const [page, setPage] = useState(0)
  const [rootRewards, setRootRewards] = useState({
    busd: 0
  })
  const [totalChildren, setTotalChildren] = useState(0)

  useEffect(() => {
    if (account) {
      const skip = (page * pageSize)
      if (!skipMarked.includes(skip)) {
        skipMarked.push(skip)
        refferalContract.getTotalUserByUp(account, pageSize, skip).then( async res => {
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

          commContract.totalRewards(account, BUSD[chainId]?.address).then(resRewards => {
              setRootRewards({
                busd: getBalanceNumber(new BigNumber(resRewards._hex))
              }
            )}
          )
          
          const newChilren = cleanedChildren.map((item, index) => ({
            ...item,
            rewards: {
              busd: getBalanceNumber(new BigNumber(rewardsCallsResult[index][0]._hex))
            }
          }))
          setChildren((prev) => [...prev, ...newChilren])
          setTotalChildren(res.totalItem.toNumber())
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, page])

  // console.log({children})
  return (
    <StyledFlexWrapper>
      <ReferralItem rewards={rootRewards} address={account} isChildren={false} level={0} totalRef={2} backgroundColor="#1D018D" />
      <ChildrenContent>
        <StyledHeading>Referral income of {totalChildren} children</StyledHeading>
        {children.map(({ address, totalRefer, rewards }, index) => {
          return <ReferralItem key={address} rewards={rewards} address={address} isChildren level={index} totalRef={totalRefer} backgroundColor={(index % 2) ? "transparent" : "#160461"} />
        })}
      </ChildrenContent>
      <Flex mt="12px" flexDirection="column" alignItems="center">
        {children.length < totalChildren && <GradientButton onClick={() => setPage(page + 1)}>Load More ({totalChildren - children.length} left)</GradientButton>}
      </Flex>
    </StyledFlexWrapper>
  )
}

export default People
