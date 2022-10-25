import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { isAddress } from 'utils'
import { Text, BoxProps, Heading, Flex } from '@pancakeswap/uikit'
import GradientButton from 'components/GradientButton'
import Video from 'components/Video'
import { busdImage } from '../../images'

const FlexRowItem = styled(Flex)`
  flex-direction: column;
  background: linear-gradient(3.19deg, #1d018d 2.64%, #1d018d 97.36%);
  padding: 16px;
  border-radius: 10px;
  transition: all 0.1s ease-in-out;

  &:hover {
    background: #0a4db6;
  }
`
const Avatar = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`
const TextCountDown = styled(Text)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  text-align: center;
  height: 40px;
  line-height: 40px;
  background: rgb(29 1 141 / 60%);
  color: #fff;
  font-size: 18px;
  font-weight: 600;
`
const ItemInfo = styled(Flex)`
  justify-content: center;
  align-items: center;
  margin: 16px 0px;
`
const HeadingName = styled(Heading)`
  font-weight: 700;
  font-size: 18px;
  color: #fff;
`
const TextCount = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  color: #ccd3ff;
  margin-left: auto;
`

interface ItemProps extends BoxProps {
  disabled?: boolean
  countDown?: string
  boxName?: string
  totalBox?: number
  sellBox?: string
  price?: string
  avatar?: any
  onClick?: () => void
  onClear?: () => void
}

const BoxItem: React.FC<React.PropsWithChildren<ItemProps>> = ({
  countDown,
  boxName,
  totalBox,
  sellBox,
  // price,
  avatar,
  onClick,
  disabled,
  ...props
}) => {
  const accountAddress = useRouter().query.accountAddress as string
  const invalidAddress = !accountAddress || isAddress(accountAddress) === false

  return (
    <FlexRowItem {...props}>
      <Avatar>
        <Video src={avatar} />
      </Avatar>
      <ItemInfo>
        <HeadingName>
          {boxName} [{totalBox}]
        </HeadingName>
        {invalidAddress && (
          <TextCount>
            {sellBox}/{totalBox}
          </TextCount>
        )}
      </ItemInfo>
      <GradientButton
        disabled={disabled}
        style={{ fontSize: '16px', fontWeight: 700, padding: '0px 20px' }}
        onClick={onClick}
      >
        {invalidAddress ? (
          <Flex style={{ alignItems: 'center' }}>
            <Image src={busdImage} width="26px" />
            <Text bold fontSize="20px" color="#fff" style={{ marginLeft: '10px' }}>
              500
            </Text>
          </Flex>
        ) : (
          <Text bold fontSize="16px" color="#fff">
            Open
          </Text>
        )}
      </GradientButton>
    </FlexRowItem>
  )
}

export default BoxItem
