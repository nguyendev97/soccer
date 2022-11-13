import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Flex, Heading, Text, useToast, Input, useModal, AutoRenewIcon, Grid } from '@pancakeswap/uikit'
import GradientButton from 'components/GradientButton'
import CountDown from 'components/CountDown'
import Page from 'components/Layout/Page'
import Image from 'next/image'
import { requiresApproval } from 'utils/requiresApproval'
import BigNumber from 'bignumber.js'
import { BUSD } from '@pancakeswap/tokens'
import { ChainId } from '@pancakeswap/sdk'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import { ethers } from 'ethers'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { getBalanceAmount, formatAmount } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useBoxSaleContract, useERC20, useRefferalContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { getRefferalOwnerAddress } from 'utils/addressHelpers'
import Video from 'components/Video'
import { Swiper, SwiperSlide } from 'swiper/react'
import VariousKickers from 'components/VariousKickers'
import 'swiper/css/bundle'
import { EffectCoverflow, Navigation, Autoplay } from "swiper"
import RegisterModal from '../components/RegisterModal'
import { backgroundSoccerImage, borderImage, busdImage } from '../images'

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/navigation"

const SPECIAL_TYPE = 1
const refferalOwnerAddress = getRefferalOwnerAddress()

export const dateDiffIndays = (date) => {
  const now = new Date()
  const fromDate = new Date(date);
  return -1 * Math.floor((Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()) - Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) ) /(1000 * 60 * 60 * 24));
}

const CARDS_LEGEND = ["legend/SoccerCrypto-player-Pogba.png","legend/SoccerCrypto-player-messi.png","legend/SoccerCrypto-player-neymar.png","legend/SoccerCrypto-player-ronaldo.png"]
const CARDS_COMMON = ["common/SoccerCrypto-player-1.png","common/SoccerCrypto-player-2.png","common/SoccerCrypto-player-Ahmed Zain.png","common/SoccerCrypto-player-Alejandro Brand.png","common/SoccerCrypto-player-Alphonso Davies.png","common/SoccerCrypto-player-Chicharito.png","common/SoccerCrypto-player-Hannibal Mejbri.png","common/SoccerCrypto-player-Harry Wilson.png","common/SoccerCrypto-player-Layer 39.png","common/SoccerCrypto-player-Luka Jovic.png","common/SoccerCrypto-player-Thomas Partey.png","common/SoccerCrypto-player-bdessamad Ezzalzouli.png","common/SoccerCrypto-player-carcelen.png","common/SoccerCrypto-player-eisa ahmed palangi.png"]
const CARDS_RARE = ["rare/Shahab Zahedi.png","rare/SoccerCrypto-player-Christian Pulisic.png","rare/SoccerCrypto-player-Mbabu.png","rare/SoccerCrypto-player-cavani.png","rare/SoccerCrypto-player-lewandowski.png","rare/SoccerCrypto-player-minamino.png","rare/SoccerCrypto-player-sadio mane.png","rare/SoccerCrypto-player-son heung min.png"]
const CARDS_EPIC = ["epic/SoccerCrypto-player-Frenkie de Jong.png","epic/SoccerCrypto-player-Lukaku.png","epic/SoccerCrypto-player-Toni kroos.png","epic/SoccerCrypto-player-harry kane.png","epic/SoccerCrypto-player-luka modric.png","epic/SoccerCrypto-player-sergio ramos.png"]

