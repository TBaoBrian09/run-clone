import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import useTheme from 'hooks/useTheme'
import { useMatchBreakpoints } from 'components/Pancake-uikit/hooks'
import { LogoIcon } from '../../../components/Svg'
import Flex from '../../../components/Box/Flex'
import { HamburgerIcon, HamburgerCloseIcon, LogoIcon as LogoWithText } from '../icons'
import MenuButton from './MenuButton'

interface Props {
  isPushed: boolean
  isDark: boolean
  togglePush: () => void
  href: string
}

const StyledLink = styled(Link)`
  display: flex;
  margin-left: 15px;
  align-items: center;
  color: #1f9fd3;
  font-size: 20px;
  .mobile-icon {
    width: 32px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: none;
    } else {
      display: block;
    }
  }
  .desktop-icon {
    width: 120px;
    color: #1f9fd3;
    font-size: 20px;
    ${({ theme }) => theme.mediaQueries.nav} {
      display: block;
    } else {
      display: none;
    }
  }
`
const StyledP = styled(Link)`
  padding-left: 10px;
`
const Logo: React.FC<Props> = ({ isPushed, togglePush, isDark, href }) => {
  const { theme } = useTheme()
  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false;

  const isAbsoluteUrl = href.startsWith('http')
  const innerLogo = (
    <>{isMobile ? <LogoIcon className="mobile-icon" /> : <LogoWithText className="desktop-icon" isDark={isDark} />}</>
  )

  return (
    <Flex alignItems="center">
      <MenuButton aria-label="Toggle menu" onClick={togglePush}>
        {isPushed ? (
          <HamburgerCloseIcon width="24px" color={theme.isDark ? 'textSubtle' : '#fff'} />
        ) : (
          <HamburgerIcon width="24px" color={theme.isDark ? 'textSubtle' : '#fff'} />
        )}
      </MenuButton>
      {isAbsoluteUrl ? (
        <StyledLink to={href} aria-label="LiveTrade home page">
          <img src="#" alt="LiveTrade" width="35px" height="40px" />
          <StyledP  to={href} aria-label="LiveTrade home page">
            <p>KShark Swap</p>
          </StyledP>
          {innerLogo}
        </StyledLink>
      ) : (
        <StyledLink to={href} aria-label="LiveTrade home page">
          {/* <StyledP to={href} aria-label="LiveTrade home page">
            <img
              src="/images/logo.png"
              height="42px"
              style={{ paddingTop: '10px', transform: 'translateX(-15px)', minHeight: '40px', width: 'auto', height: '42px' }}
              alt="LiveTrade"
            />
          </StyledP> */}
          {innerLogo}
        </StyledLink>
      )}
    </Flex>
  )
}

export default React.memo(Logo, (prev, next) => prev.isPushed === next.isPushed && prev.isDark === next.isDark)
