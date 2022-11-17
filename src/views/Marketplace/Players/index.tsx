import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Flex, Skeleton } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useERC721 } from 'hooks/useContract'
import { getPlayersAddress } from 'utils/addressHelpers'
import cloneDeep from 'lodash/cloneDeep'
// import GradientButton from 'components/GradientButton'
import NextLink from 'next/link'
import useNfts, { STAGE } from 'hooks/useNfts'
import ReactPaginate from 'react-paginate'
import MarketItem from '../components/MarketItem'
// import SellingModal from '../components/SellingModal'

const StyledFlexWrapper = styled(Flex)`
  width: 100%;
`
const StyledFlexContent = styled(Flex)`
  width: 100%;
  flex-direction: column;
`

const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  list-style: none;
  justify-content: center;
  a {
    color: #fff;
    display: block;
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 40px;
    ${({ theme }) => theme.mediaQueries.md} {
      width: 48px;
      height: 48px;
      font-size: 20px;
      line-height: 48px;
    }
  }
  a[aria-disabled='true'] {
    cursor: not-allowed !important;
  }
  .selected a {
    background: #452a7a;
    border-radius: 4px;
  }
`

const PAGE_SIZE = 10
const Kickers = () => {
  const { account, chainId } = useWeb3React()
  const playersAddress = getPlayersAddress(chainId)
  const playersContract = useERC721(playersAddress)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [tokenIds, setTokenIds] = useState([])
  const [tokenIdsSelected, setTokenIdsSelected] = useState([])
  const currentSize = page * PAGE_SIZE

  const { nfts, stage } = useNfts({ collectionAddress: playersAddress, tokenIds: tokenIdsSelected  })
  // const [onPresentSellingModal] = useModal(<SellingModal />)
  
  useEffect(() => {
    const tempEnd = PAGE_SIZE * (page + 1)
    const endSlice = Math.min(tempEnd, tokenIds.length)
    setTokenIdsSelected([...tokenIds].slice(currentSize, endSlice))
  }, [page, tokenIds, currentSize])

  const handlePageClick = (event) => {
    setPage(event.nextSelectedPage)
  };

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
          setTokenIds(res.map((tokenId) => tokenId.toNumber()))
          setIsLoading(false)
        })
    }
  }, [account])
  return (
    <>
      <StyledFlexWrapper>
        <StyledFlexContent>
          {isLoading || stage === STAGE.LOADING && (
            <Flex flexDirection="column" mb="12px">
              <Skeleton height="100px" />
            </Flex>
          )}
          {!isLoading &&
            nfts.map(({ image, meta, tokenId }) => {
              return (
                <NextLink href={`/nfts/collections/${playersAddress}/${tokenId}`}>
                  <MarketItem
                    tokenId={tokenId}
                    key={tokenId}
                    avatar={image.thumbnail}
                    code={`#${tokenId}`}
                    ratity={meta.Rarity.value as string}
                    level={`level ${meta.Level.value as string}`}
                    pow={meta.POW.value as string}
                    sho={meta.SHO.value as string}
                    spe={meta.SPE.value as string}
                    jmp={meta.JMP.value as string}
                    price="513.436"
                    statusName="inWallet"
                  />
                </NextLink>
              )
            })}
          <StyledReactPaginate
            breakLabel="..."
            nextLabel=">"
            onClick={handlePageClick}
            pageRangeDisplayed={5}
            forcePage={page}
            pageCount={Math.ceil(tokenIds.length / PAGE_SIZE)}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </StyledFlexContent>
      </StyledFlexWrapper>
    </>
  )
}

export default Kickers
