import styled from 'styled-components'
import { Box } from '@phamphu19498/runtogether-uikit'

const Card = styled(Box)<{
  width?: string
  padding?: string
  border?: string
  borderRadius?: string
}>`
  width: ${({ width }) => width ?? '100%'};
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ theme }) => theme.colors.background};
`
export default Card

export const LightCard = styled(Card)`
  background: ${({ theme }) => theme.colors.modalHeader};
`

export const LightGreyCard = styled(Card)`


`

export const GreyCard = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundListview};
`
export const CardWidthLogo = styled(Card)`
  background:${({ theme }) => theme.colors.modalHeader};
  margin-top:15px;
  border-radius:10px;
  margin-bottom:20px;
  display: flex;
  flex-direction:row;
  align-items:flex-start;
  box-shadow:none;
  border:1px solid ${({ theme }) => theme.colors.failure};
  @media screen and (max-width: 600px) {
    width:auto !important;
    margin-left:5px;
    margin-right:5px;
  }
`
