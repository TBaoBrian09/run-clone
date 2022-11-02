import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Text, HelpIcon, useTooltip } from 'components/Pancake-uikit'

const ReferenceElement = styled.div`
  display: inline-block;
  align-items:baseline;
  margin-left:5px; 
`
const FarmTooltip = () => {
    const { t } = useTranslation()
    const { targetRef, tooltip, tooltipVisible } = useTooltip(
        t('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet ullamcorper neque tellus arcu in. Non egestas est pharetra, eget nec at sit eu tempus. Porta proin feugiat gravida morbi ornare. '),
        { placement: 'top-end', tooltipOffset: [20, 10] },
      )
    return (
        <>
            <ReferenceElement ref={targetRef}>
                <HelpIcon color="textSubtle" />
            </ReferenceElement> 
            {tooltipVisible && tooltip}
        </>
    )
}
export default FarmTooltip