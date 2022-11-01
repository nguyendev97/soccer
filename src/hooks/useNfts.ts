import { useState, useEffect } from 'react'
import { multicallv2 } from 'utils/multicall'
import { useWeb3React } from '@pancakeswap/wagmi'
import erc721Abi from 'config/abi/erc721.json'

interface IndividualNFTPageProps {
  collectionAddress: string
  tokenIds: string[]
}

const useNfts = ({ collectionAddress, tokenIds } : IndividualNFTPageProps) => {
  const [nfts, setNfts] = useState([])
  const { chainId } = useWeb3React()

  useEffect(() => {
    const fetchNfts = async () => {
      const tokenURICalls = tokenIds.map(id => {
        return { address: collectionAddress, name: 'tokenURI', params: [Number(id)] }
      })
      console.log({tokenURICalls})
      const callsResult = await multicallv2({
        abi: erc721Abi,
        calls: tokenURICalls,
        options: { requireSuccess: false },
        chainId,
      })
      console.log(callsResult)
      // tokenURIRes.forEach(uri => {
      //   const fetchMeta = async () => {
      //     const uriRes = await fetch(uri)
      //     if (uriRes.ok) {
      //       const json = await uriRes.json()
      //       return json
      //     }
      //     return null
      //   }
      //   tasks.push(fetchMeta())
      // })
      // const metas = await Promise.all(tasks)
    }
    if (chainId) {
      fetchNfts()
    }
  }, [chainId, collectionAddress, tokenIds])

  return { nfts }
}

export default useNfts
