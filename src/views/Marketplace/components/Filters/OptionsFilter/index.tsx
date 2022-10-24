/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Text, BoxProps, Button, Checkbox, Heading, Input, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Select, { OptionProps } from 'components/Select/Select'
// import FilterFooter from '../FilterFooter'

const FlexWrapper = styled.div`
  position: relative;
`
const FlexContent = styled(Flex)`
  flex-direction: column;
  background: linear-gradient(349.42deg, #1d018d 15.74%, rgba(29, 9, 107, 0) 124.9%);
  border-radius: 10px;
  padding: 30px 16px;
`
const StyledFlexClear = styled(Flex)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 15px;
  margin-bottom: 15px;
`
const RowOptions = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 15px;
  margin-bottom: 15px;
  flex-direction: column;
`
const RowContent = styled.div`
  padding: 5px;
`
const ButtonClear = styled(Button)`
  padding: 0;
  background-color: transparent;
  height: auto;
  font-weight: 500;
  font-size: 14px;
  color: #36dbff;
`
const StyledButton = styled(Button)`
  width: 110px;
  height: 38px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 10px;
`
const HeadingTitle = styled(Heading)`
  font-weight: 700;
  font-size: 16px;
  color: #ccd3ff;
  margin-bottom: 10px;
`
const InputRow = styled(Flex)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`
const StyledLabel = styled.label`
  font-weight: 400;
  font-size: 16px;
  color: #ccd3ff;
  text-transform: uppercase;
`
const StyledInput = styled(Input)`
  width: 110px;
  height: 38px;
  font-weight: 400;
  font-size: 16px;
  border-radius: 10px;
  background-color: transparent;
  text-align: center;
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
      <FlexContent>
        <StyledFlexClear>
          <HeadingTitle style={{ marginBottom: 0 }}>{t('Filter')}</HeadingTitle>
          <ButtonClear>{t('Clear Filter')}</ButtonClear>
        </StyledFlexClear>
        <RowOptions>
          <HeadingTitle>{t('Type')}</HeadingTitle>
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
          <HeadingTitle>{t('Ratity')}</HeadingTitle>
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
          <HeadingTitle>{t('Level')}</HeadingTitle>
          <RowContent style={{ display: 'flex', justifyContent: 'space-between' }}>
            <StyledButton variant="secondary">{t('Min')}</StyledButton>
            <StyledButton>{t('Max')}</StyledButton>
          </RowContent>
        </RowOptions>
        <RowOptions style={{ borderBottom: 0, marginBottom: 0, paddingBottom: 0 }}>
          <HeadingTitle>{t('Level')}</HeadingTitle>
          <RowContent>
            <InputRow>
              <StyledLabel>{t('POW >=')}</StyledLabel>
              <StyledInput value={currentMin} />
            </InputRow>
            <InputRow>
              <StyledLabel>{t('SHO >=')}</StyledLabel>
              <StyledInput value={currentMin} />
            </InputRow>
            <InputRow>
              <StyledLabel>{t('SPE >=')}</StyledLabel>
              <StyledInput value={currentMin} />
            </InputRow>
            <InputRow>
              <StyledLabel>{t('JMP >=')}</StyledLabel>
              <StyledInput value={currentMin} />
            </InputRow>
          </RowContent>
        </RowOptions>
      </FlexContent>
    </FlexWrapper>
  )
}

export default OptionsFilter
