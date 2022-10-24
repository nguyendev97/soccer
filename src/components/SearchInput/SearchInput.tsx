import { useState, useMemo, useEffect } from 'react'
import { Input } from '@pancakeswap/uikit'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { useTranslation } from '@pancakeswap/localization'
// import Image from 'next/image'
// import { iconImage } from './images'

const StyledInput = styled(Input)`
  border-radius: 10px;
  margin-left: auto;
  width: 264px;
  background-color: ${({ theme }) => theme.colors.input};
  border-color: ${({ theme }) => theme.colors.border}
  color: ${({ theme }) => theme.colors.border}

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`

const InputWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`
// const ButtonSearch = styled(Button)`
//   position: absolute;
//   padding: 0;
//   width: 40px;
//   height: 40px;
//   top: 0;
//   right: 0;
//   background-color: transparent;
//   padding-right: 10px;
// `

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  initialValue?: string
}

const SearchInput: React.FC<React.PropsWithChildren<Props>> = ({
  onChange: onChangeCallback,
  placeholder = 'Search',
  initialValue,
}) => {
  const [searchText, setSearchText] = useState('')
  const { t } = useTranslation()

  const debouncedOnChange = useMemo(
    () => debounce((e: React.ChangeEvent<HTMLInputElement>) => onChangeCallback(e), 500),
    [onChangeCallback],
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
    debouncedOnChange(e)
  }
  useEffect(() => {
    if (initialValue) {
      setSearchText(initialValue)
    }
  }, [initialValue])

  return (
    <InputWrapper>
      <StyledInput value={searchText} onChange={onChange} placeholder={t(placeholder)} />
      {/* <ButtonSearch>
        <Image src={iconImage} alt="search" className="search-img" />
      </ButtonSearch> */}
    </InputWrapper>
  )
}

export default SearchInput
