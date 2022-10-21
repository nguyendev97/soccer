import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Flex, Heading, Text, useToast, Input } from '@pancakeswap/uikit'
import GradientButton from 'components/GradientButton'
import CountDown from 'components/CountDown'
import Image from 'next/image'
import { requiresApproval } from 'utils/requiresApproval'
import BigNumber from 'bignumber.js'
import { BUSD } from '@pancakeswap/tokens'
import { ChainId } from '@pancakeswap/sdk'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import { ethers } from 'ethers'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { getBalanceAmount, formatAmount } from 'utils/formatBalance'
// import useTokenBalance from 'hooks/useTokenBalance'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useBoxSaleContract, useERC20 } from 'hooks/useContract'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { backgroundSoccerImage, specialSellBoxImage, borderImage, busdImage } from '../images'

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
const SPECIAL_TYPE = 1

const SpecialBox = () => {
  const { isMobile } = useMatchBreakpoints()
  const { account, chainId } = useWeb3React()
  const [amount, setAmount] = useState(1)
  const [remain, setRemain] = useState(0)
  const [priceOfBox, setPriceOfBox] = useState<number>(0)
  // const { balance, fetchStatus } = useTokenBalance(BUSD[chainId]?.address || BUSD[ChainId.BSC]?.address, true) // todo: Show out user's balance
  const boxSaleContract = useBoxSaleContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const busdContract = useERC20(BUSD[chainId]?.address || BUSD[ChainId.BSC]?.address)

  useEffect(() => {
    boxSaleContract.prices(SPECIAL_TYPE).then((price) => {
      const busdBalance = getBalanceAmount(new BigNumber(price._hex))
      setPriceOfBox(busdBalance.toNumber())
    })
    boxSaleContract.remains(SPECIAL_TYPE).then((res) => setRemain(res.toNumber()))
  }, [amount, boxSaleContract])

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
  return (
    <>
      <BannerSoccer src={backgroundSoccerImage?.src} isMobile={isMobile}>
        <StyledFlexWrapper>
          <Heading textAlign="center" fontWeight="500" style={{ color: '#fff', fontSize: isMobile ? '18px' : '26px' }}>
            Soccer box contains various Heroes with certain drop rates.
          </Heading>
          <StyledSoccerBox>
            <HeadingBorder src={borderImage?.src} isMobile={isMobile}>
              Special box
            </HeadingBorder>
            <CountDown date="2022/11/30" />
            <Image src={specialSellBoxImage} alt="Box" className="box-image" />
            <Flex style={{ marginTop: '20px', marginBottom: '30px' }}>
              <TextInfo style={{ marginRight: '20px' }}>
                Amount: <InputAmout type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
              </TextInfo>
              <TextInfo>
                Remain: <TextCount>{remain}</TextCount>
              </TextInfo>
            </Flex>
            {account ? (
              <GradientButton
                disabled={isApproving || isConfirming}
                onClick={isApproved ? handleConfirm : handleApprove}
                fontSize="16px"
                fontWeight="700"
              >
                <Flex style={{ alignItems: 'center' }}>
                  <Image src={busdImage} width="26px" />
                  <Text bold fontSize="20px" color="#fff" style={{ marginLeft: '10px' }}>
                    {isApproving && 'Approving ...'}
                    {isConfirming && 'Confirming ...'}
                    {!isApproving && !isConfirming && (`${formatAmount(priceOfBox * amount)} BUSD` || 'loading...')}
                  </Text>
                </Flex>
              </GradientButton>
            ) : (
              <ConnectWalletButton />
            )}
          </StyledSoccerBox>
        </StyledFlexWrapper>
      </BannerSoccer>
    </>
  )
}

export default SpecialBox
