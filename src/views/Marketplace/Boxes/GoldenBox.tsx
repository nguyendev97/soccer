import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Flex, Text, useToast, useModal, AutoRenewIcon, Grid } from '@pancakeswap/uikit'
import GradientButton from 'components/GradientButton'
import Image from 'next/image'
import { requiresApproval } from 'utils/requiresApproval'
import BigNumber from 'bignumber.js'
import { CAKE } from '@pancakeswap/tokens'
import { ChainId } from '@pancakeswap/sdk'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import { ethers } from 'ethers'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { getBalanceAmount, formatAmount, getBalanceNumber } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useBoxSaleContract, useERC20, useRefferalContract } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { getRefferalOwnerAddress, getBoxSaleAddress } from 'utils/addressHelpers'
import Video from 'components/Video'
import { Swiper, SwiperSlide } from 'swiper/react'
import VariousKickers from 'components/VariousKickers'
import 'swiper/css/bundle'
import { EffectCoverflow, Navigation, Autoplay } from 'swiper'
import RegisterModal from '../components/RegisterModal'
import { backgroundSoccerImage, borderImage, sotIcon } from '../images'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import {
  BannerSoccer,
  HeadingBorder,
  InputAmout,
  PapeStyled,
  StyledFlexWrapper,
  StyledSoccerBox,
  TextCount,
  TextInfo,
} from './styles'
import {
  CARDS_COMMON,
  CARDS_EPIC,
  CARDS_LEGEND,
  CARDS_RARE,
  EQUIPS_COMMON,
  EQUIPS_EPIC,
  EQUIPS_LEGEND,
  EQUIPS_RARE,
} from './constants'

const BOX_TYPE = 2
const refferalOwnerAddress = getRefferalOwnerAddress()

