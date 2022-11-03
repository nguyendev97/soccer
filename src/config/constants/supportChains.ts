import { ChainId } from '@pancakeswap/sdk'

export const SUPPORT_ONLY_BSC = [ChainId.BSC, ChainId.BSC_TESTNET]
export const SUPPORT_FARMS = [ChainId.BSC, ChainId.BSC_TESTNET, ChainId.GOERLI]

export const SUPPORT_ZAP = [ChainId.BSC, ChainId.BSC_TESTNET]

export const SUPPORT_MARKET = [...SUPPORT_ONLY_BSC, ChainId.SEPOLIA]
