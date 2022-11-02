import React, { useState } from 'react'
import styled from 'styled-components'
import ModalUpgrade from "components/Pancake-uikit/widgets/Modal/ModalUpgrade"
import { useModal, Button, Text } from '@phamphu19498/runtogether-uikit'
import Tabupgrade from "./Tabupgrade"

interface ProptypeData {
    level:string
    onDismiss?: () => void
}
const Upgrade: React.FC<ProptypeData> = ({ onDismiss, level }) => {
    const [ index, setIndex ] = useState(0)
    const renderBody = () => {
        if ( index === 0 ) {
            return <Tabupgrade condition={level}/>
        } 
        return ""
    }
    return (
        <ModalUpgrade onDismiss={onDismiss} onToggle={(id) => setIndex(id)}>
          {renderBody()}
        </ModalUpgrade>
    )
}
export default Upgrade