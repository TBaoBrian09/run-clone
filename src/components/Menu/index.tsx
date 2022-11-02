import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu as UikitMenu } from '@phamphu19498/runtogether-uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { useTokenPrice } from 'state/farms/hooks'
import { DecryptsUserInfo } from 'config/api/decrypts'
import tokens from 'config/constants/tokens'
import ShoppingCart from 'components/ShoppingCart'
import styled from 'styled-components'
import { useProfile } from 'state/profile/hooks'
import GlobalSettings from './GlobalSettings'
import { configIsConnect, configDisconnect}  from './config'
import UserMenu from './UserMenu'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'

 
 
const Menu = (props) => {
  const { isDark, toggleTheme } = useTheme()
  const cakePriceUsd = useTokenPrice(tokens.Run.address[56]).toNumber();
  const { profile } = useProfile()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const location = useLocation()
  const data:any = DecryptsUserInfo() || "";
  const pathname = location.pathname
  const activeMenuItem = getActiveMenuItem({ menuConfig: configIsConnect(t), pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })
  return (
    <UikitMenu
      userMenu={<UserMenu/>}
      isDark={!true}
      toggleTheme={toggleTheme}
      currentLang="en"
      langs={languageList}
      setLang={setLanguage}
      globalMenu={<GlobalSettings />}
      links={configIsConnect(t)}
      activeItem={activeMenuItem?.href}
      activeSubItem={activeSubMenuItem?.href}
      profile={{
        username: profile?.username,
        image: profile?.nft ? `/images/nfts/${profile.nft?.images.sm}` : undefined,
        profileLink: '/profile',
        noProfileLink: '/profile',
        showPip: !profile?.username,
      }}
      {...props}
    />
  )
}

export default Menu
