import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { BoxProps, Flex } from '@pancakeswap/uikit'
import { busdImage, coin2xImage } from 'views/Marketplace/images'

const FlexRowItem = styled(Flex)<{ backgroundColor?: string; isChildren?: boolean }>`
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  padding: ${({ isChildren }) => (isChildren ? '10px 20px' : '16px 20px')};
  border-radius: 10px;
`
const FlexRowInfo = styled(Flex)`
  flex-direction: column;
`
const Avatar = styled.div`
  position: relative;
  border-radius: 50%;
  width: 54px;
  height: 54px;
  margin-right: 20px;
  background: url('/images/user-blue.png') no-repeat center center;
  background-color: #1d018d;
`
const ItemInfo = styled.div`
  position: relative;
  margin-bottom: 15px;
`
const SpanCount = styled.span`
  position: absolute;
  bottom: 8px;
  right: 5px;
  font-weight: 600;
  font-size: 14px;
  background: #0a4db6;
  color: #ccd3ff;
  border: 2px solid #1d018d;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const FlexListAmount = styled(Flex)<{ backgroundColor?: string }>`
  align-items: center;
`
const TextAddress = styled.span<{ isChildren?: boolean; mb?: any }>`
  display: block;
  font-weight: 500;
  font-size: ${({ isChildren }) => (isChildren ? '16px' : '18px')};
  color: ${({ isChildren }) => (isChildren ? '#CCD3FF' : '#fff')};
  margin-bottom: ${({ mb }) => mb};
`
const SpanAmount = styled.span<{ isChildren?: boolean }>`
  display: flex;
  align-items: center;
  margin-left: 16px;
  font-weight: 700;
  font-size: ${({ isChildren }) => (isChildren ? '16px' : '20px')};
  color: #fff;
`

interface ItemProps extends BoxProps {
  isChildren: boolean
  level?: number
  totalRef?: number
  backgroundColor?: string
  historyDate?: string
  onClick?: () => void
  onClear?: () => void
}

const ReferralItem: React.FC<React.PropsWithChildren<ItemProps>> = ({
  isChildren,
  level,
  totalRef,
  backgroundColor,
  historyDate,
  ...props
}) => {
  const accountAddress = useRouter().query.accountAddress as string
  // const invalidAddress = !accountAddress || isAddress(accountAddress) === false
  return (
    <FlexRowItem backgroundColor={backgroundColor} isChildren={isChildren} {...props}>
      {isChildren && (
        <Avatar>
          <SpanCount>{totalRef}</SpanCount>
        </Avatar>
      )}
      <FlexRowInfo>
        <ItemInfo>
          {historyDate ? (
            <TextAddress isChildren={isChildren}>{historyDate}</TextAddress>
          ) : (
            <>
              {level === 0 ? (
                <TextAddress isChildren={isChildren}>F0 - {accountAddress}</TextAddress>
              ) : (
                <>
                  <TextAddress mb="10px" isChildren={isChildren}>
                    Upline - {accountAddress}
                  </TextAddress>
                  <TextAddress isChildren={isChildren}>You - {accountAddress}</TextAddress>
                </>
              )}
            </>
          )}
        </ItemInfo>
        <FlexListAmount>
          <Flex alignContent="center" mr="60px">
            <Image
              src={busdImage}
              width={isChildren ? '24px' : '30px'}
              height={isChildren ? '24px' : '30px'}
              alt="busd"
            />
            <SpanAmount isChildren={isChildren}>114.06</SpanAmount>
          </Flex>
          <Flex alignContent="center" mr="60px">
            <Image
              src={coin2xImage}
              width={isChildren ? '24px' : '30px'}
              height={isChildren ? '24px' : '30px'}
              alt="coin"
            />
            <SpanAmount isChildren={isChildren}>0.00</SpanAmount>
          </Flex>
          <Flex alignContent="center">
            <Image
              src={coin2xImage}
              width={isChildren ? '24px' : '30px'}
              height={isChildren ? '24px' : '30px'}
              alt="coin"
            />
            <SpanAmount isChildren={isChildren}>0.00</SpanAmount>
          </Flex>
        </FlexListAmount>
      </FlexRowInfo>
    </FlexRowItem>
  )
}

export default ReferralItem
