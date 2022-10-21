import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@pancakeswap/wagmi'
import { Flex, useModal, useToast } from '@pancakeswap/uikit'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useERC1155, useBoxesOpenContract } from 'hooks/useContract'
import { getBoxesAddress } from 'utils/addressHelpers'
import { ToastDescriptionWithTx } from 'components/Toast'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import BoxItem from '../components/BoxItem'
import { specialBoxImage, goldBoxImage, silverBoxImage, commonBoxImage } from '../images'

const StyledFlexWrapper = styled.div`
  width: 100%;
`

export const Container = styled.div`
  margin: 0 auto;
`
export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
`
export const Col4 = styled.div`
  width: calc(100% / 4);
  padding: 0 12px;
`

const boxesAddress = getBoxesAddress()
const SPECIAL_TYPE = 1

const SoccerBox = () => {
  const { account } = useWeb3React()
  const { toastSuccess } = useToast()
  const [amountBox, setAmountBox] = useState(0)
  const { callWithGasPrice } = useCallWithGasPrice()
  const boxesContract = useERC1155(boxesAddress)
  const boxesOpenContract = useBoxesOpenContract()

  useEffect(() => {
    if (account) {
      boxesContract.balanceOf(account, SPECIAL_TYPE).then(res => setAmountBox(res.toNumber()))
    }
  }, [account, boxesContract])

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const approvedForContract = await boxesContract.isApprovedForAll(account, boxesOpenContract.address)
        return !approvedForContract
      } catch (error) {
        return true
      }
    },
    onApprove: () => {
      return callWithGasPrice(boxesContract, 'setApprovalForAll', [boxesOpenContract.address, true])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        'Contract approved - You can now open boxes!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    onConfirm: () => {
      return callWithGasPrice(boxesOpenContract, 'open', [Date.now(), [SPECIAL_TYPE], [3]])
    },
    onSuccess: async ({ receipt }) => {
      toastSuccess(
        `Opened ${amountBox} box(es) just now`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
  })

  return (
    <>
      <StyledFlexWrapper>
        <Container>
          <Row>
            <Col4>
              <BoxItem pendingTx={isApproving || isConfirming} totalBox={amountBox} avatar={specialBoxImage} boxName="Special box" onClick={isApproved ? handleConfirm : handleApprove} />
            </Col4>
            {/* <Col4>
              <BoxItem avatar={goldBoxImage} boxName="Gold box" />
            </Col4>
            <Col4>
              <BoxItem avatar={silverBoxImage} boxName="Silver box" />
            </Col4>
            <Col4>
              <BoxItem avatar={commonBoxImage} boxName="Common box" />
            </Col4> */}
          </Row>
        </Container>
      </StyledFlexWrapper>
    </>
  )
}

export default SoccerBox
