import React from 'react'
import styled, { DefaultTheme, keyframes } from 'styled-components'
import { MENU_ENTRY_HEIGHT } from '../config'

export interface Props {
  secondary?: boolean
  isActive?: boolean
  theme: DefaultTheme
  isPushed?: boolean
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`

const LinkLabel = styled.div<{ isPushed: boolean }>`
  color: ${({ isPushed, theme }) => !isPushed && theme.colors.textSubtle};
  // color: ${({ isPushed, theme }) => (!isPushed ? "#fdb533" : theme.colors.textSubtle)};
  transition: color 0.4s;
  font-weight: 400;
  font-size: 18px;
  line-height: 19px;
  letter-spacing: 0.3px;
  flex-grow: 1;
`

const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  font-size: ${({ secondary }) => (secondary ? '14px' : '16px')};
  background-color: ${({ isActive }) => (isActive ? 'transparent' : 'transparent')};
  color: ${({ theme }) => theme.colors.textSubtle};
  margin-left: ${({ isPushed }) => {
    return isPushed ? '10px' : '0px'
  }};
  margin-right: ${({ isPushed }) => {
    return isPushed ? '20px' : '0px'
  }};
  border-radius: 10px;
  padding: 0 16px;

  .status {
    color: ${({ isActive }) => (isActive ? '#FFAB00' : '#000')};
  }

  position: relative;
  ::before {
    background: transparent;
    content: '';
    left: -20px;
    width: 0px;
    height: ${({ isActive }) => (isActive ? '100%' : '0%')};
    position: absolute;
    border-radius: 0 8px 8px 0;
  }
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${({ isActive, theme }) => {
      if (isActive) return '#fdb533'
      if (theme.isDark) return "#fff"
      return '#000'
    }};
  }

  svg {
    margin-right: 18px;
    filter: ${({ isActive, theme }) => {
      if (isActive) return 'invert(62%) sepia(100%) saturate(496%) hue-rotate(1deg) brightness(107%) contrast(103%);'
      if (theme.isDark)
        return 'invert(100%) sepia(100%) saturate(2%) hue-rotate(1deg) brightness(105%) contrast(100%);'
      return null
    }};
  }

  &:hover {
    background-color: ${({ theme, isActive }) => {if (theme.isDark)
      return '#353547'
    return 'rgba(232,233,250,0.45)'}};
    filter: brightness(0.9);
    border-radius: 0px !important;
    div, a {
      color: #ffab00 !important;
    }
    svg {
      filter: invert(62%) sepia(100%) saturate(496%) hue-rotate(1deg) brightness(107%) contrast(103%);
    }
  }

  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({ theme }) => theme.colors.gradients.bubblegum};
    background-size: 400% 100%;
  }
`
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
  role: 'button',
}

const LinkLabelMemo = React.memo(LinkLabel, (prev, next) => prev.isPushed === next.isPushed)

export { MenuEntry, LinkLabelMemo as LinkLabel }
