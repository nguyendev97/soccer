import { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Text, BoxProps, Button, Checkbox, Heading, TextField, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Select, { OptionProps } from 'components/Select/Select'
// import FilterFooter from '../FilterFooter'

const FlexWrapper = styled(Flex)`
  flex-direction: column;
`
const RowOptions = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gradientBubblegum};
`
const RowContent = styled.div`
  padding: 5px;
`

interface CheckType {
  key: string
  value?: boolean
  content: string
}
interface OptionsFilterProps extends BoxProps {
  title?: string
  min?: number
  max?: number
  checks?: CheckType[]
  onApply?: (min: number, max: number) => void
  onClear?: () => void
}

const OptionsFilter: React.FC<React.PropsWithChildren<OptionsFilterProps>> = ({
  onApply,
  onClear,
  max,
  min = 0,
  checks,
  ...props
}) => {
  const { t } = useTranslation()
  const [currentMax, setCurrentMax] = useState(max)
  const [currentMin, setCurrentMin] = useState(min)
  const [isError, setIsError] = useState(min > max)
  const [typeOption, setTypeOption] = useState('hot')
  const [checkState, setCheckState] = useState(checks || [])

  const handleSetAcknowledgeRisk = useCallback(
    (currentKey) => {
      const newCheckState = checkState.map((check) => {
        if (currentKey === check.key) {
          return { ...check, value: !check.value }
        }

        return check
      })

      setCheckState(newCheckState)
    },
    [checkState],
  )

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
    <FlexWrapper {...props}>
      <RowOptions>
        <Heading>{t('Filter')}</Heading>
        <Button>{t('Clear Filter')}</Button>
      </RowOptions>
      <RowOptions>
        <Heading>{t('Type')}</Heading>
        <RowContent>
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
        </RowContent>
      </RowOptions>
      <RowOptions>
        <Heading>{t('Ratity')}</Heading>
        <RowContent>
          {checkState.map((check) => (
            <label
              key={check.key}
              htmlFor={check.key}
              style={{ display: 'block', cursor: 'pointer', marginBottom: '24px' }}
            >
              <Flex alignItems="center">
                <div style={{ flex: 'none', alignSelf: 'flex-start', paddingTop: '8px' }}>
                  <Checkbox
                    id={check.key}
                    scale="sm"
                    checked={check.value}
                    onChange={() => handleSetAcknowledgeRisk(check.key)}
                  />
                </div>
                <Text ml="8px">{check.content}</Text>
              </Flex>
            </label>
          ))}
        </RowContent>
      </RowOptions>
      <RowOptions>
        <Heading>{t('Level')}</Heading>
        <RowContent>
          <Button variant="secondary" onClick={handleMinChange}>
            {t('Min')}
          </Button>
          <Button onClick={handleMaxChange}>{t('Max')}</Button>
        </RowContent>
      </RowOptions>
      <RowOptions>
        <Heading>{t('Level')}</Heading>
        <RowContent>
          <TextField label={t('POW >=')} value={currentMin} onUserInput={handleMinChange} isWarning={isError} />
          <TextField label={t('POW >=')} value={currentMin} onUserInput={handleMinChange} isWarning={isError} />
          <TextField label={t('POW >=')} value={currentMin} onUserInput={handleMinChange} isWarning={isError} />
          <TextField label={t('POW >=')} value={currentMin} onUserInput={handleMinChange} isWarning={isError} />
          <TextField label={t('POW >=')} value={currentMin} onUserInput={handleMinChange} isWarning={isError} />
        </RowContent>
      </RowOptions>
    </FlexWrapper>
  )
}

export default OptionsFilter
