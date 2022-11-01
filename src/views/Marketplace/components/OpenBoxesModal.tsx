import {
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer as UIKitModalContainer,
  ModalHeader as UIKitModalHeader,
  ModalTitle,
  Input,
  Flex,
  useToast,
  useModal,
  Box,
  AutoRenewIcon
} from '@pancakeswap/uikit'
import Image from 'next/image'
import cloneDeep from 'lodash/cloneDeep'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useState, useEffect } from 'react'
import { callWithEstimateGas } from 'utils/calls'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useERC1155, useBoxesOpenContract, useHalloweenBoxesOpenContract, useERC721 } from 'hooks/useContract'
import { getBoxesAddress, getPlayersAddress, getEquipmentsAddress } from 'utils/addressHelpers'
import { ToastDescriptionWithTx } from 'components/Toast'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useTranslation } from '@pancakeswap/localization'
import GradientButton from 'components/GradientButton'
import styled from 'styled-components'
import SuccessModal from 'views/Marketplace/components/SuccessModal'
import { specialSellBoxImage, halloweenBoxImage } from '../images'

const SPECIAL_TYPE = 1
const HALLOWEEN_TYPE = 5

const ModalContainer = styled(UIKitModalContainer)`
  background: ${({ theme }) => theme.colors.modalBackground};
  border: 0;
`
const ModalHeader = styled(UIKitModalHeader)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.modalBorder};
`
const ModalBodyContent = styled.div`
  border: 0;
`
const CodeInput = styled(Input)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-weight: 400;
  font-size: 16px;
  height: 44px;
  color: white;
`
const FlexModalBottom = styled(Flex)`
  margin-top: 30px;
  justify-content: space-between;
`

const RegisterButton = styled(GradientButton)`
  width: 100%;
`

interface OpenBoxesModalProps extends InjectedModalProps {
  maxAmount: number
  type?: string
}

const HALLOWEEN = 'halloween'

const MAX_AMOUNT = 5

const OpenBoxesModal: React.FC<React.PropsWithChildren<OpenBoxesModalProps>> = ({ onDismiss, maxAmount, type }) => {
  const { t } = useTranslation()
  const [metaDatas, setMetaDatas] = useState([])
  const [playerBalances, setPlayerBalances] = useState(0)
  const [equipmentBalances, setEquipmentBalances] = useState(0)
  const { account, chainId } = useWeb3React()
  const boxesAddress = getBoxesAddress(chainId)
  const playersAddress = getPlayersAddress(chainId)
  const equipmentsAddress = getEquipmentsAddress(chainId)
  const [amountBoxes, setAmount] = useState(1)
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const boxesContract = useERC1155(boxesAddress)
  const playersContract = useERC721(playersAddress)
  const equipmentsContract = useERC721(equipmentsAddress)
  const boxesOpenContract = useBoxesOpenContract()
  const halloweenBoxesOpenContract = useHalloweenBoxesOpenContract()
  const [onPresentSuccessModal] = useModal(<SuccessModal type={type} metaDatas={metaDatas} />)
  const selectedBoxesOpenContract = type === HALLOWEEN ? halloweenBoxesOpenContract : boxesOpenContract

  useEffect(() => {
    playersContract
      .balanceOf(account)
      .then(res => setPlayerBalances(res.toNumber()))

    equipmentsContract
      .balanceOf(account)
      .then(res => setEquipmentBalances(res.toNumber()))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account])
  // console.log({playerBalances, equipmentBalances })
  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      try {
        const approvedForContract = await boxesContract.isApprovedForAll(account, selectedBoxesOpenContract.address)
        return !approvedForContract
      } catch (error) {
        return true
      }
    },
    onApprove: () => {
      return callWithGasPrice(boxesContract, 'setApprovalForAll', [selectedBoxesOpenContract.address, true])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        'Contract approved - You can now open boxes!',
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    onConfirm: () => {
      return callWithEstimateGas(selectedBoxesOpenContract, 'open', [Date.now(), [type === HALLOWEEN ? HALLOWEEN_TYPE : SPECIAL_TYPE], [amountBoxes]], null, amountBoxes * 100000)
    },
    onSuccess: async ({ receipt }) => {

      const fetchMetas = (contract, previousBalance) => {
        
        return contract
          .balanceOf(account)
          .then((res) => {
            let amountCloned = cloneDeep(previousBalance)
            const balance = res.toNumber()
            // console.log({contract, previousBalance, balance})
            // eslint-disable-next-line prefer-const
            let newIds = []
            while (amountCloned < balance) {
              amountCloned++
              newIds.push(amountCloned - 1)
            }
            return newIds
          })
          .then(async (newIds) => {
            // console.log({newIds})
            // eslint-disable-next-line prefer-const
            let tasks = []
            newIds.forEach((id) => {
              tasks.push(contract.tokenOfOwnerByIndex(account, id))
            })
            const res = await Promise.all(tasks)
            const tokenIds = res.map((tokenId) => tokenId.toNumber())

            tasks = []
            tokenIds.forEach((id) => {
              tasks.push(contract.tokenURI(id))
            })
            const tokenURIRes = await Promise.all(tasks)

            tasks = []
            tokenURIRes.forEach(uri => {
              const fetchMeta = async () => {
                const uriRes = await fetch(uri)
                if (uriRes.ok) {
                  const json = await uriRes.json()
                  return json
                }
                return null
              }
              tasks.push(fetchMeta())
            })
            const metas = await Promise.all(tasks)
            return metas
          })
      }
      const resMetas = await Promise.all([
        fetchMetas(playersContract, playerBalances),
        fetchMetas(equipmentsContract, equipmentBalances)
      ])
      setMetaDatas(resMetas.flat())
      toastSuccess(
        `Opened ${amountBoxes} box(es) just now`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
  })

  useEffect(() => {
    const max = Math.min(MAX_AMOUNT, maxAmount)
    if (amountBoxes > max) {
      setAmount(max)
    }
  }, [amountBoxes, maxAmount])

  useEffect(() => {
    if (metaDatas.length) {
      onPresentSuccessModal()
    }
  }, [metaDatas, onPresentSuccessModal])
  
  return (
    <ModalContainer title={t('Open special box(es)!')} $minWidth="440px">
      <ModalHeader>
        <ModalTitle>
          <Heading style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>{`Open ${type === HALLOWEEN ? 'halloween' : 'special'} box(es) !`}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#fff" />
        </IconButton>
      </ModalHeader>
      <ModalBody p="24px" width="100%">
        <ModalBodyContent>
          <Flex flexDirection="column" alignItems="center">
            <Box width="50%" mb="8px">
              <Image src={type === HALLOWEEN ? halloweenBoxImage : specialSellBoxImage} alt="Box" className="box-image" />
            </Box>
            <CodeInput
              max={5}
              type="number"
              onChange={(event) => setAmount(parseInt(event.target.value))}
              value={amountBoxes}
            />
          </Flex>
          <FlexModalBottom>
            <RegisterButton endIcon={isApproving || isConfirming ? <AutoRenewIcon spin color="currentColor" /> : undefined} onClick={isApproved ? handleConfirm : handleApprove}>
              {isApproving || isConfirming ? 'Loading' : !isApproved ? 'Approve' : 'Open now!'}
            </RegisterButton>
          </FlexModalBottom>
        </ModalBodyContent>
      </ModalBody>
    </ModalContainer>
  )
}

export default OpenBoxesModal
