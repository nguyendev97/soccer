import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Flex, Skeleton } from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { getPlayersAddress } from 'utils/addressHelpers'
import keyBy from 'lodash/keyBy'
import { API_NFT } from 'config/constants/endpoints'
import NextLink from 'next/link'
import ReactPaginate from 'react-paginate'
import MarketItem from '../components/MarketItem'

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

export const fetchNfts = async (address, typeItem) => {
  const res = await fetch(`${API_NFT}/inventories/${address}?typeItem=${typeItem}`)
  if (res.ok) {
    const json = await res.json()
    return json.nfts
  }
  console.error('Failed to fetchNfts', res.statusText)
  return []
}

const PAGE_SIZE = 10
const Kickers = () => {
  const { account, chainId } = useWeb3React()
  const playersAddress = getPlayersAddress(chainId)
  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [nfts, setNfts] = useState([])

  const handlePageClick = (event) => {
    setPage(event.nextSelectedPage)
  };

  useEffect(() => {
    if (account) {
      setIsLoading(true)
      fetchNfts(account, 'kicker').then(res => {
        setNfts(res)
        setIsLoading(false)
      })
    }
  }, [account])

  return (
    <>
      <StyledFlexWrapper>
        <StyledFlexContent>
          {isLoading && (
            <Flex flexDirection="column" mb="12px">
              <Skeleton height="100px" />
            </Flex>
          )}
          {!isLoading &&
            nfts.slice(page * PAGE_SIZE, PAGE_SIZE * (page + 1)).map(({ image, attributes, tokenId }) => {
              const meta: any = keyBy(attributes, 'key')
              return (
                <NextLink href={`/nfts/collections/${playersAddress}/${tokenId}`}>
                  <MarketItem
                    tokenId={tokenId}
                    key={tokenId}
                    avatar={image}
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
            pageCount={Math.ceil(nfts.length / PAGE_SIZE)}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </StyledFlexContent>
      </StyledFlexWrapper>
    </>
  )
}

export default Kickers
