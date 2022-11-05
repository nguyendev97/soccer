import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { provider } from 'utils/wagmi'
import { Contract } from '@ethersproject/contracts'
import { CAKE } from '@pancakeswap/tokens'

// Addresses
import {
  getPancakeProfileAddress,
  getPancakeBunniesAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getLotteryV2Address,
  getMasterChefAddress,
  getMasterChefV1Address,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddressEaster,
  getEasterNftAddress,
  getCakeVaultAddress,
  getMulticallAddress,
  getBunnySpecialCakeVaultAddress,
  getBunnySpecialPredictionAddress,
  getBunnySpecialLotteryAddress,
  getFarmAuctionAddress,
  getAnniversaryAchievement,
  getNftMarketAddress,
  getNftSaleAddress,
  getPancakeSquadAddress,
  getTradingCompetitionAddressFanToken,
  getTradingCompetitionAddressMobox,
  getTradingCompetitionAddressMoD,
  getBunnySpecialXmasAddress,
  getICakeAddress,
  getZapAddress,
  getCakeFlexibleSideVaultAddress,
  getPredictionsV1Address,
  getBoxSaleAddress,
  getBoxesOpenAddress,
  getRefferalAddress,
  getCommAddress,
  getHalloweenBoxesOpenAddress,
  getHalloweenBoxSaleAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeBunniesAbi from 'config/abi/pancakeBunnies.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import cakeAbi from 'config/abi/cake.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import masterChef from 'config/abi/masterchef.json'
import masterChefV1 from 'config/abi/masterchefV1.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionEasterAbi from 'config/abi/tradingCompetitionEaster.json'
import tradingCompetitionFanTokenAbi from 'config/abi/tradingCompetitionFanToken.json'
import tradingCompetitionMoboxAbi from 'config/abi/tradingCompetitionMobox.json'
import tradingCompetitionMoDAbi from 'config/abi/tradingCompetitionMoD.json'
import easterNftAbi from 'config/abi/easterNft.json'
import cakeVaultV2Abi from 'config/abi/cakeVaultV2.json'
import cakeFlexibleSideVaultV2Abi from 'config/abi/cakeFlexibleSideVaultV2.json'
import predictionsAbi from 'config/abi/predictions.json'
import predictionsV1Abi from 'config/abi/predictionsV1.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import bunnySpecialCakeVaultAbi from 'config/abi/bunnySpecialCakeVault.json'
import bunnySpecialPredictionAbi from 'config/abi/bunnySpecialPrediction.json'
import bunnySpecialLotteryAbi from 'config/abi/bunnySpecialLottery.json'
import bunnySpecialXmasAbi from 'config/abi/bunnySpecialXmas.json'
import farmAuctionAbi from 'config/abi/farmAuction.json'
import anniversaryAchievementAbi from 'config/abi/anniversaryAchievement.json'
import nftMarketAbi from 'config/abi/nftMarket.json'
import nftSaleAbi from 'config/abi/nftSale.json'
import pancakeSquadAbi from 'config/abi/pancakeSquad.json'
import erc721CollectionAbi from 'config/abi/erc721collection.json'
import potteryVaultAbi from 'config/abi/potteryVaultAbi.json'
import zapAbi from 'config/abi/zap.json'
import iCakeAbi from 'config/abi/iCake.json'
import cakePredictionsAbi from 'config/abi/cakePredictions.json'
import bCakeProxyAbi from 'config/abi/bCakeProxy.json'
import boxSaleAbi from 'config/abi/boxSale.json'
import erc1155Abi from 'config/abi/erc1155.json'
import boxesOpenAbi from 'config/abi/boxesOpen.json'
import refferalAbi from 'config/abi/refferal.json'
import commAbi from 'config/abi/comm.json'

// Types
import type {
  ChainlinkOracle,
  FarmAuction,
  Predictions,
  AnniversaryAchievement,
  Erc20,
  Erc721,
  Cake,
  BunnyFactory,
  PancakeBunnies,
  PancakeProfile,
  LotteryV2,
  Masterchef,
  MasterchefV1,
  BunnySpecial,
  LpToken,
  ClaimRefund,
  TradingCompetitionEaster,
  TradingCompetitionFanToken,
  EasterNft,
  Multicall,
  BunnySpecialCakeVault,
  BunnySpecialPrediction,
  BunnySpecialLottery,
  NftMarket,
  NftSale,
  PancakeSquad,
  Erc721collection,
  PointCenterIfo,
  CakeVaultV2,
  CakeFlexibleSideVaultV2,
  TradingCompetitionMobox,
  ICake,
  TradingCompetitionMoD,
  PotteryVaultAbi,
  Zap,
  PredictionsV1,
  BCakeProxy,
} from 'config/abi/types'
import { ChainId } from '@pancakeswap/sdk'

export const getContract = ({
  abi,
  address,
  chainId = ChainId.BSC,
  signer,
}: {
  abi: any
  address: string
  chainId?: ChainId
  signer?: Signer | Provider
}) => {
  const signerOrProvider = signer ?? provider({ chainId })
  return new Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: bep20Abi, address, signer }) as Erc20
}
export const getErc721Contract = (address: string, chainId?: number, signer?: Signer | Provider) => {
  return getContract({ abi: erc721Abi, address, signer, chainId }) as Erc721
}
export const getErc1155Contract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: erc1155Abi, address, signer })
}
export const getLpContract = (address: string, chainId?: number, signer?: Signer | Provider) => {
  return getContract({ abi: lpTokenAbi, address, signer, chainId }) as LpToken
}

