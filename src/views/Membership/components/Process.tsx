import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Text, TextProps, Heading, useMatchBreakpoints } from 'components/Pancake-uikit'
import { PrivilegesIcon, RequirementIcon, ExclusivityIcon, RedeemTransferIcon } from 'components/Pancake-uikit/components/Svg'
import useTheme from 'hooks/useTheme'

interface ProcessProps {
  image: string
  description: string
  title: string
}

const ProcessWrapper = styled.div`
  width: 315px;
  padding: 8px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 234px;
  background: ${({ theme }) => theme.isDark ? theme.colors.modalHeader : theme.colors.backgroundTab};
  border-radius: 10px;
  @media only screen and (max-width: 769px) {
    width:100% !important;
  }
  @media only screen and (max-width: 600px) {
    width: 310px !important;
  }
  @media only screen and (max-width: 1280px) {
    margin-bottom:1.5rem;
    width: 350px;
  }
  .image-wrapper {
    max-width: 80px;
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    > svg {
      fill:${({ theme }) => theme.colors.text};
    }
  }
  .description-wrapper {
    width: 100%;
    height: 100%;
    text-align: center;
    margin-top:10px;
  }
`

const Process: React.FC<ProcessProps> = ({ image, description, title }) => {
  const { t } = useTranslation()

  const { isXl } = useMatchBreakpoints()
  const isMobile = isXl === false

  const { isDark } = useTheme()
  return (
      <ProcessWrapper>
        <div className="image-wrapper">
          {image === "PrivilegesIcon" && <PrivilegesIcon/>}
          {image === "ExclusivityIcon" && <ExclusivityIcon/>}
          {image === "RequirementIcon" && <RequirementIcon/>}
          {image === "RedeemTransferIcon" && <RedeemTransferIcon/>}
        </div>
        <div className="description-wrapper">
          <Text color="primaryBright" bold>{t(title)}</Text>
        </div>
        <div className="description-wrapper">
          <Text fontSize='15px'>{t(description)}</Text>
        </div>
      </ProcessWrapper>
  )
}

export default Process
