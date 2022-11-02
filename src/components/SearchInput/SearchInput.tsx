import React, { useState, useMemo } from 'react'
import { Input } from '@phamphu19498/runtogether-uikit'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import { useTranslation } from 'contexts/Localization'



const StyledInput = styled(Input)`
  margin-left: auto;
  border-radius: 0px;
  background: linear-gradient(330.77deg, #37385A 0.25%, #212240 90.42%);
  box-sizing: border-box;
  box-shadow: inset 0px -2px 4px rgba(255, 255, 255, 0.16), inset 4px 3px 3px rgba(0, 0, 0, 0.28);
  border-radius: 30px;
  background-image: url('/images/Search.svg');
  background-position: 10px 10px;
  background-repeat: no-repeat;
  padding: 12px 20px 12px 40px;

  ::placeholder {
    font-size: 14px;
    line-height: 19px;
    color: ${({ theme }) => (theme.isDark ? '#fff' : '#000')};
    mix-blend-mode: normal;
    opacity: 0.5;
  }
`

const InputWrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 234px;
    display: block;
  }
`

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

const SearchInput: React.FC<Props> = ({ onChange: onChangeCallback, placeholder = 'Search' }) => {
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

  return (
    <InputWrapper>
      <StyledInput value={searchText} onChange={onChange} placeholder={t(placeholder)} />
    </InputWrapper>
  )
}

export default SearchInput
