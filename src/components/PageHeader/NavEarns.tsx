import React from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { NavLink, useLocation } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem} from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'



const StyledNav = styled.nav`
  margin-bottom: 0px;
  justify-content: center;
  text-align: center;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  padding: 2px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  @media only screen and (max-width: 600px) {
    margin-top: 0px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    padding: 2px;
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
  }
`
const Wrapper = styled.div`
  width:100%;
  height:auto;
  background:${({ theme }) => theme.colors.background};
`
const defaultStyle = {
 
}
const styleActive = { 
    
  color: '#49A2F2', 
  borderBottom: '5px solid #49A2F2',
  boxsizing: 'border-box',
}



const getActiveIndex = (pathname: string): number => {
  let pathActive = 0
  switch (pathname) {
    case '/farms':
      pathActive = 0
      break;
    case '/farms/history':
        pathActive = 0
        break;
    default:
      pathActive = 1
      break;
  }
  return pathActive
}

const NavEarns = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const activeIndex = getActiveIndex(location.pathname)
  const { theme } = useTheme()
  
  return (
    <Wrapper>
        <StyledNav>
          <NavLink style={activeIndex === 0 ? styleActive : defaultStyle} to="/farms" aria-hidden="true">
            <strong>Farms</strong>
          </NavLink>
          <NavLink style={activeIndex === 1 ? styleActive : defaultStyle} to="/pools" aria-hidden="true">
            <strong>Pools</strong>
          </NavLink>
        </StyledNav>
    </Wrapper>
    
  )
}

export default NavEarns
