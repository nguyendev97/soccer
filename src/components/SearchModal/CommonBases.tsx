import { ChainId, Currency } from '@pancakeswap/sdk'
import { Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useTranslation } from '@pancakeswap/localization'
import { AutoColumn } from '../Layout/Column'
import QuestionHelper from '../QuestionHelper'
import { AutoRow } from '../Layout/Row'
import { CurrencyLogo } from '../Logo'
import { CommonBasesType } from './types'

const ButtonWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  margin-right: 10px;
`

const BaseWrapper = styled.div<{ disable?: boolean }>`
  border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.colors.dropdown)};
  border-radius: 4px;
  display: flex;
  padding: 6px;
  align-items: center;
  background-color: #edf1fd;
  :hover {
    cursor: ${({ disable }) => !disable && 'pointer'};
    background-color: ${({ theme, disable }) => !disable && theme.colors.background};
  }
  background-color: ${({ theme, disable }) => disable && theme.colors.dropdown};
  opacity: ${({ disable }) => disable && '0.4'};
`

const RowWrapper = styled.div`
  white-space: nowrap;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`

const TextSymbol = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSubtle1};
`

export default function CommonBases({
  onSelect,
  selectedCurrency,
  commonBasesType,
}: {
  chainId?: ChainId
  commonBasesType
  selectedCurrency?: Currency | null
  onSelect: (currency: Currency) => void
}) {
  const native = useNativeCurrency()
  const { t } = useTranslation()
  const pinTokenDescText = commonBasesType === CommonBasesType.SWAP_LIMITORDER ? t('Common tokens') : t('Common bases')

  return (
    <AutoColumn gap="md">
      <AutoRow>
        <Text fontSize="14px" fontWeight="700">
          {pinTokenDescText}
        </Text>
        {commonBasesType === CommonBasesType.LIQUIDITY && (
          <QuestionHelper text={t('These tokens are commonly paired with other tokens.')} ml="4px" />
        )}
      </AutoRow>
      <RowWrapper>
        <ButtonWrapper>
          <BaseWrapper
            onClick={() => {
              if (!selectedCurrency || !selectedCurrency.isNative) {
                onSelect(native)
              }
            }}
            disable={selectedCurrency?.isNative}
          >
            <CurrencyLogo currency={native} style={{ marginRight: 8 }} />
            <TextSymbol>{native?.symbol}</TextSymbol>
          </BaseWrapper>
        </ButtonWrapper>
      </RowWrapper>
    </AutoColumn>
  )
}
