import {
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer as UIKitModalContainer,
  ModalHeader as UIKitModalHeader,
  ModalTitle,
  Text,
  Flex,
} from '@pancakeswap/uikit'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import SwiperCore from 'swiper'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import { useTranslation } from '@pancakeswap/localization'
import GradientButton from 'components/GradientButton'
import styled from 'styled-components'
import Image from 'next/image'
import { cardItemImage } from '../images'

const ModalContainer = styled(UIKitModalContainer)`
  background: ${({ theme }) => theme.colors.modalBackground};
  border: 0;

  @media (max-width: 768px) {
    bottom: auto;
    width: calc(100% - 30px);
  }
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
const ModalBodyContent = styled.div<{numItems: number}>`
  border: 0;
  max-width: ${({ numItems }) => `${numItems * 218}px`};
`
const PlayerInfo = styled.div<{rarity: string}>`
  margin: auto;
  position: relative;
  width: 210px;
  height: 291px;
  background: ${({ rarity }) => `url('/images/player-bg-${rarity}.png') no-repeat center center`};
  background-size: contain;
`
const PlayerAvatar = styled.div<{ src?: string }>`
  width: 150px;
  height: 200px;
  position: absolute;
  top: 40px;
  background: url('${({ src }) => src}') no-repeat center center;
  background-size: contain;
`
const PlayerName = styled.span`
  position: absolute;
  bottom: 32px;
  left: 29px;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
  font-size: 9px;
`
const PlayerPower = styled.div`
  position: absolute;
  top: 20px;
  left: 51px;
  background: url('/images/power-bg.png') no-repeat left center;
  background-size: contain;
  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
  font-size: 8px;
  width: 60px;
  height: 25px;
  padding-right: 4px;
  text-align: right;
  line-height: 28px;
`
const PlayerProperties = styled.div`
  position: absolute;
  right: 20px;
  top: 50px;
`
const PlayerSho = styled.div`
  width: 60px;
  height: 25px;
  background: url('/images/sho-bg.png') no-repeat left center;
  color: #fff;
  font-weight: 700;
  font-size: 9px;
  background-size: contain;
  text-align: right;
  padding-right: 5px;
  line-height: 25px;
  margin-bottom: 10px;
`
const PlayerPow = styled.div`
  width: 60px;
  height: 25px;
  background: url('/images/pow-bg.png') no-repeat left center;
  color: #fff;
  font-weight: 700;
  font-size: 9px;
  background-size: contain;
  text-align: right;
  padding-right: 5px;
  line-height: 25px;
  margin-bottom: 10px;
`
const PlayerSpe = styled.div`
  width: 60px;
  height: 25px;
  background: url('/images/spe-bg.png') no-repeat left center;
  color: #fff;
  font-weight: 700;
  font-size: 9px;
  background-size: contain;
  text-align: right;
  padding-right: 5px;
  line-height: 25px;
  margin-bottom: 10px;
`
const PlayerJmp = styled.div`
  width: 60px;
  height: 25px;
  background: url('/images/jmp-bg.png') no-repeat left center;
  color: #fff;
  font-weight: 700;
  font-size: 9px;
  background-size: contain;
  text-align: right;
  padding-right: 5px;
  line-height: 25px;
`
const PlayerLevel = styled.div`
  position: absolute;
  right: 10px;
  width: 70px;
  height: 35px;
  background: url('/images/level-bg.png') no-repeat left center;
  bottom: 70px;
  background-size: contain;
  padding-top: 8px;
  padding-left: 20px;
`
const LevelText = styled.span`
  display: block;
  text-transform: uppercase;
  text-align: center;
  color: #fff;
  font-weight: 700;
  font-size: 10px;
`

const FlexModalBottom = styled(Flex)`
  margin-top: 40px;
  justify-content: center;
`
const RegisterButton = styled(GradientButton)`
  width: calc(50% - 10px);
  padding: 0px 20px;
`

interface SuccessModalProps extends InjectedModalProps {
  metaDatas: any[]
}

const SuccessModal: React.FC<React.PropsWithChildren<SuccessModalProps>> = ({ onDismiss, metaDatas }) => {
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()

  return (
    <ModalContainer title={t('Box Modal!')} $minWidth={isMobile ? 'auto' : '440px'}>
      <ModalHeader>
        <ModalTitle>
          <HeadingTitle>{t('Successful')}</HeadingTitle>
        </ModalTitle>
        <IconButton variant="text" onClick={onDismiss}>
          <CloseIcon width="24px" color="#fff" />
        </IconButton>
      </ModalHeader>
      <ModalBody p="24px" width="100%">
        <ModalBodyContent numItems={metaDatas.length}>
          <Swiper spaceBetween={8} slidesPerView={isMobile ? 1.8 : metaDatas.length}>
          {metaDatas.map(({ image, name, attributes, token_id: tokenId }) => {
              const power = attributes.find(({ key }) => key === 'POW')
              const sho = attributes.find(({ key }) => key === 'SHO')
              const energy = attributes.find(({ key }) => key === 'Energy')
              const spe = attributes.find(({ key }) => key === 'SPE')
              const jmp = attributes.find(({ key }) => key === 'JMP')
              const level = attributes.find(({ key }) => key === 'Level')
              const rarity = attributes.find(({ key }) => key === 'Rarity')
              return (
                <SwiperSlide key={tokenId}>
                  <PlayerInfo rarity={rarity.value.toLowerCase()}>
                    <PlayerAvatar src={image} />
                    <PlayerPower>{power.value}</PlayerPower>
                    <PlayerName>{name}</PlayerName>
                    <PlayerProperties>
                      <PlayerSho>{sho.value}</PlayerSho>
                      <PlayerPow>{energy.value}</PlayerPow>
                      <PlayerSpe>{spe.value}</PlayerSpe>
                      <PlayerJmp>{jmp.value}</PlayerJmp>
                    </PlayerProperties>
                    <PlayerLevel>
                      <LevelText>Level</LevelText>
                      <LevelText>{level.value}</LevelText>
                    </PlayerLevel>
                  </PlayerInfo>
                </SwiperSlide>
              )
          })}
          </Swiper>
          <FlexModalBottom>
            <RegisterButton onClick={onDismiss}>Confirm {metaDatas.length} kickers</RegisterButton>
          </FlexModalBottom>
        </ModalBodyContent>
      </ModalBody>
    </ModalContainer>
  )
}

export default SuccessModal
