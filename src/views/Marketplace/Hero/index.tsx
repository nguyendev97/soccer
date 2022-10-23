import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Flex, Skeleton } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useERC721 } from 'hooks/useContract'
import { getPlayersAddress } from 'utils/addressHelpers'
import cloneDeep from 'lodash/cloneDeep'
import groupBy from 'lodash/groupBy'
import GradientButton from 'components/GradientButton'
import MarketItem from '../components/MarketItem'

const StyledFlexWrapper = styled(Flex)`
  width: 100%;
`
const StyledFlexContent = styled(Flex)`
  width: 100%;
  flex-direction: column;
`

const playersAddress = getPlayersAddress()

const PAGE_SIZE = 10
const Hero = () => {
  const playersContract = useERC721(playersAddress)
  const { account } = useWeb3React()
  const [nfts, setNfts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1)
  const currentSize = page * PAGE_SIZE

  useEffect(() => {
    if (account) {
      setIsLoading(true)
      playersContract
        .balanceOf(account)
        .then((res) => {
          const balance = res.toNumber()
          let balanceCloned = cloneDeep(balance)
          
          // eslint-disable-next-line prefer-const
          let newIds = []
          while (balanceCloned > 0) {
            balanceCloned--
            newIds.push(balanceCloned)
          }
          return newIds
        })
        .then(async (newIds) => {
          // eslint-disable-next-line prefer-const
          let tasks = []
          newIds.forEach((id) => {
            tasks.push(playersContract.tokenOfOwnerByIndex(account, id))
          })
          const res = await Promise.all(tasks)
          const tokenIds = res.map((tokenId) => tokenId.toNumber())
          tasks = []
          tokenIds.forEach((id) => {
            tasks.push(playersContract.tokenURI(id))
          })
          const tokenURIRes = await Promise.all(tasks)
          tasks = []
          tokenURIRes.forEach(uri => {
            const fetchMeta = async () => {
              const uriRes = await fetch(uri)
              if (uriRes.ok) {
                const json = await uriRes.json()
                return json
              }
              return null
            }
            tasks.push(fetchMeta())
          })
          const metas = await Promise.all(tasks)
          setIsLoading(false)
          setNfts(metas)
        })
    }
  }, [playersContract, account])
  return (
    <>
      <StyledFlexWrapper>
        <StyledFlexContent>
        {isLoading && <Skeleton height="50" />}
        {!isLoading && nfts.slice(0, currentSize).map(({ imagePlayer, name, attributes, token_id: tokenId }) => {
          const attributesMap: any = groupBy(attributes, 'key')
          return <MarketItem
            key={tokenId}
            avatar={imagePlayer}
            code={`#${tokenId}`}
            ratity={attributesMap.Rarity[0].value as string}
            level={`level ${attributesMap.Level[0].value as string}`}
            pow={attributesMap.POW[0].value as string}
            sho={attributesMap.SHO[0].value as string}
            spe={attributesMap.SPE[0].value as string}
            jmp={attributesMap.JMP[0].value as string}
            price="513.436"
            statusName="inWallet"
          />
        })}
        <Flex flexDirection="column" alignItems="center">
          {nfts.length - currentSize > 0 && <GradientButton onClick={() => setPage(page + 1)}>Load More ({nfts.length - currentSize} left)</GradientButton>}
        </Flex>
        </StyledFlexContent>
      </StyledFlexWrapper>
    </>
  )
}

export default Hero