export const getPointCenterIfoContract = (signer?: Signer | Provider) => {
  return getContract({ abi: pointCenterIfo, address: getPointCenterIfoAddress(), signer }) as PointCenterIfo
}
export const getCakeContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({
    abi: cakeAbi,
    address: chainId ? CAKE[chainId].address : CAKE[ChainId.BSC].address,
    signer,
  }) as Cake
}
export const getProfileContract = (signer?: Signer | Provider) => {
  return getContract({ abi: profileABI, address: getPancakeProfileAddress(), signer }) as PancakeProfile
}
export const getPancakeBunniesContract = (signer?: Signer | Provider) => {
  return getContract({ abi: pancakeBunniesAbi, address: getPancakeBunniesAddress(), signer }) as PancakeBunnies
}
export const getBunnyFactoryContract = (signer?: Signer | Provider) => {
  return getContract({ abi: bunnyFactoryAbi, address: getBunnyFactoryAddress(), signer }) as BunnyFactory
}
export const getBunnySpecialContract = (signer?: Signer | Provider) => {
  return getContract({ abi: bunnySpecialAbi, address: getBunnySpecialAddress(), signer }) as BunnySpecial
}
export const getLotteryV2Contract = (signer?: Signer | Provider) => {
  return getContract({ abi: lotteryV2Abi, address: getLotteryV2Address(), signer }) as LotteryV2
}
export const getMasterchefContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({ abi: masterChef, address: getMasterChefAddress(chainId), signer }) as Masterchef
}
export const getMasterchefV1Contract = (signer?: Signer | Provider) => {
  return getContract({ abi: masterChefV1, address: getMasterChefV1Address(), signer }) as MasterchefV1
}
export const getClaimRefundContract = (signer?: Signer | Provider) => {
  return getContract({ abi: claimRefundAbi, address: getClaimRefundAddress(), signer }) as ClaimRefund
}
export const getTradingCompetitionContractEaster = (signer?: Signer | Provider) => {
  return getContract({
    abi: tradingCompetitionEasterAbi,
    address: getTradingCompetitionAddressEaster(),
    signer,
  }) as TradingCompetitionEaster
}

export const getTradingCompetitionContractFanToken = (signer?: Signer | Provider) => {
  return getContract({
    abi: tradingCompetitionFanTokenAbi,
    address: getTradingCompetitionAddressFanToken(),
    signer,
  }) as TradingCompetitionFanToken
}
export const getTradingCompetitionContractMobox = (signer?: Signer | Provider) => {
  return getContract({
    abi: tradingCompetitionMoboxAbi,
    address: getTradingCompetitionAddressMobox(),
    signer,
  }) as TradingCompetitionMobox
}

export const getTradingCompetitionContractMoD = (signer?: Signer | Provider) => {
  return getContract({
    abi: tradingCompetitionMoDAbi,
    address: getTradingCompetitionAddressMoD(),
    signer,
  }) as TradingCompetitionMoD
}

export const getEasterNftContract = (signer?: Signer | Provider) => {
  return getContract({ abi: easterNftAbi, address: getEasterNftAddress(), signer }) as EasterNft
}
export const getCakeVaultV2Contract = (signer?: Signer | Provider) => {
  return getContract({ abi: cakeVaultV2Abi, address: getCakeVaultAddress(), signer }) as CakeVaultV2
}

export const getCakeFlexibleSideVaultV2Contract = (signer?: Signer | Provider) => {
  return getContract({
    abi: cakeFlexibleSideVaultV2Abi,
    address: getCakeFlexibleSideVaultAddress(),
    signer,
  }) as CakeFlexibleSideVaultV2
}

