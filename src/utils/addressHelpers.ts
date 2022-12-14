import { ChainId } from '@pancakeswap/sdk'
import addresses from 'config/constants/contracts'
import { Address } from 'config/constants/types'
import { VaultKey } from 'state/types'

export const getAddress = (address: Address, chainId?: number): string => {
  return address[chainId] ? address[chainId] : address[ChainId.BSC]
}

export const getMasterChefAddress = (chainId?: number) => {
  return getAddress(addresses.masterChef, chainId)
}
export const getMasterChefV1Address = () => {
  return getAddress(addresses.masterChefV1)
}
export const getMulticallAddress = (chainId?: number) => {
  return getAddress(addresses.multiCall, chainId)
}
export const getLotteryV2Address = () => {
  return getAddress(addresses.lotteryV2)
}
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile)
}
export const getPancakeBunniesAddress = () => {
  return getAddress(addresses.pancakeBunnies)
}
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory)
}
export const getPredictionsV1Address = () => {
  return getAddress(addresses.predictionsV1)
}
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund)
}
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo)
}
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial)
}
export const getTradingCompetitionAddressEaster = () => {
  return getAddress(addresses.tradingCompetitionEaster)
}
export const getTradingCompetitionAddressFanToken = () => {
  return getAddress(addresses.tradingCompetitionFanToken)
}

export const getTradingCompetitionAddressMobox = () => {
  return getAddress(addresses.tradingCompetitionMobox)
}

export const getTradingCompetitionAddressMoD = () => {
  return getAddress(addresses.tradingCompetitionMoD)
}

export const getEasterNftAddress = () => {
  return getAddress(addresses.easterNft)
}

export const getVaultPoolAddress = (vaultKey: VaultKey) => {
  if (!vaultKey) {
    return null
  }
  return getAddress(addresses[vaultKey])
}

export const getCakeVaultAddress = () => {
  return getAddress(addresses.cakeVault)
}

export const getCakeFlexibleSideVaultAddress = () => {
  return getAddress(addresses.cakeFlexibleSideVault)
}

export const getBunnySpecialCakeVaultAddress = () => {
  return getAddress(addresses.bunnySpecialCakeVault)
}
export const getBunnySpecialPredictionAddress = () => {
  return getAddress(addresses.bunnySpecialPrediction)
}
export const getBunnySpecialLotteryAddress = () => {
  return getAddress(addresses.bunnySpecialLottery)
}
export const getBunnySpecialXmasAddress = () => {
  return getAddress(addresses.bunnySpecialXmas)
}
export const getFarmAuctionAddress = () => {
  return getAddress(addresses.farmAuction)
}
export const getAnniversaryAchievement = () => {
  return getAddress(addresses.AnniversaryAchievement)
}

export const getNftMarketAddress = (chainId?: number) => {
  return getAddress(addresses.nftMarket, chainId)
}
export const getNftSaleAddress = () => {
  return getAddress(addresses.nftSale)
}
export const getPancakeSquadAddress = () => {
  return getAddress(addresses.pancakeSquad)
}

export const getZapAddress = () => {
  return getAddress(addresses.zap)
}
export const getICakeAddress = () => {
  return getAddress(addresses.iCake)
}

export const getBoxSaleAddress = (chainId?: number) => {
  return getAddress(addresses.boxSale, chainId)
}

export const getHalloweenBoxSaleAddress = (chainId?: number) => {
  return getAddress(addresses.boxHalloweenSale, chainId)
}

export const getBoxesAddress = (chainId?: number) => {
  return getAddress(addresses.boxes, chainId)
}

export const getBoxesOpenAddress = (chainId?: number) => {
  return getAddress(addresses.boxesOpen, chainId)
}

export const getHalloweenBoxesOpenAddress = (chainId?: number) => {
  return getAddress(addresses.halloweenBoxesOpen, chainId)
}

export const getRefferalAddress = (chainId?: number) => {
  return getAddress(addresses.refferal, chainId)
}

export const getRefferalOwnerAddress = (chainId?: number) => {
  return getAddress(addresses.refferalOner, chainId)
}

export const getPlayersAddress = (chainId?: number) => {
  return getAddress(addresses.players, chainId)
}

export const getEquipmentsAddress = (chainId?: number) => {
  return getAddress(addresses.equipments, chainId)
}

export const getCommAddress = (chainId?: number) => {
  return getAddress(addresses.comm, chainId)
}

export const getImportNFTAddress = (chainId?: number) => {
  return getAddress(addresses.importNFT, chainId)
}

export const getOpenSLegendAddress = (chainId?: number) => {
  return getAddress(addresses.openSLegend, chainId)
}

export const getSLegendBoxAddress = (chainId?: number) => {
  return getAddress(addresses.sLegendBox, chainId)
}

export const getBoxesGSCOpenAddress = (chainId?: number) => {
  return getAddress(addresses.boxesGSCOpen, chainId)
}

export const getBoxSLegendOpenAddress = (chainId?: number) => {
  return getAddress(addresses.boxSLegendOpen, chainId)
}