/* eslint-disable prefer-const */
import { useWeb3React } from '@pancakeswap/wagmi'
import { FetchStatus } from 'config/constants/types'
import { useCallback } from 'react'
import { useERC721 } from 'hooks/useContract'
import { getNftsMarketData, getNftsOnChainMarketData } from 'state/nftMarket/helpers'
import { NftLocation, TokenMarketData } from 'state/nftMarket/types'
import { useProfile } from 'state/profile/hooks'
import useSWR from 'swr'
import { multicallv2 } from 'utils/multicall'
import erc721Abi from 'config/abi/erc721.json'
import keyBy from 'lodash/keyBy'
import { getPlayersAddress, getEquipmentsAddress } from 'utils/addressHelpers'
import { NOT_ON_SALE_SELLER } from 'config/constants'

const COLLECTIONS_NAME = {
  [getPlayersAddress()]: 'Kickers',
  [getEquipmentsAddress()]: 'Equipments'
}

const useNftOwn = (collectionAddress: string, tokenId: string, marketData?: TokenMarketData) => {
  const { account } = useWeb3React()
  const collectionContract = useERC721(collectionAddress)
  const { isInitialized: isProfileInitialized, profile } = useProfile()

  const { data: tokenOwner } = useSWR(
    collectionContract ? ['nft', 'ownerOf', collectionAddress, tokenId] : null,
    async () => collectionContract.ownerOf(tokenId),
  )

  return useSWR(
    account && isProfileInitialized && tokenOwner
      ? ['nft', 'own', collectionAddress, tokenId, marketData?.currentSeller]
      : null,
    async () => {
      let isOwn = false
      let nftIsProfilePic = false
      let location: NftLocation

      nftIsProfilePic = tokenId === profile?.tokenId?.toString() && collectionAddress === profile?.collectionAddress
      const nftIsOnSale = marketData ? marketData?.currentSeller !== NOT_ON_SALE_SELLER : false
      if (nftIsOnSale) {
        isOwn = marketData?.currentSeller.toLowerCase() === account.toLowerCase()
        location = NftLocation.FORSALE
      } else if (nftIsProfilePic) {
        isOwn = true
        location = NftLocation.PROFILE
      } else {
        isOwn = tokenOwner.toLowerCase() === account.toLowerCase()
        location = NftLocation.WALLET
      }

      return {
        isOwn,
        nftIsProfilePic,
        location,
      }
    },
  )
}

export const useCompleteNft = (collectionAddress: string, tokenId: string, chainId: number) => {
  const { data: nft, mutate } = useSWR(
    collectionAddress && tokenId ? ['nft', collectionAddress, tokenId] : null,
    async () => {
      const tokenURICalls = [
        { address: collectionAddress, name: 'tokenURI', params: [Number(tokenId)] },
        { address: collectionAddress, name: 'ownerOf', params: [Number(tokenId)] }
      ]
      
      const callsResult = await multicallv2({
        abi: erc721Abi,
        calls: tokenURICalls,
        options: { requireSuccess: false },
        chainId,
      })

      const [owner] = callsResult[1]
      const [uri] = callsResult[0]
      const hash = uri.split('/').at(-1)
      const fetchMeta = async () => {
        const uriRes = await fetch(uri.replace('.io', '.net'))
        if (uriRes.ok) {
          const json = await uriRes.json()
          return json
        }
        return null
      }
      const { name, description, image, attributes, imagePlayer } = await fetchMeta()

      const meta: any = keyBy(attributes, 'key')
      return {
        tokenId,
        name,
        hash,
        description,
        owner,
        collectionName: COLLECTIONS_NAME[collectionAddress] || '',
        collectionAddress,
        image: {
          original: image.replace('.io', '.net'),
          thumbnail: imagePlayer.replace('.io', '.net')
        },
        meta
      }
    },
  )

  const { data: marketData, mutate: refetchNftMarketData } = useSWR(
    collectionAddress && tokenId ? ['nft', 'marketData', collectionAddress, tokenId] : null,
    async () => {
      const [onChainMarketDatas, marketDatas] = await Promise.all([
        getNftsOnChainMarketData(collectionAddress.toLowerCase(), [tokenId]),
        getNftsMarketData({ collection: collectionAddress.toLowerCase(), tokenId }, 1),
      ])
      const onChainMarketData = onChainMarketDatas[0]

      if (!marketDatas[0] && !onChainMarketData) return null

      if (!onChainMarketData) return marketDatas[0]

      return { ...marketDatas[0], ...onChainMarketData }
    },
  )

  const { data: nftOwn, mutate: refetchNftOwn, status } = useNftOwn(collectionAddress, tokenId, marketData)

  const refetch = useCallback(async () => {
    await mutate()
    await refetchNftMarketData()
    await refetchNftOwn()
  }, [mutate, refetchNftMarketData, refetchNftOwn])

  return {
    combinedNft: nft ? { ...nft, marketData, location: nftOwn?.location ?? NftLocation.WALLET } : undefined,
    isOwn: nftOwn?.isOwn || false,
    isProfilePic: nftOwn?.nftIsProfilePic || false,
    isLoading: status !== FetchStatus.Fetched,
    refetch,
  }
}
