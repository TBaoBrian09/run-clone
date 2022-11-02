import React, { useState , useMemo } from 'react'
import styled from 'styled-components'
import { Modal, Button, Text } from '@phamphu19498/runtogether-uikit'
import { useTranslation } from 'contexts/Localization'
import Delist from "./Delist"

interface Props {
    title:string
    isDelist?:boolean
    onDismiss?: () => void
    nftInfo?:any
    boxType?:any
}

const ModalAction: React.FC<Props> = ({ onDismiss, isDelist, title, nftInfo, boxType }) => {
  const { t } = useTranslation()
  return (
    <Modal title={title} onDismiss={onDismiss}>
        <Delist
                nftInfo={nftInfo}
                boxType={boxType}
                onDismiss={onDismiss}
            />
     
    </Modal>
  )
}

export default ModalAction

