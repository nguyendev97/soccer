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
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import { useTranslation } from '@pancakeswap/localization'
import GradientButton from 'components/GradientButton'
import styled from 'styled-components'
import Image from 'next/image'
import { specialSellBoxImage } from '../images'

const ModalContainer = styled(UIKitModalContainer)`
  background: ${({ theme }) => theme.colors.modalBackground};
  border: 0;

  @media (max-width: 768px) {
    bottom: auto;
    width: calc(100% - 30px);
  }
`
const ModalHeader = styled(UIKitModalHeader)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.modalBorder};
`
const ModalBodyContent = styled.div`
  border: 0;
`
const HeadingTitle = styled(Heading)`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
`
const FlexModalBottom = styled(Flex)`
  margin-top: 40px;
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
  font-weight: 700;
`
const RegisterButton = styled(GradientButton)`
  width: calc(50% - 10px);
  padding: 0px 20px;
`

const BoxModal: React.FC<React.PropsWithChildren<InjectedModalProps>> = ({ onDismiss }) => {
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()

  return (
    <ModalContainer title={t('Box Modal!')} $minWidth={isMobile ? 'auto' : '440px'}>
      <ModalHeader>
        <ModalTitle>
          <HeadingTitle>{t('Special box')}</HeadingTitle>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#fff" />
        </IconButton>
      </ModalHeader>
      {/* {view !== WalletView.WRONG_NETWORK && <TabsComponent />} */}
      <ModalBody p="24px" width="100%">
        <ModalBodyContent>
          <Flex alignItems="center" justifyContent="center">
            <Image src={specialSellBoxImage} alt="Box" className="box-image" />
          </Flex>
          <FlexModalBottom>
            <LaterButton>Claim Game</LaterButton>
            <RegisterButton>Claim Wallet</RegisterButton>
          </FlexModalBottom>
        </ModalBodyContent>
      </ModalBody>
    </ModalContainer>
  )
}

export default BoxModal
