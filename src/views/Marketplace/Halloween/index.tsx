import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useWeb3React } from '@pancakeswap/wagmi'
import Page from 'components/Layout/Page'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper"
import { Flex, Heading, Text, useToast, Input, useModal, AutoRenewIcon, Grid } from '@pancakeswap/uikit'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import GradientButton from 'components/GradientButton'
import CountDown from 'components/CountDown'
import Image from 'next/image'
import { requiresApproval } from 'utils/requiresApproval'
import BigNumber from 'bignumber.js'
import { BUSD } from '@pancakeswap/tokens'
import { ChainId } from '@pancakeswap/sdk'
import { ethers } from 'ethers'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { getBalanceAmount, formatAmount } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useHalloweenBoxSaleContract, useERC20, useRefferalContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { getRefferalOwnerAddress } from 'utils/addressHelpers'
import Video from 'components/Video'
import VariousKickers from 'components/VariousKickers'
import RegisterModal from '../components/RegisterModal'
import { backgroundSoccerImage, borderImage, busdImage } from '../images'

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

const CARDS_RARE = ['rare/MBABE.png', 'rare/HALLAND.png',]
const EQUIPS = ["Layer 100.jpg","Layer 102.jpg","Layer 104.jpg","Layer 106.jpg","Layer 108.jpg","Layer 110.jpg","Layer 112.jpg","Layer 114.jpg","Layer 116.jpg","Layer 118.jpg","Layer 120.jpg","Layer 122.jpg","Layer 124.jpg","Layer 126.jpg","Layer 129.jpg","Layer 29 copy 2.jpg","Layer 33.jpg","Layer 47 copy 5.jpg","Layer 47 copy 7.jpg","Layer 47 copy 9.jpg","Layer 52 copy.jpg","Layer 60.jpg","Layer 62.jpg","Layer 63 copy.jpg","Layer 64.jpg","Layer 66.jpg","Layer 68 copy 2.jpg","Layer 68.jpg","Layer 70.jpg","Layer 72.jpg","Layer 74.jpg","Layer 76.jpg","Layer 78.jpg","Layer 80 copy.jpg","Layer 802.jpg","Layer 805.jpg","Layer 806.jpg","Layer 809.jpg","Layer 812 copy.jpg","Layer 814 copy.jpg","Layer 816.jpg","Layer 818.jpg","Layer 82.jpg","Layer 820.jpg","Layer 822.jpg","Layer 824.jpg","Layer 826.jpg","Layer 828.jpg","Layer 83.jpg","Layer 830.jpg","Layer 831.jpg","Layer 833.jpg","Layer 835.jpg","Layer 837.jpg","Layer 839 copy.jpg","Layer 84 copy.jpg","Layer 84.jpg","Layer 841.jpg","Layer 843 copy.jpg","Layer 845.jpg","Layer 847.jpg","Layer 849.jpg","Layer 851.jpg","Layer 853.jpg","Layer 855.jpg","Layer 857.jpg","Layer 859.jpg","Layer 86.jpg","Layer 861 copy.jpg","Layer 863 copy 2.jpg","Layer 863.jpg","Layer 865.jpg","Layer 867.jpg","Layer 870 copy.jpg","Layer 872.jpg","Layer 88.jpg","Layer 90.jpg","Layer 92.jpg","Layer 94.jpg","Layer 97.jpg"]

const HALLOWEEN_TYPE = 5
const refferalOwnerAddress = getRefferalOwnerAddress()

const Halloween = () => {
  const { isMobile } = useMatchBreakpoints()
  const router = useRouter()
  const { account, chainId } = useWeb3React()
  const [refAddress, setRefAddress] = useState('')
  const [amount, setAmount] = useState(1)
  const [remain, setRemain] = useState(0)
  const [isRegistered, setIsRegistered] = useState(false)
  const [priceOfBox, setPriceOfBox] = useState<number>(0)
  const boxSaleContract = useHalloweenBoxSaleContract()
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
    boxSaleContract.prices(HALLOWEEN_TYPE).then((price) => {
      const busdBalance = getBalanceAmount(new BigNumber(price._hex))
      setPriceOfBox(busdBalance.toNumber())
    })

    // Get amount of remaining boxes
    boxSaleContract.remains(HALLOWEEN_TYPE).then((res) => setRemain(res.toNumber()))

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
      return callWithGasPrice(boxSaleContract, 'buy', [HALLOWEEN_TYPE, amount])
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
            Halloween box
          </HeadingBorder>
          <Grid my="30px" gridGap="24px" gridTemplateColumns={['1fr', null, null, '3fr 2fr']}>
            <StyledFlexWrapper>
              <StyledSoccerBox p={['30px 0px', null, '30px']}>
                <CountDown date="2022/11/29" />
                <Video maxWidth="300px" maxHeight="300px" src="/videos/halloween.mp4" />
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
                  {rarity: "Common kicker", background: "rgba(68, 243, 107, 0.7)", percent: "37"},
                  {rarity: "Rare kicker", background: "rgba(44, 66, 228, 0.7)", percent: "33"},
                  {rarity: "Epic kicker", background: "rgba(118, 23, 183, 0.7)", percent: "25"},
                  {rarity: "Legendary kicker", background: "rgba(255, 210, 59, 0.5)", percent: "5"}
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
                    // pagination
                    navigation
                    spaceBetween={8}
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    slidesPerView={isMobile ? 2.1 : 2.3}>
                    {[...CARDS_RARE, ...EQUIPS.map(e => `equipments/${e}`)].map((card) => {
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

export default Halloween

const BannerSoccer = styled.div<{ src: string; isMobile: boolean }>`
  padding-top: 30px;
  padding-bottom: 90px;
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
  background: linear-gradient(164.38deg, rgb(29 1 141 / 70%) 10.92%, rgba(29, 9, 107, 0) 134.72%);
  border-radius: 10px;
  margin: auto;
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