import { useState, useEffect } from 'react'
import { multicallv2 } from 'utils/multicall'
import { useWeb3React } from '@pancakeswap/wagmi'
import erc721Abi from 'config/abi/erc721.json'
import keyBy from 'lodash/keyBy'
import { getPlayersAddress, getEquipmentsAddress } from 'utils/addressHelpers'
import { NftToken } from 'state/nftMarket/types'

interface IndividualNFTPageProps {
  collectionAddress: string
  tokenIds: string[]
}

export enum STAGE {
  INI,
  LOADING,
  FULFILLED,
}

const COLLECTIONS_NAME = {
  [getPlayersAddress()]: 'Kickers',
  [getEquipmentsAddress()]: 'Equipments'
}

const useNfts = ({ collectionAddress, tokenIds } : IndividualNFTPageProps) => {
  const [nfts, setNfts] = useState<NftToken[]>([])
  const { chainId } = useWeb3React()
  const [stage, setStage] = useState<STAGE>(STAGE.INI)

  useEffect(() => {
    const fetchNfts = async () => {
      setStage(STAGE.LOADING)
      const tokenURICalls = tokenIds.map(id => {
        return { address: collectionAddress, name: 'tokenURI', params: [Number(id)] }
      })
      
      const callsResult = await multicallv2({
        abi: erc721Abi,
        calls: tokenURICalls,
        options: { requireSuccess: false },
        chainId,
      })
      
      // eslint-disable-next-line prefer-const
      let tasks = []
      callsResult.forEach(([uri]) => {
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

      setStage(STAGE.FULFILLED)

      setNfts(metas.map(({ token_id: tokenId, name, description, image, attributes }) => {
        const meta: any = keyBy(attributes, 'key')
        return {
          tokenId,
          name,
          description,
          collectionName: COLLECTIONS_NAME[collectionAddress] || '',
          collectionAddress,
          image: {
            original: image,
            thumbnail: image
          },
          meta
        }
      }))
    }
    if (chainId && stage === STAGE.INI) {
      fetchNfts()
    }
  }, [chainId, collectionAddress, tokenIds, stage])

  return { nfts, stage }
}

export default useNfts
