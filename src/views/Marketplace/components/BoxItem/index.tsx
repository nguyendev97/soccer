import styled from 'styled-components'
import Image from 'next/image'
import { Text, BoxProps, Heading, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import GradientButton from 'components/GradientButton'
import { busdImage } from '../../images'

const FlexRowItem = styled(Flex)`
  flex-direction: row;
  margin-bottom: 16px;
  justify-content: space-between;
`
const Avatar = styled.div`
  position: relative;
`
const TextCountDown = styled(Text)`
  background: #1d018d;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`
const ItemInfo = styled(Flex)`
  padding: 0px;
`

interface ItemProps extends BoxProps {
  countDown?: string
  boxName?: string
  totalBox?: string
  sellBox?: string
  price?: string
  avatar?: string
  onApply?: (min: number, max: number) => void
  onClear?: () => void
}

const BoxItem: React.FC<React.PropsWithChildren<ItemProps>> = ({
  countDown,
  boxName,
  totalBox,
  sellBox,
  price,
  avatar,
  ...props
}) => {
  const { t } = useTranslation()

  return (
    <FlexRowItem {...props}>
      <Avatar>
        <TextCountDown>23 : 43 : 07</TextCountDown>
        <Image src={avatar} alt={boxName} className="avatar-img" />
      </Avatar>
      <ItemInfo>
        <Heading>{boxName}</Heading>
        <Text>
          {sellBox}/{totalBox}
        </Text>
      </ItemInfo>
      <GradientButton style={{ fontSize: '16px', fontWeight: 700 }}>
        <Flex style={{ alignItems: 'center' }}>
          <Image src={busdImage} width="26px" />
          <Text bold fontSize="20px" color="#fff" style={{ marginLeft: '10px' }}>
            500
          </Text>
        </Flex>
      </GradientButton>
    </FlexRowItem>
  )
}

export default BoxItem
