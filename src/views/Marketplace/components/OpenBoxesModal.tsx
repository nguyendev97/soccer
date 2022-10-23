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
} from '@pancakeswap/uikit'
import Image from 'next/image'
import cloneDeep from 'lodash/cloneDeep'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useState, useEffect } from 'react'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useERC1155, useBoxesOpenContract, useERC721 } from 'hooks/useContract'
import { getBoxesAddress, getPlayersAddress } from 'utils/addressHelpers'
import { ToastDescriptionWithTx } from 'components/Toast'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { useTranslation } from '@pancakeswap/localization'
import GradientButton from 'components/GradientButton'
import styled from 'styled-components'
import SuccessModal from 'views/Marketplace/components/SuccessModal'
import { specialSellBoxImage } from '../images'

const boxesAddress = getBoxesAddress()
const playersAddress = getPlayersAddress()
const SPECIAL_TYPE = 1

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
  onDone: () => void
}

const MAX_AMOUNT = 3

const OpenBoxesModal: React.FC<React.PropsWithChildren<OpenBoxesModalProps>> = ({ onDismiss, onDone }) => {
  const { t } = useTranslation()
  const [metaDatas, setMetaDatas] = useState([])
  const { account } = useWeb3React()
  const [amountBoxes, setAmount] = useState(1)
  const { callWithGasPrice } = useCallWithGasPrice()
  const { toastSuccess } = useToast()
  const boxesContract = useERC1155(boxesAddress)
  const playersContract = useERC721(playersAddress)
  const boxesOpenContract = useBoxesOpenContract()
  const [onPresentSuccessModal] = useModal(<SuccessModal metaDatas={metaDatas} />)

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
      return callWithGasPrice(boxesOpenContract, 'open', [Date.now(), [SPECIAL_TYPE], [amountBoxes]])
    },
    onSuccess: async ({ receipt }) => {
      playersContract
        .balanceOf(account)
        .then((res) => {
          let amountCloned = cloneDeep(amountBoxes)
          const balance = res.toNumber()
          // eslint-disable-next-line prefer-const
          let newIds = []
          while (amountCloned > 0) {
            newIds.push(balance - amountCloned)
            amountCloned--
          }
          return newIds
        })
        .then(async (newIds) => {
          // eslint-disable-next-line prefer-const
          let tasks = []
          newIds.forEach((id) => {
            tasks.push(playersContract.tokenOfOwnerByIndex(account, id))
          })
          const res = await Promise.all(tasks)
          const tokenIds = res.map((tokenId) => tokenId.toNumber())

          tasks = []
          tokenIds.forEach((id) => {
            tasks.push(playersContract.tokenURI(id))
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
          setMetaDatas(metas)
        })
      toastSuccess(
        `Opened ${amountBoxes} box(es) just now`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
  })

  useEffect(() => {
    if (amountBoxes > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT)
    }
  }, [amountBoxes])

  useEffect(() => {
    if (metaDatas.length) {
      onPresentSuccessModal()
    }
  }, [metaDatas, onPresentSuccessModal])

  return (
    <ModalContainer title={t('Open special box(es)!')} $minWidth="440px">
      <ModalHeader>
        <ModalTitle>
          <Heading style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>{t('Open special box(es) !')}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#fff" />
        </IconButton>
      </ModalHeader>
      <ModalBody p="24px" width="100%">
        <ModalBodyContent>
          <Flex flexDirection="column" alignItems="center">
            <Box width="50%" mb="8px">
              <Image src={specialSellBoxImage} alt="Box" className="box-image" />
            </Box>
            <CodeInput
              max={5}
              type="number"
              onChange={(event) => setAmount(parseInt(event.target.value))}
              value={amountBoxes}
            />
          </Flex>
          <FlexModalBottom>
            <RegisterButton onClick={isApproved ? handleConfirm : handleApprove}>
              {isApproving || isConfirming ? 'Loading ...' : !isApproved ? 'Approve' : 'Open now!'}
            </RegisterButton>
          </FlexModalBottom>
        </ModalBodyContent>
      </ModalBody>
    </ModalContainer>
  )
}

export default OpenBoxesModal
