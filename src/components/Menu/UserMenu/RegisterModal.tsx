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
} from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import GradientButton from 'components/GradientButton'
import styled from 'styled-components'

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

const RegisterModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { t } = useTranslation()

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
      {/* {view !== WalletView.WRONG_NETWORK && <TabsComponent />} */}
      <ModalBody p="24px" width="100%">
        <ModalBodyContent>
          <DefaultButton>Default code</DefaultButton>
          <Flex>
            <CodeInput />
            <PaseButton>Paste</PaseButton>
          </Flex>
          <FlexModalBottom>
            <LaterButton>Later</LaterButton>
            <RegisterButton>Register</RegisterButton>
          </FlexModalBottom>
        </ModalBodyContent>
      </ModalBody>
    </ModalContainer>
  )
}

export default RegisterModal
