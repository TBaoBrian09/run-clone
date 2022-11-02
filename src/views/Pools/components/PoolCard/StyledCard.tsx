import styled from 'styled-components'
import { Card } from '@phamphu19498/runtogether-uikit'



export const StyledCard = styled(Card)<{ isFinished?: boolean }>`
  max-width: 350px;
  min-width: 350px;
  margin: 0 8px 24px;
  display: flex;
  flex-direction: column;
  align-self: baseline;
  position: relative;
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'secondary']};
  background: ${({ theme }) => (theme.isDark ? theme.colors.background : theme.colors.backgroundModal)} !important;
  box-shadow: 0px 4px 18px rgba(115, 184, 246, 0.1);
  ${({ theme }) => theme.mediaQueries.sm} {
    margin: 0 12px 46px;
  }
`

export default StyledCard
