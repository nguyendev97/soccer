import { useState, useEffect } from 'react'
import {
  CloseIcon,
  Heading,
  IconButton,
  InjectedModalProps,
  ModalBody,
  ModalContainer as UIKitModalContainer,
  ModalHeader as UIKitModalHeader,
  ModalTitle,
  Flex,
} from '@pancakeswap/uikit'
import Video from 'components/Video'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import groupBy from 'lodash/groupBy'
import { EffectFlip, Pagination, Navigation } from "swiper"
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
import { useTranslation } from '@pancakeswap/localization'
import GradientButton from 'components/GradientButton'
import styled from 'styled-components'

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-flip"
import "swiper/css/pagination"
import "swiper/css/navigation"

const ModalContainer = styled(UIKitModalContainer)`
  background: ${({ theme }) => theme.colors.modalBackground};
  border: 0;
  max-width: 450px;
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
`
const PlayerInfo = styled.div<{rarity: string}>`
  margin: auto;
  position: relative;
  width: 210px;
  height: 291px;
  background: ${({ rarity }) => `url('/images/player-bg-${rarity.toLowerCase()}.png') no-repeat center center`};
  background-size: contain;
`
const PlayerAvatar = styled.div<{ src?: string }>`
  width: 50%;
  left: 25px;
  height: 200px;
  position: absolute;
  top: 40px;
  background: url('${({ src }) => src}') no-repeat center center;
  background-size: contain;
`
const PlayerName = styled.span`
  position: absolute;
  bottom: 25px;
  left: 29px;
  text-transform: uppercase;
  color: #191325;
  font-weight: 700;
  font-size: 10px;
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
const ButtonStyled = styled(GradientButton)`
  width: fit-content;
  padding: 0px 20px;
`

interface SuccessModalProps extends InjectedModalProps {
  metaDatas: any[]
}

const SuccessModal: React.FC<React.PropsWithChildren<SuccessModalProps>> = ({ onDismiss, metaDatas }) => {
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()
  const [shownVideo, setShownVideo] = useState(true)
  useEffect(() => {
    setTimeout(() => setShownVideo(false), 5000)
  }, [])

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
          {shownVideo
            ? <Flex width="100%" height="fit-content"><Video src="/videos/open-successfully.mp4" /></Flex>
            : <>
                <Swiper
                  effect="flip"
                  grabCursor
                  pagination
                  navigation
                  spaceBetween={8}
                  modules={[EffectFlip, Pagination, Navigation]}
                  slidesPerView={isMobile ? 1 : metaDatas.length}>
                {metaDatas.map(({ imagePlayer, name, attributes, token_id: tokenId }) => {
                    const attributesMap: any = groupBy(attributes, 'key')
                    return (
                      <SwiperSlide key={tokenId}>
                        <PlayerInfo rarity={attributesMap.Rarity[0].value as string}>
                          <PlayerAvatar src={imagePlayer} />
                          <PlayerPower>{attributesMap.POW[0].value as string}</PlayerPower>
                          <PlayerName>{name}</PlayerName>
                          <PlayerProperties>
                            <PlayerSho>{attributesMap.SHO[0].value as string}</PlayerSho>
                            <PlayerPow>{attributesMap.POW[0].value as string}</PlayerPow>
                            <PlayerSpe>{attributesMap.SPE[0].value as string}</PlayerSpe>
                            <PlayerJmp>{attributesMap.JMP[0].value as string}</PlayerJmp>
                          </PlayerProperties>
                          <PlayerLevel>
                            <LevelText>Level</LevelText>
                            <LevelText>{attributesMap.Level[0].value as string}</LevelText>
                          </PlayerLevel>
                        </PlayerInfo>
                      </SwiperSlide>
                    )
                })}
                </Swiper>
                <FlexModalBottom>
                  <ButtonStyled onClick={onDismiss}>Confirm {metaDatas.length} kickers</ButtonStyled>
                </FlexModalBottom>
              </>
          }
          
        </ModalBodyContent>
      </ModalBody>
    </ModalContainer>
  )
}

export default SuccessModal
