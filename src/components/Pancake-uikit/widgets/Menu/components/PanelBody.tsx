import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { Text } from '@phamphu19498/runtogether-uikit'
import { SvgProps } from '../../../components/Svg'
import * as IconModule from '../icons'
import Accordion from './Accordion'
import { MenuEntry, LinkLabel } from './MenuEntry'
import MenuLink from './MenuLink'
import { PanelProps, PushedProps } from '../types'

interface Props extends PanelProps, PushedProps {
  isMobile: boolean
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> }

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme.isDark ? '#e2e2e2' : '#ddd')}; !important;
    border-radius: 8px;
`

const LinkStatus = styled(Text)`
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 0 8px;
  border: 1px solid;
  box-shadow: none;
  margin-left: 8px;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation()

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined
  return (
    <Container>
      {links.map((entry) => {
        const Icon = Icons[entry.icon]
        const iconElement = <Icon width="24px" />
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined

        if (entry.items) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === location.pathname)
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0

          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              initialOpenState={initialOpenState}
              className={calloutClass}
              isActive={entry.items.some((item) => item.href === location.pathname)}
            >
              {isPushed &&
                entry.items.map((item) => (
                  <MenuEntry
                    isPushed={isPushed}
                    key={item.href}
                    secondary
                    isActive={item.href === location.pathname}
                    onClick={handleClick}                  
                  >
                   
                    { item.isExternal === true ?
                      <MenuLink target="_blank" href={item.href}>{item.label}</MenuLink>
                      :
                      <MenuLink target="_self" href={item.href}>{item.label}</MenuLink>
                    }
                    
                  </MenuEntry>
                ))}
            </Accordion>
          )
        }
        return (
          <MenuEntry
            isPushed={isPushed}
            key={entry.label}
            isActive={entry.href === location.pathname}
            className={calloutClass}
          >
            <MenuLink href={entry.href} onClick={handleClick}>
              {iconElement}
              <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
              {entry.status && 
                <LinkStatus className="status" fontSize="11px">
                  {entry.status.text}
                </LinkStatus>}
              
            </MenuLink>
          </MenuEntry>
        )
      })}
    </Container>
  )
}

export default PanelBody
