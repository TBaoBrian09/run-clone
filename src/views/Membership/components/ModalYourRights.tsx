import React, { useState , useMemo } from 'react'
import styled from 'styled-components'
import { InjectedModalProps, Text } from '@phamphu19498/runtogether-uikit'
import ModalWithLogo from 'components/Pancake-uikit/widgets/Modal/ModalWithLogo'
import { useTranslation } from 'contexts/Localization'
import { Processes, Conditions, YourRight } from '../config'
import Infor from '../UpgradeLevel/components/Infor'

// TODO: Temporary. Once uikit is merged with this style change, this can be removed.
interface ProptypeData {
    level?:string
    onDismiss?: () => void
  }
const Container = styled.div`
  margin:10px;
  @media only screen and (max-width: 600px) {
    margin:0px;
  }
  @media only screen and (min-width: 600px) {
    min-width: 520px;
  }
  padding: 10px;
`
const Wrapper = styled.div`
    width: 100%;
`
const Paragraph = styled.div`
  width:100%;
  display:flex;
  flex-direction: row;
  justify-content: space-evenly;
`
const ModalYourRight: React.FC<ProptypeData> = ({ onDismiss, level }) => {
  const { t } = useTranslation()
  const Filterdata = Conditions.filter(data => data.title === level);
  return (
    <ModalWithLogo
      title={level} images={Filterdata[0].image} headerBackground="gradients.cardHeader" onDismiss={onDismiss}>
      <Container>
            <Wrapper>
                <Paragraph>
                  <Infor data={Filterdata[0].Infor.DataInfor}/>
                </Paragraph>
            </Wrapper>
      </Container>
    </ModalWithLogo>
  )
}

export default ModalYourRight
