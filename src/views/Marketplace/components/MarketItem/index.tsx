import styled from 'styled-components'
import Image from 'next/image'
import { Text, BoxProps, Button, Heading, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { useMatchBreakpoints } from '@pancakeswap/uikit/src/contexts'
// import GradientButton from 'components/GradientButton'
import { powImage, shoImage, speImage, jmpImage } from '../../images'
// import { ButtonContainer } from 'views/Nft/market/Collection/IndividualNFTPage/shared/styles'

const FlexRowItem = styled(Flex)`
  flex-direction: row;
  margin-bottom: 16px;
  justify-content: space-between;
  align-items: center;
  background: #1d018d;
  border-radius: 10px;
  padding: 8px;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`
const Avatar = styled.div`
  margin-right: 20px;
  @media (max-width: 768px) {
    margin-right: 10px;
  }
`
const ItemInfo = styled.div`
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
`
const ItemProperties = styled(Flex)`
  flex-direction: row;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    margin-top: 10px;
    padding-bottom: 10px;
  }
`
const ItemPrice = styled.div`
  padding-right: 50px;
  @media (max-width: 768px) {
    padding-right: 0px;
    margin-left: auto;
  }
`
const ItemLendege = styled.div`
  margin: 0 12px;
  @media (max-width: 768px) {
    margin: 0;
  }
`
const LegendTextRaty = styled(Text)`
  color: #36dbff;
  font-weight: 400;
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const LegendTextCode = styled(Heading)`
  font-weight: 600;
  font-size: 20px;
  margin: 8px 0;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`
const LegendTextLevel = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`
const ItemLendegeText = styled(Text)`
  color: #ffffff;
  font-weight: 400;
  font-size: 14px;
`
const FlexLegendItem = styled(Flex)`
  margin-top: 10px;
`
const ButtonSelling = styled(Button)`
  padding: 0px 20px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  background: transparent;
  border: 1px solid #ccd3ff;
  color: #fff;
  height: 40px;
  border-radius: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    height: 36px;
  }
`
const ButtonRemove = styled(Button)`
  padding: 0px 20px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  background: #9197ba;
  border: 1px solid #9197ba;
  color: #fff;
  height: 40px;
  border-radius: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    height: 36px;
  }
`
const ButtonApprove = styled(Button)`
  padding: 0px 20px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  background: linear-gradient(103.59deg, #00cc83 26.67%, #36dbff 74.7%);
  border: 0;
  color: #fff;
  height: 40px;
  border-radius: 10px;
  @media (max-width: 768px) {
    font-size: 14px;
    height: 36px;
  }
`

const PlayerInfo = styled(Flex)<{ rarity: string }>`
  width: 110px;
  height: 110px;
  padding: 5px;
  background: ${({ rarity }) => `url('/images/rarity/${rarity}.png') no-repeat center center`};
  background-size: contain;
  align-items: center;
  justify-content: center;
`
const PlayerAvatar = styled.div<{ avatar: string }>`
  width: 100%;
  height: 100%;
  background: ${({ avatar }) => `url('${avatar}') no-repeat center center`};
  background-size: contain;
`

interface ItemProps extends BoxProps {
  code?: string
  ratity: string
  level?: string
  avatar?: any
  price?: string
  pow?: string
  sho?: string
  spe?: string
  jmp?: string
  statusName?: string
  onApply?: (min: number, max: number) => void
  onClear?: () => void
}

const getButton = (statusName: string) => {
  switch (statusName) {
    case 'inWallet':
      return <ButtonSelling disabled>In Wallet</ButtonSelling>
    case 'selling':
      return <ButtonSelling>{statusName}</ButtonSelling>
    case 'remove':
      return <ButtonRemove>{statusName}</ButtonRemove>
    case 'approve':
      return <ButtonApprove>{statusName}</ButtonApprove>
    default:
      return <ButtonSelling>Button</ButtonSelling>
  }
}

const MarketItem: React.FC<React.PropsWithChildren<ItemProps>> = ({
  code,
  ratity,
  level,
  avatar,
  pow,
  sho,
  spe,
  jmp,
  statusName,
  ...props
}) => {
  const { isMobile } = useMatchBreakpoints()
  const { t } = useTranslation()

  return (
    <FlexRowItem {...props}>
      <Flex width={isMobile ? '100%' : 'auto'}>
        <Flex>
          <Avatar>
            <PlayerInfo rarity={ratity}>
              <PlayerAvatar avatar={avatar} />
              {/* <img style={{height: 100, width: 'fit-content'}} src={avatar} alt={code} className="avatar-img" /> */}
            </PlayerInfo>
          </Avatar>
          <ItemInfo>
            <LegendTextRaty>{ratity}</LegendTextRaty>
            <LegendTextCode>{code}</LegendTextCode>
            <LegendTextLevel>{level}</LegendTextLevel>
          </ItemInfo>
        </Flex>
        {isMobile && <ItemPrice>{getButton(statusName)}</ItemPrice>}
      </Flex>
      <ItemProperties>
        <ItemLendege>
          {!isMobile && <ItemLendegeText>{t('POW')}</ItemLendegeText>}
          <FlexLegendItem>
            <Image src={powImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLendegeText ml="8px">{pow}</ItemLendegeText>
          </FlexLegendItem>
        </ItemLendege>
        <ItemLendege>
          {!isMobile && <ItemLendegeText>{t('SHO')}</ItemLendegeText>}
          <FlexLegendItem>
            <Image src={shoImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLendegeText ml="8px">{sho}</ItemLendegeText>
          </FlexLegendItem>
        </ItemLendege>
        <ItemLendege>
          {!isMobile && <ItemLendegeText>{t('SPE')}</ItemLendegeText>}
          <FlexLegendItem>
            <Image src={speImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLendegeText ml="8px">{spe}</ItemLendegeText>
          </FlexLegendItem>
        </ItemLendege>
        <ItemLendege>
          {!isMobile && <ItemLendegeText>{t('JMP')}</ItemLendegeText>}
          <FlexLegendItem>
            <Image src={jmpImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLendegeText ml="8px">{jmp}</ItemLendegeText>
          </FlexLegendItem>
        </ItemLendege>
      </ItemProperties>
      {!isMobile && (
        <ItemPrice>
          {/* <Flex>
            <Image src={coinImage} width="20px" alt="Ethw" className="properties-icon" />
            <Text>{price}</Text>
          </Flex> */}
          {getButton(statusName)}
        </ItemPrice>
      )}
    </FlexRowItem>
  )
}

export default MarketItem
