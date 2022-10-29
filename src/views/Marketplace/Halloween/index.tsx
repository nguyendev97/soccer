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

const CARDS_RARE = ['MBABE.png', 'HALLAND.png',]
const EQUIPS_COMMON = ["common/baker hat.jpg","common/chartreuse.jpg","common/chelse shoes.jpg","common/chemistry gloves.jpg","common/cover glasses.jpg","common/espa shoes.jpg","common/frog glasses.jpg","common/green hat.jpg","common/green shoes.jpg","common/green soldier.jpg","common/green tail.jpg","common/kai gloves.jpg","common/labor gloves.jpg","common/mon shoes.jpg","common/packing gloves.jpg","common/pilot hat.jpg","common/plastic gloves.jpg","common/sheriff hat.jpg","common/simple glass.jpg","common/simple gloves.jpg","common/sliper.jpg","common/sneaker shoes.jpg","common/thin glasses.jpg","common/tuxedo hat.jpg"]
const EQUIPS_RARE =["rare/Layer 30.jpg","rare/aLien hat.jpg","rare/blue glasses.jpg","rare/blue gloves.jpg","rare/blue tail .jpg","rare/boad shoes.jpg","rare/brogue shoes.jpg","rare/captain hat.jpg","rare/chuk shoes.jpg","rare/cinema glasses.jpg","rare/cover gloves.jpg","rare/cyan glasses.jpg","rare/fedora hat.jpg","rare/ford shoes.jpg","rare/goalie gloves.jpg","rare/hobnailed.jpg","rare/insu gloves.jpg","rare/kan gloves.jpg","rare/kun gloves.jpg","rare/monk shoes.jpg","rare/spy glasses.jpg","rare/technology.jpg","rare/worker hat.jpg","rare/xmen glasses.jpg"]
const EQUIPS_LEGEND =["legend/RED HAT.jpg","legend/af shoes.jpg","legend/dragonfly glasses.jpg","legend/explore glasses.jpg","legend/explore hat.jpg","legend/gold gloves.jpg","legend/moto hat.jpg","legend/movie glasses.jpg","legend/nike air shoes.jpg","legend/nike shoes.jpg","legend/red gloves.jpg","legend/ruby gloves.jpg","legend/super hat.jpg","legend/super shoes.jpg","legend/thanos gloves.jpg","legend/vr glasses.jpg"]
const EQUIPS_EPIC =["epic/Layer 33.jpg","epic/Layer 37.jpg","epic/Layer 40.jpg","epic/Layer 43.jpg","epic/Layer 45.jpg","epic/Layer 46.jpg","epic/Layer 47 copy 14.jpg","epic/Layer 47 copy 15.jpg","epic/Layer 72.jpg","epic/Layer 79.jpg","epic/Layer 80.jpg","epic/Layer 82.jpg","epic/Layer 83.jpg","epic/Layer 84 copy.jpg","epic/derby shoes.jpg","epic/fire gloves.jpg","epic/sport shoes.jpg","epic/vapor shoes.jpg","epic/vas shoes.jpg","epic/violet gloves.jpg"]

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
                    {[...CARDS_RARE, ...EQUIPS_LEGEND, ...EQUIPS_EPIC, ...EQUIPS_RARE, ...EQUIPS_COMMON].map((card) => {
                        return (
                          <SwiperSlide key={card}><img style={{ height: 250 }} src={`/images/cards/equipments/${card}`} alt="card" /></SwiperSlide>
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