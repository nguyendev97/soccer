import styled from 'styled-components'
import Image from 'next/image'
import { Text, BoxProps, Button, Heading, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
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
`
const Avatar = styled.div`
  margin-right: 20px;
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
`
const ItemPrice = styled.div`
  padding-right: 50px;
`
const ItemLendege = styled.div`
  margin: 0 12px;
`
const LegendTextRaty = styled(Text)`
  color: #36dbff;
  font-weight: 400;
  font-size: 14px;
`
const LegendTextCode = styled(Heading)`
  font-weight: 600;
  font-size: 20px;
  margin: 8px 0;
  color: #ffffff;
`
const LegendTextLevel = styled(Text)`
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
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
`
interface ItemProps extends BoxProps {
  code?: string
  ratity?: string
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
  const { t } = useTranslation()

  return (
    <FlexRowItem {...props}>
      <Flex>
        <Avatar>
          <Image src={avatar} alt={code} className="avatar-img" />
        </Avatar>
        <ItemInfo>
          <LegendTextRaty>{ratity}</LegendTextRaty>
          <LegendTextCode>{code}</LegendTextCode>
          <LegendTextLevel>{level}</LegendTextLevel>
        </ItemInfo>
      </Flex>
      <ItemProperties>
        <ItemLendege>
          <ItemLendegeText>{t('POW')}</ItemLendegeText>
          <FlexLegendItem>
            <Image src={powImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLendegeText ml="8px">{pow}</ItemLendegeText>
          </FlexLegendItem>
        </ItemLendege>
        <ItemLendege>
          <ItemLendegeText>{t('SHO')}</ItemLendegeText>
          <FlexLegendItem>
            <Image src={shoImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLendegeText ml="8px">{sho}</ItemLendegeText>
          </FlexLegendItem>
        </ItemLendege>
        <ItemLendege>
          <ItemLendegeText>{t('SPE')}</ItemLendegeText>
          <FlexLegendItem>
            <Image src={speImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLendegeText ml="8px">{spe}</ItemLendegeText>
          </FlexLegendItem>
        </ItemLendege>
        <ItemLendege>
          <ItemLendegeText>{t('JMP')}</ItemLendegeText>
          <FlexLegendItem>
            <Image src={jmpImage} width="20px" alt="Ethw" className="properties-icon" />
            <ItemLendegeText ml="8px">{jmp}</ItemLendegeText>
          </FlexLegendItem>
        </ItemLendege>
      </ItemProperties>
      <ItemPrice>
        {/* <Flex>
          <Image src={coinImage} width="20px" alt="Ethw" className="properties-icon" />
          <Text>{price}</Text>
        </Flex> */}
        {getButton(statusName)}
      </ItemPrice>
    </FlexRowItem>
  )
}

export default MarketItem
