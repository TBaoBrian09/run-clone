import React from 'react'
import useTheme from 'hooks/useTheme'
import { HelpIcon, Box, BoxProps, Placement } from '@phamphu19498/runtogether-uikit'
import styled from 'styled-components'
import { useTooltip } from 'components/Pancake-uikit'



interface Props extends BoxProps {
  text: string | React.ReactNode
  placement?: Placement
}

const QuestionWrapper = styled.div`
  :hover,
  :focus {
    opacity: 0.7;
  }
`

const QuestionHelper: React.FC<Props> = ({ text, placement = 'top-end', ...props }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(text, { placement, trigger: 'hover' })
  const { theme } = useTheme()
  return (
    <Box {...props}>
      {tooltipVisible && tooltip}
      <QuestionWrapper ref={targetRef}>
        <HelpIcon color={theme.isDark ? 'textSubtle' : '#000'} width="16px" />
      </QuestionWrapper>
    </Box>
  )
}

export default QuestionHelper
