import {
  Cake,
  Erc20,
  Erc20Bytes32,
  Erc721collection,
  Multicall,
  Weth,
  Zap,
} from 'config/abi/types'
import zapAbi from 'config/abi/zap.json'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useProviderOrSigner } from 'hooks/useProviderOrSigner'
import { useMemo } from 'react'
import { getMulticallAddress, getZapAddress } from 'utils/addressHelpers'
import {
  getAnniversaryAchievementContract,
  getBCakeFarmBoosterContract,
  getBCakeFarmBoosterProxyFactoryContract,
  getBCakeProxyContract,
  getBep20Contract,
  getBunnyFactoryContract,
  getBunnySpecialXmasContract,
  getCakeContract,
  getChainlinkOracleContract,
  getErc721CollectionContract,
  getErc721Contract,
  getLotteryV2Contract,
  getMasterchefContract,
  getMasterchefV1Contract,
  getNftMarketContract,
  getNftSaleContract,
  getPancakeBunniesContract,
  getPancakeSquadContract,
  getPointCenterIfoContract,
  getPotteryDrawContract,
  getPotteryVaultContract,
  getProfileContract,
  getHalloweenBoxesOpenContract,
  getBoxSaleContract,
  getErc1155Contract,
  getBoxesOpenContract,
  getRefferalContract,
  getCommContract,
  getHalloweenBoxSaleContract,
} from 'utils/contractHelpers'
import { useSigner } from 'wagmi'

// Imports below migrated from Exchange useContract.ts
import { Contract } from '@ethersproject/contracts'
import { WNATIVE } from '@pancakeswap/sdk'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import ERC20_ABI from '../config/abi/erc20.json'
import IPancakePairABI from '../config/abi/IPancakePair.json'
import multiCallAbi from '../config/abi/Multicall.json'
import WETH_ABI from '../config/abi/weth.json'
import { getContract } from '../utils'

import { IPancakePair } from '../config/abi/types/IPancakePair'
import { useActiveChainId } from './useActiveChainId'

export const useERC20 = (address: string, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getBep20Contract(address, providerOrSigner), [address, providerOrSigner])
}

/**
 * @see https://docs.openzeppelin.com/contracts/3.x/api/token/erc721
 */
export const useERC721 = (address: string, withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getErc721Contract(address, chainId, providerOrSigner), [address, providerOrSigner, chainId])
}

export const useERC1155 = (address: string, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getErc1155Contract(address, providerOrSigner), [address, providerOrSigner])
}

export const useCake = (): { reader: Cake; signer: Cake } => {
  const providerOrSigner = useProviderOrSigner()
  return useMemo(
    () => ({
      reader: getCakeContract(null),
      signer: getCakeContract(providerOrSigner),
    }),
    [providerOrSigner],
  )
}

export const useBunnyFactory = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnyFactoryContract(signer), [signer])
}

export const usePancakeBunnies = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPancakeBunniesContract(signer), [signer])
}

export const useProfileContract = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getProfileContract(providerOrSigner), [providerOrSigner])
}

export const useLotteryV2Contract = () => {
  const providerOrSigner = useProviderOrSigner()
  return useMemo(() => getLotteryV2Contract(providerOrSigner), [providerOrSigner])
}

export const useMasterchef = (withSignerIfPossible = true) => {
  const { chainId } = useActiveChainId()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getMasterchefContract(providerOrSigner, chainId), [providerOrSigner, chainId])
}

export const useMasterchefV1 = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getMasterchefV1Contract(signer), [signer])
}

export const usePointCenterIfoContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPointCenterIfoContract(signer), [signer])
}

export const useChainlinkOracleContract = (address, withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getChainlinkOracleContract(address, providerOrSigner), [providerOrSigner, address])
}

export const useBunnySpecialXmasContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getBunnySpecialXmasContract(signer), [signer])
}

export const useAnniversaryAchievementContract = (withSignerIfPossible = true) => {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getAnniversaryAchievementContract(providerOrSigner), [providerOrSigner])
}

export const useNftSaleContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getNftSaleContract(signer), [signer])
}

