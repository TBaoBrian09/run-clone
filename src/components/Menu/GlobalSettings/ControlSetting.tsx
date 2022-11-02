import React from 'react'
import useTheme from 'hooks/useTheme'
import { Flex, IconButton, CogIcon, useModal } from '@phamphu19498/runtogether-uikit'
import SettingsModal from './SettingsModal'



const GlobalSettings = () => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)
  const { theme } = useTheme()
  return (
    <Flex>
      <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" mr="8px">
        <CogIcon height={22} width={22} color={theme.isDark ? 'textSubtle' : '#101133'} />
      </IconButton>
    </Flex>
  )
}

export default GlobalSettings
