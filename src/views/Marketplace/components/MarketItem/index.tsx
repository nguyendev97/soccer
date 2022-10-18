import { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { Text, BoxProps, Button, Checkbox, Heading, TextField, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Select, { OptionProps } from 'components/Select/Select'
import { powImage, shoImage, speImage, jmpImage, coinImage } from '../../images'
// import FilterFooter from '../FilterFooter'

const FlexRowItem = styled(Flex)`
  flex-direction: row;
  margin-bottom: 16px;
  justify-content: space-between;
`
const Avatar = styled.div`
  margin-right: 20px;
`
const ItemInfo = styled.div`
  padding: 0px;
`
const ItemProperties = styled(Flex)`
  flex-direction: row;
`
const ItemPrice = styled.div`
  padding: 0px;
`

interface ItemProps extends BoxProps {
  code?: string
  ratity?: string
  level?: string
  avatar?: string
  price?: string
  pow?: string
  sho?: string
  spe?: string
  jmp?: string
  onApply?: (min: number, max: number) => void
  onClear?: () => void
}

const MarketItem: React.FC<React.PropsWithChildren<ItemProps>> = ({
  onApply,
  onClear,
  code,
  ratity,
  level,
  avatar,
  price,
  pow,
  sho,
  spe,
  jmp,
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
        <div>
          <Text>{t('POW')}</Text>
          <Flex>
            <Image src={powImage} width="20px" mr="8px" alt="Ethw" className="properties-icon" />
            <Text>{pow}</Text>
          </Flex>
        </div>
        <div>
          <Text>{t('SHO')}</Text>
          <Flex>
            <Image src={shoImage} width="20px" mr="8px" alt="Ethw" className="properties-icon" />
            <Text>{sho}</Text>
          </Flex>
        </div>
        <div>
          <Text>{t('SPE')}</Text>
          <Flex>
            <Image src={speImage} width="20px" mr="8px" alt="Ethw" className="properties-icon" />
            <Text>{spe}</Text>
          </Flex>
        </div>
        <div>
          <Text>{t('JMP')}</Text>
          <Flex>
            <Image src={jmpImage} width="20px" mr="8px" alt="Ethw" className="properties-icon" />
            <Text>{jmp}</Text>
          </Flex>
        </div>
      </ItemProperties>
      <ItemPrice>
        <Flex>
          <Image src={coinImage} width="20px" mr="8px" alt="Ethw" className="properties-icon" />
          <Text>{price}</Text>
        </Flex>
        <Button>{t('BUY')}</Button>
      </ItemPrice>
    </FlexRowItem>
  )
}

export default MarketItem
