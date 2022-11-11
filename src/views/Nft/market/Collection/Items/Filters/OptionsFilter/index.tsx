/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { Text, BoxProps, Button, Checkbox, Heading, Input, Flex } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import Select, { OptionProps } from 'components/Select/Select'
import { useNftStorage } from 'state/nftMarket/storage'
import { useGetNftFilters } from 'state/nftMarket/hooks'
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
const TextCheckBox = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  color: #ccd3ff;
`

interface CheckType {
  key: string
  value?: boolean
  content: string
}
// export interface Item {
//   label: string
//   attr: NftAttribute
//   count?: number
//   image?: string
// }

interface OptionsFilterProps extends BoxProps {
  title?: string
  min?: number
  max?: number
  collectionAddress: string
  checks?: CheckType[]
  onApply?: (min: number, max: number) => void
  onClear?: () => void
}

const RARITIES = [
  {
    key: 'Epic',
    value: false,
    content: 'Epic'
  },
  {
    key: 'Legend',
    value: false,
    content: 'Legend'
  },
  {
    key: 'Rare',
    value: false,
    content: 'Rare'
  },
  {
    key: 'Common',
    value: false,
    content: 'Common'
  }
]

const OptionsFilter: React.FC<React.PropsWithChildren<OptionsFilterProps>> = ({
  onApply,
  onClear,
  max,
  min = 0,
  checks,
  collectionAddress,
  ...props
}) => {
  const { t } = useTranslation()
  const { updateItemFilters } = useNftStorage()
  const nftFilters = useGetNftFilters(collectionAddress)
  const [currentMax, setCurrentMax] = useState(max)
  const [currentMin, setCurrentMin] = useState(min)
  const [isError, setIsError] = useState(min > max)
  const [typeOption, setTypeOption] = useState('hot')
  const [rarities, setRarities] = useState(RARITIES)

  const handleSetAcknowledgeRisk = useCallback(
    (currentKey) => {
      const newRarities = rarities.map((check) => {
        if (currentKey === check.key) {
          return { ...check, value: !check.value }
        }
        return check
      })
      setRarities(newRarities)
    },
    [rarities]
  )

  useEffect(() => {
    const selecteds = rarities.filter(({ value }) => value).map(({ key }) => key).toString()
    if (selecteds.length > 1) {
      const traitType = 'Rarity'
      const attr = {
        traitType,
        value: selecteds,
        displayType: traitType
      }
      updateItemFilters({
        collectionAddress,
        nftFilters: { ...nftFilters, [traitType]: attr },
      })
    }
  }, [rarities, collectionAddress, nftFilters])

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
        {/* <RowOptions>
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
        </RowOptions> */}
        <RowOptions>
          <HeadingTitle>{t('Ratity')}</HeadingTitle>
          <RowContent>
            {rarities.map((check) => (
              <label
                key={check.key}
                htmlFor={check.key}
                style={{ display: 'block', cursor: 'pointer', marginBottom: '24px' }}
              >
                <Flex alignItems="center">
                  <div style={{ flex: 'none', alignSelf: 'flex-start' }}>
                    <Checkbox
                      id={check.key}
                      scale="sm"
                      checked={check.value}
                      onChange={() => handleSetAcknowledgeRisk(check.key)}
                    />
                  </div>
                  <TextCheckBox ml="8px">{check.content}</TextCheckBox>
                </Flex>
              </label>
            ))}
          </RowContent>
        </RowOptions>
        {/* <RowOptions>
          <HeadingTitle>{t('Level')}</HeadingTitle>
          <RowContent style={{ display: 'flex', justifyContent: 'space-between' }}>
            <StyledButton variant="secondary">{t('Min')}</StyledButton>
            <StyledButton>{t('Max')}</StyledButton>
          </RowContent>
        </RowOptions> */}
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
