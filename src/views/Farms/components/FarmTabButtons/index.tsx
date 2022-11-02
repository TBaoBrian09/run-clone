import { ButtonMenu, ButtonMenuItem, NotificationDot } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { NavLink, useLocation, useRouteMatch, Link } from 'react-router-dom'
import styled from 'styled-components'

const styleActive = { background: '#49A2F2', color: '#fff', borderRadius:"5px"}

const defaultStyle = {
  borderRight: '0.4px solid rgba(151, 151, 151, 0.7)',
  borderLeft: '0.4px solid rgba(151, 151, 151, 0.7)',
}

const StyledNav = styled.nav`
  display: flex;
  a {
    flex-grow: 1;
    width: 100px;
    background: ${({ theme }) => (theme.isDark ? '#27262c' : '#fff')};
    color: ${({ theme }) => (theme.isDark ? theme.colors.textSubtle : '#202224')};
    background: #fafbfc;
    border: 1px solid #e4e7eb;
    box-sizing: border-box;
    border-radius: 8px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
interface FarmTabButtonsProps {
  hasStakeInFinishedFarms: boolean
}

const FarmTabButtons: React.FC<FarmTabButtonsProps> = ({ hasStakeInFinishedFarms }) => {
  const { url } = useRouteMatch()
  const location = useLocation()
  const { t } = useTranslation()

  let activeIndex
  switch (location.pathname) {
    case '/farms':
      activeIndex = 0
      break
    case '/farms/history':
      activeIndex = 1
      break
    case '/farms/archived':
      activeIndex = 2
      break
    default:
      activeIndex = 0
      break
  }

  return (
    <Wrapper>
      <CustomButtonMenu activeIndex={activeIndex} scale="sm" variant="primary">
        <CustomButtonMenuItem as={Link} to={`${url}`} style={activeIndex === 0 ? styleActive : undefined}>
          {t('Live')}
        </CustomButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedFarms}>
          <CustomButtonMenuItem as={Link} to={`${url}/history`} style={activeIndex !== 0 ? styleActive : undefined}>
              {t('Finished')}
          </CustomButtonMenuItem>
        </NotificationDot>
        
      </CustomButtonMenu>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    padding-left: 12px;
    padding-right: 12px;
    width:100px !important;
    @media only screen and (max-width: 480px){
      font-size: 12px;
      width:70px !important;
    }
  }
`
const CustomButtonMenu = styled(ButtonMenu)`
  border-radius:5px !important;
  background:${({ theme }) => theme.colors.input};
`
const CustomButtonMenuItem = styled(ButtonMenuItem)`
  display:flex;
  align-items:center;
  justify-content:center;
  height:35px;
  color:${({ theme }) => theme.colors.text};
`