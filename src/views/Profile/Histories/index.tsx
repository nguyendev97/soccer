/* eslint-disable prefer-const */
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Flex, Text, Button } from '@pancakeswap/uikit'
import { useCommContract } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@pancakeswap/wagmi'
import GradientButton from 'components/GradientButton'
import { multicallv2 } from 'utils/multicall'
import commAbi from 'config/abi/comm.json'
import { getCommAddress } from 'utils/addressHelpers'
import { BUSD } from '@pancakeswap/tokens'
import GridPlaceholder from 'components/GridPlaceholder'
import { differenceInDays, format } from 'date-fns'
import ReferralItem from '../components/ReferralItem'

const StyledFlexWrapper = styled(Flex)`
  width: 100%;
  flex-direction: column;
`
const ChildrenContent = styled.div`
  width: 100%;
  margin-top: 30px;
`

const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const History = () => {
  const { account, chainId } = useWeb3React()
  const commContract = useCommContract()
  const [rewards, setRewards] = useState([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
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
      const now = new Date()
      const selectedMonth = month - page
      const firstDateOfMonth = new Date(year, selectedMonth - 1, 1)
      const lastDateOfMonth = page ===  0 ? now : new Date(year, selectedMonth, 0)

      const from = differenceInDays(now, lastDateOfMonth)
      const to = differenceInDays(now, firstDateOfMonth)
        setIsLoading(true)
        commContract.getDays().then(async dayBn => {
          const day = dayBn.toNumber()
          let rewardsCalls = []
          let loopDay = day - from
          while (loopDay >= day - to) {
            const params = [account, BUSD[chainId]?.address, loopDay]
            rewardsCalls.push({ address: getCommAddress(chainId), name: 'totalRewardsByDay', params })
            loopDay --
          }
          const rewardsCallsResult = await multicallv2({
            abi: commAbi,
            calls: rewardsCalls,
            options: { requireSuccess: false },
            chainId,
          })
          setRewards(rewardsCallsResult.map(([res], index) => {
            const fullDay = format(new Date(year, selectedMonth - 1, lastDateOfMonth.getDate() - index), 'dd-MM-yyyy')
            return {
              details: {
                busd: getBalanceNumber(new BigNumber(res._hex))
              },
              time: fullDay
            }
          }).filter(({ details: { busd }}) => busd !== 0))
        }).finally(() => setIsLoading(false))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAccount, page, account])

  return (
    <StyledFlexWrapper>
      <ChildrenContent>
        {isLoading
          ? <GridPlaceholder numItems={1} />
          : !rewards.length ? <Text bold>No datas for this month ({format(new Date(year, month - page - 1), 'MM-yyyy')})</Text> : rewards.map(({ time, details }, index) => {
          return <ReferralItem onClick={null} key={time} rewards={details} title={time} isChildren level={index} totalRef={index + 1} backgroundColor={(index % 2) ? "transparent" : "#160461"} />
        })}
      </ChildrenContent>
      <Flex mt="12px" flexDirection="column" alignItems="center">
        <GradientButton onClick={() => setPage(page + 1)}>View previous ({new Date(year, month - page - 2).toLocaleString('en-US', {month: 'long'})})</GradientButton>
        {page > 0 && <Button mt="12px" style={{ borderRadius: "10px" }} onClick={() => setPage(0)}>Back to current month</Button>}
      </Flex>
    </StyledFlexWrapper>
  )
}

export default History
