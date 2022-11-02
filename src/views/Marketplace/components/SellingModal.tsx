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
  Text,
} from '@pancakeswap/uikit'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslation } from '@pancakeswap/localization'
import GradientButton from 'components/GradientButton'
import styled from 'styled-components'
import { avtImage, busdImage } from '../images'

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
const FlexModalContent = styled(Flex)`
  justify-content: space-between;
`
const Avatar = styled.div`
  border-radius: 10px;
  margin-right: 30px;
  overflow: hidden;
`
const ItemPrice = styled.div`
  width: 100%;
`
const InputAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2400ae;
  border-radius: 10px;
  height: 52px;
  margin-bottom: 16px;
`
const TextAmount = styled.span`
  font-weight: 700;
  font-size: 20px;
  color: #fff;
  margin-left: 10px;
`
const SubTextAmount = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: #ccd3ff;
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

interface SellingModalProps extends InjectedModalProps {
  onDone: () => void
}

const SellingModal: React.FC<React.PropsWithChildren<SellingModalProps>> = ({ onDismiss }) => {
  const { t } = useTranslation()
  return (
    <ModalContainer title={t('Register!')} $minWidth="440px">
      <ModalHeader>
        <ModalTitle>
          <Heading style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>{t('Selling price')}</Heading>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#fff" />
        </IconButton>
      </ModalHeader>
      <ModalBody p="24px" width={['100%', null, '550px']}>
        <ModalBodyContent>
          <FlexModalContent>
            <Avatar>
              <Image src={avtImage} width="88px" height="88px" />
            </Avatar>
            <ItemPrice>
              <InputAmount>
                <Image src={busdImage} width="26px" height="26px" />
                <TextAmount>100.1 SOT</TextAmount>
              </InputAmount>
              <SubTextAmount>Service fee (5%): 5.005 SOT</SubTextAmount>
            </ItemPrice>
          </FlexModalContent>
          <FlexModalBottom>
            <LaterButton onClick={onDismiss}>Cancel</LaterButton>
            <RegisterButton>Confirm</RegisterButton>
          </FlexModalBottom>
        </ModalBodyContent>
      </ModalBody>
    </ModalContainer>
  )
}

export default SellingModal