export const usePancakeSquadContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPancakeSquadContract(signer), [signer])
}

export const useNftMarketContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getNftMarketContract(signer), [signer])
}

export const useErc721CollectionContract = (
  collectionAddress: string,
): { reader: Erc721collection; signer: Erc721collection } => {
  const { data: signer } = useSigner()
  return useMemo(
    () => ({
      reader: getErc721CollectionContract(null, collectionAddress),
      signer: getErc721CollectionContract(signer, collectionAddress),
    }),
    [signer, collectionAddress],
  )
}

// Code below migrated from Exchange useContract.ts

// returns null on errors
export function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { provider } = useActiveWeb3React()

  const providerOrSigner = useProviderOrSigner(withSignerIfPossible) ?? provider

  const canReturnContract = useMemo(() => address && ABI && providerOrSigner, [address, ABI, providerOrSigner])

  return useMemo(() => {
    if (!canReturnContract) return null
    try {
      return getContract(address, ABI, providerOrSigner)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, providerOrSigner, canReturnContract]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWNativeContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveWeb3React()
  return useContract<Weth>(chainId ? WNATIVE[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract<Erc20Bytes32>(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function usePairContract(pairAddress?: string, withSignerIfPossible?: boolean): IPancakePair | null {
  return useContract(pairAddress, IPancakePairABI, withSignerIfPossible)
}

export function useMulticallContract() {
  const { chainId } = useActiveWeb3React()
  return useContract<Multicall>(getMulticallAddress(chainId), multiCallAbi, false)
}

export const usePotterytVaultContract = (address) => {
  const { data: signer } = useSigner()
  return useMemo(() => getPotteryVaultContract(address, signer), [address, signer])
}

export const usePotterytDrawContract = () => {
  const { data: signer } = useSigner()
  return useMemo(() => getPotteryDrawContract(signer), [signer])
}

export function useZapContract(withSignerIfPossible = true) {
  return useContract<Zap>(getZapAddress(), zapAbi, withSignerIfPossible)
}

export function useBCakeFarmBoosterContract(withSignerIfPossible = true) {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getBCakeFarmBoosterContract(providerOrSigner), [providerOrSigner])
}

export function useBCakeFarmBoosterProxyFactoryContract(withSignerIfPossible = true) {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getBCakeFarmBoosterProxyFactoryContract(providerOrSigner), [providerOrSigner])
}

export function useBCakeProxyContract(proxyContractAddress: string, withSignerIfPossible = true) {
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(
    () => proxyContractAddress && getBCakeProxyContract(proxyContractAddress, providerOrSigner),
    [providerOrSigner, proxyContractAddress],
  )
}

export const useBoxSaleContract = (withSignerIfPossible = true) => {
  const { chainId } = useActiveWeb3React()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getBoxSaleContract(chainId, providerOrSigner), [providerOrSigner, chainId])
}

export const useHalloweenBoxSaleContract = (withSignerIfPossible = true) => {
  const { chainId } = useActiveWeb3React()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getHalloweenBoxSaleContract(chainId, providerOrSigner), [providerOrSigner, chainId])
}

export const useBoxesOpenContract = (withSignerIfPossible = true) => {
  const { chainId } = useActiveWeb3React()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getBoxesOpenContract(chainId, providerOrSigner), [providerOrSigner, chainId])
}

export const useHalloweenBoxesOpenContract = (withSignerIfPossible = true) => {
  const { chainId } = useActiveWeb3React()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getHalloweenBoxesOpenContract(chainId, providerOrSigner), [providerOrSigner, chainId])
}

export const useRefferalContract = (withSignerIfPossible = true) => {
  const { chainId } = useActiveWeb3React()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getRefferalContract(chainId, providerOrSigner), [providerOrSigner, chainId])
}

export const useCommContract = (withSignerIfPossible = true) => {
  const { chainId } = useActiveWeb3React()
  const providerOrSigner = useProviderOrSigner(withSignerIfPossible)
  return useMemo(() => getCommContract(chainId, providerOrSigner), [providerOrSigner, chainId])
}
