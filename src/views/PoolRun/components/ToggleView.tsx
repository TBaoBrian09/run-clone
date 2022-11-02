import { CardViewIcon, ListViewIcon } from 'components/Pancake-uikit'
import React from 'react'
import { Flex } from '@phamphu19498/runtogether-uikit'
import styled from 'styled-components'
import { IconButton } from '../style'
import { ViewMode } from '../type'


interface ToggleViewProps {
  viewMode: ViewMode
  onToggle: (mode: ViewMode) => void
}

const Container = styled(Flex)`
    width:120px;
    justify-content: space-between;
    align-items: center;
`
const filterActive = {
  filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(326deg) brightness(107%) contrast(101%)"
}

const filterInactive = {
  filter: "invert(100%) sepia(100%) saturate(0%) hue-rotate(326deg) brightness(107%) contrast(101%)"
}
const ToggleView: React.FunctionComponent<ToggleViewProps> = ({ viewMode, onToggle }) => {
  const handleToggle = (mode: ViewMode) => {
    if (viewMode !== mode) {
      onToggle(mode)
    }
  }
  return (
    <Container>
      <IconButton isActive={viewMode === 'TABLE' ? !false : false } scale="sm" onClick={() => handleToggle(ViewMode.TABLE)}>
        <ListViewIcon color={viewMode === 'TABLE' ? "#fff": "#777E91" }/>
      </IconButton>
      <IconButton isActive={viewMode === 'CARD' ? !false : false } scale="sm" onClick={() => handleToggle(ViewMode.CARD)}>
        <CardViewIcon color={viewMode === 'CARD' ? "#fff": "#777E91" }/>
      </IconButton>
    </Container>
  )
}

export default ToggleView
