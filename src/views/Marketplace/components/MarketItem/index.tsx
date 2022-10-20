import styled from 'styled-components'
import Image from 'next/image'
import { Text, BoxProps, Button, Heading, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { powImage, shoImage, speImage, jmpImage, coinImage } from '../../images'

const FlexRowItem = styled(Flex)`
  flex-direction: row;
  margin-bottom: 16px;
  justify-content: space-between;
  align-items: center;
  background: #1d018d;
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
const ButtonAction = styled(Button)<{ status: string }>`
  padding: 0px;
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

const MarketItem: React.FC<React.PropsWithChildren<ItemProps>> = ({
  code,
  ratity,
  level,
  avatar,
  price,
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
        <ButtonAction status={statusName}>{statusName ?? 'Selling'}</ButtonAction>
      </ItemPrice>
    </FlexRowItem>
  )
}

export default MarketItem