export const fromDate = "2022/11/12"
const SpecialBox = () => {
  const { isMobile } = useMatchBreakpoints()
  const router = useRouter()
  const { account, chainId } = useWeb3React()
  const [refAddress, setRefAddress] = useState('')
  const [amount, setAmount] = useState(1)
  const [remain, setRemain] = useState(0)
  const [isRegistered, setIsRegistered] = useState(false)
  const [priceOfBox, setPriceOfBox] = useState<number>(0)
  const boxSaleContract = useBoxSaleContract()
  const refferalContract = useRefferalContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const busdContract = useERC20(BUSD[chainId]?.address || BUSD[ChainId.BSC]?.address)
  const { balance } = useTokenBalance(BUSD[chainId]?.address || BUSD[ChainId.BSC]?.address, false)
  const userBusdBalance = getBalanceAmount(new BigNumber(balance)).toNumber()

  useEffect(() => {
    if (router.query.ref) {
      setRefAddress(router.query.ref as string)
    } else {
      setRefAddress(refferalOwnerAddress)
    }
  }, [router.query])
  
  useEffect(() => {
    // Get Price of each box
    boxSaleContract.prices(SPECIAL_TYPE).then((price) => {
      const busdBalance = getBalanceAmount(new BigNumber(price._hex))
      setPriceOfBox(busdBalance.toNumber())
    })

    // Get amount of remaining boxes
    boxSaleContract.remains(SPECIAL_TYPE).then((res) => {
      const diff = dateDiffIndays(fromDate)
      const fakeBought = 4000
      setRemain(res.toNumber() - fakeBought)
    })

    // Check if registered yet
    if (account) {
      refferalContract.isReferrer(account).then(setIsRegistered)
    }
    
  }, [amount, boxSaleContract, account, refferalContract])

  const [onPresentRegisterModal] = useModal(<RegisterModal refAddress={refAddress} rootRef={refferalOwnerAddress} onDone={() => setIsRegistered(true)} />)

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      return requiresApproval(busdContract, account, boxSaleContract.address)
    },
    onApprove: () => {
      return callWithGasPrice(busdContract, 'approve', [boxSaleContract.address, ethers.constants.MaxUint256])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        'Contract approved - You can now buy boxes!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    onConfirm: () => {
      return callWithGasPrice(boxSaleContract, 'buy', [SPECIAL_TYPE, amount])
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess(
        `Bought ${amount} box(es) successfully!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
  })

  const isNotEnoughBalance = userBusdBalance < priceOfBox * amount

  return (
    <>
      <BannerSoccer src={backgroundSoccerImage?.src} isMobile={isMobile}>
        <PapeStyled>
          <HeadingBorder mt="32px" width="100%" src={borderImage?.src} isMobile={isMobile}>
            Special box
          </HeadingBorder>
          <Grid my="30px" gridGap="24px" gridTemplateColumns={['1fr', null, null, '3fr 2fr']}>
            <StyledFlexWrapper>
              <StyledSoccerBox p={['30px 0px', null, '30px']}>
                <CountDown date="2022/11/18" />
                <Video maxWidth="300px" maxHeight="300px" src="/videos/special.mp4" />
                <Flex style={{ marginTop: '20px', marginBottom: '30px' }}>
                  <TextInfo style={{ marginRight: '20px' }}>
                    Amount: <InputAmout type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
                  </TextInfo>
                  <TextInfo>
                    Remain: <TextCount>{remain}</TextCount>
                  </TextInfo>
                </Flex>
                
                {account ? 
                  (<Flex flexDirection="column">
                    <GradientButton
                      endIcon={isApproving || isConfirming ? <AutoRenewIcon spin color="currentColor" /> : undefined}
                      disabled={isApproving || isConfirming || isNotEnoughBalance}
                      onClick={isApproved ? handleConfirm : handleApprove}
                      fontSize="16px"
                      fontWeight="700"
                    >
                      <Flex style={{ alignItems: 'center' }}>
                        <Image src={busdImage} width="26px" />
                        <Text bold fontSize="20px" color="#fff" style={{ marginLeft: '10px' }}>
                          {isApproving && 'Approving'}
                          {isConfirming && 'Confirming'}
                          {!isApproving && !isConfirming && (`${formatAmount(priceOfBox * amount)} BUSD` || 'loading...')}
                        </Text>
                      </Flex>
                    </GradientButton>
                    {isNotEnoughBalance ? <Text mt="2px" color="#ED4B9E" bold>Insufficient balance</Text> : null}
                    {!isRegistered && <GradientButton
                      mt="12px"
                      disabled={refAddress === ''}
                      onClick={onPresentRegisterModal}
                      fontSize="16px"
                      fontWeight="700"
                    >
                      Register & Earn rewards!
                    </GradientButton>}
                  </Flex> 
                ) : <ConnectWalletButton />}

                <Flex alignItems="center" mt="12px">
                  <Text mr="8px">Your balance: </Text>
                  <Image src={busdImage} width="20px" height="20px" />
                  <Text bold color="#fff" ml="4px">{formatAmount(userBusdBalance)}</Text>
                </Flex>
              </StyledSoccerBox>
            </StyledFlexWrapper>
            <Flex flexDirection="column" justifyContent="space-between">
              {/* {isMobile && <ReferralBox accountAddress={account} />} */}
              <Flex mt={["32px", null, "0px"]} flexDirection="column">
                <Text bold textAlign="center" style={{ fontSize: '18px' }} mb="12px">
                  Soccer box contains various Heroes with certain drop rates.
                </Text>
                <VariousKickers rarities={[
                  {rarity: "Common kicker", background: "rgba(68, 243, 107, 0.7)", percent: "17"},
                  {rarity: "Rare kicker", background: "rgba(44, 66, 228, 0.7)", percent: "43"},
                  {rarity: "Epic kicker", background: "rgba(118, 23, 183, 0.7)", percent: "30"},
                  {rarity: "Legendary kicker", background: "rgba(255, 210, 59, 0.5)", percent: "10"}
                ]} />
              </Flex>
              <Flex mt="32px" flexDirection="column">
                <Text fontSize='18px' bold>CARDS</Text>
                <Flex maxWidth={["350px", null, "450px"]} mt="12px">
                  <Swiper
                    autoplay={{
                      "delay": 1000,
                      "disableOnInteraction": false
                    }}
                    grabCursor
                    navigation
                    spaceBetween={8}
                    modules={[EffectCoverflow, Navigation, Autoplay]}
                    slidesPerView={isMobile ? 2.1 : 2.3}>
                    {[...CARDS_LEGEND, ...CARDS_EPIC, ...CARDS_RARE, ...CARDS_COMMON].map((card) => {
                        return (
                          <SwiperSlide key={card}><img style={{ height: 250 }} src={`/images/cards/${card}`} alt="card" /></SwiperSlide>
                        )
                    })}
                  </Swiper>
                </Flex>
              </Flex>
            </Flex>
          </Grid>
        </PapeStyled>
      </BannerSoccer>
    </>
  )
}

export default SpecialBox

const BannerSoccer = styled.div<{ src: string; isMobile: boolean }>`
  padding-top: 30px;
  padding-bottom: 90px;
  padding-left: ${({ isMobile }) => (isMobile ? '15px' : 0)};
  padding-right: ${({ isMobile }) => (isMobile ? '15px' : 0)};
  background-image: url('${({ src }) => src}');
  background-color: ${({ theme }) => theme.colors.backgroundAlt3};
  background-position: center bottom;
  background-repeat: no-repeat;
  background-size: cover;
`
const StyledFlexWrapper = styled.div`
  width: 100%;
`
const StyledSoccerBox = styled(Flex)`
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background: linear-gradient(164.38deg, rgb(29 1 141 / 70%) 10.92%, rgba(29, 9, 107, 0) 134.72%);
  border-radius: 10px;
  max-width: 900px;
  margin: auto;
  margin-top: 30px;
`
const HeadingBorder = styled(Heading)<{ src: string; isMobile: boolean }>`
  font-weight: 700;
  text-align: center;
  font-size: ${({ isMobile }) => (isMobile ? '24px' : '36px')};
  color: #fff;
  text-transform: uppercase;
  display: inline-block;
  padding-left: ${({ isMobile }) => (isMobile ? '60px' : '150px')};
  padding-right: ${({ isMobile }) => (isMobile ? '60px' : '150px')};
  padding-bottom: 30px;
  background-image: url('${({ src }) => src}');
  background-position: center bottom;
  background-repeat: no-repeat;
`
const TextInfo = styled(Text)`
  border: 1.5px solid #0a4db6;
  border-radius: 6px;
  font-size: 16px;
  padding: 10px;
  font-weight: 600;
  display: flex;
  align-items: baseline;
  color: #ccd3ff;
`
const TextCount = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  color: #ccd3ff;
  margin-left: 10px;
`
const InputAmout = styled(Input)`
  font-size: 18px;
  font-weight: 700;
  color: #ccd3ff;
  margin-left: 10px;
  width: 70px;
  background-color: transparent;
  border: 0;
  height: 30px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`

const PapeStyled = styled(Page)`
  min-height: calc(100vh - 364px);
`