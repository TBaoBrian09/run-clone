import React from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { NavLink, useLocation } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import { Text } from 'components/Pancake-uikit'


const StyledNav = styled.nav`
  margin-bottom: 32px;
  justify-content: center;
  text-align: center;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  border-radius: 40px;
  background: ${({ theme }) => (theme.isDark ? 'linear-gradient(330.77deg, #37385A 0.25%, #212240 90.42%)' : 'linear-gradient(330.77deg, #EFF0FF 0.25%, #E9ECFC 90.42%)')};
  padding: 2px;
  box-shadow:${({ theme }) => (theme.isDark ? 'inset 0px -2px 4px rgba(255, 255, 255, 0.16), inset 4px 3px 3px rgba(0, 0, 0, 0.28)' : 'inset 0px -2px 4px rgba(255, 255, 255, 0.51), inset 4px 3px 3px rgba(0, 0, 0, 0.1)')};
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    padding: 2px;
    width: 550px;
  }
  a {
    flex-grow: 1;
    padding-top: 12px;
    padding-bottom: 12px;
    
    color: ${({ theme }) => (theme.isDark ? '#747487' : '#202224')};
    font-weight: 400;
    font-size: 24px;
    line-height: 16px;
    text-align: center;
    height: 55px;
    display:flex;
    align-items: center;
    justify-content: center;
  }
`
const CustomText = styled(Text)`
  font-weight:600;
  font-size:18px;
  @media screen and (max-width: 768px) {
    font-size:16px;
  }
`
const defaultStyle = {
}

const getActiveIndex = (pathname: string): number => {
  let pathActive = 0
  switch (pathname) {
    case '/liquidity':
      pathActive = 1
      break;
    case '/bridge':
      pathActive = 2
      break;
    default:
      pathActive = 0
      break;
  }
  return pathActive
}

const styleActiveDark = { 
    
  color: '#FDB533', 
  borderRadius: '28px',
  background: 'linear-gradient(291.54deg, #101133 27.04%, #232441 86.39%)',
  border: '1px solid rgba(255, 255, 255, 0.35)',
  boxsizing: 'border-box',
  boxShadow: '4px 2px 1px rgba(8, 9, 26, 0.2)'

}
const styleActiveLight = { 
    
  color: '#000', 
  borderRadius: '28px',
  background: '#fff',
  border: '1px solid rgba(255, 255, 255, 0.35)',
  boxsizing: 'border-box',
}


const ButtonDigitalAssetsAndTokenizedStocks = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const activeIndex = getActiveIndex(location.pathname)
  const { theme } = useTheme()
  const StyleActive = (isDark: boolean) => {
    if (isDark) {
      return styleActiveDark
    }
  
    return styleActiveLight
  }
  return (
    <StyledNav>
      <NavLink style={activeIndex === 0 ? StyleActive(theme.isDark) : {}} to="/farms" aria-hidden="true">
        <CustomText color="homePrice">{t('Digital Assets')}</CustomText>
      </NavLink>
      <NavLink style={activeIndex === 1 ? StyleActive(theme.isDark) : {}} to="#" aria-hidden="true">
        <CustomText color="textDisabled">{t('Tokenized Stocks')}</CustomText>
      </NavLink>
    </StyledNav>
  )
}

export default ButtonDigitalAssetsAndTokenizedStocks
