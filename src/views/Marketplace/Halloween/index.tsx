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
import { dateDiffIndays, fromDate } from '../SpecialBox'
import RegisterModal from '../components/RegisterModal'
import { backgroundSoccerImage, borderImage, busdImage } from '../images'

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

const CARDS_RARE = ['halloween/MBABE.png', 'halloween/HALLAND.png',]
const EQUIPS_COMMON = ["halloween/equipments/epic common/Layer 33.png","halloween/equipments/epic common/Layer 47 copy 5.png","halloween/equipments/epic common/Layer 52 copy.png","halloween/equipments/epic common/Layer 63 copy.png","halloween/equipments/epic common/Layer 68 copy 2.png","halloween/equipments/epic common/Layer 802.png","halloween/equipments/epic common/Layer 805.png","halloween/equipments/epic common/Layer 806.png","halloween/equipments/epic common/Layer 809.png","halloween/equipments/epic common/Layer 812 copy.png","halloween/equipments/epic common/Layer 814 copy.png","halloween/equipments/epic common/Layer 816.png","halloween/equipments/epic common/Layer 818.png","halloween/equipments/epic common/Layer 82.png","halloween/equipments/epic common/Layer 820.png","halloween/equipments/epic common/Layer 822.png","halloween/equipments/epic common/Layer 824.png","halloween/equipments/epic common/Layer 826.png","halloween/equipments/epic common/Layer 828.png","halloween/equipments/epic common/Layer 83.png","halloween/equipments/epic common/Layer 830.png","halloween/equipments/epic common/Layer 831.png","halloween/equipments/epic common/Layer 833.png","halloween/equipments/epic common/Layer 835.png","halloween/equipments/epic common/Layer 837.png","halloween/equipments/epic common/Layer 839 copy.png","halloween/equipments/epic common/Layer 84 copy.png","halloween/equipments/epic common/Layer 84.png","halloween/equipments/epic common/Layer 841.png","halloween/equipments/epic common/Layer 843 copy.png","halloween/equipments/epic common/Layer 845.png","halloween/equipments/epic common/Layer 847.png","halloween/equipments/epic common/Layer 849.png","halloween/equipments/epic common/Layer 851.png","halloween/equipments/epic common/Layer 853.png","halloween/equipments/epic common/Layer 855.png","halloween/equipments/epic common/Layer 857.png","halloween/equipments/epic common/Layer 859.png","halloween/equipments/epic common/Layer 861 copy.png","halloween/equipments/epic common/Layer 863.png","halloween/equipments/epic common/Layer 865.png","halloween/equipments/epic common/Layer 867.png","halloween/equipments/epic common/Layer 870 copy.png","halloween/equipments/epic common/Layer 872.png"]
const EQUIPS_EPIC =["halloween/equipments/rare legend/Layer 100.png","halloween/equipments/rare legend/Layer 102.png","halloween/equipments/rare legend/Layer 104.png","halloween/equipments/rare legend/Layer 106.png","halloween/equipments/rare legend/Layer 108.png","halloween/equipments/rare legend/Layer 110.png","halloween/equipments/rare legend/Layer 112.png","halloween/equipments/rare legend/Layer 114.png","halloween/equipments/rare legend/Layer 116.png","halloween/equipments/rare legend/Layer 118.png","halloween/equipments/rare legend/Layer 120.png","halloween/equipments/rare legend/Layer 122.png","halloween/equipments/rare legend/Layer 124.png","halloween/equipments/rare legend/Layer 126.png","halloween/equipments/rare legend/Layer 129.png","halloween/equipments/rare legend/Layer 29 copy 2.png","halloween/equipments/rare legend/Layer 47 copy 7.png","halloween/equipments/rare legend/Layer 47 copy 9.png","halloween/equipments/rare legend/Layer 60.png","halloween/equipments/rare legend/Layer 62.png","halloween/equipments/rare legend/Layer 64.png","halloween/equipments/rare legend/Layer 66.png","halloween/equipments/rare legend/Layer 68.png","halloween/equipments/rare legend/Layer 70.png","halloween/equipments/rare legend/Layer 72.png","halloween/equipments/rare legend/Layer 74.png","halloween/equipments/rare legend/Layer 76.png","halloween/equipments/rare legend/Layer 78.png","halloween/equipments/rare legend/Layer 80 copy.png","halloween/equipments/rare legend/Layer 812 copy.png","halloween/equipments/rare legend/Layer 82.png","halloween/equipments/rare legend/Layer 839 copy.png","halloween/equipments/rare legend/Layer 84.png","halloween/equipments/rare legend/Layer 86.png","halloween/equipments/rare legend/Layer 863 copy 2.png","halloween/equipments/rare legend/Layer 88.png","halloween/equipments/rare legend/Layer 90.png","halloween/equipments/rare legend/Layer 92.png","halloween/equipments/rare legend/Layer 94.png","halloween/equipments/rare legend/Layer 97.png"]

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
    boxSaleContract.remains(HALLOWEEN_TYPE).then((res) => {
      const diff = dateDiffIndays(fromDate)
      const fakeBought = diff * 999
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
                    {[...CARDS_RARE, ...EQUIPS_EPIC, ...EQUIPS_COMMON].map((card) => {
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