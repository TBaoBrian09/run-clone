import React from 'react'
import { useRouteMatch, Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Toggle, Text, NotificationDot } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import ToggleView, { ViewMode } from './ToggleView/ToggleView'



const styleActive = { background: '#49A2F2', color: '#fff', borderRadius:"5px"}

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }

  @media only screen and (max-width: 480px){
    width: auto;
  }
`

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

const PoolTabButtons = ({ hasStakeInFinishedPools }) => {
  const { url, isExact } = useRouteMatch()
  const { t } = useTranslation()
  const location = useLocation()

  let activeIndex
  switch (location.pathname) {
    case '/pools':
      activeIndex = 0
      break
    case '/pools/history':
      activeIndex = 1
      break
    case '/pools/archived':
      activeIndex = 2
      break
    default:
      activeIndex = 0
      break
  }
  const liveOrFinishedSwitch = (
    <Wrapper>
      <CustomButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="primary">
        <CustomButtonMenuItem as={Link} to={`${url}`} style={activeIndex === 0 ? styleActive : undefined}>
          {t('Live')}
        </CustomButtonMenuItem>
        <NotificationDot show={hasStakeInFinishedPools}>
          <CustomButtonMenuItem as={Link} to={`${url}/history`} style={activeIndex !== 0 ? styleActive : undefined}>
            {t('Finished')}
          </CustomButtonMenuItem>
        </NotificationDot>
      </CustomButtonMenu>
    </Wrapper>
  )

  return (
    <ViewControls>
      {liveOrFinishedSwitch}
    </ViewControls>
  )
}

export default PoolTabButtons