export const getPredictionsContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: predictionsAbi, address, signer }) as Predictions
}

export const getPredictionsV1Contract = (signer?: Signer | Provider) => {
  return getContract({ abi: predictionsV1Abi, address: getPredictionsV1Address(), signer }) as PredictionsV1
}

export const getCakePredictionsContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: cakePredictionsAbi, address, signer }) as Predictions
}

export const getChainlinkOracleContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: chainlinkOracleAbi, address, signer }) as ChainlinkOracle
}
export const getMulticallContract = (chainId: ChainId) => {
  return getContract({ abi: MultiCallAbi, address: getMulticallAddress(chainId), chainId }) as Multicall
}
export const getBunnySpecialCakeVaultContract = (signer?: Signer | Provider) => {
  return getContract({
    abi: bunnySpecialCakeVaultAbi,
    address: getBunnySpecialCakeVaultAddress(),
    signer,
  }) as BunnySpecialCakeVault
}
export const getBunnySpecialPredictionContract = (signer?: Signer | Provider) => {
  return getContract({
    abi: bunnySpecialPredictionAbi,
    address: getBunnySpecialPredictionAddress(),
    signer,
  }) as BunnySpecialPrediction
}
export const getBunnySpecialLotteryContract = (signer?: Signer | Provider) => {
  return getContract({
    abi: bunnySpecialLotteryAbi,
    address: getBunnySpecialLotteryAddress(),
    signer,
  }) as BunnySpecialLottery
}
export const getBunnySpecialXmasContract = (signer?: Signer | Provider) => {
  return getContract({ abi: bunnySpecialXmasAbi, address: getBunnySpecialXmasAddress(), signer })
}
export const getFarmAuctionContract = (signer?: Signer | Provider) => {
  return getContract({ abi: farmAuctionAbi, address: getFarmAuctionAddress(), signer }) as unknown as FarmAuction
}
export const getAnniversaryAchievementContract = (signer?: Signer | Provider) => {
  return getContract({
    abi: anniversaryAchievementAbi,
    address: getAnniversaryAchievement(),
    signer,
  }) as AnniversaryAchievement
}

export const getNftMarketContract = (signer?: Signer | Provider, chainId?: number) => {
  return getContract({ abi: nftMarketAbi, address: getNftMarketAddress(chainId), signer, chainId }) as NftMarket
}
export const getNftSaleContract = (signer?: Signer | Provider) => {
  return getContract({ abi: nftSaleAbi, address: getNftSaleAddress(), signer }) as NftSale
}
export const getPancakeSquadContract = (signer?: Signer | Provider) => {
  return getContract({ abi: pancakeSquadAbi, address: getPancakeSquadAddress(), signer }) as PancakeSquad
}
export const getErc721CollectionContract = (signer?: Signer | Provider, address?: string, chainId?: number) => {
  return getContract({ abi: erc721CollectionAbi, address, signer, chainId }) as Erc721collection
}

export const getPotteryVaultContract = (address: string, signer?: Signer | Provider) => {
  return getContract({ abi: potteryVaultAbi, address, signer }) as PotteryVaultAbi
}

export const getZapContract = (signer?: Signer | Provider) => {
  return getContract({ abi: zapAbi, address: getZapAddress(), signer }) as Zap
}

export const getBCakeProxyContract = (proxyContractAddress: string, signer?: Signer | Provider) => {
  return getContract({ abi: bCakeProxyAbi, address: proxyContractAddress, signer }) as BCakeProxy
}

export const getBoxSaleContract = (chainId?: number, signer?: Signer | Provider) => {
  return getContract({ abi: boxSaleAbi, address: getBoxSaleAddress(chainId), signer })
}

export const getHalloweenBoxSaleContract = (chainId?: number, signer?: Signer | Provider) => {
  return getContract({ abi: boxSaleAbi, address: getHalloweenBoxSaleAddress(chainId), signer })
}

export const getBoxesOpenContract = (chainId?: number, signer?: Signer | Provider) => {
  return getContract({ abi: boxesOpenAbi, address: getBoxesOpenAddress(chainId), signer })
}

export const getHalloweenBoxesOpenContract = (chainId?: number, signer?: Signer | Provider) => {
  return getContract({ abi: boxesOpenAbi, address: getHalloweenBoxesOpenAddress(chainId), signer })
}

export const getRefferalContract = (chainId?: number, signer?: Signer | Provider) => {
  return getContract({ abi: refferalAbi, address: getRefferalAddress(chainId), signer })
}

export const getCommContract = (chainId?: number, signer?: Signer | Provider) => {
  return getContract({ abi: commAbi, address: getCommAddress(chainId), signer })
}