const GoldenBox = () => {
  const { isMobile } = useMatchBreakpoints()
  const router = useRouter()
  const { account, chainId } = useWeb3React()
  const [refAddress, setRefAddress] = useState('')
  const [amount, setAmount] = useState(1)
  const [remain, setRemain] = useState(0)
  const [isRegistered, setIsRegistered] = useState(false)
  const [priceOfBox, setPriceOfBox] = useState<number>(0)
  const boxSaleAddress = getBoxSaleAddress(chainId)
  const boxSaleContract = useBoxSaleContract(boxSaleAddress)
  const refferalContract = useRefferalContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const busdContract = useERC20(CAKE[chainId]?.address || CAKE[ChainId.BSC]?.address)
  const { balance } = useTokenBalance(CAKE[chainId]?.address || CAKE[ChainId.BSC]?.address, false)
  const userBusdBalance = getBalanceNumber(balance)

  useEffect(() => {
    if (router.query.ref) {
      setRefAddress(router.query.ref as string)
    } else {
      setRefAddress(refferalOwnerAddress)
    }
  }, [router.query])

  useEffect(() => {
    // Get Price of each box
    boxSaleContract.prices(BOX_TYPE).then((price) => {
      const busdBalance = getBalanceAmount(new BigNumber(price._hex))
      setPriceOfBox(busdBalance.toNumber())
    })

    // Get amount of remaining boxes
    boxSaleContract.remains(BOX_TYPE).then((res) => {
      // const diff = dateDiffIndays(fromDate)
      // const fakeBought = 4000 + 5000 + 261
      setRemain(res.toNumber())
    })

    // Check if registered yet
    if (account) {
      refferalContract.isReferrer(account).then(setIsRegistered)
    }
  }, [amount, boxSaleContract, account, refferalContract])

  const [onPresentRegisterModal] = useModal(
    <RegisterModal refAddress={refAddress} rootRef={refferalOwnerAddress} onDone={() => setIsRegistered(true)} />,
  )

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
      return callWithGasPrice(boxSaleContract, 'buy', [BOX_TYPE, amount])
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
          <HeadingBorder mt="32px" width="100%" src={borderImage?.src} isMobile={isMobile} style={{ color: '#ffd700' }}>
            Golden box
          </HeadingBorder>
          <Grid my="30px" gridGap="24px" gridTemplateColumns={['1fr', null, null, '3fr 2fr']}>
            <StyledFlexWrapper>
              <StyledSoccerBox p={['30px 0px', null, '30px']}>
                {/* <CountDown date="2022/11/18" /> */}
                <Video maxWidth="300px" maxHeight="300px" src="/videos/Golden.mp4" />
                <Flex style={{ marginTop: '15px', marginBottom: '20px' }}>
                  <TextInfo style={{ marginRight: '20px' }}>
                    Amount:{' '}
                    <InputAmout type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
                  </TextInfo>
                  <TextInfo>
                    Remain: <TextCount>{remain}</TextCount>
                  </TextInfo>
                </Flex>

                {account ? (
                  <Flex flexDirection="column">
                    <GradientButton
                      endIcon={isApproving || isConfirming ? <AutoRenewIcon spin color="currentColor" /> : undefined}
                      disabled={isApproving || isConfirming || isNotEnoughBalance}
                      onClick={isApproved ? handleConfirm : handleApprove}
                      fontSize="16px"
                      fontWeight="700"
                    >
                      <Flex style={{ alignItems: 'center' }}>
                        <Image src={sotIcon} width="26px" />
                        <Text bold fontSize="20px" color="#fff" style={{ marginLeft: '10px' }}>
                          {isApproving && 'Approving'}
                          {isConfirming && 'Confirming'}
                          {!isApproving &&
                            !isConfirming &&
                            (`${formatAmount(priceOfBox * amount)} SOT` || 'loading...')}
                        </Text>
                      </Flex>
                    </GradientButton>
                    {isNotEnoughBalance ? (
                      <Text mt="2px" color="#ED4B9E" bold>
                        Insufficient balance
                      </Text>
                    ) : null}
                    {!isRegistered && (
                      <GradientButton
                        mt="12px"
                        disabled={refAddress === ''}
                        onClick={onPresentRegisterModal}
                        fontSize="16px"
                        fontWeight="700"
                      >
                        Register & Earn rewards!
                      </GradientButton>
                    )}
                  </Flex>
                ) : (
                  <ConnectWalletButton />
                )}

                <Flex alignItems="center" mt="12px">
                  <Text mr="8px">Your balance: </Text>
                  <Image src={sotIcon} width="20px" height="20px" />
                  <Text bold color="#fff" ml="4px">
                    {formatAmount(userBusdBalance)}
                  </Text>
                </Flex>
              </StyledSoccerBox>
            </StyledFlexWrapper>
            <Flex flexDirection="column" justifyContent="space-between">
              {/* {isMobile && <ReferralBox accountAddress={account} />} */}
              <Flex mt={['32px', null, '0px']} flexDirection="column">
                <Text bold textAlign="center" style={{ fontSize: '18px' }} mb="12px">
                  Soccer box contains various Heroes with certain drop rates.
                </Text>
                <VariousKickers
                  rarities={[
                    { rarity: 'Common', background: 'rgba(68, 243, 107, 0.7)', percent: '19' },
                    { rarity: 'Rare', background: 'rgba(44, 66, 228, 0.7)', percent: '34' },
                    { rarity: 'Epic', background: 'rgba(118, 23, 183, 0.7)', percent: '39' },
                    { rarity: 'Legendary', background: 'rgba(255, 210, 59, 0.5)', percent: '8' },
                  ]}
                />
              </Flex>
              <Flex mt="32px" flexDirection="column">
                <Text fontSize="18px" bold>
                  CARDS
                </Text>
                <Flex maxWidth={['350px', null, '450px']} mt="12px">
                  <Swiper
                    autoplay={{
                      delay: 1000,
                      disableOnInteraction: false,
                    }}
                    grabCursor
                    navigation
                    spaceBetween={8}
                    modules={[EffectCoverflow, Navigation, Autoplay]}
                    slidesPerView={isMobile ? 2.1 : 2.3}
                  >
                    {[
                      ...CARDS_LEGEND,
                      ...CARDS_EPIC,
                      ...CARDS_RARE,
                      ...CARDS_COMMON,
                      ...EQUIPS_LEGEND,
                      ...EQUIPS_EPIC,
                      ...EQUIPS_RARE,
                      ...EQUIPS_COMMON,
                    ].map((card) => {
                      return (
                        <SwiperSlide key={card}>
                          <img style={{ height: 250 }} src={`/images/cards/${card}`} alt="card" />
                        </SwiperSlide>
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

export default GoldenBox
