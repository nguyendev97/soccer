import { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Text, BoxProps, Button, Grid, Heading, TextField, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Select, { OptionProps } from 'components/Select/Select'
// import FilterFooter from '../FilterFooter'

const RowOptions = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gradientBubblegum};
`
interface OptionsFilterProps extends BoxProps {
  title?: string
  min?: number
  max: number
  onApply: (min: number, max: number) => void
  onClear?: () => void
}

export const OptionsFilter: React.FC<React.PropsWithChildren<OptionsFilterProps>> = ({
  onApply,
  onClear,
  max,
  min = 0,
  ...props
}) => {
  const { t } = useTranslation()
  const [currentMax, setCurrentMax] = useState(max)
  const [currentMin, setCurrentMin] = useState(min)
  const [isError, setIsError] = useState(min > max)
  const [typeOption, setTypeOption] = useState('hot')

  const handleTypeOptionChange = useCallback((option: OptionProps) => setTypeOption(option.value), [])

  const handleMinChange = (newMin: string) => {
    setCurrentMin(newMin ? parseFloat(newMin) : 0)
  }

  const handleMaxChange = (newMax: string) => {
    setCurrentMax(parseFloat(newMax))
  }

  const handleApply = () => {
    onApply(currentMin, currentMax)
  }

  // TODO: circle back to this
  const handleClear = () => {
    setCurrentMax(max)
    setCurrentMin(min)

    if (onClear) {
      onClear()
    }
  }

  // If a change comes down from the top update local state
  useEffect(() => {
    setCurrentMax(max)
  }, [max, setCurrentMax])

  useEffect(() => {
    setCurrentMin(min)
  }, [min, setCurrentMin])

  useEffect(() => {
    setIsError(currentMin > currentMax)
  }, [currentMin, currentMax, setIsError])

  return (
    <Flex {...props}>
      <RowOptions>
        <Text>{t('Filter')}</Text>
        <Button>{t('Clear Filter')}</Button>
      </RowOptions>
      <RowOptions>
        <Heading>{t('Type')}</Heading>
        <Select
          options={[
            {
              label: t('All'),
              value: 'all',
            },
            {
              label: t('Type 1'),
              value: 'type1',
            },
            {
              label: t('Type 2'),
              value: 'type2',
            },
            {
              label: t('Type 3'),
              value: 'type3',
            },
          ]}
          onOptionChange={handleTypeOptionChange}
        />
      </RowOptions>
      <RowOptions>
        <Heading>{t('Type')}</Heading>
      </RowOptions>
    </Flex>
  )
}
