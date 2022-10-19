import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Flex, Heading, Text, useToast } from '@pancakeswap/uikit'
import GradientButton from 'components/GradientButton'
import CountDown from 'components/CountDown'
import Image from 'next/image'
import { requiresApproval } from 'utils/requiresApproval'
import BigNumber from 'bignumber.js'
import { BUSD } from '@pancakeswap/tokens'
import { ChainId } from '@pancakeswap/sdk'
import { ethers } from 'ethers'
import { formatNumber, getBalanceAmount } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useBoxSaleContract, useERC20 } from 'hooks/useContract'
import { getBoxesAddress } from 'utils/addressHelpers'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'
import { soccerBoxImage, borderImage, busdImage } from '../images'

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

const HeadingBorder = styled(Heading)<{ src: string }>`
  font-weight: 700;
  font-size: 36px;
  color: #fff;
  text-transform: uppercase;
  display: inline-block;
  padding-left: 150px;
  padding-right: 150px;
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

const SpecialBox = () => {
  const { account, chainId } = useWeb3React()
  const [amount, setAmount] = useState(1) // todo: Amount Input
  const [priceOfBoxes, setPriceOfBoxes] = useState<string | undefined>()
  const { balance, fetchStatus } = useTokenBalance(BUSD[chainId]?.address || BUSD[ChainId.BSC]?.address, true) // todo: Show out user's balance
  const boxSaleContract = useBoxSaleContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const busdContract = useERC20(BUSD[chainId]?.address || BUSD[ChainId.BSC]?.address)

  useEffect(() => {
    boxSaleContract.prices(amount).then((price) => {
      const busdBalance = getBalanceAmount(new BigNumber(price._hex))
      setPriceOfBoxes(formatNumber(busdBalance.toNumber(), 0, 2))
    })
  }, [amount, boxSaleContract])

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      return requiresApproval(busdContract, account, boxSaleContract.address)
    },
    onApprove: () => {
      return callWithGasPrice(busdContract, 'approve', [
        boxSaleContract.address,
        ethers.constants.MaxUint256,
      ])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        'Contract approved - You can now buy boxes!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    onConfirm: () => {
      return callWithGasPrice(boxSaleContract, 'buy', [
        1,
        amount,
      ])
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess(`Bought ${amount} box(es) successfully!`, <ToastDescriptionWithTx txHash={receipt.transactionHash} />)
    }
  })
  return (
    <>
      <StyledFlexWrapper>
        <Heading textAlign="center" fontWeight="500" style={{ color: '#fff', fontSize: '26px' }}>
          Soccer box contains various Heroes with certain drop rates.
        </Heading>
        <StyledSoccerBox>
          <HeadingBorder src={borderImage?.src}>Special box</HeadingBorder>
          <CountDown date="2022/11/30" />
          <Image src={soccerBoxImage} alt="Box" className="box-image" />
          <Flex style={{ marginTop: '20px', marginBottom: '30px' }}>
            <TextInfo style={{ marginRight: '20px' }}>
              Amount: <TextCount>1000</TextCount>
            </TextInfo>
            <TextInfo>
              Remain: <TextCount>596</TextCount>
            </TextInfo>
          </Flex>
          <GradientButton disabled={isApproving || isConfirming} onClick={isApproved ? handleConfirm : handleApprove} fontSize="16px" fontWeight='700'>
            {/* isApproving => show text Approving */}
            {/* isConfirming => show text Confirming */}
            <Flex style={{ alignItems: 'center' }}>
              <Image src={busdImage} width="26px" />
              <Text bold fontSize="20px" color="#fff" style={{ marginLeft: '10px' }}>
                {priceOfBoxes ? priceOfBoxes : 'loading...'} BUSD
              </Text>
            </Flex>
          </GradientButton>
        </StyledSoccerBox>
      </StyledFlexWrapper>
    </>
  )
}

export default SpecialBox
