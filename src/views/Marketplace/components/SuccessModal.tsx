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
import Image from 'next/image'
import { cardItemImage } from '../images'

const ModalContainer = styled(UIKitModalContainer)`
  background: ${({ theme }) => theme.colors.modalBackground};
  border: 0;
`
const ModalHeader = styled(UIKitModalHeader)`
  border-bottom: 0;
  padding-top: 20px;
`
const HeadingTitle = styled(Heading)`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  background: linear-gradient(
    90deg,
    rgba(0, 88, 220, 0) 0%,
    rgba(0, 88, 220, 0.28) 18.23%,
    #0058dc 48.94%,
    rgba(0, 88, 220, 0.28) 81.25%,
    rgba(0, 88, 220, 0) 100%
  );
  line-height: 48px;
`
const ModalBodyContent = styled.div`
  border: 0;
`
const FlexModalBottom = styled(Flex)`
  margin-top: 40px;
  justify-content: center;
`
const RegisterButton = styled(GradientButton)`
  width: calc(50% - 10px);
  padding: 0px 20px;
`

const SuccessModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { t } = useTranslation()

  return (
    <ModalContainer title={t('Box Modal!')} $minWidth="440px">
      <ModalHeader>
        <ModalTitle>
          <HeadingTitle>{t('Successful')}</HeadingTitle>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#fff" />
        </IconButton>
      </ModalHeader>
      {/* {view !== WalletView.WRONG_NETWORK && <TabsComponent />} */}
      <ModalBody p="24px" width="100%">
        <ModalBodyContent>
          <Flex alignItems="center" justifyContent="center">
            <Image src={cardItemImage} alt="Card" className="box-image" />
          </Flex>
          <FlexModalBottom>
            <RegisterButton>Confirm</RegisterButton>
          </FlexModalBottom>
        </ModalBodyContent>
      </ModalBody>
    </ModalContainer>
  )
}

export default SuccessModal
