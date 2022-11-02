import React from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { NavLink, useLocation } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Flex} from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import { builtinModules } from 'module'



const StyledNav = styled.nav`
  margin-bottom: 0px;
  justify-content: center;
  text-align: center;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  /* margin-top: 30px; */
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    /* padding: 2px; */
    width: 550px;
  }
  a {
    flex-grow: 1;
    padding-top: 12px;
    padding-bottom: 12px;
    
    color: ${({ theme }) => theme.colors.text};
    font-weight: bold;
    font-size: 18px;
    line-height: 16px;
    text-align: center;
    height: 50px;
    display: inline-block;
    padding: 10px 0px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`
const Wrapper = styled.div`
  width:100%;
  max-width: 600px;
  height:auto;
  /* background:${({ theme }) => theme.colors.background}; */
  @media screen and (max-width: 600px) {
    padding: 0 20px;    
  }
`
const defaultStyle = {
 
}
const styleActive = { 
    
  color: '#FFFFFF', 
  // borderBottom: '5px solid #49A2F2',
  background: '#5DCB83',
  boxsizing: 'border-box',
  borderradius: '20px 20px 0px 0px'
}



const getActiveIndex = (pathname: string): number => {
  let pathActive = 0
  switch (pathname) {
    case '/swap':
      pathActive = 0
      break;
    default:
      pathActive = 1
      break;
  }
  return pathActive
}

const Nav = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const activeIndex = getActiveIndex(location.pathname)
  const { theme } = useTheme()
  
  return (
    <Wrapper>
        <CsStyledNav>
          <WrapLink style={activeIndex === 0 ? styleActive : defaultStyle}>
            <CustomNavLink style={activeIndex === 0 ? styleActive : defaultStyle} to="/swap" aria-hidden="true">
              <Strong>{t('Swap')}</Strong>
            </CustomNavLink>
          </WrapLink>
          <WrapLink style={activeIndex === 1 ? styleActive : defaultStyle}>
            <CustomNavLink style={activeIndex === 1 ? styleActive : defaultStyle} to="/pool" aria-hidden="true">
              <Strong>{t('Liquidity')}</Strong>
            </CustomNavLink>
          </WrapLink>
        </CsStyledNav>
    </Wrapper>
    
  )
}

export default Nav

const CsStyledNav = styled(StyledNav)`
  /* padding: 0px 160px !important; */
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
`

const CustomNavLink = styled(NavLink)`
  color: #FFFFFF !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding-bottom: 20px !important;
`
const WrapLink = styled(Flex)`
  padding: 15px 0px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  @media screen and (max-width: 1336px){
    padding: 10px 0px;
  }
`

const Strong = styled.strong`
  @media screen and (max-width: 600px) {
    font-size: 36px;
  }

  @media screen and (max-width: 425px) {
    font-size: 20px;
  }
`