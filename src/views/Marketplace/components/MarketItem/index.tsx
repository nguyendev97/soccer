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
          <Text>{ratity}</Text>
          <Heading>{code}</Heading>
          <Text>{level}</Text>
        </ItemInfo>
      </Flex>
      <ItemProperties>
        <ItemLendege>
          <Text>{t('POW')}</Text>
          <Flex>
            <Image src={powImage} width="20px" alt="Ethw" className="properties-icon" />
            <Text ml="8px">{pow}</Text>
          </Flex>
        </ItemLendege>
        <ItemLendege>
          <Text>{t('SHO')}</Text>
          <Flex>
            <Image src={shoImage} width="20px" alt="Ethw" className="properties-icon" />
            <Text ml="8px">{sho}</Text>
          </Flex>
        </ItemLendege>
        <ItemLendege>
          <Text>{t('SPE')}</Text>
          <Flex>
            <Image src={speImage} width="20px" alt="Ethw" className="properties-icon" />
            <Text ml="8px">{spe}</Text>
          </Flex>
        </ItemLendege>
        <ItemLendege>
          <Text>{t('JMP')}</Text>
          <Flex>
            <Image src={jmpImage} width="20px" alt="Ethw" className="properties-icon" />
            <Text ml="8px">{jmp}</Text>
          </Flex>
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
