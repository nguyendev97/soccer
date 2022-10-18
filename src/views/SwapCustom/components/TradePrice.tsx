import styled from 'styled-components'
import { Price, Currency } from '@pancakeswap/sdk'
import { Text, AutoRenewIcon } from '@pancakeswap/uikit'
import { StyledBalanceMaxMini } from './styleds'

const TextTradePrice = styled(Text)`
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  text-align: right;
  color: ${({ theme }) => theme.colors.textSubtle1};
`

interface TradePriceProps {
  price?: Price<Currency, Currency>
  showInverted: boolean
  setShowInverted: (showInverted: boolean) => void
}

export default function TradePrice({ price, showInverted, setShowInverted }: TradePriceProps) {
  const formattedPrice = showInverted ? price?.toSignificant(6) : price?.invert()?.toSignificant(6)

  const show = Boolean(price?.baseCurrency && price?.quoteCurrency)
  const label = showInverted
    ? `${price?.quoteCurrency?.symbol} per ${price?.baseCurrency?.symbol}`
    : `${price?.baseCurrency?.symbol} per ${price?.quoteCurrency?.symbol}`

  return (
    <TextTradePrice>
      {show ? (
        <>
          {formattedPrice ?? '-'} {label}
          <StyledBalanceMaxMini onClick={() => setShowInverted(!showInverted)}>
            <AutoRenewIcon width="20px" color="textSubtle1" />
          </StyledBalanceMaxMini>
        </>
      ) : (
        '-'
      )}
    </TextTradePrice>
  )
}
