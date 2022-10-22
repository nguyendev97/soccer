import {
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer as UIKitModalContainer,
  ModalHeader as UIKitModalHeader,
  ModalTitle,
  Button,
  Input,
  Flex,
  useToast,
} from '@pancakeswap/uikit'
import { useState } from 'react'
import useCatchTxError from 'hooks/useCatchTxError'
import { useRefferalContract } from 'hooks/useContract'
import { useTranslation } from '@pancakeswap/localization'
import GradientButton from 'components/GradientButton'
import styled from 'styled-components'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { ToastDescriptionWithTx } from 'components/Toast'

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
const DefaultButton = styled(Button)`
  background-color: #2400ae;
  color: #fff;
  border-radius: 10px;
  font-weight: 400;
  font-size: 14px;
  height: 32px;
  margin-bottom: 10px;
`
const PaseButton = styled(Button)`
  background-color: #0a4db6;
  color: #fff;
  border-radius: 10px;
  font-weight: 400;
  font-size: 16px;
  height: 44px;
`
const CodeInput = styled(Input)`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  font-weight: 400;
  font-size: 16px;
  height: 44px;
  margin-right: 10px;
`
const FlexModalBottom = styled(Flex)`
  margin-top: 30px;
  justify-content: space-between;
`
const LaterButton = styled(Button)`
  background-color: transparent;
  color: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: 44px;
  border-radius: 10px;
  width: calc(50% - 10px);
  margin-right: 20px;
`
const RegisterButton = styled(GradientButton)`
  width: calc(50% - 10px);
`

interface RegisterModalProps extends InjectedModalProps {
  refAddress: string,
  rootRef: string
  onDone: () => void
}

const RegisterModal: React.FC<React.PropsWithChildren<RegisterModalProps>> = ({ onDismiss, refAddress, rootRef, onDone }) => {
  const { t } = useTranslation()
  const refferalContract = useRefferalContract()
  const { callWithGasPrice } = useCallWithGasPrice()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { toastSuccess } = useToast()
  const [refCode, setRefCode] = useState(refAddress)

  const handlePaste = async() => {
    const address = await navigator.clipboard.readText()
    setRefCode(address)
  }

  const handleRegister = async() => {
    const receipt = await fetchWithCatchTxError(() => {
      return callWithGasPrice(refferalContract, 'register', [refCode])
    })
    if (receipt?.status) {
      onDone()
      toastSuccess(
        `Registered successfully`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
      onDismiss()
    }
  }

  return (
    <ModalContainer title={t('Register!')} $minWidth="440px">
      <ModalHeader>
        <ModalTitle>
          <Heading style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>{t('Register')}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#fff" />
        </IconButton>
      </ModalHeader>
      <ModalBody p="24px" width="100%">
        <ModalBodyContent>
          <DefaultButton onClick={() => setRefCode(rootRef)}>Default code</DefaultButton>
          <Flex>
            <CodeInput onChange={(event) => setRefCode(event.target.value)} value={refCode} />
            <PaseButton onClick={handlePaste}>Paste</PaseButton>
          </Flex>
          <FlexModalBottom>
            <LaterButton onClick={onDismiss}>Later</LaterButton>
            <RegisterButton onClick={handleRegister}>{pendingTx ? "Registering ...": "Register!"}</RegisterButton>
          </FlexModalBottom>
        </ModalBodyContent>
      </ModalBody>
    </ModalContainer>
  )
}

export default RegisterModal
