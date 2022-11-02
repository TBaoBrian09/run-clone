import React, { useState , useMemo } from 'react'
import styled from 'styled-components'
import { InjectedModalProps, Grid, Box } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import ModalContainer from 'components/Pancake-uikit/widgets/Modal/Modal'
import NetworkBlock from './NetworkBlock'
import Config from './NetworkConfig'


const Container = styled.div`
  margin:10px;
  @media only screen and (max-width: 600px) {
    margin:0px;
  }
  @media only screen and (min-width: 600px) {
    min-width: 520px;
  }
  padding: 10px;
  min-width: 340px !important;
`



const SwitchNetworkModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
    const { t } = useTranslation()
  return (
    <ModalContainer
      title={t('Select a network')} headerBackground="gradients.cardHeader" onDismiss={onDismiss} >
      <Container>
      <Grid gridTemplateColumns="1fr 1fr">
        {
          Config.map((item) => (
              <NetworkBlock name={item.name} link={item.link} Icon={item.icon}> </NetworkBlock>
          ))
        }
      </Grid>
      </Container>
    </ModalContainer>
  )
}

export default SwitchNetworkModal
